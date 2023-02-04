import { Button } from "@/modules/common/components/input/button";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { JobDetailsProps, PageData, UserProfileType } from "@custom-types/typing";
import { useAccount, useContractRead } from "wagmi";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { FreelancerBidSection, JobDetailsBidReceived } from "@/modules/dashboard/sections/received-proposal";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";



const FreelancerBid = () => {
	const router = useRouter();
	const [pageData, setPageData] = useState<PageData>();
    const {address} = useAccount()

	useEffect(() => {
		if (!router.query.data) {
			router.push("/dashboard/proposal/received");
		} else {
			const data = JSON.parse(router.query.data as string);
			setPageData(data);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	// console.log('joooobbbb ooo',pageData?.job);
	return (
		<DashboardLayout>
			<div className="mx-auto  w-11/12 max-w-[1126px] pt-6 lg:pt-[41px] pb-[69px] lg:pb-[88px]">
				<Button
					onClick={() => router.back()}
					icon={chevronLeft}
					title="Go Back"
					className="w-28 border border-[#D9D9D9] bg-[#F5F5F5] text-[#5F6062] md:w-[137px]"
				/>

				<div className="mt-6 lg:mt-8 lg:grid grid-cols-[2fr_1fr] lg:gap-x-16">
					{/* freelancer bid */}
					<FreelancerBidSection {...{pageData}} />

                    {/* job details */}
					<JobDetailsBidReceived {...{pageData}}/>

				</div>
			</div>
		</DashboardLayout>
	);
};

export default FreelancerBid;
