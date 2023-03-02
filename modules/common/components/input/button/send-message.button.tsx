import Button from "./button";

// images
import chatIcon from "@/public/asset/icons/chat.svg";

type SendMessageButtonProps = {
	handleClick?: () => void;
};

const SendMessageButton = ({ handleClick }: SendMessageButtonProps) => {
	return (
		<Button
			title="Message"
			className="h-[42px] w-[125px] items-center bg-primary  text-base  leading-[18px] text-white lg:w-[192px]"
			icon={chatIcon}
			onClick={handleClick}
		/>
	);
};

export default SendMessageButton;
