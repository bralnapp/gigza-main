import Image from "next/image";
import Button from "./button";

// images
import copyIcon from "@/public/asset/icons/copy-icon.svg";
import dropDrownArrow from "@/public/asset/icons/arrow-down.svg";

const ConnectWalletButton = () => {
	return (
		<div>
			{true ? (
				<div className="flex items-center bg-[#F3F4F5] rounded-[38px] py-2 px-[10px]">
					<Image
						src={`https://avatars.dicebear.com/api/pixel-art/rere.svg`}
						priority
						alt=""
						width={30}
						height={30}
                        className="rounded-full mr-2"
					/>
					<p className="text-base leading-[18px] text-primary2 font-medium mr-[26px]">0x1ba...38cb1</p>
					<div className="flex items-center space-x-[9px]">
						<Image src={copyIcon} alt="" />
						<Image src={dropDrownArrow} alt="" />
					</div>
				</div>
			) : (
				<Button title="connect wallet" className="w-[170px]" />
			)}
		</div>
	);
};

export default ConnectWalletButton;
