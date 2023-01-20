import Button from "./button";

// images
import chatIcon from "@/public/asset/icons/chat.svg";

const SendMessageButton = () => {
	return (
		<Button
			title="Message"
			className="bg-primary text-white h-[42px] w-[125px]  lg:w-[192px]  items-center text-base leading-[18px]"
			icon={chatIcon}
		/>
	);
};

export default SendMessageButton;
