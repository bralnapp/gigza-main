import { useState } from "react";
import Image from "next/image";
import { dashboardNavLinks } from "utils/data";
import Link from "next/link";
import { ConnectWalletButton } from "@/modules/common/components/input";
import NavLink from "../navlink";
import NotificationBell from "../notification-items/notification-bell";
import MessagingNotification from "../notification-items/messaging-notification";

// images
import logo from "@/public/asset/logo/logo.svg";
import menuIcon from "@/public/asset/icons/menu.svg";
import closeIcon from "@/public/asset/icons/close.svg";
import { useStoreContext } from "context/StoreContext";

const DashboardNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const {state} = useStoreContext()
	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<header className="fixed bg-white z-[999] top-0 left-0 w-full">
			<div className="layout-container flex items-center justify-between h-[78px]">
				<Link href="/">
					<Image src={logo} alt="" />
				</Link>
				<nav className="hidden xl:flex items-center space-x-[44px]">
					{dashboardNavLinks.map((item, index) => (
						<NavLink
							key={`dashboard-navlinks-${index}`}
							title={item.title}
							to={item.to}
						/>
					))}
				</nav>
				<div className="flex items-center">
					<div className="flex items-center space-x-8 mr-[21px]">
						<MessagingNotification isActive />
						<NotificationBell isActive />
					</div>
					<Image
						src={isOpen ? closeIcon : menuIcon}
						alt=""
						className="xl:hidden"
						onClick={handleToggle}
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
