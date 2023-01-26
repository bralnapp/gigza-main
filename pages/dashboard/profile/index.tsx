import { useEffect, useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import Stars from "@/modules/dashboard/components/stars";
import {
	ProfileAbout,
	ProfileReviews
} from "@/modules/dashboard/sections/profile";
import {
	EditProfileButton,
	SendMessageButton
} from "@/modules/common/components/input/button";
import { initGigzaContract } from "utils/helper/contract.helper";
import { useStoreContext } from "context/StoreContext";
import { toast } from "react-hot-toast";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

export type userDetailsType = {
	name: string;
	bio: string;
	skills: string[];
	profileUrl: string;
	mainSkill: string;
};

const Profile = () => {
	const initialUserDetailsData = {
		name: '',
		bio: '',
		skills: [],
		profileUrl: '',
		mainSkill: '',
	}
	const [userDetails, setUserDetails] = useState<userDetailsType>(initialUserDetailsData);
	const [activeIndex, setActiveIndex] = useState(0);
	const sections = ["reviews", "about"];
	const { state } = useStoreContext();

	const getUserProfile = async () => {
		console.log("account", state.account);
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const userDetails = await contract.getUser(state.account);
			setUserDetails(userDetails);
			console.log(userDetails);
		} catch (error) {
			toast.error("Something went wrong, could not user details");
		}
	};

	useEffect(() => {
		getUserProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account]);
	return (
		<DashboardLayout>
			{/* header image */}
			<div className="h-[100px] bg-profile-background bg-no-repeat bg-cover min-[540px]:h-[140px] md:h-[212px]" />
			<div className="dashboard-layout-container flex items-center justify-between -mt-10">
				<div className="md:flex items-center md:space-x-5">
					<div className=" w-20 h-20 rounded-full md:h-[164px] md:w-[164px]">
						<Image
							src={userDetails?.profileUrl || profileAvatar}
							alt=""
							className="md:h-[164px] md:w-[164px]"
							width={80}
							height={80}
						/>
					</div>
					<div className="mt-4 md:mt-8">
						<h3 className="font-bold text-b1 capitalize text-xl md:text-[32px] leading-6  md:leading-[38px]">
							{userDetails?.name}
						</h3>
						<p className="text-b3 text-[13px] leading-4 capitalize my-[6px] md:my-2">
							{userDetails?.mainSkill}
						</p>
						<div className="flex items-center space-x-2">
							<Stars reviews={4} />
							<p className="capitalize text-b4 text-sm leading-[17px]">
								4.3 (6 reviews)
							</p>
						</div>
					</div>
				</div>
				<div className="md:hidden">
					{activeIndex === 0 ? <SendMessageButton /> : <EditProfileButton />}
				</div>
			</div>
			<div className="md:border-b border-stroke mt-[17px] md:mt-3">
				<div className="dashboard-layout-container border-b md:border-none border-stroke">
					<div className="hidden md:flex justify-end xl:pr-[100px]">
						{activeIndex === 0 ? <SendMessageButton /> : <EditProfileButton />}
					</div>
					<div className="flex items-center">
						{sections.map((item, index) => (
							<div
								key={index}
								className={`text-sm min-[540px]:text-base leading-[18px] font-bold capitalize py-2 px-4 md:pb-6 cursor-pointer ${
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

			<section className="mt-6 min-[540px]:mt-8 dashboard-layout-container pb-[47px] lg:pb-[149px]">
				{activeIndex === 0 ? (
					<ProfileReviews />
				) : (
					<ProfileAbout {...{ userDetails }} />
				)}
			</section>
		</DashboardLayout>
	);
};

export default Profile;
