import Image from "next/image";
import { dashboardNavLinks } from "utils/data";
import Link from "next/link";
import { ConnectWalletButton } from "@/modules/common/components/input";
import NavLink from "../navlink";

// images
import logo from "@/public/asset/logo/logo.svg";
import NotificationBell from "../notification-items/notification-bell";
import MessagingNotification from "../notification-items/messaging-notification";

const DashboardNav = () => {
	return (
		<header className="fixed bg-white z-[999] top-0 left-0 w-full ">
			<div className="layout-container flex items-center justify-between h-[78px]">
				<Link href="/">
					<Image src={logo} alt="" />
				</Link>
				<nav className="flex items-center space-x-[44px]">
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
						<MessagingNotification />
						<NotificationBell />
					</div>
					<ConnectWalletButton />
				</div>
			</div>
		</header>
	);
};

export default DashboardNav;
