import { collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { chatData } from "utils/data";
import { useAccount } from "wagmi";
import { SearchInput } from "../../components/input";
import ChatList from "./chat-list";
import { db } from "../../../../firebase";
import { readContract } from "@wagmi/core";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { UserProfileType } from "@custom-types/typing";

const ChatSideBar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [chatList, setChatList] = useState();
	const { address } = useAccount();
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const getRecipientAddress = async (
		users: `0x${string}`[],
		userLoggedIn: `0x${string}`
	) => {
		const recipientAddress = users.filter(
			(userToFilter) => userToFilter !== userLoggedIn
		);
		const recipientUserProfile = await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [recipientAddress[0]]
		});
		// console.log("recipientUserProfile", recipientUserProfile);
		return recipientUserProfile;
	};

	const userChatRef = collection(db, "chats");
	const queryChat = query(
		userChatRef,
		where("users", "array-contains", `${address}`)
	);
	const [chatsSnapshot] = useCollection(queryChat);
	const _chatData = chatsSnapshot?.docs?.map((chat) => [
		...chat.data()?.users,
		chat.id
	]);

	const getChatList = async () => {
		const chatListData = [];
		for (const user of _chatData!) {
			const userData = (await getRecipientAddress(
				user,
				address!
			)) as UserProfileType;
			chatListData.push({
				name: userData.name,
				profileUrl: userData.profileUrl,
				address: userData.userAddress,
				id: user[2]
			});
		}
		return chatListData;
	};

	useEffect(() => {
		if (_chatData) {
			// @ts-ignore
			getChatList().then((data) => setChatList(data));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, chatsSnapshot]);

	// @ts-ignore
	const filteredChatList = chatList?.filter((item) =>
		item?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	return (
		<div className="h-full  border-[#F0F0F0] lg:w-[341px] lg:rounded-tl-lg lg:border lg:px-5 lg:pt-6">
			<div className="flex items-center gap-x-2">
				<h1 className="text-xl font-bold capitalize leading-[21px] text-[#101828]">
					Inbox
				</h1>
				<div className="flex items-center gap-x-1 rounded-2xl bg-[#E0E7FF] py-1 px-2 text-[13px] leading-4 text-primary">
					<p>2</p>
					<p>New</p>
				</div>
			</div>
			<div className="mt-[21px] mb-7 h-full">
				{/* search */}
				<SearchInput
					value={searchQuery}
					placeholder="Search for chat"
					{...{ handleTextChange, searchQuery }}
				/>
				<div className="chatList h-full overflow-y-auto">
					<ChatList {...{ filteredChatList }} />
				</div>
			</div>
		</div>
	);
};

export default ChatSideBar;
