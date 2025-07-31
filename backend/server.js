require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const PaymentABI = require('../artifacts/contracts/Payment.sol/Payment.json').abi;

const app = express();
app.use(express.json());

// Provider & Wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Deployed contract address (replace with actual address after deploy)
const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
const paymentContract = new ethers.Contract(CONTRACT_ADDRESS, PaymentABI, wallet);

// ---------------------------
// Initiate Payment via Contract
// ---------------------------
app.post('/pay', async (req, res) => {
  const { to, amount } = req.body;
  try {
    const tx = await paymentContract.initiatePayment(to, ethers.parseEther(amount));
    await tx.wait();
    res.json({ txHash: tx.hash, message: "Payment initiated via contract" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------
// Verify Payment Status
// ---------------------------
app.get('/verify/:hash', async (req, res) => {
  try {
    const receipt = await provider.getTransactionReceipt(req.params.hash);
    res.json({ status: receipt?.status ?? "pending" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------
// Create Wallet
// ---------------------------
app.get('/wallet/create', (req, res) => {
  const newWallet = ethers.Wallet.createRandom();
  res.json({ address: newWallet.address, privateKey: newWallet.privateKey });
});

// ---------------------------
// Check Wallet Balance
// ---------------------------
app.get('/wallet/balance/:address', async (req, res) => {
  try {
    const balance = await provider.getBalance(req.params.address);
    res.json({ address: req.params.address, balance: ethers.formatEther(balance) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
