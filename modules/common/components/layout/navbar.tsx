import Image from "next/image";

// images
import logo from "@/public/asset/logo/logo.svg";
import menu from "@/public/asset/icons/menu.svg";
import { footerLinks } from "utils/data";
import Link from "next/link";
import { Button } from "../input";

const Navbar = () => {
	return (
		<div className="fixed z-[999] w-full top-0 left-0 bg-white">
			<div className="layout-container h-[62px] md:h-20 flex items-center justify-between">
				<Image src={logo} alt="gigza logo" />
				<nav className="flex items-center space-x-8">
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
				<Image src={menu} alt="" className="md:hidden" />
				<Button title="get started" href="/" className="w-[151px] hidden md:flex" />
			</div>
		</div>
	);
};

export default Navbar;
