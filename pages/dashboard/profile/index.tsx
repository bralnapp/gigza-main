import { useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import Stars from "@/modules/dashboard/components/stars";
import {
	ProfileAbout,
	ProfileReviews
} from "@/modules/dashboard/sections/profile";
import {
	Button,
	EditProfileButton,
	SendMessageButton
} from "@/modules/common/components/input/button";

// images
import bgImage from "@/public/asset/images/profile-background.svg";
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

const Profile = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const sections = ["reviews", "about"];
	return (
		<DashboardLayout>
			{/* header image */}
			<div className="h-[100px] min-[540px]:h-[140px] md:h-[212px]">
				<Image src={bgImage} alt="" className="w-full h-full object-cover" />
			</div>
			<div className="dashboard-layout-container flex items-center justify-between -mt-10">
				<div className="md:flex items-center md:space-x-5">
					<Image
						src={profileAvatar}
						alt=""
						className="md:h-[164px] md:w-[164px]"
					/>
					<div className="mt-4 md:mt-8">
						<h3 className="font-bold text-b1 capitalize text-xl md:text-[32px] leading-6  md:leading-[38px]">
							Peter michael
						</h3>
						<p className="text-b3 text-[13px] leading-4 capitalize my-[6px] md:my-2">
							Product Designer
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
				{activeIndex === 0 ? <ProfileReviews /> : <ProfileAbout />}
			</section>
		</DashboardLayout>
	);
};

export default Profile;
