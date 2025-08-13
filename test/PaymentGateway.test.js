import { expect } from "chai";
import { ethers } from "hardhat";

describe("PaymentGateway", () => {
  it("reverts on zero amount", async () => {
    const [_, alice] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MockV0");
    const token = await Token.deploy();
    const Gateway = await ethers.getContractFactory("PaymentGateway");
    const gw = await Gateway.deploy(await token.getAddress());
    await expect(gw.pay(await alice.getAddress(), 0)).to.be.reverted;
  });
});
