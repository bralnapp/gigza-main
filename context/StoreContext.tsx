import { IstoreContextInterface } from "@custom-types/store-context";
import { createContext, useContext } from "react";

import {
	DaiContractAbi,
	DiaContractAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useContract, useSigner } from "wagmi";

const StoreContext = createContext<IstoreContextInterface | null>(null);

type StoreContextProviderProps = {
	children: React.ReactNode;
};

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
	const { data: signer } = useSigner();
	const initGigzaContract = useContract({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		signerOrProvider: signer
	});
	const initDaiContract = useContract({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		signerOrProvider: signer
	});
	return (
		<StoreContext.Provider
			value={{
				initGigzaContract,
				initDaiContract
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};

const useStoreContext = () =>
	useContext(StoreContext) as IstoreContextInterface;

export { StoreContextProvider, useStoreContext };
