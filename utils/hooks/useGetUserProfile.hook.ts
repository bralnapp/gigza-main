import { useEffect, useState } from "react";
import { useStoreContext } from "context/StoreContext";
import { toast } from "react-hot-toast";
import { initGigzaContract } from "utils/helper";
import { UserProfileType } from "@custom-types/typing";

const useGetUserProfile = (freelancerAddress: string): UserProfileType => {
	const initialUserProfile = {
		name: "",
		mainSkill: "",
		bio: "",
		profileUrl: "",
		skills: [],
		user: ""
	};
	const { state } = useStoreContext();
	const [userProfile, setUserProfile] =
		useState<UserProfileType>(initialUserProfile);

	const getFreelancerProfile = async () => {
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const userProfile:UserProfileType = contract.getUser(freelancerAddress);
			return userProfile;
		} catch (error) {
			toast.error("Something went wrong, could not get user profile");
			console.log({ error });
		}
	};

	useEffect(() => {
		getFreelancerProfile().then((res) => setUserProfile(res as UserProfileType));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [freelancerAddress, state.account]);

	return {
		...userProfile
	};
};

export default useGetUserProfile;
