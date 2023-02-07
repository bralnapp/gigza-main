import { JobBidForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { Button } from "@/modules/common/components/input/button";
import { useRouter } from "next/router";
import { BigNumberData } from "@custom-types/typing";
import {
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { NextPageContext } from "next";
import { readContract } from "@wagmi/core";

type JobBidProps = {
	jobBidDetails: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: BigNumberData;
		6: `0x${string}`;
		7: BigNumberData;
	};
};

const JobBid = ({ jobBidDetails }: JobBidProps) => {
	const router = useRouter();
	return (
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
						{jobBidDetails?.[1]}
					</h3>
					<p className="mt-2 whitespace-pre-wrap text-sm leading-[21px] text-b3">
						{jobBidDetails?.[2]}
					</p>
				</div>
				<JobBidForm
					client={jobBidDetails?.[4]}
					jobId={formatUnit(jobBidDetails?.[0])! * 10 ** 18}
				/>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	const { id: jobId } = context.query;

	try {
		const jobBidDetails = await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		});

		return {
			props: {
				jobBidDetails: JSON.parse(JSON.stringify(jobBidDetails))
			}
		};
	} catch (error) {
		if (error) {
			return {
				redirect: {
					destination: "/dashboard/find-work",
					permanent: false
				}
			};
		}
	}
};

export default JobBid;
