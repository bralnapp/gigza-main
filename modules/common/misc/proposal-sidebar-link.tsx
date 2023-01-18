import { NavLinkProp } from "@/modules/dashboard/components/navlink";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// images
import arrowDown from "@/public/asset/icons/arrow-down.svg";
import arrowUp from "@/public/asset/icons/arrow-up.svg";

type ProposalSidebarLinkProp = {
	item: {
		title: string;
		to: string;
		categories?:
			| undefined
			| {
					name: string;
					to: string;
			  }[];
	};
	handleCloseSidebar: () => void;
};

const ProposalSidebarLink = ({
	item,
	handleCloseSidebar
}: ProposalSidebarLinkProp) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<div
				className="flex items-center justify-between"
				onClick={() => setIsOpen(!isOpen)}
			>
				<p className="text-b3  text-base leading-[19px] capitalize">
					{item.title}
				</p>
				<Image src={isOpen ? arrowUp : arrowDown} alt="" />
			</div>

			{isOpen ? (
				<ul className="mt-[18px] space-y-5">
					{item?.categories?.map((value, index) => (
						<li key={index}>
							<Link
								href={value.to}
								className="text-b3  text-base leading-[19px] capitalize"
								onClick={handleCloseSidebar}
							>
								{value.name}
							</Link>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export default ProposalSidebarLink;
