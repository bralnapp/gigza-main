import { Button } from "@/modules/common/components/input/button";
import { PageData, UserProfileType } from "@custom-types/typing";
import Image from "next/image";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useStoreContext } from "context/StoreContext";
import { useRouter } from "next/router";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type FreelancerBidSectionProps = {
	pageData: PageData;
};

const FreelancerBidSection = ({ pageData }: FreelancerBidSectionProps) => {
	const [isSendingContract, setIsSendingContract] = useState(false);

	const router = useRouter();
	const { initGigzaContract } = useStoreContext();

	const { data: freelancerDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [pageData?.freelancerAddress]
		});
	const handleSendContract = async () => {
		setIsSendingContract(true);
		const notification = toast.loading("Sending contract");
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.sendContract(
				pageData?.jobId,
				freelancerDetails?.userAddress
			);
			const receipt = await txHash.wait();
			if (receipt) {
				setIsSendingContract(false);
				toast.success("Your contract has been sent", {
					id: notification
				});
				router.push(`/dashboard/proposal/received/${pageData?.jobId}`);
			}
			setIsSendingContract(false);
		} catch (error: any) {
			toast.error(error?.reason || "Something went wrong", {
				id: notification
			});
			setIsSendingContract(false);
		}
	};

	return (
		<div className="bg-white py-5 px-4">
			{/* freelancer profile */}
			<div className="flex items-center gap-x-2">
				<Image
					src={freelancerDetails?.profileUrl || profileAvatar}
					alt=""
					width={48}
					height={48}
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
				<p className="whitespace-pre-wrap">{pageData?.bid}</p>
				<Button
					onClick={handleSendContract}
					disabled={isSendingContract}
					title="send contract"
					className="mt-[43px] mb-[15px] w-full lg:w-[283px]"
				/>
			</div>
		</div>
	);
};

export default FreelancerBidSection;
