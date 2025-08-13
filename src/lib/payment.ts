import { ethers } from "ethers";
import { getContractAddresses } from "./addresses";
import { logPayment } from "./api";

const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address,address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)"
];
const GATEWAY_ABI = [
  "function initiatePayment(address token,address to,uint256 amount,string memo) returns (bytes32)"
];

declare global { interface Window { ethereum?: any } }

export async function ensureWallet(): Promise<{ok:boolean,message?:string,address?:string,chainId?:number, provider?:any, signer?:any}> {
  if (!window.ethereum) return { ok:false, message:"Install MetaMask to continue." };
  const provider = new ethers.BrowserProvider(window.ethereum);
  const [address] = await provider.send("eth_requestAccounts", []);
  const network = await provider.getNetwork();
  return { ok:true, address, chainId: Number(network.chainId), provider, signer: await provider.getSigner() };
}

export async function getTokenBalance(): Promise<string> {
  const w = await ensureWallet();
  if (!w.ok || !w.signer) throw new Error(w.message);
  const { chainId, signer } = w;
  const { PAYMENT_TOKEN_ADDRESS } = getContractAddresses(chainId);
  const token = new ethers.Contract(PAYMENT_TOKEN_ADDRESS, ERC20_ABI, signer);
  const dec = await token.decimals();
  const bal = await token.balanceOf(await signer.getAddress());
  return ethers.formatUnits(bal, dec) + " V0";
}

export async function sendV0Payment(recipient:string, amount:number, memo:string) {
  const w = await ensureWallet();
  if (!w.ok || !w.signer) throw new Error(w.message);
  const { chainId, signer } = w;
  if (![31337,16601].includes(chainId!)) throw new Error("Switch to Local (31337) or 0g.ai (16601).");

  const { PAYMENT_TOKEN_ADDRESS, PAYMENT_GATEWAY_ADDRESS } = getContractAddresses(chainId);
  const token = new ethers.Contract(PAYMENT_TOKEN_ADDRESS, ERC20_ABI, signer);
  const gateway = new ethers.Contract(PAYMENT_GATEWAY_ADDRESS, GATEWAY_ABI, signer);

  const dec = await token.decimals();
  const amt = ethers.parseUnits(String(amount), dec);
  const owner = await signer.getAddress();
  const allowance = await token.allowance(owner, PAYMENT_GATEWAY_ADDRESS);
  if (allowance < amt) {
    const aTx = await token.approve(PAYMENT_GATEWAY_ADDRESS, amt);
    await aTx.wait();
  }

  const tx = await gateway.initiatePayment(PAYMENT_TOKEN_ADDRESS, recipient, amt, memo ?? "");
  await tx.wait();
  const hash = tx.hash;

  logPayment({ from: owner, to: recipient, amount: String(amount), txHash: hash }).catch(()=>{});
  return hash;
}

export async function getPaymentHistory(user:string) {
  return await (await import("./api")).getPaymentHistory(user);
}
