import { useMutation } from "react-query";
import { web3StorageClient } from "utils/config";

const useUploadFileIpfsMutation = () => {
	return useMutation(async (file: File) => {
		const cid = await web3StorageClient.put([file]);
		console.log(`https://ipfs.io/ipfs/${cid}/${encodeURI(file.name)}`);
		return `https://ipfs.io/ipfs/${cid}/${encodeURI(file.name)}`;
	});
};

export default useUploadFileIpfsMutation;
