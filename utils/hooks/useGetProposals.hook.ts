import { toast } from "react-hot-toast";
import { initGigzaContract } from "utils/helper/contract.helper";
import { useEffect } from "react";
import { useState } from "react";
import { useStoreContext } from "context/StoreContext";
import {  JobDetailsProps, ProposalType, ReceivedProposalType } from "@custom-types/typing";

type useGetProposalsProps = {
    sentProposals: ProposalType[] | [],
    receivedProposals: ReceivedProposalType,
}

const useGetProposals = ():useGetProposalsProps => {
	const { state } = useStoreContext();
	// kindly note the ProposalType is type declaration for sent proposals
	const [sentProposals, setSentproposals] = useState<ProposalType[] | []>([]);
	const [receivedProposals, setReceivedproposals] = useState<ReceivedProposalType | []>(
		[]
	);

	const getProposals = async () => {
		let proposal:ProposalType[] = [];
		let jobsPostedByUser:JobDetailsProps[number][] = []


		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const totalJobs = await contract.getTotalJobs();
			// get proposal sent by freelancers
			for (let index = 0; index < totalJobs.length; index++) {
				const _job:JobDetailsProps[number] = totalJobs[index];
				const jobBids = _job.userBids.filter(
					(item) =>
						item?.freelancer?.toLowerCase() === state.account?.toLowerCase()
				);
				if (jobBids.length) {
					proposal.push({ 
                        job: _job,
                        proposals:jobBids, 
                    });
				}
			}
			// get proposal received by job posters
			for (let index = 0; index < totalJobs.length; index++) {
				// get all jobs posted by a user
				const _job:JobDetailsProps[number] = totalJobs[index];
				if (_job.client === "0x5c12DB1E016bEa19aeD67C125dc5b036e39320Cb") {
					jobsPostedByUser.push(_job)
				}

			}
			if (jobsPostedByUser.length) {
				const _jobsPostedByUser = [...jobsPostedByUser]
				setReceivedproposals(jobsPostedByUser)
			}
			setSentproposals(proposal);
		} catch (error: any) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		getProposals();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account]);

	return {
		sentProposals,
		receivedProposals
	};
};

export default useGetProposals;



