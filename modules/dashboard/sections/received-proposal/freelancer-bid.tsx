import Image from "next/image";
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

const FreelancerBid = () => {
	return (
		<div className="bg-white py-5 px-4">
			{/* freelancer profile */}
			<div className="flex items-center gap-x-2">
				<Image
					src={freelancerDetails?.profileUrl || profileAvatar}
					alt=""
					height={48}
					width={48}
					className="h-12 w-12 rounded-full object-cover"
				/>
				<div className="">
					<p className="mb-2 text-base font-bold capitalize leading-[19px] text-b1">
						{freelancerDetails?.name}
					</p>
					<p className="text-xs leading-[14px] text-b4">sent 1hr ago</p>
				</div>
			</div>

			{/* bid */}
			<div className="mt-3 mb-8 text-sm leading-[21px] text-b3">
				<p className="">{pageData?.bid}</p>
				<Button title="send contract" className="mt-[43px] mb-[15px] w-full" />
			</div>
		</div>
	);
};

export default FreelancerBid;
