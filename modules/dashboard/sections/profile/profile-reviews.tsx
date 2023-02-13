import { IReviews } from "@custom-types/typing";
import { formatUnit } from "utils/helper";
import Stars from "../../components/stars";
import { ReviewClientDetails, ReviewJobTitle } from "../reviews";

type ProfileReviewsProps = {
	reviews: IReviews | undefined;
};

const ProfileReviews = ({ reviews }: ProfileReviewsProps) => {
	return (
		<div className="max-w-[978px] space-y-4 min-[540px]:w-4/5 min-[540px]:space-y-[18px]">
			{reviews?.map((item, index) => (
				<div key={`reviews-${index}`} className="border-b border-stroke pb-4">
					<div className="">
						<div className="flex items-center gap-x-2">
							<Stars reviews={formatUnit(item?.rating)! * 10 ** 18} />
							<p className="text-sm leading-[17px] text-[#FFB800]">
								{formatUnit(item?.rating)! * 10 ** 18}
							</p>
						</div>
						<ReviewJobTitle jobId={formatUnit(item?.jobId)! * 10 ** 18} />
					</div>
					<div className="my-3 flex items-center justify-between">
						<ReviewClientDetails address={item?.client} />
						<p>Tue Oct 06 2020</p>
					</div>
					<p className="mb-2 whitespace-pre-wrap text-[13px] leading-[21px] text-b2 min-[540px]:text-sm min-[540px]:leading-[21px]">
						{item?.review}
					</p>
					{/* <p className="text-sm capitalize leading-[17px] text-primary min-[540px]:leading-[21px]">
						read more
					</p> */}
				</div>
			))}
		</div>
	);
};

export default ProfileReviews;
