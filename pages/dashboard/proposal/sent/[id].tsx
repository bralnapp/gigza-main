import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import {
	formatUnit,
	covertToReadableDate,
	GigzaContractAddress,
	GigzaContractAbi
} from "utils/helper";
import { NextPageContext } from "next";
import { BigNumberData, IuserBids } from "@custom-types/typing";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";

type SentProposalDetailsProps = {
	job: {
		1: string;
		2: string;
		8: number;
	};
	jobBidsById: {
		0: BigNumberData;
		1: string;
		2: BigNumberData;
		3: `0x${string}`;
		4: number;
	}[];
};

const SentProposalDetails = ({
	job,
	jobBidsById
}: SentProposalDetailsProps) => {
	const router = useRouter();
	const { address } = useAccount();
	const freelancerProposal = jobBidsById.filter(
		(item) => item?.[3].toLowerCase() === address?.toLowerCase()
	);

	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-[41px]">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="w-28 border border-[#D9D9D9] bg-[#F5F5F5] text-[#5F6062] md:w-[137px]"
				/>
			</div>
			<div className="mx-auto mt-8 w-11/12 max-w-3xl bg-white py-5 px-4 md:py-10 md:px-8">
				<h1 className="mb-4 text-base font-bold leading-[19px] text-b1 md:text-[32px] md:leading-[38px]">
					{job?.[1]}
				</h1>
				<p className="mb-8 whitespace-pre-wrap text-sm leading-[21px] text-b3">
					{job?.[2]}
				</p>
				{/* proposal  */}
				<h3 className="mb-4 text-base font-bold capitalize leading-[19px] text-b1 md:mb-8 md:text-xl md:leading-6">
					Your proposal
				</h3>
				<p className="whitespace-pre-wrap text-sm leading-[17px] text-b3">
					{freelancerProposal?.[0]?.[1]}
				</p>
				{/* project timeline  */}
				<h3 className="mt-8 mb-3 text-base font-bold capitalize leading-5 text-[#101828] md:text-xl md:leading-6">
					project Deadline{" "}
				</h3>
				<p className="text-base leading-[19px] text-b2 ">
					{covertToReadableDate(
						formatUnit(freelancerProposal?.[0]?.[2])! * 10 ** 18
					)}
				</p>

				{/* project status */}
				<h3 className="mt-8 mb-3 text-base font-bold capitalize leading-5 text-[#101828]">
					project status
				</h3>
				<p
					className={`text-sm capitalize italic leading-[19px] ${
						job?.[8] === 0 ? "text-[#0E9802]" : "text-[#F02323]"
					}`}
				>
					{job?.[8] === 0 ? "open" : "closed"}
				</p>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	const { id: jobId } = context.query;

	try {
		const jobById = await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		});

		const jobBidsById = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getJobBids",
			args: [jobId]
		})) as IuserBids[];

		return {
			props: {
				job: JSON.parse(JSON.stringify(jobById)),
				jobBidsById: JSON.parse(JSON.stringify(jobBidsById))
			}
		};
	} catch (error) {
		if (error) {
			return {
				redirect: {
					destination: "/dashboard/proposal/sent",
					permanent: false
				}
			};
		}
	}
};

export default SentProposalDetails;
