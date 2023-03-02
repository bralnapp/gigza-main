import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	Chat,
	ChatHeader,
	ChatSideBar
} from "@/modules/dashboard/sections/message";
import { db } from "../../../firebase";
import { NextPageContext } from "next";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query
} from "firebase/firestore";
import { MessageProps } from "@custom-types/typing";

const Message = ({ chat, messages }: MessageProps) => {
	return (
		<DashboardLayout>
			<div className="h-[calc(100vh_-_80px)] overflow-hidden bg-white ">
				<div className="flex h-full max-w-7xl lg:mx-auto lg:w-11/12 lg:pt-[41px]">
					<div className="mx-auto h-full w-11/12 pt-[34px] lg:mx-0 lg:w-fit lg:pt-0">
						<ChatSideBar />
					</div>
					<div className="h-full grid grid-rows-[auto_2fr] w-full border-[4px] border-yellow-600">
						<ChatHeader users={chat?.users} />
						<div className="">
							<Chat {...{ chat, messages }} />
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Message;

export const getServerSideProps = async (context: NextPageContext) => {
	const ref = collection(db, "chats", `${context.query.id}`, "messages");
	const messageRes = query(ref, orderBy("timestamp", "asc"));
	const messageSnap = await getDocs(messageRes);
	const messages = messageSnap.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data()
		}))
		.map((messages) => ({
			...messages,
			// @ts-ignore
			timeStamp: messages.timestamp.toDate().getTime()
		}));
	const chatRef = doc(db, "chats", `${context.query.id}`);
	const chatRes = await getDoc(chatRef);
	const chat = {
		id: chatRes.id,
		...chatRes.data()
	};

	return {
		props: {
			messages: JSON.stringify(messages),
			chat
		}
	};
};
