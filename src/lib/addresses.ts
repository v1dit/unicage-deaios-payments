export type NetworkKey = 'local' | '0g-ai' | 'production';

export const CONTRACT_ADDRESSES: Record<NetworkKey, {
  PAYMENT_TOKEN_ADDRESS: `0x${string}`;
  PAYMENT_GATEWAY_ADDRESS: `0x${string}`;
}> = {
  local: {
    PAYMENT_TOKEN_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    PAYMENT_GATEWAY_ADDRESS: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  },
  "0g-ai": {
    PAYMENT_TOKEN_ADDRESS: "0x...",
    PAYMENT_GATEWAY_ADDRESS: "0x..."
  },
  production: {
    PAYMENT_TOKEN_ADDRESS: "0x...",
    PAYMENT_GATEWAY_ADDRESS: "0x..."
  }
};
