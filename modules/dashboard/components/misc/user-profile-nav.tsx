import { useState } from "react";
import { userDetailsType } from "@/pages/dashboard/profile";
import Image from "next/image";
import CopyToClipboard from "@/modules/common/components/copy-to-clipboard";
import Link from "next/link";
import { formatWalletAddress } from "utils/helper";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/modules/common/components/input/button";
import { useWeb3Modal } from "@web3modal/react";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type UserProfileNavProps = {
	userDetails: userDetailsType;
};

const UserProfileNav = ({ userDetails }: UserProfileNavProps) => {
	const { address, isConnected } = useAccount();
	const { open } = useWeb3Modal();

	const { disconnect } = useDisconnect();

	const [showProfile, setShowProfile] = useState(false);
	const links = [
		{
			name: "my contract",
			to: "/dashboard/contract"
		},
		{
			name: "wallet",
			to: "/dashboard/wallet"
		},
		{
			name: "view profile",
			to: "/dashboard/profile"
		}
	];

	return (
		<div
			className="relative flex h-full items-center"
			onMouseLeave={() => setShowProfile(false)}
			onMouseEnter={() => setShowProfile(true)}
		>
			<Image
				src={userDetails?.profileUrl || profileAvatar}
				alt=""
				width={30}
				height={30}
				className="cursor-pointer rounded-full w-[30px] h-[30px] object-cover"
			/>
			{showProfile ? (
				<div className="absolute -left-[150px] top-[45px] w-[370px] rounded-lg bg-white p-6 shadow-[0px_6px_60px_rgba(0,0,0,0.1)]">
					{isConnected ? (
						<div className="mb-4 flex items-center justify-between rounded-md bg-[#F8F8F8] py-2 px-[10px]">
							<div className="flex items-center gap-x-2">
								<Image
									src={userDetails?.profileUrl || profileAvatar}
									alt=""
									width={30}
									height={30}
									className="cursor-pointer rounded-full  w-[30px] h-[30px] object-cover"
								/>
								<p className="text-base capitalize text-primary2">
									{formatWalletAddress(address!)}
								</p>
							</div>
							<CopyToClipboard text={address!} />
						</div>
					) : (
						<Button
							onClick={() => open()}
							title="Connect Wallet"
							className="mb-4 h-10 w-[152px]"
						/>
					)}

					<ul className="space-y-4">
						{links.map((item, index) => (
							<li key={`links-${index}`}>
								<Link
									href={item.to}
									onClick={() => setShowProfile(false)}
									className="cursor-pointer text-base capitalize leading-7 text-[#192839]"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<button
						onClick={() => disconnect()}
						className="mt-4 text-base capitalize leading-7 text-[#F02323]"
					>
						disconnect wallet
					</button>
				</div>
			) : null}
		</div>
	);
};

export default UserProfileNav;
