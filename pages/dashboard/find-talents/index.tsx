import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	ApplyFilter,
	SearchTalents,
	TalentList
} from "@/modules/dashboard/sections/find-talent";
import { Button } from "@/modules/common/components/input/button";
import { FilterTalentListModal } from "@/modules/dashboard/components/modal";
import { useContractRead } from "wagmi";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";

// images
import filterIcon from "@/public/asset/icons/filter-icon.svg";

const FindTalents = () => {
	const [showFilterTalentModal, setShowFilterTalentModal] = useState(false);
	const { data: usersProfile } = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUserProfiles"
	});

	return (
		<DashboardLayout>
			<div className="lg:hidden">
				<FilterTalentListModal
					{...{ showFilterTalentModal, setShowFilterTalentModal }}
				/>
			</div>
			<div className="min-h-screen">
				<div className="bg-white pt-6 md:pt-[31px]">
					<div className="dashboard-layout-container">
						<SearchTalents />
					</div>
				</div>
				<div className="dashboard-layout-container lg:hidden">
					<Button
						icon={filterIcon}
						title="Filter"
						className="ml-auto h-[28px] w-[75px] rounded-[3px] border border-[#E8E8EF] bg-[#FCFDFD] text-xs leading-[14px] text-b2"
					/>
				</div>
				<div className="dashboard-layout-container mt-6 mb-[51px] grid-cols-[2fr_1fr] md:mb-[76px] lg:mt-12 lg:grid lg:gap-x-[45px]">
					{/* freelancers */}
					{/* @ts-ignore */}
					<TalentList {...{ usersProfile }} />
					<ApplyFilter />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default FindTalents;
