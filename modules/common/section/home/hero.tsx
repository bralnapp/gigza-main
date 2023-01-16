import Image from "next/image";
import { Button } from "../../components/input";

// images
import heroMobile from "@/public/asset/images/hero-mobile.svg";
import heroDesktop from "@/public/asset/images/hero-desktop.svg";

const Hero = () => {
	return (
		<section className="bg-[#0B2C25] py-8 md:py-[63px]">
			<div className="w-11/12 lg:w-[96%] mx-auto lg:mx-0 lg:ml-auto lg:grid grid-cols-2 lg:gap-x-10 xl:gap-x-20 lg:items-center">
				<div className="">
					<h1 className="font-bold text-white max-[400px]:text-3xl min-[412px]:text-4xl min-[540px]:text-5xl md:text-[52px] lg:text-4xl xl:text-[52px] md:leading-[68px] xl:leading-[68px] min-[412px]:leading-[45px]">
						Gigza market place is{" "}
						<span className="block text-primary">the future of work</span>
					</h1>
					<p className="my-[18px] min-[540px]:mt-4 min-[540px]:mb-8 text-white text-base min-[540px]:text-xl leading-[23px] md:w-4/5 lg:w-full xl:w-[583px]">
						Gigza is a permisionless decentralized freelancing marketplace that
						allows anyone to post a job and get help from freelancers with the
						requisite skills.
					</p>
					<Button title="get started" href="/" className="md:w-[196px]" />
				</div>
				<div className="mt-8 min-[540px]:mt-10 lg:mt-0">
					<Image
						src={heroMobile}
						alt=""
						className="w-full lg:hidden"
						priority
					/>
					<Image
						src={heroDesktop}
						alt=""
						className="w-full hidden lg:block"
						priority
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
