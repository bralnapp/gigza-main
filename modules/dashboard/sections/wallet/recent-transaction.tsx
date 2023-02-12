import { useState } from "react";
import Link from "next/link";
import { recentTransactionHeading, recentTransactions } from "utils/data";
import Image from "next/image";
import Status from "@/modules/dashboard/components/status";
import useWindowSize from "utils/hooks/useWindowSize.hook";
import { ItotalJobs } from "@/pages/dashboard/find-work";
import { useAccount } from "wagmi";
import { covertToReadableDate, formatUnit } from "utils/helper";
import numeral from "numeral";
import { UserProfileTransaction } from "../transactions";

// images
import chevronRight from "@/public/asset/icons/chevron-right.svg";

export type RecentTransactionSections = "sent" | "received";
type RecentTransactionProps = {
	totalJobs: ItotalJobs;
};

const RecentTransaction = ({ totalJobs }: RecentTransactionProps) => {
	const { address } = useAccount();
	const { width } = useWindowSize();

	const sections = ["sent", "received"];
	const [activeSection, setActiveSection] = useState<RecentTransactionSections>(
		sections[0] as RecentTransactionSections
	);

	const sentTransactions = totalJobs.filter(
		(item) =>
			item?.[4]?.toLowerCase() === address?.toLowerCase() &&
			(item?.[10] === 3 || item?.[10] === 4)
	);

	const receivedTransactions = totalJobs?.filter(
		(item) =>
			item?.[7]?.toLowerCase() === address?.toLowerCase() &&
			(item?.[10] === 3 || item?.[10] === 4)
	);

	const transactions = new Map([
		["sent", sentTransactions],
		["received", receivedTransactions]
	]);

	return (
		<div className="rounded-lg bg-white py-5 px-3 min-[540px]:rounded-2xl min-[540px]:p-6">
			<div className="flex items-center justify-between">
				<h3 className="text-base font-bold capitalize leading-[19px] text-[#192839] min-[540px]:text-xl min-[540px]:leading-6">
					recent transactions
				</h3>
				{sentTransactions?.length || receivedTransactions?.length ? (
					<Link
						href="/dashboard/wallet/transactions"
						className="text-sm capitalize leading-[17px] text-[#657795] min-[540px]:text-base min-[540px]:leading-[19px]"
					>
						{width! < 540 ? (
							"see all"
						) : (
							<div className="flex items-center gap-x-[17px]">
								<p>all transactions</p>
								<Image src={chevronRight} alt="" />
							</div>
						)}
					</Link>
				) : null}
			</div>

			<div className="my-6 flex items-center border-b border-[#E8E8E8]">
				{sections.map((item, index) => (
					<div
						key={index}
						className={`cursor-pointer py-1 px-4 text-sm font-bold capitalize leading-[18px]  min-[540px]:text-base ${
							activeSection === item
								? "border-b-2 border-primary text-primary"
								: "text-b4"
						} `}
						onClick={() =>
							setActiveSection(sections[index] as RecentTransactionSections)
						}
					>
						{item}
					</div>
				))}
			</div>

			{/* recent transaction */}
			{/* table heading */}
			<div className="grid grid-cols-4 gap-x-5 border-b border-[#F0F0F0] md:gap-x-10">
				{recentTransactionHeading.map((item, index) => (
					<div
						key={`recent-transaction-heading-${index}`}
						className="py-[13px] text-xs font-bold capitalize leading-[18px] text-b3 min-[540px]:text-sm"
					>
						{item}
					</div>
				))}
			</div>

			{/* data */}
			<div className="">
				<>
					{transactions
						?.get(activeSection)
						?.slice(0, 5)
						?.map((item, index) => (
							<Link
								href={
									{
										pathname: '/dashboard/wallet/[jobId]',
										query: {
											jobId : formatUnit(item?.[0])! * 10 ** 18
										}
									}
								}
								key={`recent-transactions-${index}`}
								className="grid grid-cols-4 items-center gap-x-5 border-b border-[#F0F0F0] py-2 text-[11px] capitalize leading-5 text-b1 min-[540px]:text-base md:gap-x-10 md:py-[10px]"
							>
								<UserProfileTransaction
									address={activeSection === "sent" ? item?.[7] : item?.[4]}
								/>
								<div>${numeral(formatUnit(item?.[3])).format(",")}</div>
								<div>
									{covertToReadableDate(formatUnit(item?.[9])! * 10 ** 18)}
								</div>
								<div className="">
									<Status
										title={item?.[10] === 3 ? "pending" : "paid"}
										intent={item?.[10] === 3 ? "pending" : "complete"}
									/>
								</div>
							</Link>
						))}
				</>
			</div>
		</div>
	);
};

export default RecentTransaction;
