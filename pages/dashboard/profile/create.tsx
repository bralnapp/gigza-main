import { CreateProfileForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";

const CreateProfile = () => {
	return (
		<DashboardLayout>
			<div className="mx-auto  w-11/12 max-w-[925px]">
				<h1 className="py-6 text-xl font-bold capitalize leading-6 text-[#192839] md:mb-8 md:pt-[55px] md:text-2xl md:leading-[29px]">
					Create Profile
				</h1>
				<CreateProfileForm />
			</div>
		</DashboardLayout>
	);
};

export default CreateProfile;
