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
		const notification = toast.loading("Minting testnet Dai");
		setIsFundingWallet(true);

		try {
			// @ts-ignore
			const txHash = await initDaiContract!.mint();
			const receipt = await txHash.wait();
			if (receipt) {
				setIsFundingWallet(false);
				refetch();
				toast.success("Testnet Dai has been minted successfully", {
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

			<div className="mt-10 flex items-center space-x-10">
				<Button
					disabled={isFundingWallet}
					onClick={() => fundWallet()}
					title="Mint testnet Dai"
					className="h-10 px-2"
				/>
				<Button
					href="/dashboard/contract"
					title="My contracts"
					className="h-10 bg-[#EBEEF2] px-3 text-[#5F6062]"
				/>
			</div>
		</div>
	);
};

export default WalletBalance;
