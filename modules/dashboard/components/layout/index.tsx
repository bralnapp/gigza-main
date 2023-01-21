import Head from "next/head";
import DashboardNav from "./dashboard-nav";

type DashboardLayoutProps = {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }:DashboardLayoutProps) => {
	return (
		<div>
			<Head>
				<title>Giza | Home</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="gigza" />
			</Head>
			<DashboardNav />
			<main className="mt-[79px]">{children}</main>
		</div>
	);
};

export default DashboardLayout;
