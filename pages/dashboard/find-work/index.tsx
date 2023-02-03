import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	RecentJobList,
	RecentJobListDetails
} from "@/modules/dashboard/sections/find-work";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";

const FindWork = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const { data: totalJobs } = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	});

	const handleSelect = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<DashboardLayout>
			<div className="dashboard-layout-container">
				<div className="grid-cols-2 gap-x-[46px] pt-6 pb-[45px] md:pt-8 lg:grid">
					{/* job list */}
					{/* @ts-ignore */}
					<RecentJobList jobList={totalJobs} {...{ activeIndex, handleSelect }} />
					{/* job details for desktop screen */}
					{/* @ts-ignore */}
					<RecentJobListDetails jobDetails={totalJobs?.[activeIndex]} />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default FindWork;
