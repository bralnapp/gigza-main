import Link from "next/link";
import { useRouter } from "next/router";

type NavLinkProp = {
	title: string;
	to: string;
};
const NavLink = ({ title, to }: NavLinkProp) => {
	const router = useRouter();

	return (
		<Link
			href={to}
			className={`text-base leading-5 capitalize ${
				router?.pathname?.toLowerCase() === to.toLowerCase()
					? "text-primary"
					: "text-b4"
			}`}
		>
			{title}
		</Link>
	);
};

export default NavLink;
