import { Button } from "@/modules/common/components/input/button";
import GoBack from "@/modules/dashboard/components/go-back";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Status from "@/modules/dashboard/components/status";

// images
import chatIcon from "@/public/asset/icons/chat.svg";

const TransactionDetails = () => {
	return (
		<DashboardLayout>
			<div className="layout-container max-w-[700px] pt-8">
				<section className="py-6 px-4">
					<GoBack />
					<h1 className="mt-[21px] capitalize font-bold text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 text-[#192839]">
						transaction details
					</h1>

					<div className="mt-4 min-[540px]:mt-9 mb-6 min-[540px]:mb-10 space-y-4 capitalize">
						<div className="flex justify-between">
							<div className="text-b2 leading-[18px] text-sm">Amount($)</div>
							<div className="text-base leading-5 text-primary2">$1,000</div>
						</div>
						<div className="flex justify-between">
							<div className="text-b2 leading-[18px] text-sm">date</div>
							<div className="text-base leading-5 text-primary2">
								22 Jun, 2022, 19:25PM
							</div>
						</div>
						<div className="flex justify-between">
							<div className="text-b2 leading-[18px] text-sm">status</div>
							<div>
								<Status
									title="Payment pending"
									intent="pending"
									className="w-fit"
								/>
							</div>
						</div>
					</div>

					<Button
						href=""
						icon={chatIcon}
						title="Send a message"
						className="mb-4 min-[540px]:mb-8 w-full text-white"
					/>
					<Button
						// onClick={() => setShowDisputeModal(true)}
						title="open dispute"
						className="bg-white border border-[#E3E8EB] w-full text-[#4A4A4A]"
					/>
				</section>
			</div>
		</DashboardLayout>
	);
};
export default TransactionDetails;
