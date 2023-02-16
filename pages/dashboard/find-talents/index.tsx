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
import { UserProfileType } from "@custom-types/typing";

// images
import filterIcon from "@/public/asset/icons/filter-icon.svg";

const FindTalents = () => {
	const [showFilterTalentModal, setShowFilterTalentModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const initialFormData = {
		rating: "",
		specialties: ""
	};

	const [formData, setFormData] = useState(initialFormData);
	console.log("formData talent", formData);
	const {
		data: usersProfile
	}: {
		data: UserProfileType[] | undefined;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUserProfiles"
	});

	const filterUsers = usersProfile?.filter((item) =>
		item?.mainSkill
			?.toLowerCase()
			.includes(formData?.specialties?.toLowerCase())
	);

	const filteredUsers = filterUsers?.filter(
		(item) =>
			item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item?.userAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item?.skills?.includes(searchTerm.toLowerCase())
	);

	// console.log(usersProfile)

	return (
		<DashboardLayout>
			<div className="lg:hidden">
				<FilterTalentListModal
					{...{ showFilterTalentModal, setShowFilterTalentModal, setFormData }}
				/>
			</div>
			<div className="min-h-screen">
				<div className="bg-white pt-6 md:pt-[31px]">
					<div className="dashboard-layout-container">
						<SearchTalents {...{ setSearchTerm }} />
					</div>
				</div>
				<div className="dashboard-layout-container lg:hidden">
					<Button
						icon={filterIcon}
						title="Filter"
						onClick={() => setShowFilterTalentModal(true)}
						className="ml-auto h-[28px] w-[75px] rounded-[3px] border border-[#E8E8EF] bg-[#FCFDFD] text-xs leading-[14px] text-b2"
					/>
				</div>
				<div className="dashboard-layout-container mt-6 mb-[51px] grid-cols-[2fr_1fr] md:mb-[76px] lg:mt-12 lg:grid lg:gap-x-[45px]">
					{/* freelancers */}
					<TalentList {...{ filteredUsers }} />
					<ApplyFilter {...{ formData, setFormData }} />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default FindTalents;
