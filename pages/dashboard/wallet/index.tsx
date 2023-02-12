import {
	RecentTransaction,
	WalletBalance
} from "@/modules/dashboard/sections/wallet";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { readContract } from "@wagmi/core";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { JobDetailsProps } from "@custom-types/typing";
import { ItotalJobs } from "../find-work";

type WalletProps = {
	totalJobs: ItotalJobs;
};

const Wallet = ({ totalJobs }: WalletProps) => {
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 pb-[111px]">
				<WalletBalance />
				<RecentTransaction {...{ totalJobs }} />
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async () => {
	const totalJobs = (await readContract({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	})) as JobDetailsProps;

	return {
		props: {
			totalJobs: JSON.parse(JSON.stringify(totalJobs))
		}
	};
};

export default Wallet;
