import { BrowserProvider, Contract, JsonRpcProvider, Wallet } from 'ethers';
import { CONTRACT_ADDRESSES } from './addresses';

export type ChainEnv = 'local' | '0g-ai' | 'production';

export const getRpcUrl = (env: ChainEnv) =>
  env === 'local' ? 'http://127.0.0.1:8545' : 'https://evmrpc-testnet.0g.ai';

export function getReadProvider(env: ChainEnv) {
  return new JsonRpcProvider(getRpcUrl(env));
}

export async function getSignerFromBrowser() {
  if (!window.ethereum) throw new Error('No wallet found');
  const provider = new BrowserProvider(window.ethereum as any);
  await provider.send('eth_requestAccounts', []);
  return await provider.getSigner();
}

export function getGatewayContract(env: ChainEnv, signerOrProvider: any) {
  const addr = CONTRACT_ADDRESSES[env].PAYMENT_GATEWAY_ADDRESS;
  const abi = [
    "function pay(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)"
  ];
  return new Contract(addr, abi, signerOrProvider);
}
