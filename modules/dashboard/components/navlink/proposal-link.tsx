import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useOnClickOutside from "utils/hooks/useOnClickOutside.hook";
import { NavLinkProp } from ".";

// images
import arrowDown from "@/public/asset/navbar/arrow-down.svg";

const ProposalLink = ({ item }: NavLinkProp) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const dropDownRef = useRef(null);

	const clickOutsideHandler = () => setShowDropDown(false);

	useOnClickOutside(dropDownRef, clickOutsideHandler);

	const handleShowDropDown = () => setShowDropDown(!showDropDown);


	return (
		<div ref={dropDownRef} className="relative">
			{showDropDown ? (
				<div className="absolute top-8 bg-white  w-[291px]">
					<ul className="flex flex-col space-y-5 py-4 px-6">
						{item?.categories?.map((link, index) => (
							<Link
								key={index}
								href={link.to}
								className="text-b3 w-fit capitalize cursor-pointer text-sm leading-[21px]"
								onClick={handleShowDropDown}
							>
								{link.name}
							</Link>
						))}
					</ul>
				</div>
			) : null}
			<div
				className="flex items-center cursor-pointer"
				onClick={handleShowDropDown}
			>
				<p className="mr-2 text-base leading-5 capitalize text-b4">
					{item.title}
				</p>
				<div className=" mt-2">
					<Image src={arrowDown} alt="" />
				</div>
			</div>
		</div>
	);
};

export default ProposalLink;
