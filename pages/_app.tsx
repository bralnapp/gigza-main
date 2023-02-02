import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { StoreContextProvider } from "context/StoreContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "utils/config";
import { useEffect, useState } from "react";

const inter = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plusJakartaSans"
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		setReady(true);
	}, []);

	return (
		<>
			{ready ? (
				<WagmiConfig client={wagmiClient}>
					<QueryClientProvider client={queryClient}>
						<StoreContextProvider>
							<Toaster toastOptions={{ style: { zIndex: 999999999999999 } }} />
							<main className={inter.variable}>
								<Component {...pageProps} />
							</main>
						</StoreContextProvider>
					</QueryClientProvider>
				</WagmiConfig>
			) : null}
		</>
	);
}
