const fs = require("fs");
const { ethers } = require("ethers");

// 1. Create a random wallet
const wallet = ethers.Wallet.createRandom();

// 2. Output to console
console.log("Address:", wallet.address);
console.log("Private Key:", wallet.privateKey);

// 3. Write to .env file
fs.writeFileSync(".env", `PRIVATE_KEY=${wallet.privateKey}\nADDRESS=${wallet.address}`);
console.log("Wallet saved to .env");
