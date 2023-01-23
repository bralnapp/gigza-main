import { sequence } from "0xsequence";
import { ethers } from "ethers";
import {
	DaiContractAbi,
	DiaContractAddress,
	GigzaContractAbi,
	GigzaContractAddress
} from "./store.helper";

const initGigzaContract = async () => {
	try {

		const wallet = sequence.getWallet();
		const signer = wallet.getSigner();

		if (!wallet.isConnected()) throw Error();
		
		const _walletAddress = wallet.getAddress();

		const _contract = new ethers.Contract(
			GigzaContractAddress,
			GigzaContractAbi,
			signer
		);
		return {
			contract: _contract,
			walletAddress: _walletAddress
		};
	} catch (error) {
		throw Error("Please connect account first");
	}
};

const initDaiContract = async () => {
	try {

		const wallet = sequence.getWallet();
		const provider = wallet.getProvider();
		const signer = wallet.getSigner();

		if (!wallet.isConnected()) throw Error();		
        const _walletAddress = wallet.getAddress();

		const _contract = new ethers.Contract(
			DiaContractAddress,
			DaiContractAbi,
			signer
		);
		return {
			contract: _contract,
			walletAddress: _walletAddress
		};
	} catch (error) {
		throw Error("Address is Null");
	}
};

export { initGigzaContract, initDaiContract };
