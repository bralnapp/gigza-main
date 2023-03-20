import NotificationItem from ".";
import { useEffect, useState } from "react";
import NotificationPopOver from "./notification-popOver";

// images
import bellIcon from "@/public/asset/icons/bell-icon.svg";
import { useAccount, useContractEvent, useProvider } from "wagmi";
import {
	DaiContractAbi,
	DiaContractAddress,
	formatUnit,
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress,
	useGetPersistedNotificationStore,
	useSetPersistNotificationStore
} from "utils/helper";
import numeral from "numeral";
import { ethers } from "ethers";

type Notification = {
	userAddress: `0x${string}` | undefined;
	notification: string[];
}[];

const NotificationBell = () => {
	const { address } = useAccount();

	const [showNotification, setShowNotification] = useState(false);
	const [notifications, setNotifications] = useState<Notification>(
		useGetPersistedNotificationStore()
	);
	useSetPersistNotificationStore(notifications);

	const provider = useProvider();

	const contract = new ethers.Contract(
		GigzaContractAddress,
		GigzaContractAbi,
		provider
	);

	const getEventLogs = async () => {
		const filter = contract.filters.ProposalSubmitted();
		const logs = await (
			await contract.queryFilter(filter)
		).map((item) => item.args);
		const logsMessages = logs
			.map((item) => {
				if (item?.client === address) {
					const jobId = formatUnit(item?.jobId)! * 10 ** 18;
					return `${formatWalletAddress(
						item?.freelancer
					)} sent you a <a href=/dashboard/proposal/received/${jobId}><u>proposal</u>	</a>  `;
				}
				return;
			})
			.filter((item) => typeof item !== "undefined");

		const userNotification = [
			{
				userAddress: address,
				notification: logsMessages
			}
		];

		const updatedNotificationMap = new Map(
			userNotification.map((item) => [item.userAddress, item.notification])
		);
		const updatedNotificationSet = new Set(
			userNotification.map((item) => item.userAddress)
		);

		const updatedNotificationList = notifications.map((item) => {
			if (updatedNotificationSet.has(item.userAddress)) {
				return {
					userAddress: item.userAddress,
					notification: updatedNotificationMap.get(item.userAddress)
				};
			}
			return item;
		});
		// @ts-ignore
		setNotifications(updatedNotificationList);
	};

	const getContractSentLogs = async () => {
		const filter = contract.filters.ContractSent();
		const logs = await (
			await contract.queryFilter(filter)
		).map((item) => item.args);
		console.log('logs',logs)

		const logsMessages = logs
			.map((item) => {
				if (item?.freelancer === address) {
					const jobId = formatUnit(item?.jobId)! * 10 ** 18;
					return `${formatWalletAddress(item?.client)} sent you a contract`;
				} else if (item?.client === address) {
					const jobId = formatUnit(item?.jobId)! * 10 ** 18;
					return `You sent ${formatWalletAddress(item?.client)} a contract`;
				}
				return;
			})
			.filter((item) => typeof item !== "undefined");

		const userNotification = [
			{
				userAddress: address,
				notification: logsMessages
			}
		];

		const updatedNotificationMap = new Map(
			userNotification.map((item) => [item.userAddress, item.notification])
		);
		const updatedNotificationSet = new Set(
			userNotification.map((item) => item.userAddress)
		);

		const updatedNotificationList = notifications.map((item) => {
			if (updatedNotificationSet.has(item.userAddress)) {
				return {
					userAddress: item.userAddress,
					notification: updatedNotificationMap.get(item.userAddress)
				};
			}
			return item;
		});
		// @ts-ignore
		setNotifications(updatedNotificationList);
	};
	useEffect(() => {
		// get event logs for contract sent events

		getContractSentLogs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// get event logs for ProposalSubmitted events
		getEventLogs();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleNewUser = () => {
		if (notifications?.find((item) => item?.userAddress === address)) return;
		const newUser: Notification[number] = {
			userAddress: address!,
			notification: []
		};
		if (notifications?.length) {
			setNotifications([...notifications, newUser]);
		} else if (!notifications?.length && address) {
			setNotifications([newUser]);
		} else {
			setNotifications([]);
		}
	};

	useEffect(() => {
		handleNewUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	const handleClick = () => setShowNotification(!showNotification);

	const handleNotification = (userNotification: string) => {
		const updateUserNotification = notifications.map((item) => {
			if (item.userAddress === address) {
				return {
					...item,
					notification: [...item.notification, userNotification]
				};
			}
			return item;
		});
		setNotifications(updateUserNotification);
	};
	// ------------------------------ Transfer event (mint DAI tokens) ----------------------------

	useContractEvent({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		eventName: "Transfer",
		listener(from, to, value) {
			if (to === address) {
				handleNotification(
					`${numeral(formatUnit(value)).format(
						","
					)} DAI was funded in your account`
				);
			}
		}
	});

	// ------------------------------ Approval  event to spend DAI----------------------------
	useContractEvent({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		eventName: "Approval",
		listener(owner, spender, value) {
			if (owner === address) {
				handleNotification(
					`${numeral(formatUnit(value)).format(
						","
					)} DAI was approved to be spent by ${spender}`
				);
			}
		}
	});

	// ------------------------------ ProfileCreated event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ProfileCreated",
		listener(user, name, skill) {
			if (user === address) {
				handleNotification("Your profile was created");
				console.log(`${user} - ${name} - ${skill}`);
			}
		}
	});

	// ------------------------------ JobPosted event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "JobPosted",
		listener(jobId, title, amount, description, timeline, client) {
			if (client === address) {
				handleNotification("You posted a job");
				// setNotifications([...notifications, `You posted a job`]);
				console.log(
					`jobId: ${jobId} - title: ${title} - amount: ${amount} description: ${description} timeline: ${timeline} client: ${client}`
				);
			} else {
				// @ts-ignore
				handleNotification(`${formatWalletAddress(client)} posted a job`);
			}
		}
	});

	// ------------------------------ ProposalSubmitted  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ProposalSubmitted",
		listener(jobId, description, client, freelancer) {
			if (address === freelancer) {
				handleNotification(`You submitted a job proposal`);
				// setNotifications([...notifications, "You submitted a job proposal"]);
			}
			// console.log(
			// 	`jobId: ${jobId} - description: ${description}  client: ${client}`
			// );
		}
	});

	// ------------------------------ ContractSent  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ContractSent",
		listener(jobId, client, freelancer) {
			if (address === freelancer) {
				handleNotification(
					`You seent a contract to ${formatWalletAddress(
						freelancer as `0x${string}`
					)}`
				);
				// setNotifications([...notifications, "A contract has been sent to you"]);
			}
			console.log(
				`jobId: ${jobId} - freelancer: ${freelancer} - client : ${client}`
			);
		}
	});

	// ------------------------------ ContractAccepted  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ContractAccepted",
		listener(jobId, freelancer) {
			if (address === freelancer) {
				handleNotification("You have accepted a contract");
			}
			// console.log(`jobId: ${jobId} - freelancer: ${freelancer}`);
		}
	});

	// ------------------------------ OfferDeclined  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "OfferDeclined",
		listener(jobId, amount, title) {
			// if (address === freelancer) {
			// 	setNotifications([...notifications, "You have accepted a contract"]);
			// }
			console.log(`jobId: ${jobId} - amount: ${amount} - title: ${title}`);
		}
	});

	// ------------------------------ JobCompleted  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "JobCompleted",
		listener(jobId, message, freelancer) {
			if (address === freelancer) {
				// setNotifications([...notifications, "You have submitted a job"]);
			}
			// console.log(
			// 	`jobId: ${jobId} - message: ${message} - freelancer: ${freelancer}`
			// );
		}
	});

	// ------------------------------ PayementReleased  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "PayementReleased",
		listener(jobId, amount, freelancer) {
			if (address === freelancer) {
				// setNotifications([
				// 	...notifications,
				// 	`You received ${numeral(formatUnit(amount)).format(
				// 		","
				// 	)} DAI for a job`
				// ]);
			}
			console.log(
				`jobId: ${jobId} - amount: ${amount} - freelancer: ${freelancer}`
			);
		}
	});

	// ------------------------------ ReviewCreated  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ReviewCreated",
		listener(client, message, rating) {
			if (address === client) {
				// setNotifications([
				// 	...notifications,
				// 	`You recieved a ${rating} for a job`
				// ]);
			}
			console.log(
				`client: ${client} - message: ${message} - rating: ${rating}`
			);
		}
	});

	// useEffect(() => {
	// 	localStorage.setItem(
	// 		"persist-gigza-notification",
	// 		JSON.stringify(notifications)
	// 	);
	// 	// }
	// 	//eslint-disable-next-line
	// }, [notifications]);

	return (
		<>
			<NotificationItem
				type="notification"
				icon={bellIcon}
				isActive={
					!!notifications?.find((item) => item.userAddress === address)
						?.notification?.length
				}
				{...{ handleClick }}
			/>
			{showNotification ? (
				<NotificationPopOver
					{...{
						notifications,
						setShowNotification,
						showNotification,
						setNotifications
					}}
				/>
			) : null}
		</>
	);
};

export default NotificationBell;

// import NotificationItem from ".";
// import { useState } from "react";
// import NotificationPopOver from "./notification-popOver";

// // images
// import bellIcon from "@/public/asset/icons/bell-icon.svg";
// import { useAccount, useContractEvent } from "wagmi";
// import {
// 	DaiContractAbi,
// 	DiaContractAddress,
// 	formatUnit,
// 	formatWalletAddress,
// 	GigzaContractAbi,
// 	GigzaContractAddress
// } from "utils/helper";
// import numeral from "numeral";

// // const useGetPersistedStore = () => {
// // 	if (
// // 		typeof window !== "undefined" &&
// // 		localStorage.getItem("persist-gigza-notification") !== "undefined"
// // 	) {
// // 		// @ts-ignore
// // 		JSON.parse(localStorage.getItem("persist-gigza-notification")) || [];
// // 	}
// // };

// const NotificationBell = () => {
// 	const [showNotification, setShowNotification] = useState(false);
// 	const [notifications, setNotifications] = useState<string[]>([]);
// 	const { address } = useAccount();
// 	const handleClick = () => setShowNotification(!showNotification);

// 	// ------------------------------ Transfer event (mint DAI tokens) ----------------------------

// 	useContractEvent({
// 		address: DiaContractAddress,
// 		abi: DaiContractAbi,
// 		eventName: "Transfer",
// 		listener(from, to, value) {
// 			if (to === address)
// 				setNotifications([
// 					...notifications,
// 					`${numeral(formatUnit(value)).format(
// 						","
// 					)} DAI was funded in your account`
// 				]);
// 		}
// 	});

// 	// ------------------------------ ProfileCreated event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "ProfileCreated",
// 		listener(user, name, skill) {
// 			if (user === address) {
// 				setNotifications([...notifications, "Your profile was created"]);
// 				console.log(`${user} - ${name} - ${skill}`);
// 			}
// 		}
// 	});

// 	// ------------------------------ JobPosted event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "JobPosted",
// 		listener(jobId, title, amount, description, timeline, client) {
// 			if (client === address) {
// 				setNotifications([...notifications, `You posted a job`]);
// 				console.log(
// 					`jobId: ${jobId} - title: ${title} - amount: ${amount} description: ${description} timeline: ${timeline} client: ${client}`
// 				);
// 			} else {
// 				// @ts-ignore
// 				setNotifications([
// 					...notifications,
// 					// @ts-ignore
// 					`${formatWalletAddress(client)} posted a job`
// 				]);
// 			}
// 		}
// 	});

// 	// ------------------------------ ProposalSubmitted  event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "ProposalSubmitted",
// 		listener(jobId, description, client) {
// 			if (address === client) {
// 				setNotifications([...notifications, "You submitted a job proposal"]);
// 			}
// 			// console.log(
// 			// 	`jobId: ${jobId} - description: ${description}  client: ${client}`
// 			// );
// 		}
// 	});

// 	// ------------------------------ ContractSent  event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "ContractSent",
// 		listener(jobId, freelancer) {
// 			if (address === freelancer) {
// 				setNotifications([...notifications, "A contract has been sent to you"]);
// 			}
// 			// console.log(`jobId: ${jobId} - freelancer: ${freelancer}`);
// 		}
// 	});

// 	// ------------------------------ ContractAccepted  event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "ContractAccepted",
// 		listener(jobId, freelancer) {
// 			if (address === freelancer) {
// 				setNotifications([...notifications, "You have accepted a contract"]);
// 			}
// 			// console.log(`jobId: ${jobId} - freelancer: ${freelancer}`);
// 		}
// 	});

// 	// ------------------------------ OfferDeclined  event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "OfferDeclined",
// 		listener(jobId, amount, title) {
// 			// if (address === freelancer) {
// 			// 	setNotifications([...notifications, "You have accepted a contract"]);
// 			// }
// 			console.log(`jobId: ${jobId} - amount: ${amount} - title: ${title}`);
// 		}
// 	});

// 	// ------------------------------ JobCompleted  event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "JobCompleted",
// 		listener(jobId, message, freelancer) {
// 			if (address === freelancer) {
// 				setNotifications([...notifications, "You have submitted a job"]);
// 			}
// 			// console.log(
// 			// 	`jobId: ${jobId} - message: ${message} - freelancer: ${freelancer}`
// 			// );
// 		}
// 	});

// 	// ------------------------------ PayementReleased  event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "PayementReleased",
// 		listener(jobId, amount, freelancer) {
// 			if (address === freelancer) {
// 				setNotifications([
// 					...notifications,
// 					`You received ${numeral(formatUnit(amount)).format(",")} DAI for a job`
// 				]);
// 			}
// 			console.log(
// 				`jobId: ${jobId} - amount: ${amount} - freelancer: ${freelancer}`
// 			);
// 		}
// 	});

// 	// ------------------------------ ReviewCreated  event ----------------------------

// 	useContractEvent({
// 		address: GigzaContractAddress,
// 		abi: GigzaContractAbi,
// 		eventName: "ReviewCreated",
// 		listener(client, message, rating) {
// 			if (address === client) {
// 				setNotifications([
// 					...notifications,
// 					`You recieved a ${rating} for a job`
// 				]);
// 			}
// 			console.log(
// 				`client: ${client} - message: ${message} - rating: ${rating}`
// 			);
// 		}
// 	});

// 	// useEffect(() => {
// 	// 	localStorage.setItem(
// 	// 		"persist-gigza-notification",
// 	// 		JSON.stringify(notifications)
// 	// 	);
// 	// 	// }
// 	// 	//eslint-disable-next-line
// 	// }, [notifications]);

// 	return (
// 		<>
// 			<NotificationItem
// 				type="notification"
// 				icon={bellIcon}
// 				isActive={!!notifications?.length}
// 				{...{ handleClick }}
// 			/>
// 			{showNotification ? (
// 				<NotificationPopOver
// 					{...{ notifications, setShowNotification, showNotification }}
// 				/>
// 			) : null}
// 		</>
// 	);
// };

// export default NotificationBell;
