import Image from "next/image";
import { useRef } from "react";
import useOnClickOutside from "utils/hooks/useOnClickOutside.hook";
import { dashboardNavLinks } from "utils/data";
import Link from "next/link";
import ProposalSidebarLink from "@/modules/common/misc/proposal-sidebar-link";
import { userDetailsType } from "@/pages/dashboard/profile";
import { formatWalletAddress } from "utils/helper";
import CopyToClipboard from "@/modules/common/components/copy-to-clipboard";
import { useStoreContext } from "context/StoreContext";

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
	}
];

const DashboardSidebar = ({
	isOpen,
	toggleMenu,
	setIsOpen,
	userDetails
}: Props) => {
	const sideBarRef = useRef(null);
	const { state } = useStoreContext();
	const clickOutsideHandler = () => {
		setIsOpen(false);
	};
	useOnClickOutside(sideBarRef, clickOutsideHandler);

	return isOpen ? (
		<div
			className={`bg-black/80 w-full fixed h-screen top-0 left-0 z-[200] overflow-y-hidden xl:hidden`}
		>
			<aside
				ref={sideBarRef}
				className={`bg-white pb-5 pl-5 pt-[17px] pr-[33px] w-full fixed top-0 overflow-hidden z-[9999] h-screen ${
					isOpen
						? "right-0 transition-all ease-in-out "
						: "right-[-100%] transition-all ease-in-out"
				}`}
			>
				<div className="flex justify-between items-center mb-[45px]">
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
									className="text-b3  text-base leading-[19px] capitalize"
									onClick={() => setIsOpen(false)}
								>
									{item.title}
								</Link>
							)}
						</li>
					))}
				</ul>
				<div className="border-t border-stroke mt-6 py-4">
					<div className="flex items-center justify-between rounded-md bg-[#F8F8F8] py-2 px-[10px] mb-4">
						<div className="flex items-center gap-x-2">
							<Image
								src={userDetails?.profileUrl || profileAvatar}
								alt=""
								width={30}
								height={30}
								className="rounded cursor-pointer"
							/>
							<p className="text-primary2 capitalize text-base">
								{formatWalletAddress(state?.account!)}
							</p>
						</div>
						<CopyToClipboard text={state.account!} />
					</div>
					<ul className="mt-[18px] space-y-6">
						{links.map((item, index) => (
							<li key={`mobile-dashboard-links-${index}`}>
								<Link
									href={item.to}
									className="text-b3 capitalize text-base leading-[21px]"
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</aside>
		</div>
	) : null;
};

export default DashboardSidebar;
