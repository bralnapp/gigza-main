import { UserProfileType } from "@custom-types/typing";
import { collection, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { db } from "../../../../firebase";

type ChatListProps = {
	filteredChatList:
		| {
				id: string;
				profileUrl: string;
				name: string;
		  }[]
		| undefined;
};

const ChatList = ({ filteredChatList }: ChatListProps) => {
	const router = useRouter();
	const handleEnterChat = (id: string) =>
		router.push(`/dashboard/message/${id}`);

	// const unsub = onSnapshot(doc(db, "chats","messages"), (doc) => {
	// 	const messages = []
	// 	// doc.forEach((doc)=> {
	// 	// 	messages.push(doc.data().message)
	// 	// })
	// 	// console.log("Current data: ", messages);
	// 	console.log("Current data: ", doc.data());
	// });
	return (
		<div className="h-full">
			<div className="mt-4  space-y-[13px]">
				{filteredChatList?.map((item, index) => (
					<div
						key={index}
						// onClick={handleToggleTranslate}
						className="flex items-center border-b border-[#F0F0F0] py-3"
					>
						<div
							onClick={() => handleEnterChat(item.id)}
							className="flex flex-1 cursor-pointer items-center gap-x-2"
						>
							<Image
								src={item?.profileUrl}
								alt=""
								className="h-10 w-10 rounded-full object-cover"
								width={40}
								height={40}
							/>
							<div className="space-y-2 text-[#1F1F1F]">
								<p className=" text-base capitalize leading-[22px]">
									{item?.name}
								</p>
								{/* <p className="text-xs leading-4">{item.chat}</p> */}
							</div>
						</div>
						{/* <div className="space-y-[14px]">
							<p className="text-[10px] leading-3 text-[#8C8C8C]">
								{item?.time}
							</p>
							<div className="flex items-center justify-between">
								{item?.onlineStatus ? (
									<div className="h-2 w-2 rounded-full bg-[#90C37F]" />
								) : null}
								{item?.unreadMessages ? (
									<span className="ml-auto flex h-[14px] w-[14px] items-center justify-center rounded-[32px] bg-primary text-[10px] leading-[14px] text-white">
										{item?.unreadMessages}
									</span>
								) : null}
							</div>
						</div> */}
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatList;
