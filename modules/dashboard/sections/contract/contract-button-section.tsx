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
		11: string;
		12: string;
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
	const [isReleasingPayment, setIsReleasingPayment] = useState(false);

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
			setIsAcceptingContract(false);
		} catch (error) {
			setIsAcceptingContract(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: acceptContractNotification
			});
		}
	};

	const handleReleasePayment = async () => {
		const releasePaymentNotification = toast.loading("Releasing Payment");
		setIsReleasingPayment(true);
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.releasePayment(
				formatUnit(jobId)! * 10 ** 18
			);
			const receipt = await txHash.wait();
			if (receipt) {
				toast.success("Payment has been released successfully", {
					id: releasePaymentNotification
				});
				setIsReleasingPayment(false);
				router.reload();
			}
			setIsReleasingPayment(false);
		} catch (error) {
			setIsReleasingPayment(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: releasePaymentNotification
			});
		}
	};

	console.log("thisJob", thisJob);
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
				<div className="mt-8">
					{thisJob?.[10] === 1 ? (
						<p className="flex h-12 w-full cursor-default items-center justify-center rounded bg-[#F2F3F7] text-[#344054] md:w-[283px]">
							Contract Sent
						</p>
					) : thisJob?.[10] === 2 ? (
						<p className="flex h-12 w-full cursor-default items-center justify-center rounded bg-[#F2F3F7] text-[#344054] md:w-[283px]">
							Ongoing Project
						</p>
					) : thisJob?.[10] === 3 ? (
						<section>
							<h1 className="mb-4 text-xl font-bold capitalize leading-6 text-b1 min-[540px]:mb-6 min-[540px]:text-[24px] min-[540px]:leading-[29px]">
								submission
							</h1>
							<p className="whitespace-pre-wrap text-sm leading-[17px] text-b3 min-[540px]:mb-6 min-[540px]:leading-[21px]">
								{thisJob?.[11]}
							</p>
							<a href={thisJob?.[12]} className="my-6 inline-block">
								view job
							</a>
							<div className="flex flex-col items-center gap-y-6 gap-x-4 md:flex-row md:gap-y-0">
								<Button
									title="Release payment"
									className="w-full md:w-[182px]"
									onClick={handleReleasePayment}
									disabled={isReleasingPayment}
								/>
								<Button
									title="Open dispute"
									className="w-full border border-b4 bg-white text-b2 md:w-[158px]"
								/>
							</div>
						</section>
					) : thisJob?.[10] === 4 ? (
						<p className="">Payment has been made</p>
					) : null}
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
			) : thisJob?.[10] === 4 ? (
				<p className="mt-8">Payment has been made</p>
			) : null}
		</>
	) : (
		<p className="text-red-500">
			You are not eligible to take any actions here
		</p>
	);
};

export default ContractButtonSection;
