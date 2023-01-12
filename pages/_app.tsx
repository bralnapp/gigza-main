import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "@next/font/google";

const inter = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plusJakartaSans"
});

export default function App({ Component, pageProps }: AppProps) {
	return <main className={inter.variable}>
		<Component {...pageProps} />
	</main>;
}
