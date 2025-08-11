<<<<<<< HEAD
# 🚀 Unicage Blockchain Payment Platform

A comprehensive blockchain-based payments platform leveraging **0g.ai's infrastructure** for secure, scalable, and low-cost transactions.

## ✨ Features

- **🔐 Secure Smart Contracts**: ERC-20 token with payment gateway
- **💳 Payment Processing**: Automated payment initiation and settlement
- **📱 Modern Frontend**: React + TypeScript with MetaMask integration
- **🌐 0g.ai Integration**: Leveraging high-performance blockchain infrastructure
- **📊 Transaction History**: Complete audit trail and payment tracking
- **🛡️ Security**: Reentrancy protection, access control, and pausable operations

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │◄──►│  Payment Gateway │◄──►│  Payment Token  │
│   (TypeScript)   │    │   (Smart Contract)│    │  (ERC-20 Token) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   MetaMask      │    │     0g.ai        │    │   Hardhat       │
│   Integration   │    │   Blockchain     │    │   Development   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MetaMask wallet
- 0g.ai testnet access

### 1. Clone & Install
```bash
git clone <repository-url>
cd unicage
npm install
cd frontend && npm install
```

### 2. Generate Wallet
```bash
npm run generate-wallet
```
This creates a `.env` file with your private key and address.

### 3. Deploy Smart Contracts
```bash
# Compile contracts
npm run compile

# Deploy to 0g.ai testnet
npm run deploy:0g
```

### 4. Update Frontend
After deployment, update contract addresses in `frontend/src/lib/payment.ts`:
```typescript
const PAYMENT_GATEWAY_ADDRESS = "0x..."; // Your deployed address
const PAYMENT_TOKEN_ADDRESS = "0x...";   // Your deployed address
```

### 5. Start Frontend
```bash
cd frontend
npm run dev
```

## 📁 Project Structure

```
unicage/
├── contracts/                 # Smart contracts
│   ├── PaymentToken.sol      # ERC-20 token contract
│   └── PaymentGateway.sol    # Payment processing contract
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── lib/payment.ts    # Payment integration library
│   │   ├── App.tsx           # Main application
│   │   └── main.tsx          # Entry point
│   └── package.json
├── scripts/                   # Deployment scripts
│   └── deploy.js             # Main deployment script
├── hardhat.config.js         # Hardhat configuration
├── package.json              # Root dependencies
└── README.md                 # This file
```

## 🔧 Smart Contracts

### PaymentToken.sol
- **Standard ERC-20** with 18 decimals
- **Pausable** for emergency stops
- **Ownable** with mint/burn capabilities
- **Initial supply**: 1,000,000 tokens

### PaymentGateway.sol
- **Payment initiation** and settlement
- **Transaction tracking** with metadata
- **User payment history** queries
- **Reentrancy protection** for security

## 🌐 Network Configuration

### 0g.ai Testnet
- **RPC URL**: `https://autumn-old-valley.0g-galileo.quiknode.pro/...`
- **Chain ID**: 1337
- **Currency**: Native token

## 📱 Frontend Features

- **MetaMask Integration**: Secure wallet connection
- **Token Balance Display**: Real-time balance checking
- **Payment History**: Complete transaction records
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Mobile and desktop optimized

## 🧪 Testing

```bash
# Run tests
npm test

# Local deployment for testing
npm run deploy:local

# Start local node
npm run node
```

## 🚀 Deployment

### Production Checklist
- [ ] Smart contracts compiled and tested
- [ ] Contract addresses updated in frontend
- [ ] Environment variables configured
- [ ] MetaMask network configured
- [ ] Frontend built and deployed

### Deployment Commands
```bash
# Deploy to 0g.ai
npm run deploy:0g

# Build frontend
cd frontend && npm run build

# Deploy frontend (your preferred hosting)
```

## 🔒 Security Features

- **Reentrancy Protection**: Prevents reentrancy attacks
- **Access Control**: Owner-only administrative functions
- **Input Validation**: Comprehensive parameter checking
- **Emergency Pause**: Ability to pause operations
- **Secure Approvals**: Proper ERC-20 approval flow

## 📊 Performance Metrics

- **Transaction Speed**: < 2 seconds (0g.ai)
- **Gas Costs**: Optimized for efficiency
- **Scalability**: Designed for high transaction volume
- **Uptime**: 99.9% availability target

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the Unicage Team**
**Powered by 0g.ai Infrastructure**
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 187d127f02557657936980395c01791f305c7046
