import { sequence } from "0xsequence";
import { IstoreContextInterface } from "@custom-types/store-context";
import { createContext, useContext, useReducer } from "react";
import { storeReducer } from "reducer";
import { useGetPersistedStore, useSetPersistStore } from "utils/helper";

const StoreContext = createContext<IstoreContextInterface | null>(null);

type SoreContextProviderProps = {
	children: React.ReactNode;
};

// const wallet = sequence.getWallet();

const StoreContextProvider = ({ children }: SoreContextProviderProps) => {
	const [state, dispatch] = useReducer(
		storeReducer,
		useGetPersistedStore() as any
	);
	useSetPersistStore(state);

	const network = "mumbai";
	sequence.initWallet(network, {
		networkRpcUrl: "https://matic-mumbai.chainstacklabs.com"
	});

	const connectAccount = async () =>
		// authorize: boolean = false,
		// withSettings: boolean = false
		{
			// if (state.isWalletConnected) return;
			try {
				const wallet = sequence.getWallet();

				const connectDetails = await wallet.connect({
					app: "Gigza",
					settings: {
						signInOptions: ["google"],
						bannerUrl: "https://gigza-main.vercel.app/_next/static/media/logo.7bafd5dd.svg",
						theme: "indigoDark"
					}
				});
			} catch (error) {
				console.log(error);
			}
		};
	return (
		<StoreContext.Provider value={{ state, dispatch, connectAccount }}>
			{children}
		</StoreContext.Provider>
	);
};

const useStoreContext = () =>
	useContext(StoreContext) as IstoreContextInterface;

export { StoreContextProvider, useStoreContext };
