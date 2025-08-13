const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Token = await hre.ethers.getContractFactory("MockV0");
  const token = await Token.deploy();
  await token.waitForDeployment();
  const tokenAddr = await token.getAddress();
  console.log("MockV0:", tokenAddr);

  const Gateway = await hre.ethers.getContractFactory("PaymentGateway");
  const gateway = await Gateway.deploy();
  await gateway.waitForDeployment();
  const gatewayAddr = await gateway.getAddress();
  console.log("PaymentGateway:", gatewayAddr);

  // Distribute tokens to local test accounts for convenient UI testing
  try {
    const signers = await hre.ethers.getSigners();
    const token = await hre.ethers.getContractAt("MockV0", tokenAddr);
    const decimals = 18n;
    const amount = 10_000n * (10n ** decimals);
    for (let i = 0; i < Math.min(signers.length, 10); i++) {
      const s = signers[i];
      const addr = await s.getAddress();
      if (addr.toLowerCase() === (await signers[0].getAddress()).toLowerCase()) continue;
      const tx = await token.transfer(addr, amount);
      await tx.wait();
    }
    console.log("Distributed 10k V0 tokens to test accounts");
  } catch (e) {
    console.warn("Token distribution skipped:", e.message);
  }

  fs.writeFileSync(
    "deployed.local.json",
    JSON.stringify(
      { PAYMENT_TOKEN_ADDRESS: tokenAddr, PAYMENT_GATEWAY_ADDRESS: gatewayAddr },
      null,
      2
    )
  );
  console.log("Wrote deployed.local.json");

  // Also update frontend addresses for local network to keep UI in sync
  try {
    const addressesTsPath = path.join(__dirname, "..", "src", "lib", "addresses.ts");
    let src = fs.readFileSync(addressesTsPath, "utf8");
    src = src.replace(
      /(local:\s*\{[\s\S]*?PAYMENT_TOKEN_ADDRESS:\s*")0x[0-9a-fA-F]{40}("[\s\S]*?PAYMENT_GATEWAY_ADDRESS:\s*")0x[0-9a-fA-F]{40}(")/,
      `$1${tokenAddr}$2${gatewayAddr}$3`
    );
    fs.writeFileSync(addressesTsPath, src, "utf8");
    console.log("Updated src/lib/addresses.ts with local addresses");
  } catch (e) {
    console.warn("Could not update src/lib/addresses.ts automatically:", e.message);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
