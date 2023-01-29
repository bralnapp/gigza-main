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

const ReceivedProposalDetails = () => {
	const router = useRouter();
	const { id: jobId } = router.query;

	const { proposalsReceived, job } = useGetJobBids(jobId);
	const { width } = useWindowSize();
	const [showMoreDetails, setShowMoreDetails] = useState(false);

	return (
		<DashboardLayout>
			<div className="w-11/12 mx-auto pt-[31px] md:pt-[41px] max-w-5xl">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="bg-[#F5F5F5] border border-[#D9D9D9] text-base leading-[18px] w-28 md:w-[137px] text-[#5F6062]"
				/>
				<div className=" mt-[23px] min-[540px]:mt-8 lg:grid grid-cols-[2fr_1fr] lg:gap-x-16">
					<div className=" bg-white rounded-lg py-5 px-4 lg:py-6 lg:px-5">
						{/* job details section */}
						<section className="">
							<h1 className="font-bold text-b1 text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 mb-2">
								{job?.title}
							</h1>
							<p
								className={`text-b1 text-sm leading-[21px] ${
									width! < 1024 && !showMoreDetails ? "line-clamp-3" : ""
								} `}
							>
								{job?.description}
							</p>

							<div
								className="flex lg:hidden items-center gap-x-2 mt-2"
								onClick={() => setShowMoreDetails(!showMoreDetails)}
							>
								<p className="text-b2 font-bold text-sm leading-[18px] capitalize">
									View {showMoreDetails ? "less" : "more"} details
								</p>
								<Image src={arrowDown} alt="" />
							</div>
						</section>

						{/* proposal section */}
						<section className="mt-8">
							<h1 className="text-b1 font-bold text-base leading-[19px] capitalize">
								Proposal
							</h1>
							<div className="mt-4 space-y-6">
								{proposalsReceived?.map((item, index) => (
									<div
										key={`received-proposals-${index}`}
										className="border-b border-[#EAECF0] pb-5"
									>
										{/* freelancer */}
										<UserProfile freelancerAddress={item?.freelancer} />

										{/* freelancer bid */}
										<p
											className={`mt-[13px] text-b3 leading-[21px] text-sm line-clamp-3`}
										>
											{item.description}
										</p>
									</div>
								))}
							</div>
						</section>
					</div>
					{/* more info about the job */}
					<div className="hidden lg:block rounded-lg bg-white py-4 px-6 h-fit ">
						<p className="capitalize text-sm leading-[21px] text-[#667085] pb-[5px]">
							date posted
						</p>
						<p className="capitalize text-base leading-[21px] text-[#101828]">
							{covertToReadableDate(formatUnit(job?.timestamp)! * 10 ** 18)}
						</p>
						<p className="mt-6 capitalize text-sm leading-[21px] text-[#667085] pb-[5px]">
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
