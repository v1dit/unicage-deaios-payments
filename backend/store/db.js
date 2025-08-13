// backend/store/db.js
const fs = require('fs');
const path = require('path');
const DB = path.join(__dirname, 'payments.json');

const readAll = () => { try { return JSON.parse(fs.readFileSync(DB,'utf8')); } catch { return []; } };
const writeAll = rows => fs.writeFileSync(DB, JSON.stringify(rows, null, 2));

async function recordPayment(row){ const rows=readAll(); rows.push(row); writeAll(rows); }
async function getHistory(addrLower){
  const rows = readAll();
  if (!addrLower) return rows.slice(-50).reverse();
  return rows.filter(r => (r.payee||'').toLowerCase() === addrLower).slice(-50).reverse();
}
module.exports = { recordPayment, getHistory };
