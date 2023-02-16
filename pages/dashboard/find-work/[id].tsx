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
import { BigNumberData, JobDetailsProps } from "@custom-types/typing";
import { NextPageContext } from "next";
import { readContract } from "@wagmi/core";
import numeral from "numeral";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import avatar from "@/public/asset/avatar/profile-avatar.svg";
import chevronLeft from "@/public/asset/icons/chevron-left.svg";

type JobDetailsPageProps = {
	jobId: number;
	jobDetails: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: BigNumberData;
	};
	profile: {
		0: string;
		4: string;
		5: `0x${string}`;
	};
};

const JobDetails = ({ jobId, jobDetails, profile }: JobDetailsPageProps) => {
	const router = useRouter();
	return (
		<DashboardLayout>
			<div className="lg:pt-20">
				<div className="rounded-[10px] bg-white py-6 px-5 pb-[100px] lg:mx-auto lg:max-w-lg">
					<button
						onClick={() => router.back()}
						className="mb-[27px] flex items-center gap-x-[9px]"
					>
						<Image src={chevronLeft} alt="" />
						<p className="text-base capitalize text-[#5F6062]">go back</p>
					</button>

					<div className="border-b border-[#E8E8E8] pb-6">
						<div className="flex items-center justify-between font-bold text-b1">
							<h3 className="text-xl leading-6">{jobDetails?.[1]}</h3>
							<h4 className="text-[24px] leading-[29px]">
								${numeral(formatUnit(jobDetails?.[3])).format(",")}
							</h4>
						</div>
						<div className="mt-[13px] flex items-center gap-x-2 text-[13px] leading-4 text-[#5F6062]">
							<p className="capitalize">
								{formatWalletAddress(jobDetails?.[4])}
							</p>
							<Image src={squareDot} alt="" />
							<p>
								Posted{" "}
								{covertToReadableDate(formatUnit(jobDetails?.[5])! * 10 ** 18)}
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

						{/* client about */}
						<div className="mt-6">
							<h3 className="text-base font-bold leading-[21px] text-black1">
								About the client
							</h3>
							<div className="mt-[18px] mb-8 flex items-center gap-x-[10px]">
								<Image
									src={profile?.[4] || avatar}
									alt=""
									className="h-10 w-10 rounded-full object-cover"
									height={40}
									width={40}
								/>
								<p className="text-[10px] capitalize leading-5 text-[#101828] min-[540px]:text-base">
									{(profile?.[0] ||
									profile?.[5].toLowerCase() ===
										"0x0000000000000000000000000000000000000000"
										? null
										: profile?.[5]) || jobDetails?.[4]}
								</p>
							</div>
							<Button
								title="Apply job"
								href={`/dashboard/find-work/bid/${jobId}`}
								className="w-full"
							/>
						</div>
					</div>
					{/* <JobDetailsBody {...{ jobId }} /> */}
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	const { id: jobId } = context.query;

	try {
		const jobDetails = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		})) as JobDetailsProps[number];

		const profile = await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [jobDetails?.client]
		});

		return {
			props: {
				jobId: JSON.parse(JSON.stringify(jobId)),
				jobDetails: JSON.parse(JSON.stringify(jobDetails)),
				profile: JSON.parse(JSON.stringify(profile))
				// profile
			}
		};
	} catch (error) {
		if (error) {
			return {
				redirect: {
					destination: "/dashboard/find-work",
					permanent: false
				}
			};
		}
	}
};

export default JobDetails;
