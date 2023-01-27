import { IuserBids } from '@custom-types/typing';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useStoreContext } from "context/StoreContext";
import { useEffect } from "react";
import { initGigzaContract } from "utils/helper";

const useGetJobBids = (jobId: number) => {
	const { state } = useStoreContext();
	const [jobBids, setjobBids] = useState();

	const getJobBids = async () => {
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
            const job = await contract.jobs(jobId)
			const jobbids:IuserBids[] = await contract.getJobBids(jobId);
            const freelancerProposal = jobBids?.filter(item => item.freelance === '"0x247915f6492ef3cfb1A8A48A75B24dDDE2FD0ae5"')
			console.log(jobbids);
			// setTotalJobs(totalJobs);
		} catch (error: any) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		getJobBids();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account]);
	return { jobBids, job };
};

export default useGetJobBids;
