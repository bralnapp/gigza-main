import { UserProfileType } from "@custom-types/typing";
import Image from "next/image";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { useContractRead } from "wagmi";

type MessageAvatarProps = {
	avatar: `0x${string}`;
};

const MessageAvatar = ({ avatar }: MessageAvatarProps) => {
	return (
		<Image
			src={avatar}
			alt=""
			className="h-10 w-10 rounded-full object-cover"
			width={40}
			height={40}
		/>
	);
};

export default MessageAvatar;
