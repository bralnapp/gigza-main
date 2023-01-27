import { toast } from "react-hot-toast";
import { initGigzaContract } from "utils/helper/contract.helper";
import { useEffect } from "react";
import { useState } from "react";
import { useStoreContext } from "context/StoreContext";
import {  JobDetailsProps, ProposalType } from "@custom-types/typing";

type useGetProposalsProps = {
    sentProposals: ProposalType[] | [],
    receivedProposals: any,
}

const useGetProposals = ():useGetProposalsProps => {
	const { state } = useStoreContext();
	const [sentProposals, setSentproposals] = useState<ProposalType[] | []>([]);
	const [receivedProposals, setReceivedproposals] = useState<ProposalType | []>(
		[]
	);

	const getSentProposals = async () => {
		let proposal:ProposalType[] = [];

		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const totalJobs = await contract.getTotalJobs();

			for (let index = 0; index < totalJobs.length; index++) {
				const _job:JobDetailsProps[number] = totalJobs[index];
				console.log(`job ${index} :`, _job);
				const jobBids = _job.userBids.filter(
					(item) =>
						item.freelancer === "0x247915f6492ef3cfb1A8A48A75B24dDDE2FD0ae5"
				);
				if (jobBids.length) {
					proposal.push({ 
                        job: _job,
                        proposals:jobBids, 
                    });
				}
			}
			setSentproposals(proposal);
			console.log("hook proposal value", proposal);
		} catch (error: any) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		getSentProposals();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account]);

	return {
		sentProposals,
		receivedProposals
	};
};

export default useGetProposals;
