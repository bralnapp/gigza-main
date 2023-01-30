import { PostJobForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import { useRouter } from "next/router";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";

const PostJob = () => {
	const router = useRouter();
	return (
		<DashboardLayout>
			<div className="bg-white min-h-screen">
				<div className="pt-8 w-11/12 mx-auto max-w-3xl pb-14">
					<h1 className="text-b1 font-bold text-xl md:text-[32px] leading-6 md:leading-[38px] text-center">
						Post your job
					</h1>
					<PostJobForm />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default PostJob;
