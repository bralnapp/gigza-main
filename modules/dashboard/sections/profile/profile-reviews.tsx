import { reviews } from "utils/data";
import Stars from "../../components/stars";

const ProfileReviews = () => {
	return (
		<div className="space-y-4 min-[540px]:space-y-[18px] min-[540px]:w-4/5 max-w-[978px]">
			{reviews.map((item, index) => (
				<div key={`reviews-${index}`} className="pb-4 border-b border-stroke">
					<div className="">
						<Stars reviews={Math.floor(Math.random() * 5) + 1} />
						<h4 className="text-b2 font-bold text-base  min-[540px]:text-xl leading-[19px] min-[540px]:leading-6 mt-[15px] min-[540px]:mt-[23px]  min-[540px]:w-4/5">
							{item.gig}
						</h4>
					</div>
					<div className="flex item-center justify-between text-b3 text-sm leading-4 capitalize my-3">
						<p>{item.clientName}</p>
						<p>{item.date}</p>
					</div>
					<p className="mb-2 text-b2 text-[13px] min-[540px]:text-sm leading-[21px] min-[540px]:leading-[21px]">
						{item.review}
					</p>
					<p className="text-primary text-sm leading-[17px] min-[540px]:leading-[21px] capitalize">
						read more
					</p>
				</div>
			))}
		</div>
	);
};

export default ProfileReviews;
