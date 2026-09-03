"user client";

import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

const botTestnet = {
  id: 968,
  name: "Bohr Testnet",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.bohr.life"],
    },
  },
  blockExplorers: {
    default: {
      name: "BohrScan",
      url: "https://scan.bohr.life",
    },
  },
  testnet: true,
} as const satisfies Chain;

const botMainnet = {
  id: 677,
  name: "BOT Mainnet",
  nativeCurrency: {
    name: "BOT",
    symbol: "BOT",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.botchain.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "BOTScan",
      url: "https://scan.botchain.ai",
    },
  },
  testnet: false,
} as const satisfies Chain;

export default getDefaultConfig({
  appName: "Veynt",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [botMainnet, botTestnet],
  transports: {
    [botMainnet.id]: http("https://rpc.botchain.ai"),
    [botTestnet.id]: http("https://rpc.botchain.ai"),
  },
  ssr: true,
});
