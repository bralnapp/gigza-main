import { useEffect, useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { initGigzaContract } from "utils/helper/contract.helper";
import {
	RecentJobList,
	RecentJobListDetails
} from "@/modules/dashboard/sections/find-work";
import { recentJobs } from "utils/data";

const FindWork = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [totalJobs, setTotalJobs] = useState([])

	const handleSelect = (index: number) => {
		setActiveIndex(index);
	};

	const getGetTotalJobs = async () => {
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const totalJobs = await contract.getTotalJobs();
			console.log("main", totalJobs);
			setTotalJobs(totalJobs);
		} catch (error) {
			// @ts-ignore
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		getGetTotalJobs();
		console.log("total jobs", totalJobs);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container">
				<div className="lg:grid grid-cols-2 gap-x-[46px] pt-6 md:pt-8 pb-[45px]">
					{/* job list */}
					<RecentJobList
						jobList={totalJobs}
						{...{ activeIndex, handleSelect }}
					/>
					{/* job details for desktop screen */}
					<RecentJobListDetails jobDetails={totalJobs[activeIndex]} />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default FindWork;
