import { Button } from "@/modules/common/components/input/button";
import Head from "next/head";
import { useAccount, useContractRead } from "wagmi";
import DashboardNav from "./dashboard-nav";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";

import style from "./index.module.css";
import {
	formatUnit,
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { JobDetailsProps } from "@custom-types/typing";
import { Modal } from "antd";

type DashboardLayoutProps = {
	children: React.ReactNode;
};

// enum JobState {POSTED 0, OFFERED 1, ACCEPTED 2, EXECUTED 3, FUFILLED 4, CANCELLED 5, INDISPUTE 6, RESOLVED 7}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	const { isConnected, address } = useAccount();
	const [ready, setReady] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { open } = useWeb3Modal();

	const {
		data: totalJobs
	}: {
		data: JobDetailsProps | undefined;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getTotalJobs"
	});

	const handleCancel = () => setIsModalOpen(false);

	// jobs I posted
	const jobsPosted = totalJobs?.filter(
		(item) => item?.client.toLowerCase() === address?.toLowerCase()
	);

	// console.log("jobsPosted", jobsPosted);

	// bids received and job has not been offered
	const bidsReceived = jobsPosted
		?.map((item) => {
			if (item?.userBids?.length > 0 && item?.state === 0) {
				return item?.userBids;
			}
			return;
		})
		?.flat();
	const cleanedBidsReceivedData = bidsReceived?.filter(
		(item) => typeof item !== "undefined"
	);

	const BidReceivedMessages = cleanedBidsReceivedData
		?.map((item) => [
			`${formatWalletAddress(
				item?.freelancer as `0x${string}`
			)} sent you a bid <a href="/dashboard/proposal/received/${Math.trunc(
				formatUnit(item?.jobId)! * 10 ** 18
			)}"><u>proposal</u></a>`
		])
		?.flat();

	const contractsReceived = totalJobs?.filter(
		(item) =>
			item?.state === 1 &&
			item?.freelancer.toLowerCase() === address?.toLowerCase()
	);

	const contractsReceivedMessages = contractsReceived?.length
		? contractsReceived?.map(
				(item) =>
					`${formatWalletAddress(
						item?.client
					)} sent you a <a href="/dashboard/contract"><u>contract</u></a>`
		  )
		: null;

	const contractsAccepted = jobsPosted?.filter((item) => item?.state === 2);
	const contractsAcceptedMessages = contractsAccepted?.map(
		(item) => `${formatWalletAddress(item?.freelancer)} accepted your contract`
	);

	const jobsSubmittedByFreelancer = jobsPosted?.filter(
		(item) => item?.state === 3
	);

	const jobsSubmittedMessage = jobsSubmittedByFreelancer?.length
		? [
				`${jobsSubmittedByFreelancer?.length} job${
					jobsSubmittedByFreelancer?.length! > 1 ? "s" : ""
				} need you to release payment`
		  ]
		: [];

	const allMessages = [
		contractsReceivedMessages,
		BidReceivedMessages,
		contractsAcceptedMessages,
		jobsSubmittedMessage
	]
		?.flat()
		?.filter((item) => item !== null);

	// console.log("contractsReceived", contractsReceivedMessages);
	// console.log("BidReceivedMessages", BidReceivedMessages);
	// console.log("jobsSubmittedMessage", jobsSubmittedMessage);
	// console.log("allMessages", allMessages);

	useEffect(() => {
		setReady(true);
	}, []);

	return ready ? (
		<div>
			<Head>
				<title>
					Giza - Permisionless Decentralized Freelancing Marketplace
				</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="Gigza is a permisionless decentralized freelancing marketplace that allows anyone to post a job and get help from freelancers with the requisite skills."
					content="gigza"
				/>
			</Head>
			<DashboardNav />
			<main className="mt-[79px]  bg-[#FBFAFA]">
				{isConnected ? (
					<>
						<Modal
							width={300}
							open={isModalOpen}
							onCancel={handleCancel}
							footer={false}
						>
							<h1 className="font-rational text-center text-xl font-semibold leading-[26px] text-[#192839]">
								Action items
							</h1>
							<ul className="mt-5">
								{allMessages?.map((item, index) => (
									<li
										key={`allMessages-${index}`}
										className="reak-words py-2 text-sm font-normal leading-[21px] text-b3"
										dangerouslySetInnerHTML={{ __html: item as string }}
									/>
								))}
							</ul>
						</Modal>
						{allMessages.length ? (
							<div
								className={`flex h-[49px] items-center justify-center text-center ${
									style.bannerGradient as string
								}`}
							>
								There are some action items that require your attention.{" "}
								<span
									onClick={() => setIsModalOpen(true)}
									className="cursor-pointer text-red-600"
								>
									Click to view.
								</span>
							</div>
						) : null}

						{children}
					</>
				) : (
					<div className="grid h-[calc(100vh_-_79px)] place-items-center">
						<div>
							<p>Please connect your account first</p>
							<Button
								onClick={() => open()}
								title="Connect Wallet"
								className="mx-auto mt-4 w-fit px-3"
							/>
						</div>
					</div>
				)}
			</main>
		</div>
	) : null;
};

export default DashboardLayout;
