import { useRouter } from "next/router";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import avatar from "@/public/asset/avatar/profile-avatar.svg";
import chatIcon from "@/public/asset/icons/message-square.svg";

const ContractDetails = () => {
	const router = useRouter();
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-[26px] lg:pt-[42px] mb-7 min-[540px]:pb-[118px]">
				<button
					onClick={() => router.back()}
					className="mb-[19px] flex items-center gap-x-[9px] lg:hidden"
				>
					<Image src={chevronLeft} alt="" />
					<p className="text-base text-[#5F6062] capitalize">go back</p>
				</button>
				<Button
					title="Cancel"
					onClick={() => router.back()}
					className="hidden lg:flex bg-[#F3F4F5] border border-[#D9D9D9] text-[#5F6062] w-[115px]"
				/>

				<div className="lg:mt-[47px] lg:grid grid-cols-2 xl:grid-cols-[2fr_1fr] lg:gap-x-16">
					<div className="lg:py-6 lg:px-5">
						<h3 className="text-b1 font-bold capitalize text-xl min-[540px]:text-[24px] leading-6 min-[540px]:leading-[29px] mb-4 min-[540px]:mb-8">
							contract
						</h3>
						<h4 className="font-bold text-b1 capitalize text-base min-[540px]:text-lg leading-5 min-[540px]:leading-5">
							Graphics design
						</h4>
						<p className="text-b3 text-sm leading-[17px] min-[540px]:leading-[21px] my-4 min-[540px]:mb-8">
							Hello!
							<br />
							<br />
							Hello! My name is Ryan and I run the "SagaTheYoungin" YouTube
							channel: https://www.youtube.com/channel/UCs-erbeCJNu-NqSoQ80w9fQ
							<br />
							<br />
							This type of work is freelance, and I will have a slow but steady
							stream of color scenes over a long period of time.
							<br />
							<br />
							In order to apply for this job, please complete the test
							scene/application scene (download link at the bottom of this
							listing), and email it to bkartistscenetest@gmail.com. I will get
							back to you with a decision within a week!
							<br />
							<br />
							This project will include providing guidance on branding, new page
							layout/structure, conversion optimization, and more. For the scope
							of this initial phase, I would like to focus on five high-quality
							pages.
							<br />
							<br />
							Additional work related to creating packaging and print materials
							is available if you are interested.
							<br />
							<br />
							Thank you!
						</p>

						{/* duration */}
						<h4 className="font-bold capitalize text-base leading-[19px] mb-2 min-[540px]:mb-4">
							duration
						</h4>
						<p className="text-b2 text-sm leading-[17px]">
							2weeks Sept 1, 2022
						</p>

						<div className="flex items-center gap-x-5 mt-4 mb-6">
							<Button
								title="decline offer"
								className="w-[180px] text-[#F02323] font-normal border border-[#F02323] bg-white"
							/>
							<Button
								title="accept contract"
								className="w-[180px] font-normal"
							/>
						</div>
					</div>

					<div className="mt-[83px] lg:mt-0 py-4 px-6 ">
						<div className="capitalize text-sm leading-[21px] mb-4 min-[540px]:mb-6">
							<p className="text-[#667085] mb-[5px]">date posted</p>
							<p className="text-[#101828]">Aug 16, 2022</p>
						</div>

						{/* tag */}
						<p className="capitalize text-sm leading-[21px] text-[#667085]">
							tag
						</p>
						<div className="flex gap-[11px] mt-[13px] mb-4 min-[540px]:mb-6">
							{["Brand/graphics design", "Animation"].map((item, index) => (
								<div
									key={`skills-${index}`}
									className="rounded w-fit bg-[#F5F5F5] text-[#333] text-[13px] leading-4 py-[7px] min-[540px]:py-2 px-[14px] min-[540px]:px-4"
								>
									{item}
								</div>
							))}
						</div>

						{/* budget */}
						<p className="capitalize text-sm leading-[21px] text-[#667085] mb-[5px]">
							Budget
						</p>
						<p className="capitalize text-base leading-[21px] text-[#101828]">
							$250
						</p>

						{/* about client */}
						<div className="my-4 min-[540px]:mt-6 min-[540px]:mb-4">
							<p className="text-sm leading-[21px] text-[#667085] mb-2">
								About the client
							</p>
							<div className="flex items-center gap-x-2">
								<Image src={avatar} alt="" className="w-10 h-10" />
								<p className="text-b1 capitalize text-sm leading-4">
									Ajayi umuchakara
								</p>
							</div>
						</div>

						<Button
							title="Send A Message"
							icon={chatIcon}
							className="bg-white border border-[#D9D9D9] text-b2 w-full"
						/>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default ContractDetails;
