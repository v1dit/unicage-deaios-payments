# Blockchain Payment Platform – MVP (0g.ai Integration)

## Overview
This project is a blockchain-based payments platform built on 0g.ai’s infrastructure.  
It enables **secure, low-cost, tokenized transactions** with wallet creation, payment initiation, verification, and transaction history — integrated via API into an existing payment platform.

## Architecture
[Frontend (React/Vite)] <---> [Backend (Node.js/Express API)] <---> [0g.ai Blockchain RPC]

markdown
Copy
Edit

### Detailed Flow
1. **Frontend (React/Vite)** – User interface for creating wallets, making payments, and viewing history.
2. **Backend (Node.js/Express)** – Handles API requests, communicates with blockchain, stores temporary state.
3. **Blockchain (0g.ai / Hardhat)** – Executes smart contracts for token transfers, records immutable transaction history.

## Folder Structure
backend/ # Express API, blockchain integration
frontend/ # React/Vite UI
contracts/ # Smart contracts (Hardhat)
.env.example # Environment variables template

bash
Copy
Edit

## Environment Variables
Create a `.env` in the project root:

Backend
PORT=3000
RPC_URL=https://evmrpc-testnet.0g.ai
DEPLOYER_KEY=your_private_key
JWT_SECRET=your_secret

Frontend
VITE_API_URL=http://localhost:3000

bash
Copy
Edit

## Running Locally

**Backend**
```bash
cd backend
npm install
npm run dev
Frontend

bash
Copy
Edit
cd frontend
npm install
npm run dev
Open in your browser: http://localhost:5173

Known Limitations
Only tested on local Hardhat & 0g.ai testnet

Requires manual smart contract deployment before usage

No production wallet security layer implemented yet

Demo Script (Quick Reference)
Login

Click “Login” → verify JWT token stored in localStorage (check dev console).

Create Payment Intent

Enter amount + recipient address → click "Pay".

Simulate Transaction

Show transaction hash returned in UI.

Check Status

Poll payment status → shows "confirmed".

View History

Navigate to history page → displays recent payment(s).

Testing Notes
Environment

macOS 12.x

Node.js v18.x

npm v9.x

Observations

Local Hardhat transactions confirm in <3 seconds

0g.ai testnet confirmations: 5–15 seconds

Next Steps for Production

Deploy backend (Render/Railway/Fly/EC2)

Deploy frontend (Vercel/Netlify)

Secure private keys in cloud secrets manager

Integrate with live payment platform API

yaml
Copy
Edit
