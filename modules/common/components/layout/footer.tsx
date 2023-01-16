import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "utils/data";

// images
import logo from "@/public/asset/logo/logo.svg";

const Footer = () => {
	return (
		<footer className="layout-container bg-white pt-[35px] pb-[32px] md:flex items-center justify-between md:py-8">
			<div className="">
				<Link href="/">
					<Image src={logo} alt="gigza logo" />
				</Link>
				<p className="font-primary text-sm leading-6 text-black3 font-normal mt-2">
					Copyright © 2021 Gigza, Inc.
					<span className="block">All rights reserved.</span>
				</p>
			</div>
			<ul className="flex items-center space-x-8 mt-6">
				{footerLinks.map((item, index) => (
					<li key={`footer-links-${index}`}>
						<Link
							href={item.to}
							className="text-primary2 font-medium text-base leading-[18px] capitalize"
						>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</footer>
	);
};

export default Footer;
