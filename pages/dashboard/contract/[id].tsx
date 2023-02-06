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

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import chatIcon from "@/public/asset/icons/message-square.svg";
import { useAccount, useContractRead } from "wagmi";
import { JobDetailsProps } from "@custom-types/typing";

const ContractDetails = () => {
	const router = useRouter();
	const [pageData, setPageData] = useState();

	useEffect(() => {
		if (router.isReady) {
			if (!router.query?.job) {
				router.push("/dashboard/contract");
			} else {
				// @ts-ignore
				const data = JSON.parse(router.query.job as string);
				setPageData(data);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady]);

	const { address } = useAccount();

	const {
		data: totalJobs
	}: {
		data: JobDetailsProps | undefined;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	});

	const thisJob = totalJobs?.filter((item) => {
		return parseInt(item?.jobId) === formatUnit(pageData?.[0])! * 10 ** 18;
	});
	const freelancerBid = thisJob?.[0]?.userBids?.filter(
		(item) => item?.freelancer === address
	);
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
						<p className="my-4 text-sm leading-[17px] text-b3 min-[540px]:mb-8 min-[540px]:leading-[21px]">
							{pageData?.[2]}
						</p>

						{/* duration */}
						<h4 className="mb-2 text-base font-bold capitalize leading-[19px] min-[540px]:mb-4">
							duration
						</h4>
						<p className="text-sm leading-[17px] text-b2">
							{/* @ts-ignore */}
							{covertToReadableDate(formatUnit(pageData?.[6]) * 10 ** 18)}
						</p>
						<ContractButtonSection
							freelancerBid={freelancerBid}
							jobId={pageData?.[0]}
						/>
					</div>

					<div className="mt-[83px] py-4 px-6 lg:mt-0 ">
						<div className="mb-4 text-sm capitalize leading-[21px] min-[540px]:mb-6">
							<p className="mb-[5px] text-[#667085]">date posted</p>
							<p className="text-[#101828]">
								{/* @ts-ignore */}
								{covertToReadableDate(formatUnit(pageData?.[9]) * 10 ** 18)}
							</p>
						</div>

						{/* tag */}
						{/* <p className="text-sm capitalize leading-[21px] text-[#667085]">
							tag
						</p>
						<div className="mt-[13px] mb-4 flex gap-[11px] min-[540px]:mb-6">
							{["Brand/graphics design", "Animation"].map((item, index) => (
								<div
									key={`skills-${index}`}
									className="w-fit rounded bg-[#F5F5F5] py-[7px] px-[14px] text-[13px] leading-4 text-[#333] min-[540px]:py-2 min-[540px]:px-4"
								>
									{item}
								</div>
							))}
						</div> */}

						{/* budget */}
						<p className="mb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
							Budget
						</p>
						<p className="text-base capitalize leading-[21px] text-[#101828]">
							${formatUnit(pageData?.[3])}
						</p>

						{/* about client */}
						<div className="my-4 min-[540px]:mt-6 min-[540px]:mb-4">
							<p className="mb-2 text-sm leading-[21px] text-[#667085]">
								About the client
							</p>
							{/* @ts-ignore */}
							<ContractClientProfile address={pageData?.[4]} />
						</div>
						<div>
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

export default ContractDetails;
