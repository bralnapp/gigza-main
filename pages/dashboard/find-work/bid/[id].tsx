import { JobBidForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { Button } from "@/modules/common/components/input/button";
import { useRouter } from "next/router";
import { useStoreContext } from "context/StoreContext";
import { useEffect, useState } from "react";
import { initGigzaContract } from "utils/helper/contract.helper";
import { toast } from "react-hot-toast";
import { JobDetailsProps } from "@custom-types/typing";
import { convertToNumber } from "utils/helper";

const JobBid = () => {
	const { state } = useStoreContext();
	const [jobDetails, setJobDetails] = useState<JobDetailsProps[number]>();
	const router = useRouter();
	const { id: jobId } = router.query;

	const getJobDetails = async () => {
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const _jobDetails = await contract.jobs(jobId);
			setJobDetails(_jobDetails);
		} catch (error) {
			toast.error("Something went wrong, could not get job details");
			console.log({ error });
		}
	};

	useEffect(() => {
		if (jobId) {
			getJobDetails();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account, jobId]);

	return (
		<DashboardLayout>
			<div className="hidden lg:block dashboard-layout-container pt-[42px]">
				<Button
					title="cancel"
					className="w-[115px] bg-[#EBEEF2] text-[#5F6062]"
					onClick={() => router.back()}
				/>
			</div>
			<div className="w-11/12 mx-auto max-w-3xl pt-8">
				<h3 className="text-xl min-[540px]:text-2xl md:text-[32px] leading-6 md:leading-[38px] font-bold text-b1 capitalize text-center">
					bid for job
				</h3>
				<div className="my-8">
					<h3 className="text-base min-[540px]:text-lg leading-5 text-[#344054] font-bold">
						{jobDetails?.title}
					</h3>
					<p className="mt-2 text-sm text-b3 leading-[21px]">
						{jobDetails?.description}
					</p>
				</div>
				<JobBidForm jobId={convertToNumber(jobId as string)} />
			</div>
		</DashboardLayout>
	);
};

export default JobBid;
