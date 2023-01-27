import { toast } from "react-hot-toast";
import { JobDetailsProps } from "@custom-types/typing";
import { useEffect, useState } from "react";
import { initGigzaContract } from "utils/helper";

type useGetJobDetailsProps = {
	jobDetails: JobDetailsProps[number] | null;
};

const useGetJobDetails = (
	jobId: number | undefined | string | string[]
): useGetJobDetailsProps => {
	const [jobDetails, setJobDetails] = useState<JobDetailsProps[number] | null>(
		null
	);

	const getJobDetails = async () => {
		try {
			const response = await initGigzaContract();
			// @ts-ignore
			const contract = response.contract;
			const _jobDetails = await contract.jobs(jobId);
			console.log(_jobDetails);
			setJobDetails(_jobDetails);
		} catch (error) {
			toast.error("Something went wrong, could not get job details");
			console.log({ error });
		}
	};

	useEffect(() => {
		if (jobId) {
			getJobDetails();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jobId]);
	return {
		jobDetails
	};
};

export default useGetJobDetails;
