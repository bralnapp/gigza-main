import { Button } from "@/modules/common/components/input/button";
import React, { useState } from "react";
import { useStoreContext } from "context/StoreContext";
import { BigNumberData, IuserBids } from "@custom-types/typing";
import { DeclineOfferModal } from "../../components/modal";
import { toast } from "react-hot-toast";
import { formatUnit } from "utils/helper";
import { useRouter } from "next/router";

type ContractButtonSectionProps = {
	jobId: number | undefined;
	freelancerBid: {
	0:BigNumberData;
	1:string;
	2:BigNumberData;
	3: `0x${string}`;
	4: number;
	}[];
};

const ContractButtonSection = ({
	jobId,
	freelancerBid
}: ContractButtonSectionProps) => {
	const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
	const [isAcceptingContract, setIsAcceptingContract] = useState(false);

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

	return freelancerBid?.length ? (
		<>
			<DeclineOfferModal
				{...{ isDeclineModalOpen, setIsDeclineModalOpen, jobId }}
			/>

			{freelancerBid[0]?.[4] === 1 ? (
				<div className="mt-4 mb-6 flex items-center gap-x-5">
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
			) : null}
		</>
	) : (
		<p className="text-red-500">
			You are not eligible to take any actions here
		</p>
	);
};

export default ContractButtonSection;
