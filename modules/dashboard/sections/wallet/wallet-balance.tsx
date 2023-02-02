import numeral from "numeral";
import { DaiContractAbi, DiaContractAddress, formatUnit } from "utils/helper";
import { useAccount, useContractRead } from "wagmi";

const WalletBalance = () => {
	const { address } = useAccount();
	const { data: balance } = useContractRead({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		functionName: "balanceOf",
		args: [address]
	});
	console.log("bal", balance);
	return (
		<div className="mb-[22px] rounded-lg bg-white p-4 min-[540px]:py-8 min-[540px]:px-6">
			<p className="mb-1 text-sm capitalize leading-[17px] text-b4 min-[540px]:text-[18px] min-[540px]:leading-[22px]">
				wallet Balance
			</p>
			<h3 className="text-2xl font-bold leading-[29px] min-[540px]:text-4xl min-[540px]:leading-[43px]">
				DAI {numeral(formatUnit(balance)).format(",") || 0}
			</h3>
		</div>
	);
};

export default WalletBalance;
