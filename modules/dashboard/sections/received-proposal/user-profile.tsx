import React from "react";
import { useGetUserProfile } from "utils/hooks";
import Image from "next/image";
import Stars from "../../components/stars";

// images
import avatar from "@/public/asset/avatar/profile-avatar.svg";

type UserProfileProp = {
	freelancerAddress: string;
};

const UserProfile = ({ freelancerAddress }: UserProfileProp) => {
	const { name, profileUrl } = useGetUserProfile(freelancerAddress);
	return (
		<div className="flex items-center gap-x-2">
			<Image
				src={profileUrl || avatar}
				alt=""
				width={40}
				height={40}
				className="error rounded-full"
			/>
			<div className="">
				<p className="capitalize text-b1 font-bold text-sm leading-4">{name}</p>
				<Stars reviews={4} />
			</div>
		</div>
	);
};

export default UserProfile;
