import Image from "next/image";
import { useRouter } from "next/router";
import { db } from "../../../../firebase";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

type ChatListItemProps = {
	item:
		| {
				id: string;
				profileUrl: string;
				name: string;
                read: boolean;
		  }
		| undefined;
};

const ChatListItem = ({ item }: ChatListItemProps) => {
	const router = useRouter();
	const [newMessages, setNewMessages] = useState([]);
	const handleEnterChat = (id: string) => {
		setNewMessages([]);
		router.push(`/dashboard/message/${id}`);
	};

	const q = query(collection(db, "chats", `${item!.id}`, "messages"));

	useEffect(() => {
		const unsub = onSnapshot(q, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === "added" && router.query.id !== item!.id) {
					// @ts-ignore
					setNewMessages((prev) => [...prev, change.doc.data()]);
				}
			});
		});

		return () => {
			unsub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.id]);

    // @ts-ignore
	const filterMessageByRead = newMessages.filter((item) => item.read === false);

	return (
		<div
			onClick={() => handleEnterChat(item!.id)}
			className="flex items-center border-b border-[#F0F0F0] py-3"
		>
			<div className="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-2">
				<div className="h-10 w-10">
					<Image
						src={item?.profileUrl!}
						alt=""
						className="h-10 w-10 rounded-full object-cover"
						width={40}
						height={40}
					/>
				</div>
				<div className="space-y-1 text-[#1F1F1F]">
					<p className=" text-base capitalize leading-[22px]">{item?.name}</p>
					{filterMessageByRead.length ? (
						<p className="text-xs font-medium leading-4 line-clamp-1">
							new message:{" "}
							{filterMessageByRead.length
								? filterMessageByRead[filterMessageByRead.length - 1]["message"]
								: null}
						</p>
					) : null}
					{/* <p className="text-xs leading-4">{item.chat}</p> */}
				</div>
			</div>
			{filterMessageByRead.length ? (
				<span className="ml-auto flex h-[14px] w-[14px] items-center justify-center rounded-[32px] bg-primary text-[10px] leading-[14px] text-white">
					{filterMessageByRead?.length}
				</span>
			) : null}
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
	);
};

export default ChatListItem;
