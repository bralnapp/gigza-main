import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import {
	covertToReadableDate,
	formatUnit,
	formatWalletAddress
} from "utils/helper";
import Link from "next/link";
import { useGetProposals } from "utils/hooks";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";

const Sent = () => {
	const { sentProposals } = useGetProposals();
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 pb-[95px] min-[540px]:pt-[42px] lg:pb-[141px]">
				<h1 className="text-xl font-bold capitalize leading-5 text-b1 min-[540px]:text-2xl md:text-[28px] md:leading-[34px]">
					Sent proposals ({sentProposals?.length})
				</h1>

				{sentProposals.length ? (
					<div className="mt-4 space-y-5 min-[540px]:mt-8">
						{[...sentProposals]?.reverse().map((item, index) => (
							<Link
								// href={`/dashboard/proposal/sent/${parseInt(item?.job?.jobId)}`}
								href={{
									pathname: "/dashboard/proposal/sent/[jobId]",
									query: {
										jobId: parseInt(item?.job?.jobId)
									}
								}}
								key={`sent-proposals-${index}`}
								className="block rounded-lg bg-white py-4 px-3 min-[540px]:py-6 min-[540px]:px-5"
							>
								<div>
									<div className="flex items-start justify-between">
										<h4 className="w-11/12 text-base font-bold leading-[19px] text-b2">
											{item?.job?.title}
										</h4>
										<p
											className={`text-sm capitalize italic leading-[19px] ${
												item?.job?.state === 0
													? "text-[#0E9802]"
													: "text-[#F02323]"
											}`}
										>
											{item?.job?.state === 0 ? "open" : "closed"}
										</p>
									</div>

									<p className="my-[15px] text-sm leading-[21px] text-b4 line-clamp-3 min-[540px]:w-4/5">
										{item?.job?.description}
									</p>
									<div className="flex items-center space-x-2 text-sm capitalize leading-[17px] text-b1">
										<p className="">{formatWalletAddress(item?.job?.client)}</p>
										<Image src={squareDot} alt="" />
										<p>
											initiated{" "}
											{covertToReadableDate(
												formatUnit(item?.job?.timestamp)! * 10 ** 18
											)}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : null}
			</div>
		</DashboardLayout>
	);
};

export default Sent;
