import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import {
	covertToReadableDate,
	formatUnit,
	formatWalletAddress
} from "utils/helper";
import { JobDetailsProps } from "@custom-types/typing";
import numeral from "numeral";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import avatar from "@/public/asset/avatar/profile-avatar.svg";

type RecentJobListDetailsProps = {
	jobDetails: JobDetailsProps[number];
};

const RecentJobListDetails = ({ jobDetails }: RecentJobListDetailsProps) => {

	return jobDetails ? (
		<div className="sticky top-[94px] hidden h-fit rounded-[10px] bg-white py-6 px-5 lg:block">
			<div className="border-b border-[#E8E8E8] pb-6">
				<div className="flex items-start justify-between text-xl font-bold leading-[29px] text-b1">
					<h3 className="w-4/5">{jobDetails?.title}</h3>
					<h4>${numeral(formatUnit(jobDetails?.amount)).format(',')}</h4>
					{/* <p className="mt-2 mb-4 text-b1 text- leading-[21px]">{jobDetails?.jobDescription}</p> */}
				</div>
				<div className="mt-[13px] flex items-center gap-x-2 text-[13px] leading-4 text-[#5F6062]">
					<p className="capitalize">
						{formatWalletAddress(jobDetails?.client)}
					</p>
					<Image src={squareDot} alt="" />
					<p>
						Posted{" "}
						{covertToReadableDate(
							formatUnit(jobDetails?.timestamp)! * 10 ** 18
						)}
					</p>
				</div>
			</div>
			{/* project details */}
			<div className="mt-6">
				<h4 className="text-base font-bold capitalize leading-[19px] text-b1">
					project details
				</h4>
				<p className="mt-3 text-sm leading-[21px] text-b4">
					{jobDetails?.description}
				</p>
				{/* skills */}
				<h4 className="mt-6 text-base font-bold capitalize leading-[19px] text-b1">
					skills
				</h4>
				<div className="mt-3 mb-6 flex gap-[11px]">
					{jobDetails?.skills?.map((item, index) => (
						<div
							key={`job-details-skills-${index}`}
							className="rounded bg-[#F5F5F5] py-[9px] px-[14px] text-[13px] capitalize leading-[18px] text-[#333]"
						>
							{item}
						</div>
					))}
				</div>

				{/* client about */}
				<div className="">
					<h3 className="text-base font-bold leading-[21px] text-black1">
						About the client
					</h3>
					<div className="mt-[18px] mb-8 flex items-center gap-x-[10px]">
						<Image src={avatar} alt="" className="h-10 w-10" />
						<p className="capitalize text-[#101828] lg:text-xs xl:text-base xl:leading-5">
							{jobDetails?.client}
						</p>
					</div>
					<Button
						title="Send Proposal"
						className="w-[163px]"
						href={`/dashboard/find-work/bid/${parseInt(jobDetails?.jobId)}`}
					/>
				</div>
			</div>
		</div>
	) : null;
};

export default RecentJobListDetails;
