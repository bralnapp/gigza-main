import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	RecentJobList,
	RecentJobListDetails
} from "@/modules/dashboard/sections/find-work";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { BigNumberData, JobDetailsProps } from "@custom-types/typing";
import { readContract } from "@wagmi/core";

export type ItotalJobs = {
	0: BigNumberData;
	1: string;
	2: string;
	3: BigNumberData;
	4: `0x${string}`;
	5: string[];
	6: BigNumberData;
	9: BigNumberData;
}[];

type FindWorkProps = {
	totalJobs: ItotalJobs;
};

const FindWork = ({ totalJobs }: FindWorkProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleSelect = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<DashboardLayout>
			<div className="dashboard-layout-container">
				<div className="grid-cols-2 gap-x-[46px] pt-6 pb-[45px] md:pt-8 lg:grid">
					{/* job list */}
					<RecentJobList
						jobList={totalJobs}
						{...{ activeIndex, handleSelect }}
					/>
					{/* job details for desktop screen */}
					<RecentJobListDetails jobDetails={totalJobs?.[activeIndex]} />
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async () => {
	const totalJobs = (await readContract({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	})) as JobDetailsProps;

	return {
		props: {
			totalJobs: JSON.parse(JSON.stringify(totalJobs))
		}
	};
};

export default FindWork;
