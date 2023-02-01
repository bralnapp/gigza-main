import { useEffect, useState } from "react";
import Image from "next/image";
import { dashboardNavLinks } from "utils/data";
import Link from "next/link";
import NavLink from "../navlink";
import NotificationBell from "../notification-items/notification-bell";
import MessagingNotification from "../notification-items/messaging-notification";
import DashboardSidebar from "./dashboard-sidebar";
import { Button } from "@/modules/common/components/input/button";
import { UserProfileNav } from "../misc";
import { userDetailsType } from "@/pages/dashboard/profile";
import { initGigzaContract } from "utils/helper";
import { toast } from "react-hot-toast";
import { useStoreContext } from "context/StoreContext";

// images
import logo from "@/public/asset/logo/logo.svg";
import menuIcon from "@/public/asset/icons/menu.svg";
import { Web3Modal } from "@web3modal/react";
import { ethereumClient } from "utils/config";

const DashboardNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<userDetailsType>();
	const { state } = useStoreContext();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const getUserProfile = async () => {
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const userDetails = await contract.getUser(state.account);
			setUserDetails(userDetails);
		} catch (error) {
			toast.error("Something went wrong, could not user details");
		}
	};

	useEffect(() => {
		getUserProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.account]);
	return (
		<header className="fixed top-0 left-0 z-[999] w-full border-b border-[#E3E8EB] bg-white">
			<Web3Modal
				projectId={process.env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID}
				ethereumClient={ethereumClient}
			/>
			<DashboardSidebar
				{...{ isOpen, toggleMenu, setIsOpen }}
				userDetails={userDetails!}
			/>
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
