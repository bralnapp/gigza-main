import Link from "next/link";
import { useRouter } from "next/router";
import ProposalLink from "./proposal-link";

export type NavLinkProp = {
	item: {
		title: string;
		to: string;
		categories?: undefined | {
			name: string;
			to: string;
		}[];
	};
};
const NavLink = ({ item }: NavLinkProp) => {
	const router = useRouter();

	return item.title.toLowerCase() === "proposals" ? (
		<ProposalLink {...{ item }} />
	) : (
		<Link
			href={item.to}
			className={`text-base leading-5 capitalize ${
				router?.pathname?.toLowerCase() === item.to.toLowerCase()
					? "text-primary"
					: "text-b4"
			}`}
		>
			{item.title}
		</Link>
	);
};

export default NavLink;
