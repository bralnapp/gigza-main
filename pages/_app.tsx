import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { StoreContextProvider } from "context/StoreContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plusJakartaSans"
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<StoreContextProvider>
				<Toaster />
				<main className={inter.variable}>
					<Component {...pageProps} />
				</main>
			</StoreContextProvider>
		</QueryClientProvider>
	);
}
