import Stars from "../stars";

type StarRatingProps = {
	onChange: (value: number) => void;
	error: string;
};

const StarRating = ({ onChange, error }: StarRatingProps) => {
	return (
		<div>
			<div className="flex h-[112px] items-center justify-center rounded-lg bg-[#FCFCFC]">
				<Stars handleReview {...{ onChange }} />
			</div>
			{error ? (
				<p className="mt-[6px] mb-6 text-sm leading-[17px] text-red-500">
					rating is required
				</p>
			) : null}
		</div>
	);
};

export default StarRating;
