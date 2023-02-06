/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["ipfs.io", "cdn.pixabay.com", "zengo.com"]
	}
};

module.exports = nextConfig;
