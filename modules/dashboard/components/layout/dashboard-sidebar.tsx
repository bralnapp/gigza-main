import Image from "next/image";
import { useRef } from "react";
import useOnClickOutside from "utils/hooks/useOnClickOutside.hook";
import { dashboardNavLinks } from "utils/data";
import Link from "next/link";
import ProposalSidebarLink from "@/modules/common/misc/proposal-sidebar-link";
import { userDetailsType } from "@/pages/dashboard/profile";
import { formatWalletAddress } from "utils/helper";
import CopyToClipboard from "@/modules/common/components/copy-to-clipboard";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/modules/common/components/input/button";
import { InjectedConnector } from "wagmi/connectors/injected";

// images
import closeIcon from "@/public/asset/icons/close.svg";
import profileAvatar from "@/public/asset/avatar/profile-avatar.svg";

type Props = {
	isOpen: boolean;
	toggleMenu: () => void;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	userDetails: userDetailsType;
};

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
		name: "messages",
		to: "/dashboard/profile"
	},
	{
		name: "view profile",
		to: "/dashboard/profile"
	},
	{
		name: "earn",
		to: "/dashboard/earn"
	}
];

const DashboardSidebar = ({
	isOpen,
	toggleMenu,
	setIsOpen,
	userDetails
}: Props) => {
	const sideBarRef = useRef(null);
	const { address, isConnected } = useAccount();

	const clickOutsideHandler = () => {
		setIsOpen(false);
	};
	useOnClickOutside(sideBarRef, clickOutsideHandler);

	const { connect } = useConnect({
		connector: new InjectedConnector()
	});

	const { disconnect } = useDisconnect();

	return isOpen ? (
		<div
			className={`fixed top-0 left-0 z-[200] h-screen w-full overflow-y-hidden bg-black/80 xl:hidden`}
		>
			<aside
				ref={sideBarRef}
				className={`fixed top-0 z-[9999] h-screen w-full overflow-hidden bg-white pb-5 pl-5 pt-[17px] pr-[33px] ${
					isOpen
						? "right-0 transition-all ease-in-out "
						: "right-[-100%] transition-all ease-in-out"
				}`}
			>
				<div className="mb-[45px] flex items-center justify-between">
					<div onClick={toggleMenu} className="ml-auto">
						<Image src={closeIcon} alt="" />
					</div>
				</div>
				<ul className="mt-8 space-y-10">
					{dashboardNavLinks.map((item, index) => (
						<li key={`sidebar-links-${index}`} className="">
							{item.title.toLowerCase() === "proposals" ? (
								<ProposalSidebarLink
									handleCloseSidebar={() => setIsOpen(false)}
									{...{ item }}
								/>
							) : (
								<Link
									href={item.to}
									className="text-base  capitalize leading-[19px] text-b3"
									onClick={() => setIsOpen(false)}
								>
									{item.title}
								</Link>
							)}
						</li>
					))}
				</ul>
				<div className="mt-6 border-t border-stroke py-4">
					{isConnected ? (
						<div className="mb-4 flex items-center justify-between rounded-md bg-[#F8F8F8] py-2 px-[10px]">
							<div className="flex items-center gap-x-2">
								<Image
									src={userDetails?.profileUrl || profileAvatar}
									alt=""
									width={30}
									height={30}
									className="h-[30px] w-[30px] cursor-pointer rounded-full object-cover"
								/>
								<p className="text-base capitalize text-primary2">
									{formatWalletAddress(address!)}
								</p>
							</div>
							<CopyToClipboard text={address!} />
						</div>
					) : (
						<Button
							onClick={() => connect()}
							title="Connect Wallet"
							className="mb-4 h-10 w-[152px]"
						/>
					)}

					<ul className="mt-[18px] space-y-6">
						{links.map((item, index) => (
							<li key={`mobile-dashboard-links-${index}`}>
								<Link
									href={item.to}
									className="text-base capitalize leading-[21px] text-b3"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<Button
						href="/dashboard/post-job"
						title="post job"
						className="mt-6 h-9 w-[100px]"
					/>
				</div>
			</aside>
		</div>
	) : null;
};

export default DashboardSidebar;
