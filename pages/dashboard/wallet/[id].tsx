import { useState } from "react";
import { Button } from "@/modules/common/components/input/button";
import { NextPageContext } from "next";
import {
	covertToReadableDate,
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { readContract } from "@wagmi/core";
import { BigNumberData, JobDetailsProps } from "@custom-types/typing";
import GoBack from "@/modules/dashboard/components/go-back";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { OpenDisputeModal } from "@/modules/dashboard/components/modal";
import Status from "@/modules/dashboard/components/status";
import numeral from "numeral";
import { useAccount } from "wagmi";

// images
import chatIcon from "@/public/asset/icons/chat.svg";

type TransactionDetailsProps = {
	jobId: number | undefined;
	jobDetails: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: BigNumberData;
		6: `0x${string}`;
		7: BigNumberData;
		8: number;
		9: string;
		10: string;
	};
};

const TransactionDetails = ({ jobId, jobDetails }: TransactionDetailsProps) => {
	const [showDisputeModal, setShowDisputeModal] = useState(false);
	const { address } = useAccount();
	return (
		<DashboardLayout>
			<OpenDisputeModal {...{ showDisputeModal, setShowDisputeModal, jobId }} />
			<div className="layout-container max-w-[700px] pt-8">
				<section className="py-6 px-4">
					<GoBack />
					{jobDetails?.[4]?.toLowerCase() === address?.toLowerCase() ||
					jobDetails?.[6]?.toLowerCase() === address?.toLowerCase() ? (
						<>
							<h1 className="mt-[21px] text-base font-bold capitalize leading-[19px] text-[#192839] min-[540px]:text-xl min-[540px]:leading-6">
								transaction details
							</h1>

							<div className="mt-4 mb-6 space-y-4 capitalize min-[540px]:mt-9 min-[540px]:mb-10">
								<div className="flex justify-between">
									<div className="text-sm leading-[18px] text-b2">
										Amount($)
									</div>
									<div className="text-base leading-5 text-primary2">
										${numeral(formatUnit(jobDetails?.[3])).format(",")}
									</div>
								</div>
								<div className="flex justify-between">
									<div className="text-sm leading-[18px] text-b2">date</div>
									<div className="text-base leading-5 text-primary2">
										{covertToReadableDate(
											formatUnit(jobDetails?.[7])! * 10 ** 18
										)}
									</div>
								</div>
								<div className="flex justify-between">
									<div className="text-sm leading-[18px] text-b2">status</div>
									<div>
										<Status
											title={jobDetails?.[8] === 3 ? "pending" : "paid"}
											intent={jobDetails?.[8] === 3 ? "pending" : "complete"}
										/>
									</div>
								</div>
							</div>

							<Button
								href=""
								icon={chatIcon}
								title="Send a message"
								className="mb-4 w-full text-white min-[540px]:mb-8"
							/>
							{jobDetails?.[8] !== 4 ? (
								<Button
									onClick={() => setShowDisputeModal(true)}
									title="open dispute"
									className="w-full border border-[#E3E8EB] bg-white text-[#4A4A4A]"
								/>
							) : null}
						</>
					) : (
						<p>Opp!!!... nothing to find here </p>
					)}
				</section>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	const { id: jobId } = context.query;

	try {
		const jobDetails = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		})) as JobDetailsProps[number];

		return {
			props: {
				jobId: JSON.parse(JSON.stringify(jobId)),
				jobDetails: JSON.parse(JSON.stringify(jobDetails))
				// profile
			}
		};
	} catch (error) {
		if (error) {
			console.log(error);
			return {
				redirect: {
					destination: "/dashboard/wallet",
					permanent: false
				}
			};
		}
	}
};
export default TransactionDetails;
