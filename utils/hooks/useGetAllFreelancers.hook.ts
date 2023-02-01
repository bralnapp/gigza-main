import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { UserProfileType } from "@custom-types/typing";
import { initGigzaContract } from "utils/helper";
import { useStoreContext } from "context/StoreContext";

type useGetAllFreelancersType = {
	usersProfile: UserProfileType[] | undefined;
};

const useGetAllFreelancers = (): useGetAllFreelancersType => {
	// const { state } = useStoreContext();
	const [usersProfile, setUsersProfile] = useState<UserProfileType[]>();

	const getFreelancerProfile = async () => {
		// try {
		// 	const response = await initGigzaContract();
		// 	const contract = response.contract;
		// 	const usersProfile: UserProfileType[] = contract.getUserProfiles();
		// 	return usersProfile;
		// } catch (error) {
		// 	toast.error("Something went wrong, could not get user profile");
		// 	console.log({ error });
		// }
	};

	// useEffect(() => {
	// 	getFreelancerProfile().then((res) =>
	// 		setUsersProfile(res as UserProfileType[])
	// 	);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [state.account]);

	return {
		usersProfile
	};
};

export default useGetAllFreelancers