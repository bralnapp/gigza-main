import { IuserBids } from "@custom-types/typing";
import React from "react";
import { bidStatus } from "utils/helper";
import { useAccount } from "wagmi";

type ContractStatusProps = {
	bids: IuserBids[];
};

const ContractStatus = ({ bids }: ContractStatusProps) => {
	const { address } = useAccount();
	const freelancerBid = bids.filter(
		(item) => item?.freelancer.toLowerCase() === address?.toLowerCase()
	);
	return (
		<p
			className={`w-fit mt-2 md:mt-0 rounded-3xl py-[5px] px-[10px] text-[10px] capitalize leading-4 min-[540px]:py-2 min-[540px]:px-4 min-[540px]:text-[13px] ${
				freelancerBid?.[0]?.bidState === 5
					? "bg-[rgba(149,214,164,0.2)] text-[#0E9802]  "
					: "bg-[rgba(255,184,0,0.1)] text-[#FFB800]"
			}`}
		>
			{/* @ts-ignore */}
			{bidStatus[freelancerBid?.[0]?.bidState]}
		</p>
	);
};

export default ContractStatus;
