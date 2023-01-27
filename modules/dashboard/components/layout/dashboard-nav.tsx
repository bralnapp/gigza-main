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

// images
import logo from "@/public/asset/logo/logo.svg";
import menuIcon from "@/public/asset/icons/menu.svg";

const DashboardNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<header className="fixed bg-white z-[999] top-0 left-0 w-full border-b border-[#E3E8EB]">
			<DashboardSidebar {...{ isOpen, toggleMenu, setIsOpen }} />
			<div className="dashboard-layout-container flex items-center justify-between h-[78px]">
				<Link href="/">
					<Image src={logo} alt="" />
				</Link>
				<nav className="hidden lg:flex items-center space-x-[44px]">
					{dashboardNavLinks.map((item, index) => (
						<NavLink key={`dashboard-navlinks-${index}`} item={item} />
					))}
				</nav>
				<div className="flex">
					<div className="flex items-center gap-x-10 md:gap-x-8 mr-10 lg:mr-[21px]">
						<MessagingNotification isActive />
						<NotificationBell isActive />
					</div>
					<Image
						src={menuIcon}
						alt=""
						className="lg:hidden"
						onClick={toggleMenu}
					/>
					<div className="hidden lg:block mr-8">
						<UserProfileNav />
					</div>
					<Button
						href="/dashboard/post-job"
						title="Post A Job"
						className="w-[134px] hidden lg:flex"
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
