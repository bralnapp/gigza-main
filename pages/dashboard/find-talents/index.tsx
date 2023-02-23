import { useEffect, useState } from "react";
import DashboardLayout from "@/modules/dashboard/components/layout";
import {
	ApplyFilter,
	SearchTalents,
	TalentList
} from "@/modules/dashboard/sections/find-talent";
import { Button } from "@/modules/common/components/input/button";
import { FilterTalentListModal } from "@/modules/dashboard/components/modal";
import { useContractRead } from "wagmi";
import {
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { IReviews, UserProfileType } from "@custom-types/typing";
import { readContract } from "@wagmi/core";

// images
import filterIcon from "@/public/asset/icons/filter-icon.svg";
import { PulseLoader } from "react-spinners";

const FindTalents = () => {
	const [showFilterTalentModal, setShowFilterTalentModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [talentList, setTalentList] = useState<UserProfileType[] | []>([]);
	const initialFormData = {
		rating: "",
		specialties: ""
	};

	const [formData, setFormData] = useState(initialFormData);

	const calculateRating = (reviews: IReviews) => {
		return (
			reviews?.reduce(
				(total, b) => total + formatUnit(b?.rating)! * 10 ** 18,
				0
			)! / reviews?.length!
		);
	};

	const {
		data: usersProfile
	}: {
		data: UserProfileType[] | undefined;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUserProfiles"
	});

	const getReviewByUserAddress = async (address: `0x${string}`) => {
		const reviews = (await readContract({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getReviews",
			args: [address]
		})) as IReviews;

		return calculateRating(reviews) || 0;
	};

	const generateUsersWithReviews = async () => {
		const userData = [];
		for (const userProfile of usersProfile!) {
			const reviewRating = await getReviewByUserAddress(
				userProfile.userAddress
			);
			const newProfile = {
				...userProfile,
				rating: reviewRating.toString()
			};
			userData.push(newProfile);
		}

		return userData;
	};

	useEffect(() => {
		if (usersProfile) {
			generateUsersWithReviews().then((data) => setTalentList(data));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usersProfile]);

	const filterUsers = talentList?.filter(
		(item) =>
			item?.mainSkill
				?.toLowerCase()
				.includes(formData?.specialties?.toLowerCase()) &&
			// @ts-ignore
			item?.rating?.toLowerCase().includes(formData?.rating)
	);

	const filteredUsers = filterUsers?.filter(
		(item) =>
			item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item?.userAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item?.skills?.includes(searchTerm.toLowerCase())
	);

	return (
		<DashboardLayout>
			<div className="lg:hidden">
				<FilterTalentListModal
					{...{ showFilterTalentModal, setShowFilterTalentModal, setFormData }}
				/>
			</div>
			<div className="min-h-screen ">
				<div className="bg-white pt-6 md:pt-[31px]">
					<div className="dashboard-layout-container">
						<SearchTalents {...{ setSearchTerm }} />
					</div>
				</div>
				{talentList.length ? (
					<>
						<div className="dashboard-layout-container lg:hidden">
							<Button
								icon={filterIcon}
								title="Filter"
								onClick={() => setShowFilterTalentModal(true)}
								className="ml-auto h-[28px] w-[75px] rounded-[3px] border border-[#E8E8EF] bg-[#FCFDFD] text-xs leading-[14px] text-b2"
							/>
						</div>
						<div className="dashboard-layout-container mt-6 mb-[51px] grid-cols-[2fr_1fr] md:mb-[76px] lg:mt-12 lg:grid lg:gap-x-[45px]">
							{/* freelancers */}
							<TalentList {...{ filteredUsers }} />
							<ApplyFilter {...{ formData, setFormData }} />
						</div>
					</>
				) : (
					<div className="grid h-[calc(100vh_-_500px)] place-items-center">
						<div className="">
							<PulseLoader color="#36d7b7" loading={true} />
						</div>
					</div>
				)}
			</div>
		</DashboardLayout>
	);
};

export default FindTalents;
