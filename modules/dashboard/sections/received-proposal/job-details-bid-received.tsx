import React from "react";
import { BigNumberData, UserProfileType } from "@custom-types/typing";
import Image from "next/image";
import {
	covertToReadableDate,
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useContractRead } from "wagmi";
import { Button } from "@/modules/common/components/input/button";
import numeral from "numeral";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";
import chatIconBlack from "@/public/asset/icons/chat-icon-black.svg";

type Bids = {
	0: BigNumberData;
	1: string;
	2: BigNumberData;
	3: `0x${string}`;
	4: number;
}[];

type JobDetailsBidReceivedProps = {
	job: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: Bids;
		9: BigNumberData;
		10: number;
	};
	freelancerAddress: `0x${string}`;
};

const JobDetailsBidReceived = ({
	job,
	freelancerAddress
}: JobDetailsBidReceivedProps) => {
	const { data: freelancerDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [freelancerAddress]
		});
	return (
		<div className="h-fit space-y-6 bg-white py-5 px-4">
			{/* date posted */}
			<div className="">
				<h3 className="mb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
					Date posted
				</h3>
				<p className="text-sm capitalize leading-[21px] text-[#101828]">
					{covertToReadableDate(formatUnit(job?.[6])! * 10 ** 18)}
				</p>
			</div>
			{/* budget */}
			<div className="">
				<h3 className="mb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
					Budget
				</h3>
				<p className="text-sm capitalize leading-[21px] text-[#101828]">
					${numeral(formatUnit(job?.[3])).format(",")}
				</p>
			</div>
			{/* about freelancer */}
			<div>
				<h3 className="mb-2 text-sm leading-[21px] text-[#667085]">
					About the freelancer
				</h3>
				<div className="mb-4 flex items-center space-x-2">
					<Image
						src={freelancerDetails?.profileUrl || profileAvatar}
						alt=""
						height={40}
						width={40}
						className="h-10 w-10 rounded-full object-cover"
					/>
					<p className="text-sm font-bold capitalize leading-4">
						{freelancerDetails?.name}
					</p>
				</div>
			</div>
			<div className="space-y-4">
				<Button
					href={`/dashboard/profile/${freelancerDetails?.userAddress}`}
					title="View profile"
					className="h-[44px] w-full border border-primary bg-white text-primary"
				/>
				<Button
					title="Send a message"
					className="w-full border border-[#D9D9D9] bg-white text-b3"
					icon={chatIconBlack}
				/>
			</div>
		</div>
	);
};

export default JobDetailsBidReceived;
