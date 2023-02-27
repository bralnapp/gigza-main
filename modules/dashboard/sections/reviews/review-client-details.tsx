import { UserProfileType } from "@custom-types/typing";
import Image from "next/image";
import React from "react";
import {
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useContractRead } from "wagmi";

// images
import avatar from "@/public/asset/avatar/profile-avatar.svg";

type ReviewClientDetailsProps = {
	address: `0x${string}`;
};

const ReviewClientDetails = ({ address }: ReviewClientDetailsProps) => {
	const {
		data: clientDetails,
		isError
	}: {
		data: UserProfileType | undefined;
		isError: boolean;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUser",
		args: [address]
	});
	return (
		<div className="flex items-center gap-x-2">
			<Image
				src={clientDetails?.profileUrl || avatar}
				alt=""
				className="h-10 w-10 rounded-full object-cover"
				height={40}
				width={40}
			/>
			<p className="text-sm capitalize leading-4 text-b1">
				{clientDetails?.name ||
					formatWalletAddress(clientDetails?.userAddress!)}
			</p>
		</div>
	);
};

export default ReviewClientDetails;