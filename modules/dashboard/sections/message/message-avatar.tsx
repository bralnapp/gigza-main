import { UserProfileType } from "@custom-types/typing";
import Image from "next/image";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";

type MessageAvatarProps = {
	avatar: `0x${string}`;
};

const MessageAvatar = ({ avatar }: MessageAvatarProps) => {
	const { data: userDetails }: { data: UserProfileType | undefined } =
		useContractRead({
			address: GigzaContractAddress,
			abi: GigzaContractAbi,
			functionName: "getUser",
			args: [avatar]
		});
	return (
		<Image
			src={userDetails?.profileUrl!}
			alt=""
			className="h-10 w-10 rounded-full object-cover"
			width={40}
			height={40}
		/>
	);
};

export default MessageAvatar;
