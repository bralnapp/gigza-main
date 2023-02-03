import { useState } from "react";
import Image from "next/image";
import { dashboardNavLinks } from "utils/data";
import Link from "next/link";
import NavLink from "../navlink";
import NotificationBell from "../notification-items/notification-bell";
import MessagingNotification from "../notification-items/messaging-notification";
import DashboardSidebar from "./dashboard-sidebar";
import { Button } from "@/modules/common/components/input/button";
import { UserProfileNav } from "../misc";
import { GigzaContractAbi, GigzaContractAddress } from "utils/helper";
import { Web3Modal } from "@web3modal/react";
import { ethereumClient } from "utils/config";
import { useAccount, useContractRead } from "wagmi";
// images
import logo from "@/public/asset/logo/logo.svg";
import menuIcon from "@/public/asset/icons/menu.svg";

const DashboardNav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { address } = useAccount();

	const { data: userDetails } = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getUser",
		args: [address]
	});

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
			<header
				className="fixed left-0 z-[999] w-full border-b border-[#E3E8EB] bg-white top-0"
			>
				<Web3Modal
					projectId={process.env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID}
					ethereumClient={ethereumClient}
				/>
				{/* @ts-ignore */}
				<DashboardSidebar {...{ isOpen, toggleMenu, setIsOpen }} userDetails={userDetails!} />
				<div className="dashboard-layout-container flex h-[78px] items-center justify-between">
					<Link href="/">
						<Image src={logo} alt="" />
					</Link>
					<nav className="hidden items-center space-x-[44px] lg:flex">
						{dashboardNavLinks.map((item, index) => (
							<NavLink key={`dashboard-navlinks-${index}`} item={item} />
						))}
					</nav>
					<div className="flex">
						<div className="mr-10 flex items-center gap-x-10 md:gap-x-8 lg:mr-[21px]">
							<MessagingNotification isActive />
							<NotificationBell isActive />
						</div>
						<Image
							src={menuIcon}
							alt=""
							className="lg:hidden"
							onClick={toggleMenu}
						/>
						<div className="mr-8 hidden lg:block">
							{/* @ts-ignore */}
							<UserProfileNav userDetails={userDetails!} />
						</div>
						<Button
							href="/dashboard/post-job"
							title="Post A Job"
							className="hidden w-[134px] lg:flex"
						/>
						{/* <div className="hidden xl:block">
						<ConnectWalletButton />
					</div> */}
					</div>
				</div>
			</header>
	);
};

export default DashboardNav;
