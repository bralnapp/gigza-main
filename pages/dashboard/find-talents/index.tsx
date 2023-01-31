import DashboardLayout from "@/modules/dashboard/components/layout";
import { useGetAllFreelancers } from "utils/hooks";
import {
	ApplyFilter,
	SearchTalents,
	TalentList
} from "@/modules/dashboard/sections/find-talent";


const FindTalents = () => {
	const { usersProfile } = useGetAllFreelancers();
	console.log(usersProfile);
	return (
		<DashboardLayout>
			<div className="min-h-screen">
				<div className="bg-white pt-6 md:pt-[31px]">
					<div className="dashboard-layout-container">
						<SearchTalents />
					</div>
				</div>
				<div className="dashboard-layout-container mt-6 mb-[51px] grid-cols-[2fr_1fr] md:mb-[76px] lg:mt-12 lg:grid lg:gap-x-[45px]">
					{/* freelancers */}
					<TalentList {...{ usersProfile }} />

					<ApplyFilter />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default FindTalents;
