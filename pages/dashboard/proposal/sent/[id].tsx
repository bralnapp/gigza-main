import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import { formatUnit, covertToReadableDate } from "utils/helper";
import { useGetJobBids } from "utils/hooks";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";

const SentProposalDetails = () => {
	const router = useRouter();
	const { id: jobId } = router.query;
	const { proposalByAFreelancer, job } = useGetJobBids(jobId);
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-[41px]">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="w-28 border border-[#D9D9D9] bg-[#F5F5F5] text-[#5F6062] md:w-[137px]"
				/>
			</div>
			<div className="mx-auto mt-8 w-11/12 max-w-3xl bg-white py-5 px-4 md:py-10 md:px-8">
				<h1 className="mb-4 text-base font-bold leading-[19px] text-b1 md:text-[32px] md:leading-[38px]">
					{job?.title}
				</h1>
				<p className="mb-8 text-sm leading-[21px] text-b3">
					{job?.description}
				</p>
				{/* proposal  */}
				<h3 className="mb-4 text-base font-bold capitalize leading-[19px] text-b1 md:mb-8 md:text-xl md:leading-6">
					Your proposal
				</h3>
				<p className="text-sm leading-[17px] text-b3">
					{proposalByAFreelancer[0]?.description}
				</p>
				{/* project timeline  */}
				<h3 className="mt-8 mb-3 text-base font-bold capitalize leading-5 text-[#101828] md:text-xl md:leading-6">
					project Deadline{" "}
				</h3>
				<p className="text-base leading-[19px] text-b2 ">
					{covertToReadableDate(
						formatUnit(proposalByAFreelancer[0]?.timeline)! * 10 ** 18
					)}
				</p>

				{/* project status */}
				<h3 className="mt-8 mb-3 text-base font-bold capitalize leading-5 text-[#101828]">
					project status
				</h3>
				<p
					className={`text-sm capitalize italic leading-[19px] ${
						job?.state === 0 ? "text-[#0E9802]" : "text-[#F02323]"
					}`}
				>
					{job?.state === 0 ? "open" : "closed"}
				</p>
			</div>
		</DashboardLayout>
	);
};


export default SentProposalDetails;
