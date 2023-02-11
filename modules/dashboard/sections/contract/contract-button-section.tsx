import { Button } from "@/modules/common/components/input/button";
import React, { useState } from "react";
import { useStoreContext } from "context/StoreContext";
import { BigNumberData } from "@custom-types/typing";
import { DeclineOfferModal, SubmitJobModal } from "../../components/modal";
import { toast } from "react-hot-toast";
import { formatUnit } from "utils/helper";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

type ContractButtonSectionProps = {
	jobId: number | undefined;
	freelancerBid: {
		0: BigNumberData;
		1: string;
		2: BigNumberData;
		3: `0x${string}`;
		4: number;
	}[];
	thisJob: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: [
			{
				0: BigNumberData;
				1: string;
				2: BigNumberData;
				3: `0x${string}`;
				4: number;
			}[]
		];
		10: number;
	};
};

const ContractButtonSection = ({
	jobId,
	freelancerBid,
	thisJob
}: ContractButtonSectionProps) => {
	const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
	const [isSubmitJobModalOpen, setIsSubmitJobModalOpen] = useState(false);
	const [isAcceptingContract, setIsAcceptingContract] = useState(false);

	const { address } = useAccount();
	const { initGigzaContract } = useStoreContext();
	const router = useRouter();

	const handleAcceptContract = async () => {
		const acceptContractNotification = toast.loading("Accepting contract");
		setIsAcceptingContract(true);
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.acceptContract(
				formatUnit(jobId)! * 10 ** 18
			);
			const receipt = await txHash.wait();
			if (receipt) {
				setIsAcceptingContract(false);
				toast.success("Contract has been accepted", {
					id: acceptContractNotification
				});
				router.push("/dashboard/contract");
			}
		} catch (error) {
			setIsAcceptingContract(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: acceptContractNotification
			});
		}
	};

	console.log("freelancerBid", freelancerBid);

	return freelancerBid?.length ||
		thisJob?.[4]?.toLowerCase() === address?.toLowerCase() ? (
		<>
			<DeclineOfferModal
				{...{ isDeclineModalOpen, setIsDeclineModalOpen, jobId }}
			/>
			<SubmitJobModal
				{...{ isSubmitJobModalOpen, setIsSubmitJobModalOpen, jobId }}
			/>

			{freelancerBid[0]?.[4] === 1 ? (
				<div className="mt-8 mb-6 flex items-center gap-x-5">
					<Button
						title="decline offer"
						onClick={() => setIsDeclineModalOpen(true)}
						className="w-[180px] border border-[#F02323] bg-white font-normal text-[#F02323]"
					/>
					<Button
						onClick={handleAcceptContract}
						title="accept contract"
						disabled={isAcceptingContract}
						className="w-[180px] font-normal"
					/>
				</div>
			) : thisJob?.[4].toLowerCase() === address?.toLowerCase() ? (
				<div className="mt-8 flex h-12 w-full cursor-default items-center justify-center rounded bg-[#F2F3F7] text-[#344054] md:w-[283px]">
					{thisJob?.[10] === 1
						? "Contract Sent"
						: thisJob?.[10] === 2
						? "Ongoing Project"
						: ""}
				</div>
			) : freelancerBid?.[0]?.[4] === 2 || freelancerBid?.[0]?.[4] === 3 ? (
				<div className="mt-8 flex flex-col items-center gap-y-6 md:flex-row md:gap-y-0 md:gap-x-4">
					<Button
						title="mark project as complete"
						className="w-full md:w-[283px]"
						onClick={() => setIsSubmitJobModalOpen(true)}
					/>
					{freelancerBid?.[0]?.[4] === 3 ? (
						<Button
							title="Open dispute"
							className="w-full border border-b4 bg-white text-b2 md:w-[158px]"
						/>
					) : null}
				</div>
			) : null}
		</>
	) : (
		<p className="text-red-500">
			You are not eligible to take any actions here
		</p>
	);
};

export default ContractButtonSection;
