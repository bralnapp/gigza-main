import { useAccount } from "wagmi";
import MessageAvatar from "./message-avatar";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

type MessageProps = {
	user: `0x${string}`;
	message: {
		message: string;
		timestamp: number;
		profileUrl: string;
	};
	id: string;
};

const Message = ({ user, message, id }: MessageProps) => {
	const { address } = useAccount();
	const router = useRouter();

	const messageRef = doc(
		db,
		"chats",
		`${router.query.id}`,
		"messages",
		`${id}`
	);

	const markRead = async () => {
		await updateDoc(messageRef, {
			read: true
		});
	};

	useEffect(() => {
		markRead();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex items-center gap-x-2">
			<div className={`${address !== user ? "order-1" : null}`}>
				<MessageAvatar avatar={message?.profileUrl} />
			</div>
			<div
				className={`flex-1 p-3 text-sm leading-[18px] ${
					address !== user
						? "rounded-tl-lg rounded-br-lg rounded-bl-lg bg-[#657795] text-white"
						: "rounded-tr-lg rounded-br-lg rounded-bl-lg bg-[#E5E5E5] text-b1"
				}`}
			>
				{message.message}
				{message.timestamp ? (
					<p className="mt-1 flex justify-end text-xs">
						{typeof message.timestamp !== "number"
							? "loading..."
							: moment(message?.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
					</p>
				) : (
					<p className="mt-1 flex justify-end text-xs">...</p>
				)}
			</div>
		</div>
	);
};

export default Message;
