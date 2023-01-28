import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import { useGetJobBids } from "utils/hooks";

const ReceivedProposalDetails = () => {
	const router = useRouter();
	const { id: jobId } = router.query;
	const { proposalsReceived, job } = useGetJobBids(jobId);

	return (
		<DashboardLayout>
			<div className="w-11/12 mx-auto pt-[31px] md:pt-[41px] max-w-5xl">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="bg-[#F5F5F5] border border-[#D9D9D9] text-base leading-[18px] w-28 md:w-[137px] text-[#5F6062]"
				/>
				<div className="error">
					<div className="mt-[23px] bg-white rounded-lg py-5 px-4">
						{/* job details section */}
						<section className="">
							<h1 className="font-bold text-b1 text-base leading-[19px] mb-2">
								{job?.title}
							</h1>
							<p className="text-b1 text-sm leading-[21px]">
								{job?.description}
							</p>
						</section>

						{/* proposal section */}
						<section className="mt-8">
							<h1 className="text-b1 font-bold text-base leading-[19px] capitalize">
								Proposal
							</h1>
							{proposalsReceived?.map((item, index) => (
								<div
									key={`received-proposals-${index}`}
									className="border-b border-[#EAECF0] pb-5"
								>
									{/* freelancer */}

									{/* freelancer bid */}
									<p className="mt- text-b3 leading-[21px] text-sm line-3">
										{item.description}
									</p>
								</div>
							))}
						</section>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default ReceivedProposalDetails;
