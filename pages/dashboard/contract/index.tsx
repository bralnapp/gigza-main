import React, { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import useWindowSize from "utils/hooks/useWindowSize.hook";
import Link from "next/link";
import { JobDetailsProps, IuserBids } from "@custom-types/typing";
import {
	covertToReadableDate,
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useAccount, useContractRead } from "wagmi";
import { ContractStatus } from "@/modules/dashboard/sections/contract";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import redDot from "@/public/asset/icons/red-dot.svg";

type ContractTypes = "active" | "closed" | "pending";

type AllBids = [JobDetailsProps[number], IuserBids[]] | undefined;

const Contract = () => {
	const sections = ["active", "closed", "pending"];
	const [activeSection, setActiveSection] = useState<ContractTypes>(
		sections[0] as ContractTypes
	);
	const { width } = useWindowSize();

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

	// all bids to a job by a freelancer
	const allBids: AllBids[] | undefined = totalJobs?.map((item) => [
		item,
		item?.userBids?.filter(
			(item) => item?.freelancer?.toLowerCase() === address?.toLowerCase()
		)
	]);
	const usersContracts = allBids?.filter((item) => item![1].length === 1);
	const active = usersContracts?.filter((item) => item![1][0]?.bidState === 2);
	const close = usersContracts?.filter(
		(item) => item![1][0]?.bidState === 4 || item![1][0]?.bidState === 5
	);
	const pending = usersContracts?.filter(
		(item) => item![1][0]?.bidState === 1 || item![1][0]?.bidState === 3
	);

	const pendingJobs: (JobDetailsProps | undefined)[] | undefined = pending
		?.flatMap((item) => item as [JobDetailsProps | undefined] | undefined)
		?.filter((item) => item![1]);
	const activeJobs = active
		?.flatMap((item) => item as [JobDetailsProps | undefined] | undefined)
		?.filter((item) => item![1]);
	const closeJobs = close
		?.flatMap((item) => item as [JobDetailsProps | undefined] | undefined)
		?.filter((item) => item![1]);
	const contracts = new Map([
		["active", activeJobs],
		["close", closeJobs],
		["pending", pendingJobs]
	]);
console.log(totalJobs)
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 pb-[95px] min-[540px]:pt-[42px]">
				<h1 className="text-xl font-bold capitalize leading-6 text-b1 md:text-[24px] md:leading-[29px]">
					Contracts
				</h1>

				<div className="mt-6 flex items-center gap-x-4 border-b border-[#E8E8E8]">
					{sections.map((item, index) => (
						<div
							key={index}
							className={`cursor-pointer p-2 text-sm font-bold capitalize leading-[18px] min-[540px]:text-base md:px-4 ${
								activeSection === item
									? "border-b-2 border-primary text-primary"
									: "text-b4"
							} ${
								item.toLowerCase() === "pending"
									? "flex items-start gap-x-2"
									: null
							}`}
							onClick={() => setActiveSection(sections[index] as ContractTypes)}
						>
							{item.toLowerCase() === "pending" ? (
								<>
									{item} {width! < 540 ? null : "contracts"}{" "}
									{pendingJobs?.length ? <Image src={redDot} alt="" /> : null}
								</>
							) : (
								<>
									{item} {width! < 540 ? null : "contracts"}
								</>
							)}
						</div>
					))}
				</div>
				<div className="mt-4 space-y-5">
					{contracts.get(activeSection)?.map((item, index) => (
						<Link
							href={{
								// @ts-ignore
								pathname: `/dashboard/contract/${item?.jobId}`,
								query: {
									// @ts-ignore
									job: JSON.stringify(item!)
								}
							}}
							key={`contracts-${index}`}
							className="block rounded-lg py-4 px-3 md:rounded-[6px] md:py-6 md:px-5"
						>
							<div className="grid-flow-col gap-x-[55px] md:mb-[13px] md:grid">
								<div className="">
									<h3 className="text-base font-bold leading-[19px] text-b1 min-[540px]:text-lg min-[540px]:leading-[22px]">
										{/* @ts-ignore */}
										{item?.title}
									</h3>
									<p className="py-[15px] text-sm leading-[21px] text-b4 line-clamp-3  min-[540px]:text-base min-[540px]:leading-6 md:py-0 md:pt-2">
										{/* @ts-ignore */}
										{item?.description}
									</p>
								</div>
								<p className="ml-auto text-sm capitalize leading-[19px] text-b4">
									{activeSection === "active" ? (
										// @ts-ignore
										`End Date: ${covertToReadableDate(item?.timeline)}`
									) : (
										// @ts-ignore
										<ContractStatus bids={item?.userBids} />
									)}
								</p>
							</div>
							<div className="mt-[15px] flex items-center space-x-2 text-sm capitalize leading-[17px] text-b1">
								{/* @ts-ignore */}
								<p>{formatWalletAddress(item?.client)}</p>
								<Image src={squareDot} alt="" />
								<p>
									{/* @ts-ignore */}
									initiated {covertToReadableDate(parseInt(item?.timeline))}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Contract;
