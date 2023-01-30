import { PostJobForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";

const PostJob = () => {
	return (
		<DashboardLayout>
			<div className="bg-white">
				<div className="pt-8 w-11/12 mx-auto max-w-3xl">
					<h1 className="text-b1 font-bold text-xl leading-6 text-center">
						Post your job
					</h1>
					<PostJobForm />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default PostJob;
