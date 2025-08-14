// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const body = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

console.log('Loading middleware...');
const { jwtGuard, verifyHmac, hmac } = require('./middleware/auth');
console.log('Loading bridge...');
const { createIntent, getIntentStatus, payWithGateway } = require('./bridge/sandbox');
console.log('Loading store...');
const { recordPayment, getHistory } = require('./store/db');
console.log('All modules loaded successfully');

// Ensure local defaults for dev usage
process.env.JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
process.env.HMAC_SECRET = process.env.HMAC_SECRET || 'devhmac';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(body.json());

// --- Auth: dev login
console.log('Registering auth routes...');
app.post('/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { user, pass } = req.body || {};
  if (user === 'dev' && pass === 'dev') {
    const token = jwt.sign({ user: 'dev' }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'bad credentials' });
});

// Optional helper: server signs request bodies for the client
app.post('/auth/sign', jwtGuard, (req, res) => {
  res.json({ signature: hmac(req.body) });
});

// --- Protect payment + bridge routes
app.use('/payments', jwtGuard);
app.use('/bridge', jwtGuard);

// Bridge: create intent (mock) — returns intentId + mock tx hash
app.post('/bridge/create-intent', async (req, res) => {
  try {
    const { amount, currency, payee } = req.body || {};
    const intent = await createIntent({ amount, currency, userWallet: payee });
    const txHash = '0x' + crypto.randomBytes(32).toString('hex');
    await recordPayment({
      ts: Date.now(),
      payer: req.user?.user || 'dev',
      payee,
      amount,
      token: process.env.PAYMENT_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000',
      txHash,
      chainId: process.env.CHAIN_ID || 'local',
      intentId: intent.intentId
    });
    res.json({ ok: true, intentId: intent.intentId, txHash });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'create_intent_failed' });
  }
});

// Payments: create intent + on‑chain pay (HMAC required)
app.post('/payments/initiate', verifyHmac, async (req, res) => {
  try {
    const { amount, currency, payee } = req.body;
    const intent = await createIntent({ amount, currency, userWallet: payee });
    const { txHash, status } = await payWithGateway({ amount, payee });
    await recordPayment({
      ts: Date.now(), payer: req.user?.user || 'dev', payee,
      amount, token: process.env.PAYMENT_TOKEN_ADDRESS,
      txHash, chainId: '0g-testnet', intentId: intent.intentId
    });
    res.json({ ok: true, intentId: intent.intentId, txHash, status });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'initiate_failed' });
  }
});

app.get('/bridge/status/:intentId', async (req, res) => {
  try { res.json(await getIntentStatus(req.params.intentId)); }
  catch (e) { res.status(500).json({ error: 'status_failed' }); }
});

app.get('/payments/history', async (req, res) => {
  res.json(await getHistory((req.query.address || '').toLowerCase()));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on ${port}`));

module.exports = app; // (for tests)
