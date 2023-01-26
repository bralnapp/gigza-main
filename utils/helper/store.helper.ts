import { IinitialState } from "@custom-types/store-context";
import { useEffect } from "react";
import GigzaContractAbi from "../constants/Gigza.json"
import DaiContractAbi from "../constants/Dia.json"

const initialState = {
	account: null,
	isWalletConnected: false
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

const GigzaContractAddress = "0xBE4230c239D96bE66B1e1E4d387adc9B73cb77A3";
const DiaContractAddress = "0xA4d4dBd2Da4fBd7DAafD8DD66ba102025d38AE7F";

const bidState = [
	"sent",
	"awarded",
	"accepted",
	"executed",
	"fulfilled",
	"cancelled"
];
const jobState = [
	"POSTED",
	"OFFERED",
	"ACCEPTED",
	"EXECUTED",
	"FUFILLED",
	"CANCELLED",
	"INDISPUTE",
	"RESOLVED"
];

export {
	initialState,
	useSetPersistStore,
	useGetPersistedStore,
	GigzaContractAddress,
	DiaContractAddress,
	GigzaContractAbi,
	DaiContractAbi,
	bidState,
	jobState
};
