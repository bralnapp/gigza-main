import { JobDetailsProps } from "@custom-types/typing";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";

type ReviewJobTitleProps = {
	jobId: number;
};

const ReviewJobTitle = ({ jobId }: ReviewJobTitleProps) => {
	const { data: job }: { data: JobDetailsProps[number] | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "jobs",
			args: [jobId]
		});
	return (
		<h4 className="mt-[15px] text-base font-bold  leading-[19px] text-b2 min-[540px]:mt-[23px] min-[540px]:w-4/5 min-[540px]:text-xl  min-[540px]:leading-6">
			{job?.title}
		</h4>
	);
};

export default ReviewJobTitle;
