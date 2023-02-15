import React from "react";
import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import { UserProfileType } from "@custom-types/typing";
import StarRating from "./star-rating";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type TalentListProps = {
	filteredUsers: UserProfileType[] | undefined;
};

const TalentList = ({ filteredUsers }: TalentListProps) => {
	return (
		<div className="space-y-4 min-[540px]:py-6 lg:px-5">
			{filteredUsers?.map((item, index) => (
				<div
					key={`users-profile-${index}`}
					className="items-start justify-between bg-white py-5 px-4 md:flex"
				>
					<div className="mb-4 md:mb-0">
						<div className="flex items-center gap-x-3 min-[540px]:items-start">
							<Image
								src={item?.profileUrl || profileAvatar}
								alt=""
								width={48}
								height={48}
								className="h-12 w-12 rounded-full object-cover"
							/>
							<div className="">
								<div className="mb-[11px] grid grid-cols-[2fr_1fr] items-center min-[540px]:flex min-[540px]:gap-x-3">
									<h3 className="text-base font-bold capitalize leading-[19px] text-b1">
										{item?.name}
									</h3>
									<StarRating address={item?.userAddress!} />
								</div>
								<p className="text-[13px] capitalize leading-4 text-b3 min-[540px]:text-sm">
									{item?.mainSkill} • 15 contracts
								</p>
								{/* skills for desktop screens */}
								<div className="mt-[10px] hidden flex-wrap items-center gap-[10px] min-[540px]:flex">
									{item?.skills?.slice(0,5)?.map((skill, index) => (
										<div
											key={`users-profile-skills-${index}`}
											className="rounded bg-[#F5F5F5] px-2 py-[5px] text-[10px] capitalize leading-3 text-[#333] min-[540px]:px-[9px] min-[540px]:py-2 min-[540px]:text-xs min-[540px]:leading-[18px]"
										>
											{skill}
										</div>
									))}
								</div>
							</div>
						</div>
						{/* skills for mobile screens */}
						<div className="mt-[10px] flex flex-wrap items-center gap-[10px] min-[540px]:hidden">
							{item?.skills?.slice(0,5)?.map((skill, index) => (
								<div
									key={`users-profile-skills-${index}`}
									className="rounded bg-[#F5F5F5] px-2 py-[5px] text-[10px] capitalize leading-3 text-[#333]"
								>
									{skill}
								</div>
							))}
						</div>
					</div>
					<Button
						href={`/dashboard/profile/${item?.userAddress}`}
						title="View Profile"
						className="h-8 w-full border border-stroke bg-white text-sm leading-[18px] text-primary md:w-[100px]"
					/>
				</div>
			))}
		</div>
	);
};

export default TalentList;
