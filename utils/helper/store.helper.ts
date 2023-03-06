import GigzaContractAbi from "../constants/Gigza.json";
import DaiContractAbi from "../constants/Dia.json";
import { useEffect } from "react";

// new proxy
const GigzaContractAddress = "0x81D4523ECC0655929248efe220bcBB805030b79d";
// old
// const GigzaContractAddress = "0x6B042519F64CDf02b9D0c26885662434032bF178";
const DiaContractAddress = "0x40fb4204dDe488f34b9d9E0056d0FE8f6ab38585";

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
const bidStatus = {
	1: "Pending",
	2: "Awarded",
	3: "Awaiting payment",
	4: "paid",
	// 5: "Paid",
	6: "Indispute"
};

type Notification = {
	userAddress: `0x${string}` | undefined;
	notification: string[];
}[];

const useSetPersistNotificationStore = (store: Notification) => {
	useEffect(() => {
		localStorage.setItem("persist-gigza-notification", JSON.stringify(store));
	}, [store]);
};

const useGetPersistedNotificationStore = () =>
	JSON.parse(localStorage.getItem("persist-gigza-notification")!) || [];

export {
	GigzaContractAddress,
	DiaContractAddress,
	GigzaContractAbi,
	DaiContractAbi,
	bidState,
	jobState,
	bidStatus,
	useSetPersistNotificationStore,
	useGetPersistedNotificationStore
};
