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
	console.log(sentProposals)
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 min-[540px]:pt-[42px] pb-[95px] lg:pb-[141px]">
				<h1 className="capitalize text-xl min-[540px]:text-2xl md:text-[28px] leading-5 md:leading-[34px] font-bold text-b1">
					Sent proposals ({sentProposals?.length})
				</h1>

				<div className="mt-4 min-[540px]:mt-8 space-y-5">
					{sentProposals.map((item, index) => (
						<Link
							href={`/dashboard/proposal/sent/${Math.round(
                                formatUnit(item?.job?.jobId)! * 10 ** 18
                            )}`}
							key={`sent-proposals-${index}`}
							className="bg-white rounded-lg py-4 min-[540px]:py-6 px-3 min-[540px]:px-5 block"
						>
							<div>
								<div className="flex items-start justify-between">
									<h4 className="font-bold text-b2 text-base leading-[19px] w-11/12">
										{item?.job?.title}
									</h4>
									<p
										className={`capitalize italic text-sm leading-[19px] ${
											item?.job?.state === 0
												? "text-[#0E9802]"
												: "text-[#F02323]"
										}`}
									>
										{item?.job?.state === 0 ? "open" : "closed"}
									</p>
								</div>

								<p className="my-[15px] text-b4 text-sm leading-[21px] min-[540px]:w-4/5 line-clamp-3">
									{item?.job?.description}
								</p>
								<div className="flex items-center space-x-2 capitalize text-b1 text-sm leading-[17px]">
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
			</div>
		</DashboardLayout>
	);
};

export default Sent;
