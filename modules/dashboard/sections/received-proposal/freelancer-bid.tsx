import { Button } from "@/modules/common/components/input/button";
import {
	BigNumberData,
	JobDetailsProps,
	UserProfileType
} from "@custom-types/typing";
import Image from "next/image";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useStoreContext } from "context/StoreContext";
import { useRouter } from "next/router";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type Bids = {
	0: BigNumberData;
	1: string;
	2: BigNumberData;
	3: `0x${string}`;
	4: number;
}[];

type FreelancerBidSectionProps = {
	freelancerBid: {
		0: BigNumberData;
		1: string;
		2: BigNumberData;
		3: `0x${string}`;
		4: number;
	}[];
	jobId: string;
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
};

const FreelancerBidSection = ({
	freelancerBid,
	jobId,
	job
}: FreelancerBidSectionProps) => {
	const [isSendingContract, setIsSendingContract] = useState(false);
	const router = useRouter();
	const { initGigzaContract } = useStoreContext();

	const { data: freelancerDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [freelancerBid?.[3]]
		});
	const handleSendContract = async () => {
		setIsSendingContract(true);
		const notification = toast.loading("Sending contract");
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.sendContract(
				+jobId,
				freelancerDetails?.userAddress
			);
			const receipt = await txHash.wait();
			if (receipt) {
				// setIsSendingContract(false);
				toast.success("Your contract has been sent", {
					id: notification
				});
				router.push(`/dashboard/proposal/received/${jobId}`);
			}
			setIsSendingContract(false);
		} catch (error: any) {
			toast.error(error?.reason || "Something went wrong", {
				id: notification
			});
			setIsSendingContract(false);
		}
	};
	console.log(freelancerBid);

	return freelancerBid?.length ? (
		<div className="bg-white py-5 px-4">
			{/* freelancer profile */}
			<div className="flex items-center gap-x-2">
				<Image
					src={freelancerDetails?.profileUrl || profileAvatar}
					alt=""
					width={48}
					height={48}
					className="h-12 w-12 rounded-full object-cover"
				/>
				<div className="">
					<p className="mb-2 text-base font-bold capitalize leading-[19px] text-b1">
						{freelancerDetails?.name}
					</p>
					<p className="text-xs leading-[14px] text-b4">sent 1hr ago</p>
				</div>
			</div>

			{/* bid */}
			<div className="mt-3 mb-8 text-sm leading-[21px] text-b3">
				{/* @ts-ignore */}
				<p className="whitespace-pre-wrap">{freelancerBid?.[1]}</p>
				{job?.[10] > 0 ? null : (
					<Button
						onClick={handleSendContract}
						disabled={isSendingContract}
						title="send contract"
						className="mt-[43px] mb-[15px] w-full lg:w-[283px]"
					/>
				)}
			</div>
		</div>
	) : (
		<p>Nothing to see here</p>
	);
};

export default FreelancerBidSection;
