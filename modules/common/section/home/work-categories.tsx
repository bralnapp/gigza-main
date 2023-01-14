import { skillsList } from "utils/data";

const WorkCategories = () => {
	return (
		<section className="layout-container pb-16 md:pb-[125px] pt-4">
			<h1 className="font-bold text-xl md:text-[42px] leading-[30px] md:leading-[55px] text-b1 min-[540px]:text-center">
				Find different categories skilled professionals
			</h1>
			<ul className="mt-8 grid grid-cols-2 gap-y-4 md:gap-y-8 min-[540px]:grid-cols-3 md:flex md:flex-wrap md:justify-center md:space-x-4 xl:max-w-5xl xl:mx-auto">
				{skillsList.map((item, index) => (
					<li
						key={`skills-list-${index}`}
						className="border border-[#D0D5DD] py-2 md:py-4 px-4 md:px-6 w-fit rounded-[6px] capitalize text-b2 text-[13px] md:text-base leading-[18px] md:leading-[18px] font-medium"
					>
						{item}
					</li>
				))}
			</ul>
		</section>
	);
};

export default WorkCategories;
