import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import Stars from "@/modules/dashboard/components/stars";
import {
	ProfileAbout,
	ProfileReviews
} from "@/modules/dashboard/sections/profile";
import { Button } from "@/modules/common/components/input/button";
import { toast } from "react-hot-toast";
import { useAccount, useContractRead } from "wagmi";
import {
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";
import { IReviews, UserProfileType } from "@custom-types/typing";

export type userDetailsType = {
	name: string;
	bio: string;
	skills: string[];
	profileUrl: string;
	mainSkill: string;
};

const Profile = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const sections = ["reviews", "about"];

	const { address } = useAccount();
	const {
		data: userDetails,
		isError
	}: {
		data: UserProfileType | undefined;
		isError: boolean;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUser",
		args: [address]
	});

	const { data: reviews }: { data: IReviews | undefined } = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getReviews",
		args: [address]
	});

	const calculateRating = useMemo(() => {
		return (
			reviews?.reduce(
				(total, b) => total + formatUnit(b?.rating)! * 10 ** 18,
				0
			)! / reviews?.length!
		);
	}, [reviews]);

	useEffect(() => {
		if (isError) {
			toast.error("Opps!!!... something went wrong");
		}
	}, [isError]);

	return (
		<DashboardLayout>
			{/* header image */}
			<div className="h-[100px] bg-profile-background bg-cover bg-no-repeat min-[540px]:h-[140px] md:h-[212px]" />
			<div className="dashboard-layout-container -mt-10 flex items-center justify-between">
				<div className="items-center md:flex md:space-x-5">
					<div className="h-20 w-20 rounded-full md:h-[164px] md:w-[164px]">
						<Image
							src={userDetails?.profileUrl || profileAvatar}
							alt=""
							className="h-20 w-20 rounded-full object-cover md:h-[164px] md:w-[164px]"
							width={80}
							height={80}
						/>
					</div>
					<div className="mt-4 md:mt-8">
						<h3 className="text-xl font-bold capitalize leading-6 text-b1 md:text-[32px]  md:leading-[38px]">
							{userDetails?.name}
						</h3>
						<p className="my-[6px] text-[13px] capitalize leading-4 text-b3 md:my-2">
							{userDetails?.mainSkill}
						</p>
						<div className="flex items-center space-x-2">
							<Stars reviews={calculateRating} />
							<p className="text-sm capitalize leading-[17px] text-b4">
								{calculateRating || null} ({reviews?.length} reviews)
							</p>
						</div>
					</div>
				</div>
				<div className="md:hidden">
					{/* {userDetails?.name ? <EditProfileButton /> : null } */}
				</div>
			</div>
			<div className="mt-[17px] border-stroke md:mt-3 md:border-b">
				<div className="dashboard-layout-container border-b border-stroke md:border-none">
					<div className="hidden justify-end md:flex xl:pr-[100px]">
						<Button
							href={
								userDetails?.name
									? "/dashboard/profile/edit"
									: "/dashboard/profile/create"
							}
							title={userDetails?.name ? "Edit Profile" : "Create Profile"}
							className="h-[42px] w-[125px] border border-primary bg-white text-primary"
						/>
						{/* {userDetails?.name ? <EditProfileButton /> : null} */}
					</div>
					<div className="flex items-center">
						{sections.map((item, index) => (
							<div
								key={index}
								className={`cursor-pointer py-2 px-4 text-sm font-bold capitalize leading-[18px] min-[540px]:text-base md:pb-6 ${
									activeIndex === index
										? "border-b-2 border-primary text-primary"
										: "text-b4"
								} `}
								onClick={() => setActiveIndex(index)}
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>

			<section className="dashboard-layout-container mt-6 pb-[47px] min-[540px]:mt-8 lg:pb-[149px]">
				{activeIndex === 0 ? (
					<ProfileReviews {...{ reviews }} />
				) : (
					// @ts-ignore
					<ProfileAbout {...{ userDetails }} />
				)}
			</section>
		</DashboardLayout>
	);
};

export default Profile;
