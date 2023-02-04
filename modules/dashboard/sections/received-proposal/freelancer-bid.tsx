import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import { PageData, UserProfileType } from "@custom-types/typing";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type FreelancerBidSectionProps = {
	pageData: PageData;
};

const FreelancerBidSection = ({ pageData }: FreelancerBidSectionProps) => {
	const { data: freelancerDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [pageData?.freelancerAddress]
		});
	return (
		<div className="bg-white py-5 px-4">
			{/* freelancer profile */}
			<div className="flex items-center gap-x-2">
				
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

export default FreelancerBidSection;
