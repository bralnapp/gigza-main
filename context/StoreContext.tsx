import { sequence } from "0xsequence";
import { IstoreContextInterface } from "@custom-types/store-context";
import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";
import { storeReducer, Types } from "reducer";
import { useGetPersistedStore, useSetPersistStore } from "utils/helper";
import { Web3Storage } from "web3.storage";

const StoreContext = createContext<IstoreContextInterface | null>(null);

type StoreContextProviderProps = {
	children: React.ReactNode;
};

const network = "mumbai";
const wallet = sequence.initWallet(network, {
	networkRpcUrl: "https://matic-mumbai.chainstacklabs.com"
});

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
	const [state, dispatch] = useReducer(
		storeReducer,
		useGetPersistedStore as any
	);
	useSetPersistStore(state);

	const getWalletAddress = async () => {
		const wallet = sequence.getWallet();
		const address = await wallet.getAddress();
		return address;
	};

	useEffect(() => {
		const wallet = sequence.getWallet();

		if (wallet.isConnected()) {
			getWalletAddress().then((data) => {
				dispatch({
					type: Types.ConnectAccount,
					payload: {
						account: data
					}
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet]);

	const WEB3_STORAGE_API_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY;
	const web3StorageClient = new Web3Storage({ token: WEB3_STORAGE_API_TOKEN! });

	const connectAccount = async () => {
		try {
			const wallet = sequence.getWallet();
			const connectDetails = await wallet.connect({
				app: "Gigza",
				authorize: true,
				settings: {
					signInOptions: ["google"],
					bannerUrl:
						"https://gigza-main.vercel.app/_next/static/media/logo.7bafd5dd.svg",
					theme: "indigoDark"
				}
			});
			dispatch({
				type: Types.ConnectAccount,
				payload: {
					account: connectDetails?.session?.accountAddress!
				}
			});
			console.log(connectDetails);
		} catch (error) {
			toast.error("Opps!!!... Something went wrong");
			console.log(error);
		}
	};

	const disconnectAccount = () => {
		const wallet = sequence.getWallet();
		wallet.disconnect();
		dispatch({
			type: Types.DisconnectAccount
		});
	};
	return (
		<StoreContext.Provider
			value={{
				state,
				dispatch,
				connectAccount,
				disconnectAccount,
				web3StorageClient,
				...state
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};

const useStoreContext = () =>
	useContext(StoreContext) as IstoreContextInterface;

export { StoreContextProvider, useStoreContext };
