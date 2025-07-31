require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    zeroG: {
      url: "https://autumn-old-valley.0g-galileo.quiknode.pro/85ae73811a7c2240efd7a7da84651724d93e07b0/",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
