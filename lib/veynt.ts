// lib/veynt.ts

export const botTestnet = {
  id: 968,
  name: "Bohr Testnet",
} as const;

export const botMainnet = {
  id: 677,
  name: "BOT Mainnet",
} as const;

export const CONTRACTS = {
  968: "0x392B82F53b61f253a13B5aE403a000932d9485db", // Testnet
  677: "0xae1cf56E2Df39E4EE9203DcEd781C75799E36202", // Mainnet
} as const;

export function getContractAddress(chainId: number) {
  const address = CONTRACTS[chainId as keyof typeof CONTRACTS];

  if (!address) {
    throw new Error("Veynt is not supported on this network.");
  }

  return address;
}

export const ASSET_CONFIG = {
  BTC: {
    symbol: "BTCUSDT",
    defaultPrice: 65000,
  },
  ETH: {
    symbol: "ETHUSDT",
    defaultPrice: 3000,
  },
  SOL: {
    symbol: "SOLUSDT",
    defaultPrice: 125,
  },
  BNB: {
    symbol: "BNBUSDT",
    defaultPrice: 700,
  },
  XRP: {
    symbol: "XRPUSDT",
    defaultPrice: 2.5,
  },
  ADA: {
    symbol: "ADAUSDT",
    defaultPrice: 0.8,
  },
  AVAX: {
    symbol: "AVAXUSDT",
    defaultPrice: 30,
  },
  LINK: {
    symbol: "LINKUSDT",
    defaultPrice: 20,
  },
  DOGE: {
    symbol: "DOGEUSDT",
    defaultPrice: 0.2,
  },
} as const;

export type Asset = keyof typeof ASSET_CONFIG;

export const PREDICTION_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArKeKZMf2oDUJWwLlrUDy
5yB+sNQCqNGSkdbZ/ApoEHByzSj17ADH5lq07zvsDBQMMjThF68/1XqSubUSdWfG
er14CH+U6VTPGxi0S4KkKuZxZkfctbKyazXYm9zYpcyEjOs/1miaOLTq+/fgBb3C
eGi22aMzL1v9H1a6nyfZJyO5XFxbtDsl9IUPGyGbxjMvaf94cb9382OGx6gTpofc
07/O+5XFMRGtBJaCA6BYKHx9YjE3+4g3CE5jIgGdHJf2H5CedCFNe2iuds4pDu8k
qPaCMVfN7648xrThn93zW2HJ+LbkZMaxj9I1kqvVoI+LuL3dtfJxNd0wbITvkAsH
twIDAQAB
-----END PUBLIC KEY-----`;

export const veyntAbi = [
  {
    type: "function",
    name: "marketCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "markets",
    stateMutability: "view",
    inputs: [{ type: "uint256", name: "marketId" }],
    outputs: [
      { type: "address", name: "owner" },
      { type: "string", name: "apiEndpoint" },
      { type: "string", name: "question" },
      { type: "uint256", name: "deadline" },
      { type: "uint256", name: "totalPool" },
      { type: "bool", name: "resolved" },
      { type: "bool", name: "outcome" },
      { type: "bytes32", name: "merkleRoot" },
      { type: "bool", name: "refundInitiated" },
      { type: "uint256", name: "startTime" },
    ],
  },
  {
    type: "function",
    name: "createMarket",
    stateMutability: "payable",
    inputs: [
      { type: "string", name: "_question" },
      { type: "uint256", name: "_deadline" },
      { type: "string", name: "_apiEndpoint" },
    ],
    outputs: [{ type: "uint256", name: "marketId" }],
  },
  {
    type: "function",
    name: "predict",
    stateMutability: "payable",
    inputs: [
      { type: "uint256", name: "_marketId" },
      { type: "bytes", name: "_encryptedChoice" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "hasClaimed",
    stateMutability: "view",
    inputs: [
      { type: "uint256", name: "marketId" },
      { type: "address", name: "bettor" },
    ],
    outputs: [{ type: "bool", name: "claimed" }],
  },
  {
    type: "function",
    name: "claimPayout",
    stateMutability: "nonpayable",
    inputs: [
      { type: "uint256", name: "_marketId" },
      { type: "uint256", name: "_payout" },
      { type: "bytes32[]", name: "_merkleProof" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "MARKET_CREATION_FEE",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "emergencyRefund",
    stateMutability: "nonpayable",
    inputs: [{ type: "uint256", name: "_marketId" }],
    outputs: [],
  },
  {
    type: "function",
    name: "i_teeSigner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    type: "function",
    name: "accumulatedTreasuryFees",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
] as const;
