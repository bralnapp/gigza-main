import NotificationItem from ".";
import { useEffect, useState } from "react";
import NotificationPopOver from "./notification-popOver";

// images
import bellIcon from "@/public/asset/icons/bell-icon.svg";
import { useAccount, useContractEvent } from "wagmi";
import { DaiContractAbi, DiaContractAddress, formatUnit } from "utils/helper";
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
			console.log(`${formatUnit(value)} was funded in your account`);
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
