import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Status from "@/modules/dashboard/components/status";
import { RecentTransactionSections } from "@/modules/dashboard/sections/wallet/recent-transaction";
import Image from "next/image";
import { recentTransactionHeading, recentTransactions } from "utils/data";
import { readContract } from "@wagmi/core";
import {
	covertToReadableDate,
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { JobDetailsProps } from "@custom-types/typing";
import { ItotalJobs } from "../find-work";
import { useAccount } from "wagmi";
import numeral from "numeral";
import { UserProfileTransaction } from "@/modules/dashboard/sections/transactions";

type TransactionsProps = {
	totalJobs: ItotalJobs;
};

const Transactions = ({ totalJobs }: TransactionsProps) => {
	const { address } = useAccount();
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
		<DashboardLayout>
			<div className="layout-container max-w-[1126px] pt-8 lg:pt-[38px]">
				<div className="bg-white py-5 px-3 lg:p-6">
					<h1 className="text-base font-bold capitalize leading-[19px] text-[#192839] min-[540px]:text-xl min-[540px]:leading-6">
						all transactions
					</h1>

					<div className="mt-6 mb-7 flex items-center border-b border-[#E8E8E8]">
						{sections.map((item, index) => (
							<div
								key={index}
								className={`cursor-pointer py-2 px-4 text-sm font-bold capitalize leading-[18px] min-[540px]:text-base ${
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
					<div className="h-[300px] overflow-y-auto">
						<>
							{transactions?.get(activeSection)?.map((item, index) => (
								<div
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
								</div>
							))}
						</>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async () => {
	const totalJobs = (await readContract({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	})) as JobDetailsProps;

	return {
		props: {
			totalJobs: JSON.parse(JSON.stringify(totalJobs))
		}
	};
};

export default Transactions;
