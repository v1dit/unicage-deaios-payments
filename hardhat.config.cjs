require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.23" },
      { version: "0.8.28" }
    ]
  },
  networks: { localhost: {} }
};
