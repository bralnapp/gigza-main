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
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import numeral from "numeral";

// type Props = {
// 	isActive?: boolean;
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
		}
	});

	useContractEvent({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		eventName: "ProfileCreated",
		listener(user, name, skill) {
			if (user === address){
				setNotifications([...notifications, "Your profile was created"]);
				console.log(`${user} - ${name} - ${skill}`)
			}
		}
	});

	return (
		<>
			<NotificationItem
				type="notification"
				icon={bellIcon}
				isActive={!!notifications.length}
				{...{ handleClick }}
			/>
			{showNotification ? (
				<NotificationPopOver {...{ notifications, setShowNotification }} />
			) : null}
		</>
	);
};

export default NotificationBell;
