import Image, { StaticImageData } from "next/image";
import toast from "react-hot-toast";

// images
import duplicateIcon from "@/public/asset/icons/copy-icon.svg";

type Props = {
	text: string;
	icon?: StaticImageData;
};

const CopyToClipboard = ({ text, icon }: Props) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(text);
		toast.success("Copied successfully");
	};
	return (
		<Image
			src={duplicateIcon || icon}
			alt=""
			onClick={copyToClipboard}
			className="cursor-pointer"
		/>
	);
};

export default CopyToClipboard;
