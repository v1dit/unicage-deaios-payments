const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function logPayment(p:{from:string,to:string,amount:string,txHash:string}) {
  try {
    const r = await fetch(`${API}/payments/log`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(p) });
    return await r.json();
  } catch { /* ignore for MVP */ }
}

export async function getPaymentHistory(user:string) {
  try {
    const r = await fetch(`${API}/payments/history?user=${user}`);
    if (!r.ok) return [];
    return await r.json();
  } catch { return []; }
}
