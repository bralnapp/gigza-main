import { Button } from "@/modules/common/components/input/button";
import Head from "next/head";
import { useAccount } from "wagmi";
import DashboardNav from "./dashboard-nav";
import { useWeb3Modal } from "@web3modal/react";

type DashboardLayoutProps = {
	children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	const { isConnected } = useAccount();
	const { open } = useWeb3Modal();

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
				{isConnected ? (
					<>{children}</>
				) : (
					<div className="grid h-[calc(100vh_-_79px)] place-items-center">
						<div>
							<p>Please connect your account first</p>
							<Button
								onClick={() => open()}
								title="Connect Wallet"
								className="mx-auto mt-4 w-fit px-3"
							/>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default DashboardLayout;
