import Image from "next/image";

// images
import logo from "@/public/asset/logo/logo.svg";
import { footerLinks } from "utils/data/footer-links.data";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-white pt-[35px] pb-[32px] px-6 md:flex items-center justify-between md:py-8 lg:px-20">
			<div className="">
				<Image src={logo} alt="gigza logo" />
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
