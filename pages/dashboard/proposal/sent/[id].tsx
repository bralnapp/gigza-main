import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import { useGetJobBids } from "utils/hooks";

// images
import chevronLeft from '@/public/asset/icons/chevron-left.svg'

const SentProposalDetails = () => {
	const router = useRouter();
	const { id: jobId } = router.query;
	// const { jobBids } = useGetJobBids(jobId);
	return (
<DashboardLayout>

    <div className="dashboard-layout-container pt-[41px]">
        <Button onClick={()=>router.back()} icon={chevronLeft} title="Go Back" className="bg-[#F5F5F5] border border-[#D9D9D9] w-[137px] text-[#5F6062]"/>
    </div>
</DashboardLayout>
	);
};

export default SentProposalDetails;
