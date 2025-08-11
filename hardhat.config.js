require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "0g-ai": {
      url: "https://autumn-old-valley.0g-galileo.quiknode.pro/85ae73811a7c2240efd7a7da84651724d93e07b0/",
      chainId: 16601, // Correct 0g.ai testnet chain ID
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto",
      gas: "auto",
    },
    hardhat: {
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: {
      "0g-ai": "dummy", // 0g.ai doesn't have Etherscan, but Hardhat requires this
    },
    customChains: [
      {
        network: "0g-ai",
        chainId: 16601,
        urls: {
          apiURL: "https://autumn-old-valley.0g-galileo.quiknode.pro/85ae73811a7c2240efd7a7da84651724d93e07b0/",
          browserURL: "https://autumn-old-valley.0g-galileo.quiknode.pro/85ae73811a7c2240efd7a7da84651724d93e07b0/",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
}; 