import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import {
	JobDetailsProps,
	ProposalType,
	ReceivedProposalType
} from "@custom-types/typing";

type useGetProposalsProps = {
	sentProposals: ProposalType[] | [];
	receivedProposals: ReceivedProposalType;
};

const useGetProposals = (): useGetProposalsProps => {
	const { address } = useAccount();

	// kindly note the ProposalType is type declaration for sent proposals
	const [sentProposals, setSentproposals] = useState<ProposalType[] | []>([]);
	const [receivedProposals, setReceivedproposals] = useState<
		ReceivedProposalType | []
	>([]);

	const { data: totalJobs }: { data: JobDetailsProps | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getTotalJobs"
		});

	const getProposals = () => {
		let proposal: ProposalType[] = [];
		let jobsPostedByUser: JobDetailsProps[number][] = [];
		// get proposal sent by freelancers
		for (let index = 0; index < totalJobs!.length; index++) {
			const _job: JobDetailsProps[number] = totalJobs![index];
			const jobBids = _job.userBids.filter(
				(item) => item?.freelancer?.toLowerCase() === address?.toLowerCase()
			);
			console.log("job", jobBids);
			if (jobBids.length) {
				proposal.push({
					job: _job,
					proposals: jobBids
				});
			}
		}
		// get proposal received by job posters
		for (let index = 0; index < totalJobs!.length; index++) {
			// get all jobs posted by a user
			const _job: JobDetailsProps[number] = totalJobs![index];
			if (_job?.client?.toLowerCase() === address?.toLowerCase()) {
				jobsPostedByUser.push(_job);
			}
		}
		if (jobsPostedByUser.length) {
			const _jobsPostedByUser = [...jobsPostedByUser];
			setReceivedproposals(jobsPostedByUser);
		}
		setSentproposals(proposal);
	};

	useEffect(() => {
		if (totalJobs) {
			getProposals();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalJobs,address]);

	return {
		sentProposals,
		receivedProposals
	};
};

export default useGetProposals;
