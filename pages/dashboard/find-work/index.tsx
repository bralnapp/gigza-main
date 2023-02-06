import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	RecentJobList,
	RecentJobListDetails
} from "@/modules/dashboard/sections/find-work";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";
import { JobDetailsProps } from "@custom-types/typing";

const FindWork = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const {
		data: totalJobs
	}: {
		data: JobDetailsProps | undefined;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	});

	const handleSelect = (index: number) => {
		setActiveIndex(index);
	};

	console.log(totalJobs)

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

export default FindWork;
