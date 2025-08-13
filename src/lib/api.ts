// src/lib/api.ts

export type LoginResponse = { token: string };
export type InitiateBody = { amount: string | number; currency: string; payee: `0x${string}` };
export type InitiateResponse = { ok: boolean; intentId: string; txHash: `0x${string}` };
export type StatusResponse = { status: 'pending' | 'confirmed' | 'failed'; txHash: `0x${string}` | null };

const API = import.meta.env.VITE_API_URL;

export async function loginDev(): Promise<LoginResponse> {
  const r = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: 'dev', pass: 'dev' })
  });
  if (!r.ok) throw new Error('login failed');
  const data = await r.json();
  // optional: persist for later calls
  try { localStorage.setItem('jwt', data.token); } catch {}
  return data;
}

export async function initiatePayment(token: string, body: InitiateBody): Promise<InitiateResponse> {
  const r = await fetch(`${API}/payments/initiate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      // 'X-Signature': await signBody(body), // add when HMAC is wired
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error('initiate failed');
  return r.json();
}

export async function pollStatus(token: string, intentId: string): Promise<StatusResponse> {
  const r = await fetch(`${API}/bridge/status/${intentId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!r.ok) throw new Error('status failed');
  return r.json();
}

/* ---------- missing pieces that PaymentDemo imports ---------- */

export type HistoryRow = {
  ts: number;
  payer: string;
  payee: string;
  amount: string | number;
  token: `0x${string}`;
  txHash: `0x${string}`;
  chainId: string;
  intentId?: string;
};

export async function fetchHistory(address?: string): Promise<HistoryRow[]> {
  const url = new URL(`${API}/payments/history`);
  if (address) url.searchParams.set('address', address);
  const jwt = localStorage.getItem('jwt') ?? '';
  const r = await fetch(url.toString(), {
    headers: { 'Authorization': `Bearer ${jwt}` }
  });
  if (!r.ok) throw new Error('history failed');
  return r.json();
}
