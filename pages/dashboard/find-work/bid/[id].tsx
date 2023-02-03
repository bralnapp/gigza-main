import { JobBidForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { Button } from "@/modules/common/components/input/button";
import { useRouter } from "next/router";
import { JobDetailsProps } from "@custom-types/typing";
import {
	convertToNumber,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useContractRead } from "wagmi";

const JobBid = () => {
	const router = useRouter();
	const { id: jobId } = router.query;

	const { data: jobDetails }: { data: JobDetailsProps[number] | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		});

	return jobDetails ? (
		<DashboardLayout>
			<div className="dashboard-layout-container hidden pt-[42px] lg:block">
				<Button
					title="cancel"
					className="w-[115px] bg-[#EBEEF2] text-[#5F6062]"
					onClick={() => router.back()}
				/>
			</div>
			<div className="mx-auto w-11/12 max-w-3xl pt-8">
				<h3 className="text-center text-xl font-bold capitalize leading-6 text-b1 min-[540px]:text-2xl md:text-[32px] md:leading-[38px]">
					bid for job
				</h3>
				<div className="my-8">
					<h3 className="text-base font-bold leading-5 text-[#344054] min-[540px]:text-lg">
						{jobDetails?.title}
					</h3>
					<p className="mt-2 text-sm leading-[21px] text-b3">
						{jobDetails?.description}
					</p>
				</div>
				<JobBidForm
					client={jobDetails?.client}
					jobId={convertToNumber(jobId as string)}
				/>
			</div>
		</DashboardLayout>
	) : null;
};

export default JobBid;
