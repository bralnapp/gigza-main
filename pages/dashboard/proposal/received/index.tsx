import DashboardLayout from "@/modules/dashboard/components/layout";
import { useGetProposals } from "utils/hooks";
import Link from "next/link";

const Received = () => {
	const { receivedProposals } = useGetProposals();
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 min-[540px]:pt-[42px] pb-[95px] lg:pb-[141px]">
				<h1 className="capitalize text-xl min-[540px]:text-2xl md:text-[28px] leading-5 md:leading-[34px] font-bold text-b1">
					received proposals ({receivedProposals?.length})
				</h1>

				<div className="mt-4 min-[540px]:mt-8 space-y-5">
					{receivedProposals?.map((item, index) => (
						<Link
							key={`received-proposals-${index}`}
							href={`/dashboard/proposal/received/${item.jobId}`}
							className="bg-white block rounded-lg py-4 min-[540px]:py-6 px-3 min-[540px]:px-5"
						>
							<div className="flex items-start justify-between">
								<h4 className="font-bold text-b2 text-base leading-[19px] w-11/12">
									{item?.title}
								</h4>
								<p
									className={`capitalize italic text-sm leading-[19px] ${
										item?.state === 0 ? "text-[#0E9802]" : "text-[#F02323]"
									}`}
								>
									{item?.state === 0 ? "opened" : "closed"}
								</p>
							</div>

							<p className="my-[15px] text-b4 text-sm leading-[21px] min-[540px]:w-4/5 line-clamp-3">
								{item?.description}
							</p>
							<p className="capitalize text-b1 text-sm leading-[17px]">
								{item?.userBids.length ? (
									<>
										{item?.userBids.length} application
										{`${item?.userBids.length > 1 ? "s" : ""}`}
									</>
								) : (
									<>no application yet</>
								)}
							</p>
						</Link>
					))}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Received;
