import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Head>
				<title>Gigza | Home</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
