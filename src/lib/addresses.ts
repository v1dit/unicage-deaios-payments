export const CONTRACT_ADDRESSES = {
  local: {
    PAYMENT_TOKEN_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    PAYMENT_GATEWAY_ADDRESS: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  },
  "0g-ai": {
    PAYMENT_TOKEN_ADDRESS: "0x...", // fill in after testnet deploy
    PAYMENT_GATEWAY_ADDRESS: "0x...",
  },
  production: {
    PAYMENT_TOKEN_ADDRESS: "0x...",
    PAYMENT_GATEWAY_ADDRESS: "0x...",
  },
};

export function getContractAddresses(chainId?: number) {
  switch (chainId) {
    case 31337: return CONTRACT_ADDRESSES.local;
    case 16601: return CONTRACT_ADDRESSES["0g-ai"];
    default: throw new Error("Contracts not configured for this network");
  }
}
