import Image from "next/image";
import { useOnClickOutside } from "utils/hooks";
import { Dispatch, SetStateAction, useRef } from "react";
import { useAccount } from "wagmi";

// images
import notificationBell from "@/public/asset/icons/notification-bell.svg";
import closeIcon from "@/public/asset/icons/close.svg";

type Notification = {
	userAddress: `0x${string}` | undefined;
	notification: string[];
}[];

type NotificationPopOverProps = {
	notifications: Notification;
	setShowNotification: Dispatch<SetStateAction<boolean>>;
	setNotifications: Dispatch<SetStateAction<Notification>>;
	showNotification: boolean;
};

const NotificationPopOver = ({
	notifications,
	showNotification,
	setShowNotification,
	setNotifications
}: NotificationPopOverProps) => {
	const selectContainerRef = useRef(null);
	const { address } = useAccount();
	const userNotification = notifications.filter(
		(item) => item.userAddress === address
	);

	const handleRemoveNotification = (index: number) => {
		console.log("remove notification");
		const filterUserNotification = userNotification?.[0]?.notification?.filter(
			(_, notificationIndex) => notificationIndex !== index
		);
		console.log("filterUserNotification", filterUserNotification);

		const updatedNotification = notifications.map((item) => {
			if (item.userAddress === address) {
				return {
					...item,
					notification: filterUserNotification
				};
			}
			return item;
		});
		setNotifications(updatedNotification);
	};

	const clickOutsideHandler = () => setShowNotification(false);
	useOnClickOutside(selectContainerRef, clickOutsideHandler);
	return (
		<div
			ref={selectContainerRef}
			className="absolute top-14 -left-10 h-[308px] w-[339px] rounded-lg border border-[#F0F0F0] bg-white px-3 py-4"
		>
			<div className="mb-5 flex items-center gap-x-2">
				<Image src={notificationBell} alt="" />
				<p className="text-base font-bold capitalize leading-[19px] text-[#1B1C1E]">
					notification
				</p>
			</div>
			<div className="overflow-y-auto h-4/5 space-y-5 pr-3">
				{userNotification?.[0]?.notification?.map((item, index) => (
					<div
						key={`notification-message-${index}`}
						className="flex items-center justify-between"
					>
						<p className="w-11/12 break-words text-sm font-normal leading-[21px] text-b3" dangerouslySetInnerHTML={{ __html: item }} />
							{/* {item}
						</p> */}
						<Image
							src={closeIcon}
							alt=""
							className="h-2 w-2 cursor-pointer"
							onClick={() => handleRemoveNotification(index)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotificationPopOver;
