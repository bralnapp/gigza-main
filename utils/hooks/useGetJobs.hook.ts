import { toast } from "react-hot-toast";
import { useStoreContext } from "context/StoreContext";
import { useEffect, useState } from "react";
import { JobDetailsProps } from "@custom-types/typing";
import { initGigzaContract } from "utils/helper";

type useGetJobsProps = {
	totalJobs: JobDetailsProps;
};

const useGetJobs = (): useGetJobsProps => {
	const [totalJobs, setTotalJobs] = useState<JobDetailsProps>([]);
	const { state } = useStoreContext();

	const getGetTotalJobs = async () => {
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const totalJobs = await contract.getTotalJobs();
			setTotalJobs(totalJobs);
		} catch (error: any) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		getGetTotalJobs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account]);
	return {
		totalJobs
	};
};

export default useGetJobs;
