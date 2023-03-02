import { useAccount } from "wagmi";
import avatar from "@/public/asset/avatar/profile-avatar.svg";
import Image from "next/image";
import MessageAvatar from "./message-avatar";

type MessageProps = {
	user: `0x${string}`;
	message: {
		message: string;
	};
};

const Message = ({ user, message }: MessageProps) => {
	const { address } = useAccount();

	return (
		<div className="flex items-center gap-x-2">
			<div className={`${address !== user ? "order-1" : null}`}>
				<MessageAvatar avatar={address === user ? address : user} />
			</div>
			<div
				className={`flex-1 p-3 text-sm leading-[18px] ${
					address !== user
						? "rounded-tl-lg rounded-br-lg rounded-bl-lg bg-[#657795] text-white"
						: "rounded-tr-lg rounded-br-lg rounded-bl-lg bg-[#E5E5E5] text-b1"
				}`}
			>
				{message.message}
			</div>
		</div>
	);
};

export default Message;
