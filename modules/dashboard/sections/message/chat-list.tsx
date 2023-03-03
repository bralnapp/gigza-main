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
};

const ChatList = ({ filteredChatList }: ChatListProps) => {
	return (
		<div className="h-full">
			{filteredChatList?.length ? (
				<div className="mt-4  space-y-[13px]">
					{filteredChatList?.map((item, index) => (
						<ChatListItem key={`chat-list-item-${index}`} {...{ item }} />
					))}
				</div>
			) : (
				<div className="grid h-full place-items-center">
					<div>
						<PulseLoader color="#36d7b7" loading={true} />
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatList;
