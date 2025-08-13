import React, { useMemo, useState } from "react";
import { loginDev, initiatePayment, pollStatus, fetchHistory } from "@/lib/api";
import { CONTRACT_ADDRESSES } from "@/lib/addresses";

export default function PaymentDemo() {
  const [token, setToken] = useState("");
  const [payee, setPayee] = useState("0x0000000000000000000000000000000000000001");
  const [amount, setAmount] = useState("1");
  const [currency, setCurrency] = useState("USD");
  const [intentId, setIntentId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const gateway = useMemo(() => CONTRACT_ADDRESSES["0g-ai"].PAYMENT_GATEWAY_ADDRESS, []);

  async function doLogin() {
    const { token } = await loginDev();
    setToken(token);
  }

  async function doCreatePay() {
    if (!token) throw new Error("login first");
    const res = await initiatePayment(token, { amount, currency, payee: payee as `0x${string}` });
    setIntentId(res.intentId);
    setTxHash(res.txHash);
    setStatus("pending");
  }

  async function doPoll() {
    if (!token || !intentId) return;
    const s = await pollStatus(token, intentId);
    setStatus(`${s.status}${s.txHash ? ` (${s.txHash.slice(0,10)}…)` : ""}`);
  }

  async function loadHistory() {
    const rows = await fetchHistory(payee);
    setHistory(rows);
  }

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto", padding: 16 }}>
      <h2>Payments MVP • Testnet Gateway</h2>
      <p style={{ fontSize: 12, opacity: 0.8 }}>
        Gateway: <code>{gateway}</code>
      </p>

      <div style={{ display: "grid", gap: 8 }}>
        <button onClick={doLogin} disabled={!!token}>
          {token ? "✅ Logged in" : "Login (dev/dev)"}
        </button>

        <label>
          Payee:
          <input value={payee} onChange={e=>setPayee(e.target.value)} placeholder="0x..." />
        </label>

        <label>
          Amount:
          <input value={amount} onChange={e=>setAmount(e.target.value)} />
        </label>

        <label>
          Currency:
          <input value={currency} onChange={e=>setCurrency(e.target.value)} />
        </label>

        <button onClick={doCreatePay} disabled={!token}>Create Intent + Pay</button>

        <div>
          <div>Intent: {intentId ?? "—"}</div>
          <div>Tx: {txHash ? <code>{txHash}</code> : "—"}</div>
          <div>Status: {status || "—"}</div>
          <button onClick={doPoll} disabled={!intentId || !token}>Poll Status</button>
        </div>

        <button onClick={loadHistory} disabled={!token}>Load History</button>
        {history.length > 0 && (
          <div>
            <h4>Recent Payments</h4>
            <ul>
              {history.map((h, i) => (
                <li key={i}>
                  {new Date(h.ts).toLocaleString()} • {h.amount} • {h.payee.slice(0,8)}… •{" "}
                  <a href={`https://0g-testnet.evmscan/${h.txHash}`} target="_blank" rel="noreferrer">
                    {h.txHash.slice(0,10)}…
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
