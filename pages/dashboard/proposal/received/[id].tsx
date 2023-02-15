import { useState } from "react";
import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import {
	covertToReadableDate,
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useWindowSize } from "utils/hooks";
import Image from "next/image";
import { UserProfile } from "@/modules/dashboard/sections/received-proposal";
import { readContract } from "@wagmi/core";
import { BigNumberData, IuserBids } from "@custom-types/typing";
import { NextPageContext } from "next";
import { useAccount } from "wagmi";
import numeral from "numeral";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import arrowDown from "@/public/asset/navbar/arrow-down.svg";
import doubleGood from "@/public/asset/icons/double-good.svg";

const bidState = {
	1: "Already sent",
	2: "Contract awarded",
	3: "Job has been completed",
	4: "has been paid",
	5: "Contract has been cancelled"
};

type ReceivedProposalDetailsProps = {
	jobId: string;
	job: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: BigNumberData;
		6: `0x${string}`;
		7: BigNumberData;
	};
	jobBidsById: {
		0: BigNumberData;
		1: string;
		2: BigNumberData;
		3: `0x${string}`;
		4: number;
	}[];
};

const ReceivedProposalDetails = ({
	jobId,
	job,
	jobBidsById
}: ReceivedProposalDetailsProps) => {
	const router = useRouter();

	const { width } = useWindowSize();

	const [showMoreDetails, setShowMoreDetails] = useState(false);

	const { address } = useAccount();

	const handleClick = (
		freelancerAddress: `0x${string}`
		// description: string
	) => {
		router.push({
			pathname: `/dashboard/proposal/received/bid/${jobId}`,
			query: {
				jobId: JSON.stringify(jobId),
				freelancerAddress: JSON.stringify(freelancerAddress)
			}
		});
	};

	return (
		<DashboardLayout>
			<div className="mx-auto w-11/12 max-w-5xl pt-[31px] md:pt-[41px]">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="w-28 border border-[#D9D9D9] bg-[#F5F5F5] text-base leading-[18px] text-[#5F6062] md:w-[137px]"
				/>
				{job?.[4].toLowerCase() === address?.toLowerCase() ? (
					<div className=" mt-[23px] grid-cols-[2fr_1fr] min-[540px]:mt-8 lg:grid lg:gap-x-16">
						<div className=" rounded-lg bg-white py-5 px-4 lg:py-6 lg:px-5">
							{/* job details section */}
							<section className="">
								<h1 className="mb-2 text-base font-bold leading-[19px] text-b1 min-[540px]:text-xl min-[540px]:leading-6">
									{job?.[1]}
								</h1>
								<p
									className={`text-sm leading-[21px] text-b1 whitespace-pre-wrap  ${
										width! < 1024 && !showMoreDetails ? "line-clamp-3" : ""
									} `}
								>
									{job?.[2]}
								</p>

								<div
									className="mt-2 flex items-center gap-x-2 lg:hidden"
									onClick={() => setShowMoreDetails(!showMoreDetails)}
								>
									<p className="text-sm font-bold capitalize leading-[18px] text-b2">
										View {showMoreDetails ? "less" : "more"} details
									</p>
									<Image src={arrowDown} alt="" />
								</div>
							</section>

							{/* proposal section */}
							<section className="mt-8">
								<h1 className="text-base font-bold capitalize leading-[19px] text-b1">
									Proposal
								</h1>
								<div className="mt-4 space-y-6 ">
									{jobBidsById?.map((item, index) => (
										<div
											key={`received-proposals-${index}`}
											className="cursor-pointer border-b border-[#EAECF0] pb-5"
											onClick={() => handleClick(item?.[3])}
										>
											{/* freelancer  */}
											<UserProfile freelancerAddress={item?.[3]} />
											{/* freelancer bid  */}
											<p
												className={`mt-[13px] text-sm leading-[21px] text-b3 line-clamp-3`}
											>
												{item?.[1]}
											</p>

											{item?.[4] > 0 ? (
												<div className="mt-4 flex items-center text-base leading-[18px] text-primary">
													<Image src={doubleGood} alt="" />
													<p>{bidState[item?.[4] as keyof typeof bidState]}</p>
												</div>
											) : null}
										</div>
									))}
								</div>
							</section>
						</div>
						{/* more info about the job */}
						<div className="hidden h-fit rounded-lg bg-white py-4 px-6 lg:block ">
							<p className="pb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
								date posted
							</p>
							<p className="text-base capitalize leading-[21px] text-[#101828]">
								{covertToReadableDate(formatUnit(job?.[7])! * 10 ** 18)}
							</p>
							<p className="mt-6 pb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
								budget
							</p>
							<p className="text-base leading-[21px] text-[#101828]">
								${numeral(formatUnit(job?.[3])).format(",")}
							</p>
						</div>
					</div>
				) : (
					<div className="">Opps!!!... You can not see this proposals</div>
				)}
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	const { id: jobId } = context.query;
	try {
		const jobById = await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		});

		const jobBidsById = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getJobBids",
			args: [jobId]
		})) as IuserBids[];

		return {
			props: {
				jobId: JSON.parse(JSON.stringify(jobId)),
				job: JSON.parse(JSON.stringify(jobById)),
				jobBidsById: JSON.parse(JSON.stringify(jobBidsById))
			}
		};
	} catch (error) {
		if (error) {
			return {
				redirect: {
					destination: "/dashboard/proposal/received",
					permanent: false
				}
			};
		}
	}
};

export default ReceivedProposalDetails;
