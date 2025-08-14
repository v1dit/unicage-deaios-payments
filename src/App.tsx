import { useEffect, useState } from "react";
import { sendV0Payment, getTokenBalance, getPaymentHistory } from "./lib/payment";
import { getContractAddresses } from "./lib/addresses";
import PaymentDemo from "./PaymentDemo";

declare global { interface Window { ethereum?: any } }

export default function App() {
  const [addr, setAddr] = useState<string>("");
  const [chainId, setChainId] = useState<number>();
  const [balance, setBalance] = useState<string>("-");
  const [txHash, setTxHash] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on?.("chainChanged", () => location.reload());
      window.ethereum.on?.("accountsChanged", () => location.reload());
    }
  }, []);

  async function connect() {
    if (!window.ethereum) { setMsg("Install a browser wallet (MetaMask/Rabby)."); return; }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const cidHex = await window.ethereum.request({ method: "eth_chainId" });
      setAddr(accounts?.[0] || "");
      setChainId(parseInt(cidHex, 16));
      setMsg("");
      await refresh(accounts?.[0]);
    } catch (e:any) {
      setMsg(e?.message || String(e));
    }
  }

  async function switchToLocal() {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x7a69" }], // 31337
      });
    } catch (e:any) {
      if (e?.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x7a69",
            chainName: "Localhost 8545",
            rpcUrls: ["http://127.0.0.1:8545"],
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
          }],
        });
      } else {
        setMsg(e?.message || String(e));
      }
    }
  }

  async function refresh(address?: string) {
    try {
      const bal = await getTokenBalance();
      setBalance(bal);
      const who = address || addr;
      if (who) setHistory((await getPaymentHistory(who)).slice(-5).reverse());
    } catch (e:any) { setMsg(e.message || String(e)); }
  }

  async function sendDemo() {
    setMsg("Sending 5 V0…");
    try {
      const hash = await sendV0Payment("0x000000000000000000000000000000000000dEaD", 5, "demo");
      setTxHash(hash);
      setMsg("Sent!");
      await refresh();
    } catch (e:any) { setMsg(e.message || String(e)); }
  }

  let addresses: any;
  try { addresses = getContractAddresses(chainId); } catch {}
  const wrongNet = chainId !== undefined && ![31337,16601].includes(chainId!);

  return (
    <div style={{maxWidth:780, margin:"40px auto", fontFamily:"Inter, system-ui"}}>
      <h1>Unicage Payments MVP</h1>
      <p><b>Wallet:</b> {addr || "—"} | <b>ChainId:</b> {chainId ?? "—"}</p>
      <p><b>Balance:</b> {balance}</p>
      {!addresses && <p style={{color:"tomato"}}>Contracts not configured for this network.</p>}

      <div style={{display:"flex", gap:12, margin:"16px 0", flexWrap:"wrap"}}>
        <button onClick={connect}>Connect Wallet</button>
        <button onClick={switchToLocal}>Switch to Localhost</button>
        <button onClick={()=>refresh()}>Refresh Balance</button>
        <button onClick={sendDemo}>Send 5 V0 (demo)</button>
      </div>

      {txHash && <p>Last tx: <code>{txHash}</code></p>}
      {wrongNet && <p style={{color:"tomato"}}>Wrong network — use Local (31337) or 0g.ai (16601).</p>}
      {msg && <p style={{color:"#555"}}>{msg}</p>}

      <h3>Last 5 Payments</h3>
      <ul>
        {history.map((h:any) => (
          <li key={h.id}>→ {h.recipient} • {h.amount} • {new Date(h.timestamp).toLocaleString()} • {h.settled ? "settled" : "pending"}</li>
        ))}
        {!history.length && <li>None yet.</li>}
      </ul>

      <div style={{ marginTop: 40 }}>
        <hr />
        <h2 style={{ marginTop: 16 }}>Mock Blockchain Payment Demo</h2>
        <PaymentDemo />
      </div>
    </div>
  );
}
