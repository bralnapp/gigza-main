import { useState } from "react";
import { userDetailsType } from "@/pages/dashboard/profile";
import { useStoreContext } from "context/StoreContext";
import Image from "next/image";
import CopyToClipboard from "@/modules/common/components/copy-to-clipboard";
import Link from "next/link";

// images
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type UserProfileNavProps = {
	userDetails: userDetailsType;
};

const UserProfileNav = ({ userDetails }: UserProfileNavProps) => {
	const { state } = useStoreContext();
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
			className="relative h-full flex items-center"
			onMouseLeave={() => setShowProfile(false)}
			onMouseEnter={() => setShowProfile(true)}
		>
			<Image
				src={userDetails?.profileUrl || profileAvatar}
				alt=""
				width={30}
				height={30}
				className="rounded cursor-pointer"
			/>
			{showProfile ? (
				<div className="absolute -left-[150px] top-[45px] rounded-lg bg-white p-6 w-[370px] shadow-[0px_6px_60px_rgba(0,0,0,0.1)]">
					<div className="flex items-center justify-between rounded-md bg-[#F8F8F8] py-2 px-[10px] mb-4">
						<Image
							src={userDetails?.profileUrl || profileAvatar}
							alt=""
							width={30}
							height={30}
							className="rounded cursor-pointer"
						/>
						<CopyToClipboard text={state.account!} />
					</div>
					<ul className="space-y-4">
						{links.map((item, index) => (
							<li key={`links-${index}`}>
								<Link
									href={item.to}
									onClick={() => setShowProfile(false)}
									className="cursor-pointer capitalize text-base leading-7 text-[#192839]"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<button className="mt-4 text-[#F02323] capitalize text-base leading-7">
						disconnect wallet
					</button>
				</div>
			) : null}
		</div>
	);
};

export default UserProfileNav;
