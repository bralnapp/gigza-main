import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	RecentJobList,
	RecentJobListDetails,
	SearchJob
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
	7: `0x${string}`;
	9: BigNumberData;
	10: number;
	11: string;
	12: string;
}[];

type FindWorkProps = {
	totalJobs: ItotalJobs;
};

const FindWork = ({ totalJobs }: FindWorkProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const handleSelect = (index: number) => {
		setActiveIndex(index);
	};

	// change all the elements in skills array to lowercase
	const arr = totalJobs?.map((item) => [
		// @ts-ignore
		...item,
		item?.[5].map((item) => item?.toLowerCase())
	]);
	const filterJobs = arr?.filter(
		(item) =>
			item?.[1]?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
			item?.[2]?.toLowerCase()?.includes(searchTerm.toLowerCase()) || 
			item?.[13]?.includes(searchTerm.toLowerCase())
	).reverse();

	return (
		<DashboardLayout>
			<div className="">
				<SearchJob {...{ setSearchTerm }} />

				<div className="dashboard-layout-container grid-cols-2 gap-x-[46px] pt-6 pb-[45px] md:pt-8 lg:grid">
					{/* job list */}
					{/* @ts-ignore */}
					<RecentJobList jobList={filterJobs} {...{ activeIndex, handleSelect }}
					/>
					{/* job details for desktop screen */}
					{/* @ts-ignore */}
					<RecentJobListDetails jobDetails={filterJobs?.[activeIndex]} />
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
