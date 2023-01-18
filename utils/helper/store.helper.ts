import { IinitialState } from "@custom-types/store-context";
import { useEffect } from "react";

const initialState = {
	account: null,
	isWalletConnected: false,
	// isButtonDisabled: false
};

const useSetPersistStore = (state: IinitialState) => {
	useEffect(() => {
		localStorage.setItem("persist-gigza", JSON.stringify(state));
		//eslint-disable-next-line
	}, [state]);
};

const useGetPersistedStore = () => {
	if (
		typeof window !== "undefined" &&
		localStorage.getItem("persist-gigza") !== "undefined"
	) {
		JSON.parse(localStorage.getItem("persist-gigza")!) || initialState;
	}
};

export { initialState, useSetPersistStore, useGetPersistedStore };
