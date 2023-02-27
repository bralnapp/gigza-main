import Image from "next/image";
import { useOnClickOutside } from "utils/hooks";
import { Dispatch, SetStateAction, useRef } from "react";

// images
import notificationBell from "@/public/asset/icons/notification-bell.svg";

type NotificationPopOverProps = {
	notifications: string[];
	setShowNotification: Dispatch<SetStateAction<boolean>>;
	showNotification: boolean;
};

const NotificationPopOver = ({
	notifications,
	showNotification,
	setShowNotification
}: NotificationPopOverProps) => {
	const selectContainerRef = useRef(null);

	const clickOutsideHandler = () => setShowNotification(false);
	useOnClickOutside(selectContainerRef, clickOutsideHandler);
	return (
		<div
			ref={selectContainerRef}
			className="absolute top-14 -left-10 h-[308px] w-[339px] rounded-lg border border-[#F0F0F0] bg-white px-6 py-4"
		>
			<div className="mb-5 flex items-center gap-x-2">
				<Image src={notificationBell} alt="" />
				<p className="text-base font-bold capitalize leading-[19px] text-[#1B1C1E]">
					notification
				</p>
			</div>
			<div className="space-y-5">
				{notifications?.map((item, index) => (
					<p
						key={`notification-message-${index}`}
						className="text-sm font-normal leading-[21px] text-b3"
					>
						{item}
					</p>
				))}
			</div>
		</div>
	);
};

export default NotificationPopOver;
