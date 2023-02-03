import { useEffect, useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
// import { initGigzaContract } from "utils/helper/contract.helper";
import {
	RecentJobList,
	RecentJobListDetails
} from "@/modules/dashboard/sections/find-work";
// import { useGetJobs } from "utils/hooks";

const FindWork = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	// const { totalJobs } = useGetJobs();

	const handleSelect = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<DashboardLayout>
			<div className="dashboard-layout-container">
				<div className="lg:grid grid-cols-2 gap-x-[46px] pt-6 md:pt-8 pb-[45px]">
					{/* job list */}
					{/* <RecentJobList
						jobList={totalJobs}
						{...{ activeIndex, handleSelect }}
					/> */}
					{/* job details for desktop screen */}
					{/* <RecentJobListDetails jobDetails={totalJobs[activeIndex]} /> */}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default FindWork;
