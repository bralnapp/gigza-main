import { useRouter } from "next/router";
import DashboardLayout from "@/modules/dashboard/components/layout";
import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import {
	covertToReadableDate,
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import {
	ContractButtonSection,
	ContractClientProfile
} from "@/modules/dashboard/sections/contract";
import { useAccount } from "wagmi";
import { BigNumberData, JobDetailsProps } from "@custom-types/typing";
import numeral from "numeral";
import { NextPageContext } from "next";
import { readContract } from "@wagmi/core";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

// images
import chevronLeft from "@/public/asset/icons/chevron-left.svg";
import chatIcon from "@/public/asset/icons/message-square.svg";

type FreelancerBid = {
	0: BigNumberData;
	1: string;
	2: BigNumberData;
	3: `0x${string}`;
	4: number;
}[];

type ContractDetailsProps = {
	totalJobs: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: [
			{
				0: BigNumberData;
				1: string;
				2: BigNumberData;
				3: `0x${string}`;
				4: number;
			}[]
		];
		10: number;
		11: string;
		12: string;
	}[];
	pageData: {
		0: BigNumberData;
		1: string;
		2: string;
		3: BigNumberData;
		4: `0x${string}`;
		5: string[];
		6: BigNumberData;
		7: `0x${string}`;
		8: {
			0: BigNumberData;
			1: string;
			2: BigNumberData;
			3: `0x${string}`;
			4: number;
		}[];
		9: BigNumberData;
	};
};

const ContractDetails = ({ pageData, totalJobs }: ContractDetailsProps) => {
	const router = useRouter();
	const { address } = useAccount();

	const thisJob = totalJobs?.filter((item) => {
		return (
			formatUnit(item?.[0])! * 10 ** 18 ===
			formatUnit(pageData?.[0])! * 10 ** 18
		);
	});
	const freelancerBid = thisJob?.[0]?.[8]?.filter(
		// @ts-ignore
		(item) => item?.[3].toLowerCase() === address?.toLowerCase()
	) as unknown;

	const userChatRef = collection(db, "chats");
	const queryChat = query(
		userChatRef,
		where("users", "array-contains", `${address}`)
	);
	const [chatsSnapshot] = useCollection(queryChat);

	const freelancerAddress =
		thisJob?.[0]?.[4]?.toLowerCase() === address?.toLowerCase()
			? pageData?.[8]?.[0]?.[3]!
			: thisJob?.[0]?.[4];

	const createChat = async () => {
		if (!freelancerAddress) return;
		if (
			freelancerAddress !== address &&
			!chatAlreadyExists(freelancerAddress as `0x${string}`)
		) {
			// add the chat into the DB "chats" collection if it doesn't exist and user can't chat with themself
			const docRef = await addDoc(collection(db, "chats"), {
				users: [address, freelancerAddress]
			});
			return docRef;
		} else if (freelancerAddress !== address) {
			const _chatData = chatsSnapshot?.docs.find(
				(chat) =>
					chat
						.data()
						.users.find((user: `0x${string}`) => user === freelancerAddress)
						?.length > 0
			);
			// console.log("_chatData", _chatData);
			return _chatData;
		}
	};

	const chatAlreadyExists = (recipientAddress: `0x${string}`) =>
		!!chatsSnapshot?.docs.find(
			(chat) =>
				chat
					.data()
					.users.find((user: `0x${string}`) => user === recipientAddress)
					?.length > 0
		);

	const handleChat = () => {
		createChat().then((res) => {
			if (res?.id) {
				router.push(`/dashboard/message/${res?.id}`);
			}
		});
	};

	return (
		<DashboardLayout>
			<div className="dashboard-layout-container mb-7 pt-[26px] min-[540px]:pb-[118px] lg:pt-[42px]">
				<button
					onClick={() => router.back()}
					className="mb-[19px] flex items-center gap-x-[9px] lg:hidden"
				>
					<Image src={chevronLeft} alt="" />
					<p className="text-base capitalize text-[#5F6062]">go back</p>
				</button>

				<Button
					title="Cancel"
					onClick={() => router.back()}
					className="hidden w-[115px] border border-[#D9D9D9] bg-[#F3F4F5] text-[#5F6062] lg:flex"
				/>
				<div className="grid-cols-2 lg:mt-[47px] lg:grid lg:gap-x-16 xl:grid-cols-[2fr_1fr]">
					<div className="lg:py-6 lg:px-5">
						<h3 className="mb-4 text-xl font-bold capitalize leading-6 text-b1 min-[540px]:mb-8 min-[540px]:text-[24px] min-[540px]:leading-[29px]">
							contract
						</h3>
						<h4 className="text-base font-bold capitalize leading-5 text-b1 min-[540px]:text-lg min-[540px]:leading-5">
							{pageData?.[1]}
						</h4>
						<p className="my-4 whitespace-pre-wrap text-sm leading-[17px] text-b3 min-[540px]:mb-8 min-[540px]:leading-[21px]">
							{pageData?.[2]}
						</p>

						{/* duration */}
						<h4 className="mb-2 text-base font-bold capitalize leading-[19px] min-[540px]:mb-4">
							duration
						</h4>
						<p className="text-sm leading-[17px] text-b2">
							{covertToReadableDate(formatUnit(pageData?.[6])! * 10 ** 18)}
						</p>
						<ContractButtonSection
							thisJob={thisJob[0]}
							freelancerBid={freelancerBid as FreelancerBid}
							jobId={formatUnit(pageData?.[0])! * 10 ** 18}
						/>
					</div>

					<div className="mt-[83px] py-4 px-6 lg:mt-0 ">
						<div className="mb-4 text-sm capitalize leading-[21px] min-[540px]:mb-6">
							<p className="mb-[5px] text-[#667085]">date posted</p>
							<p className="text-[#101828]">
								{covertToReadableDate(formatUnit(pageData?.[9])! * 10 ** 18)}
							</p>
						</div>

						{/* budget */}
						<p className="mb-[5px] text-sm capitalize leading-[21px] text-[#667085]">
							Budget
						</p>
						<p className="text-base capitalize leading-[21px] text-[#101828]">
							${numeral(formatUnit(pageData?.[3])).format(",")}
						</p>

						{/* about client */}
						<div className="my-4 min-[540px]:mt-6 min-[540px]:mb-4">
							<p className="mb-2 text-sm leading-[21px] text-[#667085]">
								About the{" "}
								{thisJob?.[0]?.[4]?.toLowerCase() === address?.toLowerCase()
									? "freelancer"
									: "client"}
							</p>
							<ContractClientProfile
								address={
									thisJob?.[0]?.[4]?.toLowerCase() === address?.toLowerCase()
										? pageData?.[8]?.[0]?.[3]!
										: thisJob?.[0]?.[4]
								}
							/>
						</div>
						<div>
							{/* @ts-ignore */}
							{freelancerBid?.length ? (
								<Button
									title="Send A Message"
									icon={chatIcon}
									onClick={handleChat}
									className="w-full border border-[#D9D9D9] bg-white text-b2"
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export const getServerSideProps = async (context: NextPageContext) => {
	try {
		const { job: pageData } = context.query;
		const totalJobs = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getTotalJobs"
		})) as JobDetailsProps;

		return {
			props: {
				pageData: JSON.parse(pageData as string),
				totalJobs: JSON.parse(JSON.stringify(totalJobs))
			}
		};
	} catch (error) {
		if (error) {
			return {
				redirect: {
					destination: "/dashboard/contract",
					permanent: false
				}
			};
		}
	}
};

export default ContractDetails;
