import { Button } from "@/modules/common/components/input/button";
import { useStoreContext } from "context/StoreContext";
import numeral from "numeral";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { DaiContractAbi, DiaContractAddress, formatUnit } from "utils/helper";
import { useAccount, useContractRead } from "wagmi";

const WalletBalance = () => {
	const [isFundingWallet, setIsFundingWallet] = useState(false);
	const { initDaiContract } = useStoreContext();
	const { address } = useAccount();
	const { data: balance, refetch } = useContractRead({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		functionName: "balanceOf",
		args: [address]
	});

	const fundWallet = async () => {
		const notification = toast.loading("Funding wallet");
		setIsFundingWallet(true);

		try {
			// @ts-ignore
			const txHash = await initDaiContract!.mint();
			const receipt = await txHash.wait();
			if (receipt) {
				setIsFundingWallet(false);
				refetch();
				toast.success("Wallet has been funded", {
					id: notification
				});
			}
		} catch (error) {
			setIsFundingWallet(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
		}
	};

	return (
		<div className="mb-[22px] rounded-lg bg-white p-4 min-[540px]:py-8 min-[540px]:px-6">
			<p className="mb-1 text-sm capitalize leading-[17px] text-b4 min-[540px]:text-[18px] min-[540px]:leading-[22px]">
				wallet Balance
			</p>
			<h3 className="text-2xl font-bold leading-[29px] min-[540px]:text-4xl min-[540px]:leading-[43px]">
				DAI {numeral(formatUnit(balance)).format(",") || 0}
			</h3>

			<Button
				disabled={isFundingWallet}
				onClick={() => fundWallet()}
				title="Fund wallet"
				className="mt-10 h-10 w-[120px]"
			/>
		</div>
	);
};

export default WalletBalance;
