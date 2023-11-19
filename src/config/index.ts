const availableNetworks = ["polygon", "mumbai"] as const;
type AvailableNetworks = (typeof availableNetworks)[number];

// RPC
type RPCs = Record<
  AvailableNetworks,
  {
    http: string;
  }
>;
const rpcs: RPCs = {
  polygon: {
    http: process.env.NEXT_PUBLIC_POLYGON_URL!,
  },
  mumbai: {
    http: process.env.NEXT_PUBLIC_MUMBAI_URL!,
  },
};

// Addresses
type Addresses = Record<
  AvailableNetworks,
  {
    troopV0FactoryProxy: `0x${string}`;
    tbtFactoryProxy: `0x${string}`;
  }
>;
const addresses: Addresses = {
  polygon: {
    troopV0FactoryProxy: "0xfd3ae43f41ce8AE32382C2ad01c7C382993bba72",
    tbtFactoryProxy: "0x26881E8C452928A889654e4a8BaFBf205dD87812",
  },
  mumbai: {
    troopV0FactoryProxy: "0xfd3ae43f41ce8AE32382C2ad01c7C382993bba72",
    tbtFactoryProxy: "0x26881E8C452928A889654e4a8BaFBf205dD87812",
  },
};

// Block explorers
type BlockExplorers = Record<
  AvailableNetworks,
  {
    explorer: string;
  }
>;
const blockExplorers: BlockExplorers = {
  polygon: { explorer: "https://polygonscan.com" },
  mumbai: { explorer: "https://polygonscan.com" },
};

// RPC
type LensApiEndpoints = Record<
  AvailableNetworks,
  {
    http: string;
  }
>;
const lensApiEndpoints: LensApiEndpoints = {
  polygon: {
    http: "https://api-v2.lens.dev",
  },
  mumbai: {
    http: "https://api-v2-mumbai.lens.dev/",
  },
};

const config = {
  rpcs,
  addresses,
  blockExplorers,
  lensApiEndpoints,
} as const;

export default config;
