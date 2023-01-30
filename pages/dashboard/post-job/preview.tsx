import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { Button } from "@/modules/common/components/input/button";
import Image from "next/image";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import usdtLogo from "@/public/asset/icons/usdt-logo.svg";

type FormDataProps = {
	title: string;
	description: string;
	skills: string[];
	timeline: number;
	amount: string;
};

const Preview = () => {
	const [formData, setFormData] = useState<FormDataProps>();
	const router = useRouter();

	useEffect(() => {
		if (!router.query.data) {
			router.push("/dashboard/hire");
		} else {
			const data = JSON.parse(router.query.data as string);
			setFormData(data);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(formData);

	return (
		<DashboardLayout>
			<div className="bg-white min-h-screen">
				<div className="pt-[27px] w-11/12 mx-auto max-w-3xl pb-14 md:p-6 md:mt-[41px]">
					<Button
						onClick={() => router.back()}
						icon={chevronLeft}
						title="Go Back"
						className="bg-[#F5F5F5] h-10 border border-[#D9D9D9] text-base  leading-[18px]  w-24 md:w-[137px] text-[#5F6062] md:hidden"
					/>
					<div className="mt-[35px]">
						<h1 className="mb-[25px] md:mb-[33px] capitalize text-b1 font-bold text-xl md:text-[28px]  leading-6 md:leading-[34px] text-center">
							hire talents
						</h1>

						{/* project title */}
						<p className="mb-2 text-b1 text-base leading-[19px] capitalize">
							Project title
						</p>
						<p className="mb-[25px] text-b1 text-base leading-[19px] border border-[#E8E8EF] rounded-[5px] py-[14px] px-3">
							{formData?.title}
						</p>

						{/* project brief / description */}
						<p className="mb-3 text-b1 text-base leading-[19px]">
							Describe your brief
						</p>
						<p className="text-b2 text-sm leading-[17px] mb-7">
							{formData?.description}
						</p>

						{/* skills */}
						<div className="py-4">
							<p className="text-b1 text-base leading-[21px]">
								What type of skills are you looking for? (up to 5)
							</p>
							<div className="flex items-center gap-x-2 gap-y-2 flex-wrap mt-4">
								{formData?.skills?.map((item, index) => (
									<div
										key={`skills-${index}`}
										className="text-sm leading-[17px] capitalize text-[#333] bg-[#F5F5F5] rounded-[5px] py-2 px-3 "
									>
										{item}
									</div>
								))}
							</div>
						</div>

						<div className="mt-[25px] text-base capitalize">
							<p className="text-b1 leading-[21px] mb-[13px]">
								timeline for project
							</p>
							<p className="font-bold text-b2 leading-[19px]">
								{formData?.timeline} weeks
							</p>
						</div>

						<div className="my-[25px] text-base">
							<p className="text-b1 leading-[21px] capitalize">budget</p>
							<div className="mb-[25px] mt-[13px] flex items-center justify-between border border-[#E8E8EF] rounded-[5px] py-[9px] px-3">
								<p className="text-b1 text-base leading-[19px] ">
									${formData?.amount}
								</p>
								<div className="flex items-center gap-x-[9px] rounded w-fit py-[5px] px-[6px] bg-[#F5F5F5]">
									<Image src={usdtLogo} alt="" />
									<p className="text-b1 uppercase text-sm leading-[17px]">
										usdt
									</p>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<Button title="Cancel" className="w-[92px] bg-[#EBEEF2] text-b1" />
							<Button title="Post" className="w-[92px]"/>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Preview;
