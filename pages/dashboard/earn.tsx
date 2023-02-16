import DashboardLayout from "@/modules/dashboard/components/layout";
import React from "react";
import Image from "next/image";
import { MetricsCard } from "@/modules/dashboard/components/misc";
import { Button } from "@/modules/common/components/input/button";

// images
import money from "@/public/asset/referral/money.svg";
import coins from "@/public/asset/referral/coins.svg";
import people from "@/public/asset/referral/people.svg";
import hero from "@/public/asset/referral/hero.svg";
import duplicateIcon from "@/public/asset/icons/duplicate.svg";

const metricsData = [
	{
		value: 1100,
		text: "Daily points",
		icon: coins
	},
	{
		value: 5300,
		text: "Your referral points",
		icon: people
	}
];

const Earn = () => {
	return (
		<DashboardLayout>
			<div className="layout-container pt-8 pb-[120px] md:pt-12">
				{/* metrics section */}
				<section className="mb-8 flex flex-col gap-y-6 rounded-lg bg-white py-5 px-4 min-[540px]:gap-y-8 md:grid md:flex-none md:grid-cols-2 md:flex-row md:justify-between lg:py-8 lg:px-10">
					<div className="flex items-center gap-x-3">
						<Image
							src={money}
							alt=""
							className="h-10 w-10 min-[540px]:h-[56px] min-[540px]:w-[56px]"
						/>
						<div className="space-y-[6px]">
							<p className="text-[13px] leading-4 text-b4 min-[540px]:text-[18px] min-[540px]:leading-[22px]">
								Total points earned
							</p>
							<p className="text-2xl font-bold leading-[29px] text-[#0B0B27]  min-[540px]:text-[48px] min-[540px]:leading-[58px]">
								6,400
							</p>
							<p className="text-[13px] leading-4 text-b4 min-[540px]:text-[18px] min-[540px]:leading-[22px]">
								53 referrals
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between md:flex-col md:gap-y-[22px]">
						{metricsData?.map((item, index) => (
							<MetricsCard
								key={`metrics-data-${index}`}
								value={item?.value}
								text={item?.text}
								icon={item?.icon}
							/>
						))}
					</div>
				</section>
				{/* end of metrics section */}

				<section className="flex flex-col items-center gap-y-8 bg-white py-5 px-4  md:grid md:flex-none md:grid-cols-2 md:gap-x-8 lg:py-8 lg:px-10">
					<div className="">
						<h1 className="mb-3 w-[240px] text-xl font-bold leading-6 text-b1 min-[540px]:w-[340px] min-[540px]:text-[32px] min-[540px]:leading-[38px]">
							Refer Talents, Clients Earn Gigza points
						</h1>
						<p className="text-[15px] leading-[18px] text-b4 min-[540px]:text-base min-[540px]:leading-[19px]">
							Invite talents and clients to sign up using your link and you earn
							100 points and 200 points for and gig they land on Gigza. Start
							referring now.
						</p>
						<div className="mt-[19px] flex items-center justify-between rounded-md border border-[#E5E5E5] bg-[#F5F5F5] py-2 px-[10px] lg:w-[479px]">
							<p className="text-sm leading-[17px] text-b1 ">
								gigza.work/d6473wush
							</p>
							{/* <button className="flex h-9 w-[98px] items-center justify-center gap-x-[6px] rounded-[5px] bg-primary text-sm leading-[17px] text-white">
								<CopyToClipboard
									icon={duplicateIcon}
									text="gigza.work/d6473wush"
								/>
								<p>Copy link</p>
							</button> */}
							<Button
								title="Copy link"
								icon={duplicateIcon}
								className="h-9 w-[98px] gap-x-[6px] text-sm leading-[17px]"
							/>
						</div>
					</div>
					<Image
						src={hero}
						alt=""
						className="min-[540px]:h-[252px] min-[540px]:w-[252px] md:ml-auto"
					/>
				</section>
			</div>
		</DashboardLayout>
	);
};

export default Earn;
