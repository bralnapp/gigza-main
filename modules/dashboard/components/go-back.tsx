import Image from "next/image";
import { useRouter } from "next/router";

// images
import arrowLeftIcon from "@/public/asset/icons/arrow-left.svg";

const GoBack = () => {
	const router = useRouter();

	return (
		<button onClick={() => router.back()}>
			<Image src={arrowLeftIcon} alt="" />
		</button>
	);
};

export default GoBack;
