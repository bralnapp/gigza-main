import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import {
	covertToReadableDate,
	formatUnit,
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { UserProfileType } from "@custom-types/typing";
import numeral from "numeral";
import { useContractRead } from "wagmi";
import { ItotalJobs } from "@/pages/dashboard/find-work";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import avatar from "@/public/asset/avatar/profile-avatar.svg";

type RecentJobListDetailsProps = {
	jobDetails: ItotalJobs[number];
};

const RecentJobListDetails = ({ jobDetails }: RecentJobListDetailsProps) => {
	const { data: userDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [jobDetails?.[4]]
		});
	return jobDetails ? (
		<div className="job-details sticky top-[94px] hidden h-[calc(100vh_-_157px)] overflow-auto rounded-[10px] bg-white py-6 px-5 lg:block">
			<div className="border-b border-[#E8E8E8] pb-6">
				<Button
					title="Apply Job"
					className="ml-auto mb-6 w-[163px]"
					href={`/dashboard/find-work/bid/${Math.trunc(
						formatUnit(jobDetails?.[0])! * 10 ** 18
					)}`}
				/>
				<div className="flex items-start justify-between text-xl font-bold leading-[29px] text-b1">
					<h3 className="w-4/5">{jobDetails?.[1]}</h3>
					<h4>${numeral(formatUnit(jobDetails?.[3])).format(",")}</h4>
					{/* <p className="mt-2 mb-4 text-b1 text- leading-[21px]">{jobDetails?.jobDescription}</p> */}
				</div>
				<div className="mt-[13px] flex items-center gap-x-2 text-[13px] leading-4 text-[#5F6062]">
					<p className="capitalize">{formatWalletAddress(jobDetails?.[4]!)}</p>
					<Image src={squareDot} alt="" />
					<p>
						Posted{" "}
						{covertToReadableDate(formatUnit(jobDetails?.[9])! * 10 ** 18)}
					</p>
				</div>
			</div>
			{/* project details */}
			<div className="mt-6">
				<h4 className="text-base font-bold capitalize leading-[19px] text-b1">
					project details
				</h4>
				<p className="mt-3 whitespace-pre-wrap text-sm leading-[21px] text-b4">
					{jobDetails?.[2]}
				</p>
				{/* skills */}
				<h4 className="mt-6 text-base font-bold capitalize leading-[19px] text-b1">
					skills
				</h4>
				<div className="mt-3 mb-6 flex gap-[11px]">
					{jobDetails?.[5]?.map((item, index) => (
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
						<Image
							src={userDetails?.profileUrl || avatar}
							alt=""
							className="h-10 w-10 rounded-full object-cover"
							width={40}
							height={40}
						/>
						<p className="capitalize text-[#101828] lg:text-xs xl:text-base xl:leading-5">
							{jobDetails?.[4]}
						</p>
					</div>
				</div>
			</div>
		</div>
	) : null;
};

export default RecentJobListDetails;
