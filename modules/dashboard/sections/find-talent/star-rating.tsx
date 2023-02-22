import { IReviews } from "@custom-types/typing";
import { useMemo } from "react";
import {
	formatUnit,
	GigzaContractAbi,
	GigzaContractAddress
} from "utils/helper";
import { useContractRead } from "wagmi";
import Stars from "../../components/stars";

type StarRatingProps = {
	address: `0x${string}`;
};

const StarRating = ({ address }: StarRatingProps) => {
	const { data: reviews }: { data: IReviews | undefined } = useContractRead({
		address: GigzaContractAddress,
		abi: GigzaContractAbi,
		functionName: "getReviews",
		args: [address]
	});

	const calculateRating = useMemo(() => {
		return (
			reviews?.reduce(
				(total, b) => total + formatUnit(b?.rating)! * 10 ** 18,
				0
			)! / reviews?.length!
		);
	}, [reviews]);
	return (
		<div className="flex items-center">
			<Stars reviews={calculateRating} />
			<p className="pl-1 text-sm leading-4 text-b3 md:hidden">
				{calculateRating || null}
			</p>
			<p className="hidden pl-1 text-sm leading-4 text-b3 md:block">
				{calculateRating || null} ({reviews?.length} reviews)
			</p>
		</div>
	);
};

export default StarRating;


