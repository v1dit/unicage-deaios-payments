// backend/bridge/sandbox.js (CJS)
const fetch = require('node-fetch');
const { ethers } = require('ethers');

const ABI_GATEWAY = [
  "function pay(address to, uint256 amount) returns (bool)"
];

let provider, wallet, gateway;
function ensureChain() {
  if (gateway) return;
  provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  wallet = new ethers.Wallet(process.env.DEPLOYER_KEY, provider);
  gateway = new ethers.Contract(process.env.PAYMENT_GATEWAY_ADDRESS, ABI_GATEWAY, wallet);
}

async function createIntent({ amount, currency, userWallet }) {
  // Mock if no sandbox configured
  if (!process.env.SANDBOX_API_URL) {
    return { intentId: 'mock-' + Date.now(), amount, currency, userWallet };
  }
  const r = await fetch(`${process.env.SANDBOX_API_URL}/intents`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'x-api-key': process.env.SANDBOX_API_KEY },
    body: JSON.stringify({ amount, currency, userWallet })
  });
  return await r.json();
}

async function payWithGateway({ amount, payee }) {
  ensureChain();
  const tx = await gateway.pay(payee, amount);
  const rc = await tx.wait();
  return { txHash: rc.hash || rc.transactionHash, status: rc.status === 1 ? 'confirmed' : 'failed' };
}

async function getIntentStatus(intentId) {
  // Mock confirmed when no sandbox
  if (!process.env.SANDBOX_API_URL) return { intentId, status: 'confirmed', txHash: null };
  const r = await fetch(`${process.env.SANDBOX_API_URL}/intents/${intentId}`, {
    headers: { 'x-api-key': process.env.SANDBOX_API_KEY }
  });
  return await r.json();
}

module.exports = { createIntent, payWithGateway, getIntentStatus };
