import { useRef, useState } from "react";
import useOnClickOutside from "utils/hooks/useOnClickOutside.hook";
import Image from "next/image";
import Link from "next/link";
import CopyToClipboard from "../../copy-to-clipboard";
import { useStoreContext } from "context/StoreContext";
import { formatWalletAddress } from "utils/helper";
import Button from "./button";

// images
import copyIcon from "@/public/asset/icons/copy-icon.svg";
import dropDrownArrow from "@/public/asset/icons/arrow-down.svg";

const ConnectWalletButton = () => {
	const [showDropDown, setShowDropDown] = useState(false);


	const dropDownRef = useRef(null);

	const handleShowDropDown = () => setShowDropDown(!showDropDown);

	const clickOutsideHandler = () => setShowDropDown(false);

	useOnClickOutside(dropDownRef, clickOutsideHandler);

	return  (
		<div>hi</div>
		// <div ref={dropDownRef} className="relative">
		// 	{showDropDown && state.isWalletConnected ? (
		// 		<div className="absolute top-[53px] bg-white rounded-lg shadow-[0px_6px_60px_#F2F3F7] py-6 pl-6 pr-9">
		// 			<ul className="text-base leading-7 capitalize space-y-4 text-[#1B1C1E] font-satoshiRegular">
		// 				<li>
		// 					<Link href="/dashboard/profile" onClick={handleShowDropDown}>
		// 						view profile
		// 					</Link>
		// 				</li>
		// 				<li className="cursor-pointer" onClick={disconnectAccount}>
		// 					disconnect wallet
		// 				</li>
		// 			</ul>
		// 		</div>
		// 	) : null}
		// 	<div>
		// 		{state.isWalletConnected ? (
		// 			<div className="flex items-center justify-between bg-[#F3F4F5] rounded-[38px] py-2 px-[10px]">
		// 				<div className="flex items-center">
		// 					<Image
		// 						src={`https://avatars.dicebear.com/api/pixel-art/${state.account}.svg`}
		// 						priority
		// 						alt=""
		// 						width={30}
		// 						height={30}
		// 						className="rounded-full mr-2"
		// 					/>
		// 					<p className="text-base leading-[18px] text-primary2 font-medium mr-[26px]">
		// 						{state.account ? formatWalletAddress(state.account) : null}
		// 					</p>
		// 				</div>
		// 				<div className="flex items-center space-x-[9px]">
		// 					<CopyToClipboard icon={copyIcon} text={`${state.account}`} />
		// 					<Image
		// 						src={dropDrownArrow}
		// 						alt=""
		// 						className="cursor-pointer"
		// 						onClick={handleShowDropDown}
		// 					/>
		// 				</div>
		// 			</div>
		// 		) : (
		// 			<Button
		// 				title="connect wallet"
		// 				onClick={connectAccount}
		// 				className="w-[170px]"
		// 			/>
		// 		)}
		// 	</div>
		// </div>
	);
};

export default ConnectWalletButton;
