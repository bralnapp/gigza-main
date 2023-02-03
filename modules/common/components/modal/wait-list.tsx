import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { WaitListForm } from "../form";

// images
import closeIcon from "@/public/asset/icons/close.svg";
import waitlistImage from "@/public/asset/images/waitlist.svg";
import waitlistHero from "@/public/asset/images/waitlist-hero.svg";
import lockIcon from "@/public/asset/icons/lock.svg";
import { useWindowSize } from "utils/hooks";

type WaitListProps = {
	showWaitList: boolean;
	setShowWaitList: React.Dispatch<React.SetStateAction<boolean>>;
};

const WaitList = ({ showWaitList, setShowWaitList }: WaitListProps) => {
	const { width } = useWindowSize();
	const handleClose = () => {
		setShowWaitList(false);
	};

	return (
		<Transition appear show={showWaitList} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 z-[999]" onClose={handleClose}>
				<div className="min-h-screen text-center">
					<Dialog.Overlay className="fixed left-0 top-0 z-[99] h-full w-full bg-black bg-opacity-75" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div className="relative z-[999] inline-block w-11/12 max-w-[1141px] rounded-lg bg-[#fff] px-4 py-5 text-left align-middle shadow-xl transition-all min-[540px]:w-[380px] md:w-4/5 md:px-8 md:py-10 lg:w-11/12">
						<Dialog.Title
							as="div"
							className="flex items-center justify-between"
						>
							<div className="ml-auto mt-[6px] cursor-pointer">
								<Image
									src={closeIcon}
									onClick={handleClose}
									alt=""
									className="h-3 w-3"
								/>
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="mt-[18px] grid-cols-2 items-center gap-x-9 lg:mt-0 lg:grid">
							<Image
								src={width! < 1024 ? waitlistImage : waitlistHero}
								alt=""
								className="w-full"
							/>
							<div className="">
								<h1 className="mt-8 text-2xl font-bold leading-[29px] text-b1 md:text-[40px] md:leading-[48px] lg:mt-0">
									Join our waiting list
								</h1>
								<p className="mt-2 mb-5 text-base leading-[19px] text-b3 md:mb-10">
									Stay updated on our exciting new journey
								</p>
								<WaitListForm {...{ setShowWaitList }} />
								<div className="mt-8 flex items-center gap-x-2">
									<Image src={lockIcon} alt="" />
									<p className="text-sm leading-[17px] text-b4">
										Your infomation will never be shared with any third party
									</p>
								</div>
							</div>
						</section>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default WaitList;
