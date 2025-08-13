const hre = require("hardhat");
const fs = require("fs");

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

  fs.writeFileSync(
    "deployed.local.json",
    JSON.stringify(
      { PAYMENT_TOKEN_ADDRESS: tokenAddr, PAYMENT_GATEWAY_ADDRESS: gatewayAddr },
      null,
      2
    )
  );
  console.log("Wrote deployed.local.json");
}

main().catch((e) => { console.error(e); process.exit(1); });
