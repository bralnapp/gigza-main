import Image, { StaticImageData } from "next/image";
import numeral from "numeral";
import React from "react";

type MetricsCardProps = {
	value: number;
	text: string;
	icon: StaticImageData;
};

const MetricsCard = ({ value, text, icon }: MetricsCardProps) => {
	return (
		<div className="flex items-center md:mr-auto gap-x-3">
			<Image
				src={icon}
				alt=""
				className="h-10 w-10 min-[540px]:h-[56px] min-[540px]:w-[56px]"
			/>
			<div>
				<p className="mb-2 text-2xl font-bold leading-[29px] text-[#0B0B27] min-[540px]:text-[32px] min-[540px]:leading-[38px]">
					{numeral(value).format(",")}
				</p>
				<p className="text-[13px] leading-4 text-b4 min-[540px]:text-base min-[540px]:leading-[19px]">
					{text}
				</p>
			</div>
		</div>
	);
};

export default MetricsCard;
