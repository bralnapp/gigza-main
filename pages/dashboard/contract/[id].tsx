import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import {
	covertToReadableDate,
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import {
	ContractButtonSection,
	ContractClientProfile
} from "@/modules/dashboard/sections/contract";
import { useAccount } from "wagmi";
import { BigNumberData, JobDetailsProps } from "@custom-types/typing";
import numeral from "numeral";
import { NextPageContext } from "next";
import { readContract } from "@wagmi/core";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import chatIcon from "@/public/asset/icons/message-square.svg";

type FreelancerBid = {
	0: BigNumberData;
	1: string;
	2: BigNumberData;
	3: `0x${string}`;
	4: number;
}[];

type ContractDetailsProps = {
	totalJobs: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: [
			{
				0: BigNumberData;
				1: string;
				2: BigNumberData;
				3: `0x${string}`;
				4: number;
			}[]
		];
	}[];
	pageData: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: [
			{
				0: BigNumberData;
				1: string;
				2: BigNumberData;
				3: `0x${string}`;
				4: number;
			}[]
		];
		9: BigNumberData;
	};
};

const ContractDetails = ({ pageData, totalJobs }: ContractDetailsProps) => {
	const router = useRouter();
	const { address } = useAccount();

	const thisJob = totalJobs?.filter((item) => {
		return (
			formatUnit(item?.[0])! * 10 ** 18 ===
			formatUnit(pageData?.[0])! * 10 ** 18
		);
	});
	console.log("thisJob new", thisJob);
	const freelancerBid = thisJob?.[0]?.[8]?.filter(
		// @ts-ignore
		(item) => item?.[3].toLowerCase() === address?.toLowerCase()
	) as unknown;

	return (
		<DashboardLayout>
			<div className="dashboard-layout-container mb-7 pt-[26px] min-[540px]:pb-[118px] lg:pt-[42px]">
				<button
					onClick={() => router.back()}
					className="mb-[19px] flex items-center gap-x-[9px] lg:hidden"
				>
					<Image src={chevronLeft} alt="" />
					<p className="text-base capitalize text-[#5F6062]">go back</p>
				</button>

				<Button
					title="Cancel"
					onClick={() => router.back()}
					className="hidden w-[115px] border border-[#D9D9D9] bg-[#F3F4F5] text-[#5F6062] lg:flex"
				/>
				<div className="grid-cols-2 lg:mt-[47px] lg:grid lg:gap-x-16 xl:grid-cols-[2fr_1fr]">
					<div className="lg:py-6 lg:px-5">
						<h3 className="mb-4 text-xl font-bold capitalize leading-6 text-b1 min-[540px]:mb-8 min-[540px]:text-[24px] min-[540px]:leading-[29px]">
							contract
						</h3>
						<h4 className="text-base font-bold capitalize leading-5 text-b1 min-[540px]:text-lg min-[540px]:leading-5">
							{pageData?.[1]}
						</h4>
						<p className="my-4 whitespace-pre-wrap text-sm leading-[17px] text-b3 min-[540px]:mb-8 min-[540px]:leading-[21px]">
							{pageData?.[2]}
						</p>

						{/* duration */}
						<h4 className="mb-2 text-base font-bold capitalize leading-[19px] min-[540px]:mb-4">
							duration
						</h4>
						<p className="text-sm leading-[17px] text-b2">
							{covertToReadableDate(formatUnit(pageData?.[6])! * 10 ** 18)}
						</p>
						<ContractButtonSection
							freelancerBid={freelancerBid as FreelancerBid}
							jobId={formatUnit(pageData?.[0])! * 10 ** 18}
						/>
					</div>

					<div className="mt-[83px] py-4 px-6 lg:mt-0 ">
						<div className="mb-4 text-sm capitalize leading-[21px] min-[540px]:mb-6">
							<p className="mb-[5px] text-[#667085]">date posted</p>
							<p className="text-[#101828]">
								{covertToReadableDate(formatUnit(pageData?.[9])! * 10 ** 18)}
							</p>
						</div>

						{/* budget */}
						<p className="mb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
							Budget
						</p>
						<p className="text-base capitalize leading-[21px] text-[#101828]">
							${numeral(formatUnit(pageData?.[3])).format(",")}
						</p>

						{/* about client */}
						<div className="my-4 min-[540px]:mt-6 min-[540px]:mb-4">
							<p className="mb-2 text-sm leading-[21px] text-[#667085]">
								About the client
							</p>
							<ContractClientProfile address={pageData?.[4]!} />
						</div>
						<div>
							{/* @ts-ignore */}
							{freelancerBid?.length ? (
								<Button
									title="Send A Message"
									icon={chatIcon}
									className="w-full border border-[#D9D9D9] bg-white text-b2"
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	try {
		const { job: pageData } = context.query;
		const totalJobs = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getTotalJobs"
		})) as JobDetailsProps;

		return {
			props: {
				pageData: JSON.parse(pageData as string),
				totalJobs: JSON.parse(JSON.stringify(totalJobs))
			}
		};
	} catch (error) {
		if (error) {
			return {
				redirect: {
					destination: "/dashboard/contract",
					permanent: false
				}
			};
		}
	}
};

export default ContractDetails;
