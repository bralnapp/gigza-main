import { utils } from "ethers";

export const formatWalletAddress = (address: string) =>
	`${address?.substring(0, 5)}...${address?.substring(
		address.length,
		address.length - 5
	)}`;

export const covertToReadableDate = (value: number) => {
	if (!value) return;
	const _date = new Date(value * 1000).toDateString();
	return _date;
};

// @ts-ignore
export const formatUnit = (value) => {
	if (!value) return;
	return parseFloat(utils.formatEther(value));
};

// @ts-ignore
export const parseUnit = (value) => utils.parseEther(value.toString(), "ether");
