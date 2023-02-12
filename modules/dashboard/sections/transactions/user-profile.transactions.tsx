import { UserProfileType } from "@custom-types/typing";
import Image from "next/image";
import {
	formatWalletAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useContractRead } from "wagmi";

// image
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type UserProfileTransactionProps = {
	address: `0x${string}`;
};

const UserProfileTransaction = ({ address }: UserProfileTransactionProps) => {
	const {
		data,
		isError
	}: {
		data: UserProfileType | undefined;
		isError: boolean;
	} = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUser",
		args: [address]
	});
	return (
		<div className="items-center md:flex md:space-x-2">
			<div className="hidden md:block">
				<Image
					src={data?.profileUrl! || profileAvatar}
					alt=""
					width={40}
					height={40}
					className="h-10 w-10 rounded-full object-cover"
				/>
			</div>
			<p>{data?.name || formatWalletAddress(address)}</p>
		</div>
	);
};

export default UserProfileTransaction;
