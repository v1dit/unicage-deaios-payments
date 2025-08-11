# Unicage Blockchain Payment Platform

A production-ready blockchain-based payments platform leveraging **0g.ai's infrastructure** for secure, scalable, and low-cost transactions.

## Features

- **Secure Smart Contracts**: ERC-20 token with payment gateway
- **Payment Processing**: Automated payment initiation and settlement
- **Modern Frontend**: React + TypeScript with MetaMask integration
- **0g.ai Integration**: Leveraging high-performance blockchain infrastructure
- **Transaction History**: Complete audit trail and payment tracking
- **Security**: Reentrancy protection, access control, and secure operations

## Architecture

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

## Quick Start

### Prerequisites
- Node.js 18+ 
- MetaMask wallet
- 0g.ai testnet access

### 1. Clone & Install
```bash
git clone https://github.com/v1dit/unicage-deaios-payments.git
cd unicage-deaios-payments
npm install
cd frontend && npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp env.example .env

# Generate wallet (creates .env with private key)
npm run generate-wallet
```

### 3. Deploy Smart Contracts
```bash
# Compile contracts
npm run compile

# Deploy locally for testing
npm run deploy:local

# Deploy to 0g.ai testnet (when ready)
npm run deploy:0g
```

### 4. Start Development Environment
```bash
# Terminal 1: Start local blockchain
npm run node

# Terminal 2: Start frontend
cd frontend && npm run dev
```

### 5. Test the System
1. Open `http://localhost:5173/` in your browser
2. Connect MetaMask to local network (Chain ID: 1337)
3. Import test account using private key from terminal
4. Test payment functionality

## Project Structure

```
unicage-deaios-payments/
├── contracts/                 # Smart contracts
│   ├── PaymentToken.sol      # ERC-20 token contract
│   └── PaymentGateway.sol    # Payment processing contract
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── lib/
│   │   │   ├── payment.ts    # Payment integration library
│   │   │   └── addresses.ts  # Contract addresses
│   │   ├── App.tsx           # Main application
│   │   └── main.tsx          # Entry point
│   └── package.json
├── scripts/                   # Deployment scripts
│   └── deploy.js             # Main deployment script
├── hardhat.config.js         # Hardhat configuration
├── package.json              # Root dependencies
└── README.md                 # This file
```

## Smart Contracts

### PaymentToken.sol
- **Standard ERC-20** with 18 decimals
- **Ownable** with mint/burn capabilities
- **Initial supply**: 1,000,000 tokens
- **Security**: Access control and validation

### PaymentGateway.sol
- **Payment initiation** and settlement
- **Transaction tracking** with metadata
- **User payment history** queries
- **Reentrancy protection** for security

## Network Configuration

### Local Development (Hardhat)
- **RPC URL**: `http://127.0.0.1:8545/`
- **Chain ID**: 1337
- **Currency**: ETH (test accounts with 10,000 ETH)

### 0g.ai Testnet
- **RPC URL**: `https://autumn-old-valley.0g-galileo.quiknode.pro/...`
- **Chain ID**: 16601
- **Currency**: Native token

## Frontend Features

- **MetaMask Integration**: Secure wallet connection
- **Token Balance Display**: Real-time balance checking
- **Payment History**: Complete transaction records
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Mobile and desktop optimized

## Testing & Development

```bash
# Smart Contract Development
npm run compile          # Compile contracts
npm run test            # Run tests
npm run node            # Start local node
npm run deploy:local    # Deploy locally
npm run deploy:0g       # Deploy to 0g.ai

# Frontend Development
cd frontend
npm run dev             # Start development server
npm run build           # Build for production
npm run typecheck       # TypeScript type checking
npm run lint            # Code linting
```

## Deployment

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

## Security Features

- **Reentrancy Protection**: Prevents reentrancy attacks
- **Access Control**: Owner-only administrative functions
- **Input Validation**: Comprehensive parameter checking
- **Secure Approvals**: Proper ERC-20 approval flow
- **Audit Trail**: Complete transaction logging

## Performance Metrics

- **Transaction Speed**: < 2 seconds (0g.ai)
- **Gas Costs**: Optimized for efficiency
- **Scalability**: Designed for high transaction volume
- **Uptime**: 99.9% availability target

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built by the Unicage Team**
**Powered by 0g.ai Infrastructure**
