import { EditProfileForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";

const EditProfile = () => {
	return (
		<DashboardLayout>
			<div className="w-11/12  mx-auto max-w-[925px]">
				<h1 className="py-6 md:pt-[55px] md:mb-8 font-bold text-xl md:text-2xl leading-6 md:leading-[29px] capitalize text-[#192839]">
					edit your information
				</h1>
				<EditProfileForm />
			</div>
		</DashboardLayout>
	);
};

export default EditProfile;
