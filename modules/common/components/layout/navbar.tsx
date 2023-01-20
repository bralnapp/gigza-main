import { useState } from "react";
import { Button } from "../input/button";
import Image from "next/image";
import { footerLinks } from "utils/data";
import Link from "next/link";
import Sidebar from "./sidebar";

// images
import logo from "@/public/asset/logo/logo.svg";
import menu from "@/public/asset/icons/menu.svg";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<header className="fixed z-[999] w-full top-0 left-0 bg-white">
			<Sidebar {...{ isOpen, toggleMenu, setIsOpen }} />
			<div className="layout-container h-[62px] md:h-20 flex items-center justify-between">
				<Link href="/">
					<Image src={logo} alt="gigza logo" />
				</Link>
				<nav className="items-center space-x-8 hidden md:flex">
					{footerLinks.map((item, index) => (
						<Link
							key={`nav-links-${index}`}
							href={item.to}
							className="text-primary-2 font-medium text-base leading-[18px] capitalize"
						>
							{item.name}
						</Link>
					))}
				</nav>
				<Image src={menu} alt="" className="md:hidden" onClick={toggleMenu} />
				<Button
					title="get started"
					href="/dashboard/find-work"
					// onClick={connectAccount}
					className="w-[151px] hidden md:flex"
				/>
			</div>
		</header>
	);
};

export default Navbar;
