import Image from "next/image";

type MessageAvatarProps = {
	avatar: string;
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
