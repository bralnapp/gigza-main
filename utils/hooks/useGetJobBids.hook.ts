import { useStoreContext } from "context/StoreContext";
import { useEffect, useState } from "react";
import { IuserBids, JobDetailsProps } from "@custom-types/typing";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead, useAccount } from "wagmi";
import { toast } from "react-hot-toast";

interface useGetJobBidsType {
	proposalByAFreelancer: IuserBids[] | [];
	job: undefined | JobDetailsProps[number];
	proposalsReceived: IuserBids[] | undefined;
}

const useGetJobBids = (
	jobId: number | string | string[] | undefined
): useGetJobBidsType => {
	const [proposalByAFreelancer, setProposalByAFreelancer] = useState<
		IuserBids[] | []
	>([]);
	const [proposalsReceived, setProposalsReceived] = useState<
		IuserBids[] | undefined
	>();
    const [job, setJob] = useState<undefined | JobDetailsProps[number]>();

	const { address } = useAccount();
	const { initGigzaContract } = useStoreContext();

	const { data: _job }: { data: JobDetailsProps[number] | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		});

	const getJobBids = async () => {
		let freelancerProposal: IuserBids[] = [];
		try {
			// @ts-ignore
			const jobBids: IuserBids[] = await initGigzaContract!.getJobBids(jobId);
			console.log("jobBids", jobBids);
			for (let index = 0; index < jobBids.length; index++) {
				const jobBid = jobBids[index];
				if (jobBid?.freelancer?.toLowerCase() === address!.toLowerCase()) {
					freelancerProposal.push(jobBid);
				}
			}
			setProposalByAFreelancer(freelancerProposal);
			setProposalsReceived(jobBids);
            setJob(_job)
		} catch (error: any) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		getJobBids();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		proposalByAFreelancer,
		job,
		proposalsReceived
	};
};

export default useGetJobBids;
