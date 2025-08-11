const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 Deploying Blockchain Payment Platform to 0g.ai...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy PaymentToken first
  console.log("\n🔸 Deploying PaymentToken...");
  const PaymentToken = await ethers.getContractFactory("PaymentToken");
  const paymentToken = await PaymentToken.deploy(
    "v0 Payment Token",    // name
    "v0",                  // symbol
    18,                    // decimals
    1000000                // initial supply (1M tokens)
  );
  await paymentToken.waitForDeployment();
  const tokenAddress = await paymentToken.getAddress();
  console.log("✅ PaymentToken deployed to:", tokenAddress);

  // Deploy PaymentGateway
  console.log("\n🔸 Deploying PaymentGateway...");
  const PaymentGateway = await ethers.getContractFactory("PaymentGateway");
  const paymentGateway = await PaymentGateway.deploy(tokenAddress);
  await paymentGateway.waitForDeployment();
  const gatewayAddress = await paymentGateway.getAddress();
  console.log("✅ PaymentGateway deployed to:", gatewayAddress);

  // Verify contracts on block explorer (if supported)
  console.log("\n🔍 Verifying contracts...");
  try {
    await hre.run("verify:verify", {
      address: tokenAddress,
      constructorArguments: [
        "v0 Payment Token",
        "v0",
        18,
        1000000
      ],
    });
    console.log("✅ PaymentToken verified");
  } catch (error) {
    console.log("⚠️  PaymentToken verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: gatewayAddress,
      constructorArguments: [tokenAddress],
    });
    console.log("✅ PaymentGateway verified");
  } catch (error) {
    console.log("⚠️  PaymentGateway verification failed:", error.message);
  }

  // Save deployment info
  const deploymentInfo = {
    network: "0g.ai",
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    contracts: {
      PaymentToken: {
        address: tokenAddress,
        name: "v0 Payment Token",
        symbol: "v0",
        decimals: 18,
        initialSupply: "1000000000000000000000000" // 1M tokens with 18 decimals
      },
      PaymentGateway: {
        address: gatewayAddress,
        paymentToken: tokenAddress
      }
    }
  };

  console.log("\n📋 Deployment Summary:");
  console.log("Network:", deploymentInfo.network);
  console.log("PaymentToken:", tokenAddress);
  console.log("PaymentGateway:", gatewayAddress);
  console.log("Deployer:", deployer.address);
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("💡 Update your frontend with these contract addresses");
  
  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
