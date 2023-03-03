import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageProps, UserProfileType } from "@custom-types/typing";
import { useAccount, useContractRead } from "wagmi";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import {
	addDoc,
	collection,
	doc,
	orderBy,
	query,
	serverTimestamp,
	setDoc
} from "firebase/firestore";
import { db } from "../../../../firebase";
import Message from "./message";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";

// images
import sendIcon from "@/public/asset/icons/send-icon.svg";
import avatar from "@/public/asset/avatar/profile-avatar.svg";

const Chat = ({ chat, messages }: MessageProps) => {
	const { address } = useAccount();
	const endOfMessageRef = useRef<HTMLDivElement>(null);
	const { data: userDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [address]
		});
	const router = useRouter();
	const [messagesSnapshot] = useCollection(
		query(
			collection(db, "chats", `${router.query.id}`, "messages"),
			orderBy("timestamp", "asc")
		)
	);
	const initialFormData = {
		message: ""
	};
	// const { handleToggleTranslate } = useMessageStoreContext()
	const [formData, setFormData] = useState(initialFormData);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const scrollToBottom = () => {
		// 	const messageBoxElement = endOfMessageRef.current;
		// messageBoxElement!.scrollTop = messageBoxElement!.scrollHeight;
		endOfMessageRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormData(initialFormData);
		await setDoc(
			doc(db, "users", `${address}`),
			{
				lastSeen: serverTimestamp()
			},
			{
				merge: true
			}
		);

		await addDoc(collection(db, "chats", `${router.query.id}`, "messages"), {
			timestamp: serverTimestamp(),
			message: formData.message,
			user: address,
			profileUrl: userDetails?.profileUrl,
			read: false
		});

		setFormData(initialFormData);
		// scrollToBottom();
	};

	useEffect(() => {
		const messageBoxElement = endOfMessageRef.current;
		messageBoxElement!.scrollTop = messageBoxElement!.scrollHeight;
	}, [messages, messagesSnapshot]);
	return (
		<div className="grid h-full grid-rows-[1fr_auto] rounded-r-lg border px-6">
			{/* chat */}
			<div className="overflow-hidden pt-6">
				<div
					ref={endOfMessageRef}
					className="job-details h-[90%] overflow-y-auto "
				>
					<div className="space-y-8  ">
						{messagesSnapshot ? (
							<>
								{messagesSnapshot?.docs?.map((message) => (
									<Message
										key={message.id}
										user={message?.data()?.user}
										// @ts-ignore
										message={{
											...message?.data(),
											// @ts-ignore
											timestamp: message?.data()?.timestamp?.toDate()?.getTime()
										}}
										id={message.id}
									/>
								))}
							</>
						) : (
							<>
								{messages //@ts-ignore
									? JSON.parse(messages).map((message) => (
											<Message
												key={message.id}
												user={message?.user}
												message={message}
												id={message.id}
											/>
									  ))
									: null}
							</>
						)}
					</div>
					{/* <div ref={endOfMessageRef} className="error mb-1" /> */}
				</div>
			</div>

			{/* send message */}
			<div className="">
				<form
					onSubmit={handleSubmit}
					className="mt-5 flex h-auto items-center space-x-3 rounded-md border border-[#F0F0F0] py-2 px-3"
				>
					<input
						type="text"
						placeholder="Write a message"
						onChange={handleTextChange}
						className="flex-1 focus:outline-none"
						name="message"
						value={formData.message}
					/>
					<button className="">
						<Image src={sendIcon} alt="" className="h-8 w-[31px]" />
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
