import { useState } from "react";
import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import { covertToReadableDate, formatUnit } from "utils/helper";
import { useGetJobBids, useWindowSize } from "utils/hooks";
import Image from "next/image";
import { UserProfile } from "@/modules/dashboard/sections/received-proposal";

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

const ReceivedProposalDetails = () => {
	const router = useRouter();

	const { id: jobId } = router.query;

	const { proposalsReceived, job } = useGetJobBids(jobId);

	const { width } = useWindowSize();

	const [showMoreDetails, setShowMoreDetails] = useState(false);

	const handleClick = (
		freelancerAddress: `0x${string}`,
		description: string
	) => {
		const data = {
			jobId,
			freelancerAddress,
			bid: description
		};
		router.push({
			pathname: `/dashboard/proposal/received/bid/${jobId}`,
			query: {
				data: JSON.stringify(data)
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
				<div className=" mt-[23px] grid-cols-[2fr_1fr] min-[540px]:mt-8 lg:grid lg:gap-x-16">
					<div className=" rounded-lg bg-white py-5 px-4 lg:py-6 lg:px-5">
						{/* job details section */}
						<section className="">
							<h1 className="mb-2 text-base font-bold leading-[19px] text-b1 min-[540px]:text-xl min-[540px]:leading-6">
								{job?.title}
							</h1>
							<p
								className={`text-sm leading-[21px] text-b1 ${
									width! < 1024 && !showMoreDetails ? "line-clamp-3" : ""
								} `}
							>
								{job?.description}
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
								{proposalsReceived?.map((item, index) => (
									<div
										key={`received-proposals-${index}`}
										className="cursor-pointer border-b border-[#EAECF0] pb-5"
										onClick={() =>
											handleClick(item?.freelancer, item?.description)
										}
									>
										{/* freelancer  */}
										<UserProfile freelancerAddress={item?.freelancer} />
										{/* freelancer bid  */}
										<p
											className={`mt-[13px] text-sm leading-[21px] text-b3 line-clamp-3`}
										>
											{item?.description}
										</p>

										{item?.bidState > 0 ? (
											<div className="mt-4 flex items-center text-base leading-[18px] text-primary">
												<Image src={doubleGood} alt="" />
												<p>
													{bidState[item?.bidState as keyof typeof bidState]}
												</p>
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
							{covertToReadableDate(formatUnit(job?.timestamp)! * 10 ** 18)}
						</p>
						<p className="mt-6 pb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
							budget
						</p>
						<p className="text-base leading-[21px] text-[#101828]">
							${formatUnit(job?.amount)}
						</p>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default ReceivedProposalDetails;
