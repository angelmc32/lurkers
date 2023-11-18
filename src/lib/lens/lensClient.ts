import { type PublicClient, getPublicClient } from "@wagmi/core";
import { type LensConfig, development } from "@lens-protocol/react-web";
import { providers } from "ethers";
import { Wallet } from "ethers";
import { type IBindings } from "@lens-protocol/react-web";
import { getEthersProvider } from "../ethersAdapter";

import { type HttpTransport } from "viem";
import { useWalletClient } from "wagmi";

const appChainId = parseInt(process.env.NEXT_PUBLIC_APP_CHAIN_ID ?? "80001");

const provider = getEthersProvider();
const wallet = new Wallet("<your-private-key>", provider);

const bindings: IBindings = {
  getProvider: () =>
    new Promise((resolve, reject) => {
      const publicClient = getPublicClient({ chainId: appChainId });

      const { chain, transport } = publicClient;
      const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
      };
      if (transport.type === "fallback")
        return new providers.FallbackProvider(
          (transport.transports as ReturnType<HttpTransport>[]).map(
            ({ value }) => new providers.JsonRpcProvider(value?.url, network)
          )
        );
      const transport_: string = transport.url as string;
      return new providers.JsonRpcProvider(transport_, network);
    }),
  getSigner: () =>
    new Promise((resolve, reject) => {
      const { data: walletClient } = useWalletClient({
        chainId: appChainId,
        onSuccess(walletClient) {
          if (!walletClient) {
            reject("No wallet client detected");
          } else {
            const { account, chain, transport } = walletClient;

            const network = {
              chainId: chain.id,
              name: chain.name,
              ensAddress: chain.contracts?.ensRegistry?.address,
            };
            const provider = new providers.Web3Provider(transport, network);
            const signer = provider.getSigner(account.address);
            return signer;
          }
        },
      });
    }),
};

// export const lensConfig: LensConfig = {
//   bindings: bindings(),
//   environment: development,
// };
