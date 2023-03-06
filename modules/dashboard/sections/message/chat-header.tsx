import Image from "next/image";
import { readContract } from "@wagmi/core";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { UserProfileType } from "@custom-types/typing";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import TimeAgo from "timeago-react";

// image
import avatar from "@/public/asset/avatar/profile-avatar.svg";

type ChatHeaderProps = {
	users?: `0x${string}`[];
};

const ChatHeader = ({ users }: ChatHeaderProps) => {
	const [recipientDetails, setRecipientDetails] = useState<UserProfileType>();
	const { address } = useAccount();

	const getRecipient = (users: `0x${string}`[], userLoggedIn: `0x${string}`) =>
		users?.filter((userToFilter) => userToFilter !== userLoggedIn);

	const [reciepientSnapshot] = useCollection(
		query(
			collection(db, "users"),
			where("address", "==", getRecipient(users!, address!)?.[0])
		)
	);

	const recipient = reciepientSnapshot?.docs?.[0]?.data();

	// console.log("getRecipient", getRecipient(users!, address!)[0]);

	const getRecipientAddress = async (
		users: `0x${string}`[],
		userLoggedIn: `0x${string}`
	) => {
		const recipientAddress = users.filter(
			(userToFilter) => userToFilter !== userLoggedIn
		);
		const recipientUserProfile = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [recipientAddress[0]]
		})) as UserProfileType;
		// console.log("recipientUserProfile", recipientUserProfile);
		return recipientUserProfile;
	};

	useEffect(() => {
		if (users) {
			getRecipientAddress(users, address!).then((res) =>
				setRecipientDetails(res)
			);
		}
	}, [users, address]);

	return (
		<div className="rounded-r-lg border-[#F0F0F0] py-4 px-6 lg:border lg:border-l-0">
			{recipientDetails ? (
				<div className="flex items-center gap-x-2">
					<Image
						src={recipientDetails?.profileUrl!}
						width={40}
						height={40}
						alt=""
						className="h-10 w-10 rounded-full object-cover"
					/>
					<div>
						<h4 className="text-base font-medium capitalize leading-[22px] text-[#1F1F1F]">
							{recipientDetails?.name}
						</h4>
						{reciepientSnapshot ? (
							<p className="text-sm text-b2">
								Last seen:{" "}
								{recipient?.lastSeen?.toDate() ? (
									<TimeAgo datetime={recipient?.lastSeen?.toDate()} />
								) : (
									"unavailable"
								)}
							</p>
						) : (
							<p className="text-sm text-b2">Loading last active...</p>
						)}
					</div>
				</div>
			) : (
				<p className="text-sm text-b2">Loading</p>
			)}
		</div>
	);
};

export default ChatHeader;
