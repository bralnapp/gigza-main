import { useEffect, useState } from "react";
import { useStoreContext } from "context/StoreContext";
import { useRouter } from "next/router";
import DashboardLayout from "@/modules/dashboard/components/layout";
import { Button } from "@/modules/common/components/input/button";
import Image from "next/image";
import { useAccount, useContractRead } from "wagmi";
import {
	convertToNumber,
	currentEpochTime,
	DaiContractAbi,
	DiaContractAddress,
	formatUnit,
	GigzaContractAddress,
	parseUnit
} from "utils/helper";
import { toast } from "react-hot-toast";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import usdtLogo from "@/public/asset/icons/usdt-logo.svg";
import numeral from "numeral";

type FormDataProps = {
	title: string;
	description: string;
	skills: string[];
	timeline: number;
	amount: string;
};

const Preview = () => {
	const [formData, setFormData] = useState<FormDataProps>();
	const [isApproving, setIsApproving] = useState(false);
	const [isPostingJob, setIsPostingJob] = useState(false);
	const router = useRouter();

	const { initDaiContract, initGigzaContract } = useStoreContext();

	const { address } = useAccount();

	const { data: allowanceBalance, refetch } = useContractRead({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		functionName: "allowance",
		args: [address, GigzaContractAddress]
	});

	const approveTransaction = async () => {
		const notification = toast.loading("Approving your transaction");
		setIsApproving(true);
		try {
			// @ts-ignore
			const txHash = await initDaiContract!.approve(
				GigzaContractAddress,
				parseUnit(formData?.amount)
			);
			const receipt = await txHash.wait();
			if (receipt) {
				refetch();
				setIsApproving(false);
				toast.success("Approval was successful", {
					id: notification
				});
			}
		} catch (error) {
			setIsApproving(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
			console.log({ error });
		}
	};

	const handlePostJob = async () => {
		const options = {
			value: parseUnit(0.01)
		};
		const notifyJobPost = toast.loading("Posting job");
		setIsPostingJob(true);
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.createJobPost(
				formData?.title,
				formData?.description,
				formData?.skills,
				currentEpochTime + 604800 * formData?.timeline!,
				parseUnit(convertToNumber(formData?.amount!)),
				options
			);
			const receipt = await txHash.wait();
			if (receipt) {
				setIsPostingJob(false);
				toast.success("Job has been created", {
					id: notifyJobPost
				});
				router.push("/dashboard/find-work");
			}
		} catch (error) {
			setIsPostingJob(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notifyJobPost
			});
		}
	};

	useEffect(() => {
		if (router.isReady) {
			if (!router.query.data) {
				router.push("/dashboard/post-job");
			} else {
				const data = JSON.parse(router.query.data as string);
				setFormData(data);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady]);

	return (
		<DashboardLayout>
			<div className="min-h-screen bg-white">
				<div className="mx-auto w-11/12 max-w-3xl pt-[27px] pb-14 md:mt-[41px] md:p-6">
					<Button
						onClick={() => router.back()}
						icon={chevronLeft}
						title="Go Back"
						className="h-10 w-24 border border-[#D9D9D9] bg-[#F5F5F5]  text-base  leading-[18px] text-[#5F6062] md:hidden md:w-[137px]"
					/>
					<div className="mt-[35px]">
						<h1 className="mb-[25px] text-center text-xl font-bold capitalize leading-6 text-b1  md:mb-[33px] md:text-[28px] md:leading-[34px]">
							hire talents
						</h1>

						{/* project title */}
						<p className="mb-2 text-base capitalize leading-[19px] text-b1">
							Project title
						</p>
						<p className="mb-[25px] rounded-[5px] border border-[#E8E8EF] py-[14px] px-3 text-base leading-[19px] text-b1">
							{formData?.title}
						</p>

						{/* project brief / description */}
						<p className="mb-3 text-base leading-[19px] text-b1">
							Describe your brief
						</p>
						<p className="mb-7 text-sm leading-[17px] text-b2 whitespace-pre-wrap">
							{formData?.description}
						</p>

						{/* skills */}
						<div className="py-4">
							<p className="text-base leading-[21px] text-b1">
								What type of skills are you looking for? (up to 5)
							</p>
							<div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
								{formData?.skills?.map((item, index) => (
									<div
										key={`skills-${index}`}
										className="rounded-[5px] bg-[#F5F5F5] py-2 px-3 text-sm capitalize leading-[17px] text-[#333] "
									>
										{item}
									</div>
								))}
							</div>
						</div>

						<div className="mt-[25px] text-base capitalize">
							<p className="mb-[13px] leading-[21px] text-b1">
								timeline for project
							</p>
							<p className="font-bold leading-[19px] text-b2">
								{formData?.timeline} weeks
							</p>
						</div>

						<div className="my-[25px] text-base">
							<p className="capitalize leading-[21px] text-b1">budget</p>
							<div className="mb-[25px] mt-[13px] flex items-center justify-between rounded-[5px] border border-[#E8E8EF] py-[9px] px-3">
								<p className="text-base leading-[19px] text-b1 ">
									${numeral(formData?.amount).format(',')}
								</p>
								<div className="flex w-fit items-center gap-x-[9px] rounded bg-[#F5F5F5] py-[5px] px-[6px]">
									<Image src={usdtLogo} alt="" />
									<p className="text-sm uppercase leading-[17px] text-b1">
										usdt
									</p>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<Button
								title="Cancel"
								onClick={() => router.back()}
								className="w-[92px] bg-[#EBEEF2] text-b1 cursor-pointer"
							/>
							{!(
								formatUnit(allowanceBalance)! >=
								convertToNumber(formData?.amount!)
							) ? (
								<Button
									onClick={approveTransaction}
									disabled={isApproving}
									title={`${isApproving ? "Approving" : "Approve"}`}
									className="h-10 px-3 cursor-pointer"
								/>
							) : (
								<Button
									onClick={handlePostJob}
									disabled={isPostingJob}
									title="Post"
									className="w-[92px] cursor-pointer"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Preview;
