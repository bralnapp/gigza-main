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
import { useEffect } from "react";
import { useRouter } from "next/router";

const Message = ({ chat, messages }: MessageProps) => {
	const router = useRouter();
	useEffect(() => {
		if (!chat?.users) {
			router.push("/dashboard/message");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chat, messages]);

	return (
		<DashboardLayout>
			<div className="h-[calc(100vh_-_80px)] overflow-hidden bg-white ">
				<div className="flex h-full max-w-7xl lg:mx-auto lg:w-11/12 lg:pt-[41px]">
					<div className="mx-auto hidden h-full w-11/12 pt-[34px] lg:mx-0 lg:block lg:w-fit lg:pt-0">
						<ChatSideBar />
					</div>
					{chat?.users ? (
						<div className="grid h-full w-full grid-rows-[auto_1fr]">
							<ChatHeader users={chat?.users} />
							<div className="overflow-hidden">
								<Chat {...{ chat, messages }} />
							</div>
						</div>
					) : null}
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
