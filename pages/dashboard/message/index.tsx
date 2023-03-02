import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	Chat,
	ChatHeader,
	ChatSideBar
} from "@/modules/dashboard/sections/message";
import { UserProfileType } from "@custom-types/typing";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc
} from "firebase/firestore";
import { useEffect } from "react";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useAccount, useContractRead } from "wagmi";
import { db } from "../../../firebase";

const Message = () => {
	const { address } = useAccount();

	const { data: userDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [address]
		});

	// add a user address to firebase
	useEffect(() => {
		const addUserAddress = async () => {
			if (userDetails) {
				await setDoc(
					doc(db, "users", `${userDetails?.userAddress}`),
					{
						address: userDetails?.userAddress,
						name: userDetails?.name,
						lastSeen: serverTimestamp(),
						profileUrl: userDetails?.profileUrl
					},
					{ merge: true }
				);
			}
		};
		addUserAddress();
	}, [userDetails]);

	return (
		<DashboardLayout>
			<div className="h-[calc(100vh_-_80px)] overflow-hidden bg-white ">
				<div className="flex h-full max-w-7xl lg:mx-auto lg:w-11/12 lg:pt-[41px]">
					<div className="mx-auto h-full w-11/12 pt-[34px] lg:mx-0 lg:w-fit lg:pt-0">
						<ChatSideBar />
					</div>
					<div className="hidden lg:block w-full">
						<div className="rounded-r-lg border-[#F0F0F0] py-4 px-6 lg:border lg:border-l-0 h-full"></div>
						{/* <Chat /> */}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Message;
