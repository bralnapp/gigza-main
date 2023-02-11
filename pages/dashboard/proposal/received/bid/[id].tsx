import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import { BigNumberData, JobDetailsProps } from "@custom-types/typing";
import { FreelancerBidSection, JobDetailsBidReceived } from "@/modules/dashboard/sections/received-proposal";
import { NextPageContext } from "next";
import { readContract } from "@wagmi/core";
import {
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useAccount } from "wagmi";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";

type Bids = {
	0: BigNumberData;
	1: string;
	2: BigNumberData;
	3: `0x${string}`;
	4: number;
}[];

type FreelancerBidProps = {
	totalJobs: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: Bids;
		9: BigNumberData;
		10: number;
	}[];
	jobId: string;
	freelancerAddress: `0x${string}`;
};

const FreelancerBid = ({
	totalJobs,
	jobId,
	freelancerAddress
}: FreelancerBidProps) => {
	const router = useRouter();

	const { address } = useAccount();

	const jobPostedByUserbyId = totalJobs.filter(
		(item) =>
			item?.[4].toLowerCase() === address?.toLowerCase() &&
			formatUnit(item?.[0])! * 10 ** 18 === +jobId
	);


	const bids = jobPostedByUserbyId.map((item) => item?.[8]);
	const freelancerBid = bids
		?.map((item) =>
			item?.filter(
				(item) => item?.[3]?.toLowerCase() === freelancerAddress?.toLowerCase()
			)
		)
		?.flat(2);

	return (
		<DashboardLayout>
			<div className="mx-auto  w-11/12 max-w-[1126px] pt-6 pb-[69px] lg:pt-[41px] lg:pb-[88px]">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="w-28 border border-[#D9D9D9] bg-[#F5F5F5] text-[#5F6062] md:w-[137px]"
				/>

				<div className="mt-6 grid-cols-[2fr_1fr] lg:mt-8 lg:grid lg:gap-x-16">
					{/* freelancer bid */}
					<FreelancerBidSection
						{...{ freelancerBid, jobId }}
						job={jobPostedByUserbyId[0]}
					/>

					{/* job details */}
					<JobDetailsBidReceived {...{ freelancerAddress }} job={jobPostedByUserbyId[0]} />
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	const { jobId, freelancerAddress } = context.query;
	const totalJobs = (await readContract({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	})) as JobDetailsProps;

	return {
		props: {
			totalJobs: JSON.parse(JSON.stringify(totalJobs)),
			jobId: JSON.parse(jobId! as string),
			freelancerAddress: JSON.parse(freelancerAddress! as string)
		}
	};
};

export default FreelancerBid;
