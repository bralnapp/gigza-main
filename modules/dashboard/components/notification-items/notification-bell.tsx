import NotificationItem from ".";
import { useState } from "react";
import NotificationPopOver from "./notification-popOver";

// images
import bellIcon from "@/public/asset/icons/bell-icon.svg";
import { useAccount, useContractEvent } from "wagmi";
import {
	DaiContractAbi,
	DiaContractAddress,
	formatUnit,
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import numeral from "numeral";

// const useGetPersistedStore = () => {
// 	if (
// 		typeof window !== "undefined" &&
// 		localStorage.getItem("persist-gigza-notification") !== "undefined"
// 	) {
// 		// @ts-ignore
// 		JSON.parse(localStorage.getItem("persist-gigza-notification")) || [];
// 	}
// };

const NotificationBell = () => {
	const [showNotification, setShowNotification] = useState(false);
	const [notifications, setNotifications] = useState<string[]>([]);
	const { address } = useAccount();
	const handleClick = () => setShowNotification(!showNotification);

	// ------------------------------ Transfer event (mint DAI tokens) ----------------------------

	useContractEvent({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		eventName: "Transfer",
		listener(from, to, value) {
			if (to === address)
				setNotifications([
					...notifications,
					`${numeral(formatUnit(value)).format(
						","
					)} DAI was funded in your account`
				]);
		}
	});

	// ------------------------------ ProfileCreated event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ProfileCreated",
		listener(user, name, skill) {
			if (user === address) {
				setNotifications([...notifications, "Your profile was created"]);
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
				setNotifications([...notifications, `You posted a job`]);
				console.log(
					`jobId: ${jobId} - title: ${title} - amount: ${amount} description: ${description} timeline: ${timeline} client: ${client}`
				);
			} else {
				// @ts-ignore
				setNotifications([
					...notifications,
					// @ts-ignore
					`${formatWalletAddress(client)} posted a job`
				]);
			}
		}
	});

	// ------------------------------ ProposalSubmitted  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ProposalSubmitted",
		listener(jobId, description, client) {
			if (address === client) {
				setNotifications([...notifications, "You submitted a job proposal"]);
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
		listener(jobId, freelancer) {
			if (address === freelancer) {
				setNotifications([...notifications, "A contract has been sent to you"]);
			}
			// console.log(`jobId: ${jobId} - freelancer: ${freelancer}`);
		}
	});

	// ------------------------------ ContractAccepted  event ----------------------------

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ContractAccepted",
		listener(jobId, freelancer) {
			if (address === freelancer) {
				setNotifications([...notifications, "You have accepted a contract"]);
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
				setNotifications([...notifications, "You have submitted a job"]);
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
				setNotifications([
					...notifications,
					`You received ${numeral(formatUnit(amount)).format(",")} DAI for a job`
				]);
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
				setNotifications([
					...notifications,
					`You recieved a ${rating} for a job`
				]);
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
				isActive={!!notifications?.length}
				{...{ handleClick }}
			/>
			{showNotification ? (
				<NotificationPopOver
					{...{ notifications, setShowNotification, showNotification }}
				/>
			) : null}
		</>
	);
};

export default NotificationBell;
