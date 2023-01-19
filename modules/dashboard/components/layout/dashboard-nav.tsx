import { useState } from "react";
import Image from "next/image";
import { dashboardNavLinks } from "utils/data";
import Link from "next/link";
import NavLink from "../navlink";
import NotificationBell from "../notification-items/notification-bell";
import MessagingNotification from "../notification-items/messaging-notification";
import DashboardSidebar from "./dashboard-sidebar";
import { ConnectWalletButton } from "@/modules/common/components/input/button";

// images
import logo from "@/public/asset/logo/logo.svg";
import menuIcon from "@/public/asset/icons/menu.svg";

const DashboardNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<header className="fixed bg-white z-[999] top-0 left-0 w-full">
			<DashboardSidebar {...{ isOpen, toggleMenu, setIsOpen }} />
			<div className="dashboard-layout-container flex items-center justify-between h-[78px]">
				<Link href="/">
					<Image src={logo} alt="" />
				</Link>
				<nav className="hidden xl:flex items-center space-x-[44px]">
					{dashboardNavLinks.map((item, index) => (
						<NavLink key={`dashboard-navlinks-${index}`} item={item} />
					))}
				</nav>
				<div className="flex items-center">
					<div className="flex items-center space-x-8 mr-[21px]">
						<MessagingNotification isActive />
						<NotificationBell isActive />
					</div>
					<Image
						src={menuIcon}
						alt=""
						className="xl:hidden"
						onClick={toggleMenu}
					/>
					<div className="hidden xl:block">
						<ConnectWalletButton />
					</div>
				</div>
			</div>
		</header>
	);
};

export default DashboardNav;
