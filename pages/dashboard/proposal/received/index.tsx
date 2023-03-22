import DashboardLayout from "@/modules/dashboard/components/layout";
import { BigNumberData, JobDetailsProps } from "@custom-types/typing";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import {
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";

type Bids = {
	0: BigNumberData;
	1: string;
	2: BigNumberData;
	3: `0x${string}`;
	4: number;
}[];

type ReceivedProps = {
	totalJobs: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: Bids;
		9: BigNumberData;
		10: number;
	}[];
};

const Received = ({ totalJobs }: ReceivedProps) => {
	const router = useRouter();

	const { address } = useAccount();

	const jobPostedByUser = totalJobs.filter(
		(item) => item?.[4].toLowerCase() === address?.toLowerCase()
	);

	const handleClick = (jobId: BigNumberData, jobBids: Bids) => {
		const _jobId = Math.trunc(formatUnit(jobId)! * 10 ** 18);
		if (jobBids.length === 0) {
			toast.error("There is no bids available");
			return;
		}
		router.push(`/dashboard/proposal/received/${_jobId}`);
	};

	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-8 pb-[95px] min-[540px]:pt-[42px] lg:pb-[141px]">
				<h1 className="text-xl font-bold capitalize leading-5 text-b1 min-[540px]:text-2xl md:text-[28px] md:leading-[34px]">
					received proposals ({jobPostedByUser?.length})
				</h1>

				{jobPostedByUser.length ? (
					<div className="mt-4 space-y-5 min-[540px]:mt-8">
						{[...jobPostedByUser]?.reverse()?.map((item, index) => (
							<div
								key={`received-proposals-${index}`}
								onClick={() => handleClick(item?.[0], item?.[8])}
								className="block cursor-pointer rounded-lg bg-white py-4 px-3 min-[540px]:py-6 min-[540px]:px-5"
							>
								<div className="flex items-start justify-between">
									<h4 className="w-11/12 text-base font-bold leading-[19px] text-b2">
										{item?.[1]}
									</h4>
									<p
										className={`text-sm capitalize italic leading-[19px] ${
											+item?.[10] === 0 ? "text-[#0E9802]" : "text-[#F02323]"
										}`}
									>
										{+item?.[10] === 0 ? "opened" : "closed"}
									</p>
								</div>

								<p className="my-[15px] text-sm leading-[21px] text-b4 line-clamp-3 min-[540px]:w-4/5">
									{item?.[2]}
								</p>
								<p className="text-sm capitalize leading-[17px] text-b1">
									{item?.[8].length ? (
										<>
											{item?.[8].length} application
											{`${item?.[8].length > 1 ? "s" : ""}`}
										</>
									) : (
										<>no application yet</>
									)}
								</p>
							</div>
						))}
					</div>
				) : null}
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

export default Received;
