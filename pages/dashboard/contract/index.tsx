import React, { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { contracts } from "utils/data";
import Image from "next/image";
import useWindowSize from "utils/hooks/useWindowSize.hook";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import redDot from "@/public/asset/icons/red-dot.svg";
import Link from "next/link";

type ContractTypes = "active" | "closed" | "pending";

const Contract = () => {
	const sections = ["active", "closed", "pending"];
	const [activeSection, setActiveSection] = useState<ContractTypes>(
		sections[0] as ContractTypes
	);
	const { width } = useWindowSize();
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 min-[540px]:pt-[42px] pb-[95px]">
				<h1 className="capitalize font-bold text-xl md:text-[24px] leading-6 md:leading-[29px] text-b1">
					Contracts
				</h1>

				<div className="flex items-center mt-6 border-b border-[#E8E8E8] gap-x-4">
					{sections.map((item, index) => (
						<div
							key={index}
							className={`text-sm min-[540px]:text-base p-2 md:px-4 leading-[18px] font-bold capitalize cursor-pointer ${
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
									{item} {width! < 540 ? null : "contracts"} <Image src={redDot} alt="" />
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
					{contracts[activeSection]?.map((item, index) => (
						<Link
							href={`/dashboard/contract/${index}`}
							key={`contracts-${index}`}
							className="py-4 md:py-6 px-3 md:px-5 rounded-lg md:rounded-[6px] block"
						>
							<div className="md:mb-[13px] md:grid grid-flow-col gap-x-[55px]">
								<div className="">
									<h3 className="font-bold text-b1 text-base min-[540px]:text-lg leading-[19px] min-[540px]:leading-[22px]">
										{item?.title}
									</h3>
									<p className="py-[15px] md:py-0 md:pt-2 text-b4 text-sm min-[540px]:text-base leading-[21px] min-[540px]:leading-6">
										{item?.description}
									</p>
								</div>
								<p className="text-sm leading-[19px] text-b4 capitalize ml-auto">
									{activeSection === "active" ? (
										//  @ts-ignore
										`End Date: ${item?.endDate}`
									) : (
										<p
											className={`capitalize text-[10px] min-[540px]:text-[13px] leading-4 rounded-3xl w-fit py-[5px] min-[540px]:py-2 px-[10px] min-[540px]:px-4 ${
												//  @ts-ignore
												item?.status.toLowerCase() === "completed"
													? "bg-[rgba(149,214,164,0.2)] text-[#0E9802]  "
													: "bg-[rgba(255,184,0,0.1)] text-[#FFB800]"
											}`}
										>
											 {/* @ts-ignore */}
											{item?.status}
										</p>
									)}
								</p>
							</div>
							<div className="flex items-center space-x-2 capitalize text-b1 text-sm leading-[17px] mt-[15px]">
								<p>{item?.name}</p>
								<Image src={squareDot} alt="" />
								<p>initiated {item?.startDate}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Contract;
