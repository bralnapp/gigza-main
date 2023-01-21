import Image from "next/image";
import { recentJobs } from "utils/data";
import { Button } from "@/modules/common/components/input/button";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import avatar from "@/public/asset/avatar/profile-avatar.svg";

type RecentJobListDetailsProps = {
	jobDetails: typeof recentJobs[number];
};

const RecentJobListDetails = ({ jobDetails }: RecentJobListDetailsProps) => {
	return (
		<div className="hidden lg:block py-6 px-5 bg-white rounded-[10px]">
			<div className="pb-6 border-b border-[#E8E8E8]">
				<div className="flex items-center justify-between text-[24px] leading-[29px] text-b1 font-bold">
					<h3>{jobDetails?.jobTitle}</h3>
					<h4>${jobDetails?.budget}</h4>
					{/* <p className="mt-2 mb-4 text-b1 text- leading-[21px]">{jobDetails?.jobDescription}</p> */}
				</div>
				<div className="flex items-center gap-x-2 text-[#5F6062] mt-[13px] text-[13px] leading-4">
					<p className="capitalize">{jobDetails?.client}</p>
					<Image src={squareDot} alt="" />
					<p>Posted about {jobDetails?.time}</p>
				</div>
			</div>
			{/* project details */}
			<div className="mt-6">
				<h4 className="font-bold capitalize text-b1 text-base leading-[19px]">
					project details
				</h4>
				<p className="mt-3 text-b4 text-sm leading-[21px]">
					Hello! My name is Ryan and I run the "SagaTheYoungin" YouTube channel:
					https://www.youtube.com/channel/UCs-erbeCJNu-NqSoQ80w9fQ
					<br />
					<br />
					This type of work is freelance, and I will have a slow but steady
					stream of color scenes over a long period of time.
					<br />
					<br />
					In order to apply for this job, please complete the test
					scene/application scene (download link at the bottom of this listing),
					and email it to bkartistscenetest@gmail.com. I will get back to you
					with a decision within a week!
				</p>
				{/* skills */}
				<h4 className="mt-6 font-bold text-b1 text-base leading-[19px] capitalize">
					skills
				</h4>
				<div className="mt-3 mb-6 flex gap-[11px]">
					{jobDetails?.skills?.map((item, index) => (
						<div
							key={`job-details-skills-${index}`}
							className="rounded capitalize bg-[#F5F5F5] py-[9px] px-[14px] text-[#333] text-[13px] leading-[18px]"
						>
							{item}
						</div>
					))}
				</div>

				{/* client about */}
				<div className="">
					<h3 className="font-bold text-base leading-[21px] text-black1">
						About the client
					</h3>
					<div className="mt-[18px] gap-x-[10px] mb-8 flex items-center">
						<Image src={avatar} alt="" className="w-10 h-10" />
						<p className="text-base leading-5 text-[#101828] capitalize">
							{jobDetails?.client}
						</p>
					</div>
					<Button title="Send Proposal" className="w-[163px]" href="" />
				</div>
			</div>
		</div>
	);
};

export default RecentJobListDetails;
