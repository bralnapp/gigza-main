import { IuserBids,JobDetailsProps } from '@custom-types/typing';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useStoreContext } from "context/StoreContext";
import { useEffect } from "react";
import { initGigzaContract } from "utils/helper";

interface useGetJobBidsType  {
	proposal: IuserBids[] | [];
	job: undefined | JobDetailsProps[number] ;   
}

const useGetJobBids = (jobId: number | string | string[] | undefined):useGetJobBidsType => {
	const { state } = useStoreContext();
	const [proposal, setProposal] = useState<IuserBids[] | []>([]);
	const [job, setJob] = useState<undefined | JobDetailsProps[number]>()

	const getJobBids = async () => {
		let freelancerProposal:IuserBids[] = []
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
            const _job:JobDetailsProps[number] = await contract.jobs(jobId)
			const jobBids:IuserBids[] = await contract.getJobBids(jobId);
			for (let index = 0; index < jobBids.length; index++) {
				const jobBid = jobBids[index];
				if (jobBid?.freelancer?.toLowerCase() === state.account?.toLowerCase()) {
					freelancerProposal.push(jobBid)
				}
			}
			setJob(_job)
			setProposal(freelancerProposal)
		} catch (error: any) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		getJobBids();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account]);
	return { proposal, job };
};

export default useGetJobBids;
