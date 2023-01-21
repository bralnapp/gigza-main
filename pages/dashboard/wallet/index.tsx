import { RecentTransaction, WalletBalance } from "@/modules/dashboard/sections/wallet";
import DashboardLayout from "@/modules/dashboard/components/layout";

const Wallet = () => {
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 pb-[111px]">
				<WalletBalance />
                <RecentTransaction />
			</div>
		</DashboardLayout>
	);
};

export default Wallet;
