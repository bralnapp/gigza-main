import Image from "next/image";
import Marquee from "react-fast-marquee";
import { partnerLogos } from "utils/data";

const Partners = () => {
	return (
		<section className="md:layout-container mt-4 md:mt-8">
			<Marquee>
				<div className="flex items-center space-x-6 md:space-x-[96px] mr-6">
					{partnerLogos.map((item, index) => (
						<Image
							src={item}
							alt=""
							key={`partner-logos-${index}`}
							className="w-[71px] md:w-[116px] h-[22px] md:h-9"
						/>
					))}
				</div>
			</Marquee>
		</section>
	);
};

export default Partners;
