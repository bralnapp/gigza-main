import { useState } from "react";
import Link from "next/link";
import { recentTransactionHeading, recentTransactions } from "utils/data";
import Image from "next/image";
import Status from "@/modules/dashboard/components/status";
import useWindowSize from "utils/hooks/useWindowSize.hook";

// images
import chevronRight from "@/public/asset/icons/chevron-right.svg";

export type RecentTransactionSections = "sent" | "received";

const RecentTransaction = () => {
	const sections = ["sent", "received"];
	const [activeSection, setActiveSection] = useState<RecentTransactionSections>(
		sections[0] as RecentTransactionSections
	);
	const { width } = useWindowSize();
	return (
		<div className="bg-white rounded-lg min-[540px]:rounded-2xl py-5 px-3 min-[540px]:p-6">
			<div className="flex items-center justify-between">
				<h3 className="capitalize font-bold text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 text-[#192839]">
					recent transactions
				</h3>
				<Link
					href="/dashboard/wallet/transactions"
					className="text-[#657795] capitalize text-sm min-[540px]:text-base leading-[17px] min-[540px]:leading-[19px]"
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
			</div>

			<div className="flex items-center my-6">
				{sections.map((item, index) => (
					<div
						key={index}
						className={`text-sm min-[540px]:text-base leading-[18px] font-bold capitalize py-2 px-4 md:pb-6 cursor-pointer ${
							activeSection === item
								? "border-b-2 border-primary text-primary"
								: "text-b4"
						} `}
						onClick={() => setActiveSection(sections[index] as RecentTransactionSections)}
					>
						{item}
					</div>
				))}
			</div>

			{/* recent transaction */}
			{/* table heading */}
			<div className="grid grid-cols-4 gap-x-5 md:gap-x-10 border-b border-[#F0F0F0]">
				{recentTransactionHeading.map((item, index) => (
					<div
						key={`recent-transaction-heading-${index}`}
						className="capitalize text-b3 font-bold py-[13px] text-xs min-[540px]:text-sm leading-[18px]"
					>
						{item}
					</div>
				))}
			</div>

			{/* data */}
			<div className="">
				<>
					{recentTransactions[activeSection].slice(0, 5)?.map((item, index) => (
						<Link
							href={`/dashboard/wallet/${index}`}
							key={`recent-transactions-${index}`}
							className="grid grid-cols-4 border-b border-[#F0F0F0] capitalize text-b1 text-[11px] min-[540px]:text-base leading-5 py-2 md:py-[10px] items-center gap-x-5 md:gap-x-10"
						>
							<div className="md:flex items-center md:space-x-2">
								<div className="hidden md:block">
									<Image src={item.avatar} alt="" className="w-10 h-10" />
								</div>
								<p>{item.name}</p>
							</div>
							<div>${item.amount}</div>
							<div>{item.date}</div>
							<div className="">
								<Status title={item.status} intent={item.status} />
							</div>
						</Link>
					))}
				</>
			</div>
		</div>
	);
};

export default RecentTransaction;
