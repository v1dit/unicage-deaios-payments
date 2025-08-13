require('dotenv').config();
require('@nomicfoundation/hardhat-ethers');

module.exports = {
  solidity: '0.8.28',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [process.env.DEPLOYER_KEY].filter(Boolean),
    },
    og_testnet: {
      url: process.env.RPC_URL, // switch back to 0g later
      accounts: [process.env.DEPLOYER_KEY].filter(Boolean),
    },
  },
};
