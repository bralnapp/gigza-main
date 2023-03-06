import GigzaContractAbi from "../constants/Gigza.json";
import DaiContractAbi from "../constants/Dia.json";
import { useEffect } from "react";
import { getAccount } from "@wagmi/core";

// new proxy
const GigzaContractAddress = "0x81D4523ECC0655929248efe220bcBB805030b79d";
// old
// const GigzaContractAddress = "0x6B042519F64CDf02b9D0c26885662434032bF178";
const DiaContractAddress = "0x40fb4204dDe488f34b9d9E0056d0FE8f6ab38585";

// const { address } = getAccount();

// const initialNotification: {
// 	userAddress: `0x${string}` | undefined;
// 	notification: string[];
// }[] = [
// 	{
// 		userAddress: address,
// 		notification: []
// 	}
// ];

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

// const useSetPersistNotificationStore = (store: string[]) => {
// 	useEffect(() => {
// 		localStorage.setItem("persist-gigza-notification", JSON.stringify(store));
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [store, address]);
// };

// const useGetPersistedStore = () =>
// 	JSON.parse(localStorage.getItem("persist-gigza-notification")!) ||
// 	initialNotification;

type Notification = {
	userAddress: `0x${string}` | undefined;
	notification: string[];
}[];

const useSetPersistNotificationStore = (
	store: Notification,
	address: `0x${string}`
) => {
	useEffect(() => {
		console.log("store", store);
		console.log('address',address)
		let userNotificationData = []
		// retrieve existing notification data from local storage
		let existingNotification: Notification =
			JSON.parse(localStorage.getItem("persist-gigza-notification")!) || store;

			const objIndexOfUserNotification = existingNotification.findIndex((obj) => obj.userAddress === address)
			const userNoticationIndexInStore = store.findIndex((obj) => obj.userAddress === address)

			if (objIndexOfUserNotification !== -1 && userNoticationIndexInStore !== -1) {
				existingNotification[objIndexOfUserNotification].notification.push(...store[userNoticationIndexInStore].notification)
			}
			

		// // check if the user address is in existingNotification
		// let userNotification = existingNotification.filter(
		// 	(item) => item.userAddress === address
		// );
		// console.log("userNotification", userNotification);

		// if (userNotification.length) {
		// 	const objIndex = store.findIndex(
		// 		(obj) => obj.userAddress === address
		// 	);
		// 	if (objIndex !== -1) {
		// 		const updatedUserNotification = store[objIndex]
		// 		userNotification[0].notification.push(...updatedUserNotification.notification)
				
		// 	}
		// 	return;
		// }
		// add new user to existing data
		let newUserNotification = address!
			? {
					userAddress: address,
					notification: []
			  }
			: [];
		let updatedNotification =
			// @ts-ignore
			existingNotification.length || newUserNotification.userAddress
				? [...existingNotification, newUserNotification,]
				: [];

		localStorage.setItem(
			"persist-gigza-notification",
			JSON.stringify(updatedNotification)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store, address]);
};

const useGetPersistedNotificationStore = () =>
	JSON.parse(localStorage.getItem("persist-gigza-notification")!) || [];

export {
	// initialState,
	// useSetPersistStore,
	// useGetPersistedStore,
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
