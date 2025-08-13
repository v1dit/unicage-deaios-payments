// backend/middleware/auth.js (CJS)
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function jwtGuard(req, res, next) {
  const t = (req.headers.authorization || '').replace('Bearer ', '');
  try { req.user = jwt.verify(t, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'unauthorized' }); }
}

// body must be JSON-parsed before this
function hmac(body) {
  return crypto.createHmac('sha256', process.env.HMAC_SECRET)
    .update(JSON.stringify(body || {}))
    .digest('hex');
}

function verifyHmac(req, res, next) {
  const sig = req.header('X-Signature') || '';
  const mac = hmac(req.body);
  if (sig !== mac) return res.status(403).json({ error: 'bad signature' });
  next();
}

module.exports = { jwtGuard, verifyHmac, hmac };
