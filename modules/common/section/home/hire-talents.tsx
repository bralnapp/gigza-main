import { findGreatWork } from "utils/data";
import Image from "next/image";
import { Button } from "../../components/input/button";

// images
import bulublu from "@/public/asset/images/bulublu.svg";

const HireTalents = () => {
	return (
		<section className="pb-12">
			<div className="layout-container py-5 px-4 min-[540px]:p-8 md:p-10 bg-[#E9F4F2] rounded-2xl space-y-4 min-[540px]:space-y-8 lg:grid grid-cols-2 lg:gap-x-5 xl:gap-x-[75px] lg:items-center">
				<div className="">
					<h1 className="font-bold text-b1 text-xl min-[540px]:text-2xl md:text-4xl leading-[25px] md:leading-[45px]">
						Hire talents for any job
					</h1>
					<div className="my-[18px] min-[540px]:my-5 md:my-10 space-y-2 md:space-y-6">
						{findGreatWork.map((item, index) => (
							<div key={`find-great-work-${index}`} className="">
								<h4 className="mb-2 font-bold text-base min-[540px]:text-lg md:text-2xl leading-5 md:leading-[30px] text-b1">
									{item.title}
								</h4>
								<p className="text-sm min-[540px]:text-base leading-[22px] md:leading-[22px] text-b3">
									{item.description}
								</p>
							</div>
						))}
					</div>
					<Button
						title="get started"
						href="/dashboard/find-work"
						className="w-[178px]"
					/>
				</div>
				<div className="">
					<Image src={bulublu} alt="" className="w-full" />
					{/* <Image
						src={greatWorkDesktop}
						alt=""
						className="w-full hidden md:block"
					/> */}
				</div>
			</div>
		</section>
	);
};

export default HireTalents;
