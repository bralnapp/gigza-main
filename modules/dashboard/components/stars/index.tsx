import Image from "next/image";

// images
import starOutline from "@/public/asset/stars/star-outline.svg";
import starSolid from "@/public/asset/stars/star-solid.svg";

type Props = {
	reviews: number;
	className?: string;
	handleReview?: (index: number) => void;
};

const Stars = ({ reviews, className, handleReview }: Props) => {
	return (
		<div className={`flex items-center space-x-[5px] ${className}`}>
			{Array(5)
				.fill("")
				.map((_, index) => (
					<div
						key={index}
						className={`${handleReview ? "cursor-pointer" : null}`}
						onClick={() => handleReview?.(index + 1)}
					>
						<Image
							key={index}
							src={index + 1 > reviews ? starOutline : starSolid}
							alt=""
							width={handleReview ? 32 : 12}
							height={handleReview ? 32 : 12}
						/>
					</div>
				))}
		</div>
	);
};

export default Stars;
