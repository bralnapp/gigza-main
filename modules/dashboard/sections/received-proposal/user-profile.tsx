import React from "react";
import Image from "next/image";
import Stars from "../../components/stars";
import { useContractRead } from "wagmi";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";

// images
import avatar from "@/public/asset/avatar/profile-avatar.svg";
import { UserProfileType } from "@custom-types/typing";

type UserProfileProp = {
	freelancerAddress: `0x${string}`;
};

const UserProfile = ({ freelancerAddress }: UserProfileProp) => {
	const {
		data: userDetails
	}: {
		data: UserProfileType | undefined;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUser",
		args: [freelancerAddress]
	});
	return (
		<div className="flex items-center gap-x-2">
			<Image
				src={userDetails?.profileUrl || avatar}
				alt=""
				width={40}
				height={40}
				className="h-10 w-10 rounded-full object-cover"
			/>
			<div className="">
				<p className="text-sm font-bold capitalize leading-4 text-b1">
					{userDetails?.name}
				</p>
				<Stars reviews={4} />
			</div>
		</div>
	);
};

export default UserProfile;
