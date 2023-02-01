import {
	EthereumClient,
	modalConnectors,
	walletConnectProvider
} from "@web3modal/ethereum";

import { configureChains, createClient } from "wagmi";

import { goerli } from "wagmi/chains";

const chains = [goerli];

// Wagmi client
const { provider } = configureChains(chains, [
	walletConnectProvider({
		projectId: process.env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID!
	})
]);
const wagmiClient = createClient({
	autoConnect: true,
	connectors: modalConnectors({ appName: "Gigza", chains }),
	provider
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export { wagmiClient, ethereumClient };
