import { EditProfileForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";

const EditProfile = () => {
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container">
				<h1 className="my-6 font-bold text-xl leading-6 capitalize text-[#192839]">
					edit your information
				</h1>
				<EditProfileForm />
			</div>
		</DashboardLayout>
	);
};

export default EditProfile;
