import { useStoreContext } from "context/StoreContext";
import { useMutation } from "react-query";

const useUploadFileIpfsMutation = () => {
	const { web3StorageClient } = useStoreContext();
	return useMutation(async (file: File) => {
		const cid = await web3StorageClient.put([file]);
		console.log(`https://ipfs.io/ipfs/${cid}/${encodeURI(file.name)}`);
		return `https://ipfs.io/ipfs/${cid}/${encodeURI(file.name)}`;
	});
};

export default useUploadFileIpfsMutation;
