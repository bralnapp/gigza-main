import { PulseLoader } from "react-spinners";
import ChatListItem from "./chat-list-item";

type ChatListProps = {
	filteredChatList:
		| {
				id: string;
				profileUrl: string;
				name: string;
				read: boolean;
		  }[]
		| undefined;
	chatList: any
};

const ChatList = ({ filteredChatList, chatList }: ChatListProps) => {
	return (
		<div className="h-full">
			{filteredChatList?.length && chatList.length ? (
				<div className="mt-4  space-y-[13px]">
					{filteredChatList?.map((item, index) => (
						<ChatListItem key={`chat-list-item-${index}`} {...{ item }} />
					))}
				</div>
			) : filteredChatList?.length || chatList?.length ? (
				<div className="grid h-full place-items-center">
					<div>
						<PulseLoader color="#36d7b7" loading={true} />
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ChatList;
