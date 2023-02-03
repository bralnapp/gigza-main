import { useRouter } from "next/router";
import Image from "next/image";
import useWindowSize from "utils/hooks/useWindowSize.hook";
import {
	covertToReadableDate,
	formatUnit,
	formatWalletAddress
} from "utils/helper";
import { JobDetailsProps } from "@custom-types/typing";

// images
import squareDot from "@/public/asset/icons/square-dot.svg";
import numeral from "numeral";

type RecentJobListProps = {
	jobList: JobDetailsProps;
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
			router.push(`/dashboard/find-work/${parseInt(jobList[index]?.jobId)}`);
		}
	};
	return (
		<div className="flex flex-col gap-y-5">
			{jobList?.map((item, index) => (
				<div
					key={`job-list-${index}`}
					onClick={() => handleClick(index)}
					className={`rounded-lg bg-white py-6 px-3 md:px-5 lg:cursor-pointer ${
						activeIndex == index ? "border-primary lg:border" : null
					}`}
				>
					<div className="mb-[14px] flex items-start justify-between min-[540px]:mb-2">
						<h3 className="w-4/5 text-base font-bold leading-[19px] text-b2 min-[540px]:text-xl min-[540px]:leading-6">
							{item?.title}
						</h3>
						<h4 className="text-sm font-bold leading-5 text-b2 min-[540px]:text-xl min-[540px]:leading-5">
							${numeral(formatUnit(item?.amount)).format(',')}
						</h4>
					</div>
					{/* job description */}
					<p className="text-sm leading-[17px] text-b2 line-clamp-3 min-[540px]:w-4/5 min-[540px]:leading-[21px]">
						{item?.description}
					</p>
					{/* skills */}
					<div className="my-3 flex flex-wrap gap-x-[11px] gap-y-[11px] min-[540px]:mt-4 min-[540px]:mb-[13px]">
						{item?.skills?.map((skill, index) => (
							<div
								key={`skills-${index}`}
								className="rounded bg-[#F5F5F5] py-1 px-[10px] text-[10px] capitalize leading-[18px] min-[540px]:py-[7px] min-[540px]:px-[14px] min-[540px]:text-[13px]"
							>
								{skill}
							</div>
						))}
					</div>
					<div className="flex items-center gap-x-2 text-[#5F6062]">
						<p className="text-[10px]  capitalize leading-4 min-[540px]:text-[13px]">
							{formatWalletAddress(item?.client)}
						</p>
						<Image src={squareDot} alt="" />
						<p className="text-[10px] leading-3 min-[540px]:text-[13px] min-[540px]:leading-4">
							Posted {/* @ts-ignore */}
							{covertToReadableDate(formatUnit(item?.timestamp) * 10 ** 18)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default RecentJobList;
