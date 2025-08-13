// src/lib/auth.ts
export function saveToken(t: string){ localStorage.setItem('jwt', t); }
export function getToken(){ return localStorage.getItem('jwt') || ''; }

export async function signBody(body: any): Promise<string> {
  const r = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error('sign failed');
  const { signature } = await r.json();
  return signature;
}
