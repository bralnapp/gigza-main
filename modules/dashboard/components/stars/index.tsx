import Image from "next/image";
import { useState } from "react";

// images
import starOutline from "@/public/asset/stars/star-outline.svg";
import starSolid from "@/public/asset/stars/star-solid.svg";

type Props = {
	reviews?: number;
	className?: string;
	handleReview?: boolean;
	onChange?: (value: number) => void;
};

const Stars = ({ reviews, className, handleReview, onChange }: Props) => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	const handleRating = (index: number) => {
		if (handleReview) {
			setRating(index);
			onChange!(index);
		}
	};

	const handleRoverRating = (index:number) => {
		if (handleReview) {
			setHover(index)
		}
	}
	return (
		<div className={`flex items-center space-x-[5px] ${className}`}>
			{Array(5)
				.fill("")
				.map((_, index) => {
					index += 1;
					return (
						<div
							key={index}
							className={`${handleReview ? "cursor-pointer" : null}`}
							onClick={() => handleRating(index)}
							onMouseEnter={() => handleRoverRating(index)}
							onMouseLeave={() => handleRoverRating(rating)}
						>
							<Image
								key={index}
								src={
									index > (reviews || hover || rating) ? starOutline : starSolid
								}
								alt=""
								width={handleReview ? 32 : 12}
								height={handleReview ? 32 : 12}
							/>
						</div>
					);
				})}
		</div>
	);
};

export default Stars;
