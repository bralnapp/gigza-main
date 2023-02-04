import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import { useRouter } from "next/router";
import {
	covertToReadableDate,
	formatUnit,
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useContractRead } from "wagmi";
import numeral from "numeral";
import { JobDetailsProps, UserProfileType } from "@custom-types/typing";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import avatar from "@/public/asset/avatar/profile-avatar.svg";
import chevronLeft from "@/public/asset/icons/chevron-left.svg";

const JobDetails = () => {
	const router = useRouter();
	const { id: jobId } = router.query;

	const { data: jobDetails }: { data: JobDetailsProps[number] | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		});

	const { data: profile }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [jobDetails?.client]
		});

	return jobDetails ? (
		<DashboardLayout>
			<div className="rounded-[10px] bg-white py-6 px-5 pb-[100px]">
				<button
					onClick={() => router.back()}
					className="mb-[27px] flex items-center gap-x-[9px]"
				>
					<Image src={chevronLeft} alt="" />
					<p className="text-base capitalize text-[#5F6062]">go back</p>
				</button>
				<div className="border-b border-[#E8E8E8] pb-6">
					<div className="flex items-center justify-between font-bold text-b1">
						<h3 className="text-xl leading-6">{jobDetails?.title}</h3>
						<h4 className="text-[24px] leading-[29px]">
							${numeral(formatUnit(jobDetails?.amount)).format(",")}
						</h4>
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
						{["Logo design", "Brand/graphics design"]?.map((item, index) => (
							<div
								key={`job-details-skills-${index}`}
								className="rounded bg-[#F5F5F5] py-[9px] px-[14px] text-[13px] capitalize leading-[18px] text-[#333]"
							>
								{item}
							</div>
						))}
					</div>

					{/* client about */}
					<div className="mt-6">
						<h3 className="text-base font-bold leading-[21px] text-black1">
							About the client
						</h3>
						<div className="mt-[18px] mb-8 flex items-center gap-x-[10px]">
							<Image
								src={profile?.profileUrl || avatar}
								alt=""
								className="h-10 w-10 rounded-full object-cover"
								height={40}
								width={40}
							/>
							<p className="text-[10px] capitalize leading-5 text-[#101828] min-[540px]:text-base">
								{jobDetails?.client}
							</p>
						</div>
						<Button
							title="Send Proposal"
							href={`/dashboard/find-work/bid/${parseInt(jobDetails?.jobId)}`}
							className="w-full"
						/>
					</div>
				</div>
			</div>
		</DashboardLayout>
	) : null;
};

export default JobDetails;
