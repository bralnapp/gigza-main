/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["ipfs.io", "cdn.pixabay.com"]
	}
};

module.exports = nextConfig;
