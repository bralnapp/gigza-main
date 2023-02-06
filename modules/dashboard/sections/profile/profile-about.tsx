import { userDetailsType } from "@/pages/dashboard/profile";

type ProfileAboutProps = {
	userDetails: userDetailsType;
};

const ProfileAbout = ({ userDetails }: ProfileAboutProps) => {
	const totalJobs = [
		{
			title: "total jobs",
			value: 21
		},
		{
			title: "pending jobs",
			value: 12
		},
		{
			title: "active contract ",
			value: 4
		},
		{
			title: "completed",
			value: 7
		}
	];
	return userDetails?.name ? (
		<section className="md:grid grid-cols-[2fr_1fr] lg:grid-cols-2 xl:grid-cols-[1fr_2fr] md:gap-x-8">
			<div className="md:order-1">
				<h4 className="text-b2 text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 font-bold mb-3">
					About
				</h4>
				<p className="text-b2 text-sm leading-[21px] xl:w-[737px]">
					{userDetails?.bio}
				</p>
			</div>

			<div className="xl:w-[470px]">
				{/* skills */}
				<div className="border rounded border-[#E3E8EB] py-5 px-4 mt-8 md:mt-0 mb-[18px]">
					<h4 className="capitalize font-bold text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 text-b1">
						skills
					</h4>
					<div className="mt-5 flex items-center flex-wrap gap-x-[11px] gap-y-[11px]">
						{userDetails?.skills?.map((item, index) => (
							<div
								key={`freelancer-skills-${index}`}
								className="rounded bg-[#F5F5F5] py-[7px] min-[540px]:py-[10px] px-[11px] min-[540px]:px-[14px] capitalize text-[#333333] text-xs min-[540px]:text-sm leading-[14px] min-[540px]:leading-[18px]"
							>
								{item}
							</div>
						))}
					</div>
				</div>

				{/* total jobs */}
				<div className="border rounded border-[#E3E8EB] py-5 px-4">
					<h4 className="capitalize font-bold text-base min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 text-b1">
						total jobs
					</h4>
					<div className="flex items-center justify-between mt-5">
						{totalJobs.map((item, index) => (
							<div key={`total-jobs-${index}`} className="text-center">
								<h5 className="font-bold text-b1 text-2xl leading-[29px] mb-2">
									{item.value}
								</h5>
								<p className="text-b3 capitalize text-xs min-[540px]:text-sm leading-[14px] min-[540px]:leading-[17px]">
									{item.title}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	) : (
		<p>Please create your profile</p>
	);
};

export default ProfileAbout;
