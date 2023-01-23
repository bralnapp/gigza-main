import { useRouter } from "next/router";
import Image from "next/image";
import useWindowSize from "utils/hooks/useWindowSize.hook";
import { recentJobs } from "utils/data";
import { covertToReadableDate, formatUnit, formatWalletAddress } from "utils/helper";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";

type RecentJobListProps = {
	jobList: typeof recentJobs;
	activeIndex: number;
	handleSelect: (value: number) => void;
};

const RecentJobList = ({
	jobList,
	activeIndex,
	handleSelect
}: RecentJobListProps) => {
	const router = useRouter();
	const { width } = useWindowSize();

	const handleClick = (index: number) => {
		if (width! >= 1024) {
			handleSelect(index);
		} else {
			router.push(`/dashboard/find-work/${index}`);
		}
	};

	return (
		<div className="flex flex-col gap-y-5">
			{jobList?.map((item, index) => (
				<div
					key={`job-list-${index}`}
					onClick={() => handleClick(index)}
					className={`rounded-lg bg-white py-6 px-3 md:px-5 lg:cursor-pointer ${
						activeIndex == index ? "lg:border border-primary" : null
					}`}
				>
					<div className="flex items-start justify-between mb-[14px] min-[540px]:mb-2">
						<h3 className="font-bold text-b2 text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 w-4/5">
							{item?.title}
						</h3>
						<h4 className="text-sm leading-5 text-b2 font-bold min-[540px]:text-xl min-[540px]:leading-5">
							${formatUnit(item?.amount)}
						</h4>
					</div>
					{/* job description */}
					<p className="text-b2 text-sm leading-[17px] min-[540px]:leading-[21px] min-[540px]:w-4/5 line-clamp-3">
						{item?.description}
					</p>
					{/* skills */}
					<div className="flex flex-wrap gap-x-[11px] gap-y-[11px] my-3 min-[540px]:mt-4 min-[540px]:mb-[13px]">
						{item?.skills?.map((skill, index) => (
							<div
								key={`skills-${index}`}
								className="rounded bg-[#F5F5F5] py-1 min-[540px]:py-[7px] px-[10px] min-[540px]:px-[14px] capitalize text-[10px] min-[540px]:text-[13px] leading-[18px]"
							>
								{skill}
							</div>
						))}
					</div>
					<div className="flex items-center gap-x-2 text-[#5F6062]">
						<p className="capitalize  text-[10px] min-[540px]:text-[13px] leading-4">
							{formatWalletAddress(item?.client)}
						</p>
						<Image src={squareDot} alt="" />
						<p className="text-[10px] min-[540px]:text-[13px] leading-3 min-[540px]:leading-4">
							Posted {covertToReadableDate(formatUnit(item?.timestamp) * 10 ** 18)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default RecentJobList;
