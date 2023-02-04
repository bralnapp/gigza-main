import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { JobDetailsProps, UserProfileType } from "@custom-types/typing";
import { useContractRead } from "wagmi";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type PageData =
	| {
			jobId: string;
			bid: string;
			freelancerAddress: `0x${string}`;
	  }
	| undefined;

const FreelancerBid = () => {
	const router = useRouter();
	const [pageData, setPageData] = useState<PageData>();

	const { data: freelancerDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [pageData?.freelancerAddress]
		});


	useEffect(() => {
		if (!router.query.data) {
			router.push("/dashboard/received");
		} else {
			const data = JSON.parse(router.query.data as string);
			setPageData(data);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(pageData?.job);
	return (
		<DashboardLayout>
			<div className="dashboard-layout-container pt-6">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="w-28 border border-[#D9D9D9] bg-[#F5F5F5] text-[#5F6062] md:w-[137px]"
				/>

				<div className="mt-6">
					{/* freelancer bid */}
					

                    {/* job details */}

				</div>
			</div>
		</DashboardLayout>
	);
};

export default FreelancerBid;
