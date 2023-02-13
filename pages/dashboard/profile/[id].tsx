import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	EditProfileButton,
	SendMessageButton
} from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Stars from "@/modules/dashboard/components/stars";
import {
	ProfileAbout,
	ProfileReviews
} from "@/modules/dashboard/sections/profile";
import Image from "next/image";
import { useAccount, useContractRead } from "wagmi";
import {
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useRouter } from "next/router";
import { IReviews } from "@custom-types/typing";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

const UserProfile = () => {
	const router = useRouter();
	const { id: freelancerAddress } = router.query;

	const [activeIndex, setActiveIndex] = useState(0);
	const sections = ["reviews", "about"];

	const { address } = useAccount();

	const { data: userDetails, isError } = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUser",
		args: [freelancerAddress]
	});

	const { data: reviews }: { data: IReviews | undefined } = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getReviews",
		args: [freelancerAddress]
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
			router.push("/dashboard/find-talents");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError]);
	return (
		<DashboardLayout>
			{/* header image */}
			<div className="h-[100px] bg-profile-background bg-cover bg-no-repeat min-[540px]:h-[140px] md:h-[212px]" />
			<div className="dashboard-layout-container -mt-10 flex items-center justify-between">
				<div className="items-center md:flex md:space-x-5">
					<div className="h-20 w-20 rounded-full md:h-[164px] md:w-[164px]">
						<Image
							// @ts-ignore
							src={userDetails?.profileUrl || profileAvatar}
							alt=""
							className="h-20 w-20 rounded-full object-cover md:h-[164px] md:w-[164px]"
							width={80}
							height={80}
						/>
					</div>
					<div className="mt-4 md:mt-8">
						<h3 className="text-xl font-bold capitalize leading-6 text-b1 md:text-[32px]  md:leading-[38px]">
							{/* @ts-ignore */}
							{userDetails?.name}
						</h3>
						<p className="my-[6px] text-[13px] capitalize leading-4 text-b3 md:my-2">
							{/* @ts-ignore */}
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
					{freelancerAddress === address ? (
						<EditProfileButton />
					) : (
						<SendMessageButton />
					)}
				</div>
			</div>
			<div className="mt-[17px] border-stroke md:mt-3 md:border-b">
				<div className="dashboard-layout-container border-b border-stroke md:border-none">
					<div className="hidden justify-end md:flex xl:pr-[100px]">
						{freelancerAddress === address ? (
							<EditProfileButton />
						) : (
							<SendMessageButton />
						)}
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

export default UserProfile;
