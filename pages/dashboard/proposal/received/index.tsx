import DashboardLayout from "@/modules/dashboard/components/layout";
import Link from "next/link";
import { useGetProposals } from "utils/hooks";
import { IuserBids } from "@custom-types/typing";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Received = () => {
	const router = useRouter();

	const { receivedProposals } = useGetProposals();

	const handleClick = (jobId: number, jobBids: IuserBids[]) => {
		if (jobBids.length === 0) {
			toast.error("There is no bids available");
			return;
		}

		router.push(`/dashboard/proposal/received/${jobId}`);
	};
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 pb-[95px] min-[540px]:pt-[42px] lg:pb-[141px]">
				<h1 className="text-xl font-bold capitalize leading-5 text-b1 min-[540px]:text-2xl md:text-[28px] md:leading-[34px]">
					received proposals ({receivedProposals?.length})
				</h1>

				<div className="mt-4 space-y-5 min-[540px]:mt-8">
					{receivedProposals?.map((item, index) => (
						<div
							key={`received-proposals-${index}`}
							onClick={() => handleClick(item.jobId, item?.userBids)}
							className="block rounded-lg bg-white py-4 px-3 min-[540px]:py-6 min-[540px]:px-5"
						>
							<div className="flex items-start justify-between">
								<h4 className="w-11/12 text-base font-bold leading-[19px] text-b2">
									{item?.title}
								</h4>
								<p
									className={`text-sm capitalize italic leading-[19px] ${
										item?.state === 0 ? "text-[#0E9802]" : "text-[#F02323]"
									}`}
								>
									{item?.state === 0 ? "opened" : "closed"}
								</p>
							</div>

							<p className="my-[15px] text-sm leading-[21px] text-b4 line-clamp-3 min-[540px]:w-4/5">
								{item?.description}
							</p>
							<p className="text-sm capitalize leading-[17px] text-b1">
								{item?.userBids.length ? (
									<>
										{item?.userBids.length} application
										{`${item?.userBids.length > 1 ? "s" : ""}`}
									</>
								) : (
									<>no application yet</>
								)}
							</p>
						</div>
					))}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Received;
