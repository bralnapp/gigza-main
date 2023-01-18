import Image from "next/image";
import { useRef } from "react";
import useOnClickOutside from "utils/hooks/useOnClickOutside.hook";
import { dashboardNavLinks } from "utils/data";
import { ConnectWalletButton } from "@/modules/common/components/input";
import Link from "next/link";
import ProposalSidebarLink from "@/modules/common/misc/proposal-sidebar-link";

// images
import closeIcon from "@/public/asset/icons/close.svg";

type Props = {
	isOpen: boolean;
	toggleMenu: () => void;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardSidebar = ({ isOpen, toggleMenu, setIsOpen }: Props) => {
	const sideBarRef = useRef(null);
	const clickOutsideHandler = () => {
		setIsOpen(false);
	};
	useOnClickOutside(sideBarRef, clickOutsideHandler);

	return isOpen ? (
		<div
			className={`bg-black/80 w-full fixed h-screen top-0 left-0 z-[200] overflow-y-hidden md:hidden`}
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
				<ConnectWalletButton />
				<ul className="mt-8 space-y-10">
					{dashboardNavLinks.map((item, index) => (
						<li key={`sidebar-links-${index}`} className="">
							{item.title.toLowerCase() === "proposals" ? (
								<ProposalSidebarLink handleCloseSidebar={() => setIsOpen(false)} {...{ item }} />
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
			</aside>
		</div>
	) : null;
};

export default DashboardSidebar;
