import { JobBidForm } from "@/modules/dashboard/components/forms";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { Button } from "@/modules/common/components/input/button";
import { useRouter } from "next/router";

const JobBid = () => {
	const router = useRouter();
	return (
		<DashboardLayout>
			<div className="hidden lg:block dashboard-layout-container pt-[42px]">
				<Button
					title="cancel"
					className="w-[115px] bg-[#EBEEF2] text-[#5F6062]"
					onClick={() => router.back()}
				/>
			</div>
			<div className="w-11/12 mx-auto max-w-3xl pt-8">
				<h3 className="text-xl min-[540px]:text-2xl md:text-[32px] leading-6 md:leading-[38px] font-bold text-b1 capitalize text-center">
					bid for job
				</h3>
				<div className="my-8">
					<h3 className="text-base min-[540px]:text-lg leading-5 text-[#344054] font-bold">
						Graphics design
					</h3>
					<p className="mt-2 text-sm text-b3 leading-[21px]">
						Hello!
						<br />
						<br />
						Hello! My name is Ryan and I run the SagaTheYoungin YouTube
						channel: https://www.youtube.com/channel/UCs-erbeCJNu-NqSoQ80w9fQ
						<br />
						<br />
						This type of work is freelance, and I will have a slow but steady
						stream of color scenes over a long period of time.
						<br />
						<br />
						In order to apply for this job, please complete the test
						scene/application scene (download link at the bottom of this
						listing), and email it to bkartistscenetest@gmail.com. I will get
						back to you with a decision within a week!
						<br />
						<br />
						This project will include providing guidance on branding, new page
						layout/structure, conversion optimization, and more. For the scope
						of this initial phase, I would like to focus on five high-quality
						pages.
						<br />
						<br />
						Additional work related to creating packaging and print materials is
						available if you are interested.
						<br />
						<br />
						Thank you!
					</p>
				</div>
				<JobBidForm />
			</div>
		</DashboardLayout>
	);
};

export default JobBid;
