import Image from "next/image";
import { hireTalentsWay } from "utils/data";

const HireTalentsWay = () => {
	return (
		<section className="layout-container pt-[46px] pb-12 lg:pb-20">
			<h1 className="font-bold text-xl min-[540px]:text-2xl md:text-[42px] leading-[25px] md:leading-[53px] text-b1 text-center">
				Hire talents your way
			</h1>
			<div className="mt-4 lg:grid grid-cols-3 md:gap-x-6">
				{hireTalentsWay.map((item, index) => (
					<div
						key={`hire-talent-way-${index}`}
						className="flex items-center space-x-3  py-3 min-[540px]:py-5"
					>
						<Image src={item.image} alt="" />
						<div className="w-full">
							<h4 className="font-bold text-base min-[540px]:text-lg md:text-2xl leading-5 md:leading-[30px] text-b1 mb-[7px]">
								{item.title}
							</h4>
							<p className="text-b4 text-[13px] min-[540px]:text-base leading-4 min-[540px]:leading-5 md:w-3/4 lg:w-full">
								{item.subTitle}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default HireTalentsWay;
