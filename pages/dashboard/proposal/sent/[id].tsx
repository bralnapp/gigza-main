import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import { useGetJobBids } from "utils/hooks";
import { formatUnit,covertToReadableDate } from "utils/helper";

// images
import chevronLeft from '@/public/asset/icons/chevron-left.svg'

const SentProposalDetails = () => {
	const router = useRouter();
	const { id: jobId } = router.query;
	const { proposal, job } = useGetJobBids(jobId);
	return (
<DashboardLayout>
	<div className="dashboard-layout-container pt-[41px]">
		<Button onClick={()=>router.back()} icon={chevronLeft} title="Go Back" className="bg-[#F5F5F5] border border-[#D9D9D9] w-[137px] text-[#5F6062]"/>
	</div>
	<div className="w-11/12 mt-8 mx-auto max-w-3xl bg-white py-5 md:py-10 px-4 md:px-8">
		<h1 className="mb-4 text-base md:text-[32px] leading-[19px] md:leading-[38px] text-b1 font-bold">{job?.title}</h1>
		<p className="text-b3 text-sm leading-[21px] mb-8">{job?.description}</p>
{/* proposal */}
		<h3 className="capitalize text-base md:text-xl leading-[19px] md:leading-6 text-b1 mb-4 md:mb-8 font-bold">Your proposal</h3>
		<p className="text-sm leading-[17px] text-b3">{proposal[0]?.description}</p>
{/* project timeline */}
		<h3 className="text-base md:text-xl leading-5 md:leading-6 font-bold text-[#101828] capitalize mt-8 mb-3">project Deadline </h3>
		<p className="text-b2 text-base leading-[19px] ">{covertToReadableDate(formatUnit(proposal[0]?.timeline)! * 10 ** 18)}</p>

		{/* project status */}
		<h3 className="mt-8 text-[#101828] text-base leading-5 capitalize font-bold mb-3">project status</h3>
		<p className={`capitalize italic text-sm leading-[19px] ${
											job?.state === 0
												? "text-[#0E9802]"
												: "text-[#F02323]"
										}`}
									>
										{job?.state === 0 ? "open" : "closed"}
									</p>
</div>

</DashboardLayout>
	);
};

export default SentProposalDetails;
