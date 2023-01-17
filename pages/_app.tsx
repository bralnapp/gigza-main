import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { StoreContextProvider } from "context/StoreContext";
import { Toaster } from "react-hot-toast";

const inter = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plusJakartaSans"
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<StoreContextProvider>
			<Toaster />
			<main className={inter.variable}>
				<Component {...pageProps} />
			</main>
		</StoreContextProvider>
	);
}
