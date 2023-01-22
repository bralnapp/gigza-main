import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Status from "@/modules/dashboard/components/status";
import { RecentTransactionSections } from "@/modules/dashboard/sections/wallet/recent-transaction";
import Image from "next/image";
import { recentTransactionHeading, recentTransactions } from "utils/data";

const Transactions = () => {
	const sections = ["sent", "received"];
	const [activeSection, setActiveSection] = useState<RecentTransactionSections>(
		sections[0] as RecentTransactionSections
	);
	return (
		<DashboardLayout>
			<div className="layout-container max-w-[1126px] pt-8 lg:pt-[38px]">
				<div className="py-5 px-3 lg:p-6 bg-white">
					<h1 className="font-bold text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 text-[#192839] capitalize">
						all transactions
					</h1>

					<div className="flex items-center mt-6 mb-7 border-b border-[#E8E8E8]">
						{sections.map((item, index) => (
							<div
								key={index}
								className={`text-sm min-[540px]:text-base leading-[18px] font-bold capitalize py-2 px-4  cursor-pointer ${
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
					<div className="h-[300px] overflow-y-auto">
						<>
							{recentTransactions[activeSection]?.map((item, index) => (
								<div
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
										{/* @ts-ignore */}
										<Status title={item.status} intent={item.status} />
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

export default Transactions;
