import { ethers } from 'ethers';
import 'dotenv/config';
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const addr = '0xEbA4Cf9d34a73970Ea92caA8Fe45a646dF1d2615';
const bal = await provider.getBalance(addr);
console.log(addr, 'balance:', ethers.formatEther(bal), 'OG');
