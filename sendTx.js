require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://autumn-old-valley.0g-galileo.quiknode.pro/85ae73811a7c2240efd7a7da84651724d93e07b0/"
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const tx = await wallet.sendTransaction({
    to: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", // test recipient
    value: ethers.parseEther("1.0"),
  });

  console.log("TX Hash:", tx.hash);

  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
