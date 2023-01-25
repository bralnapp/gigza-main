import { useStoreContext } from "context/StoreContext";
import Head from "next/head";
import DashboardNav from "./dashboard-nav";

type DashboardLayoutProps = {
	children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	const { state } = useStoreContext();
	return (
		<div>
			<Head>
				<title>Giza | Home</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="gigza" />
			</Head>
			<DashboardNav />
			<main className="mt-[79px] min-h-screen bg-[#FBFAFA]">
				{state.isWalletConnected ? (
					<>{children}</>
				) : (
					<p className="grid place-items-center h-[calc(100vh_-_79px)]">
						Please connect your account first
					</p>
				)}
			</main>
		</div>
	);
};

export default DashboardLayout;
