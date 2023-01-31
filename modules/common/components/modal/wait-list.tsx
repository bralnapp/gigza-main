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
			<Dialog
				as="div"
				className="fixed inset-0 z-[999]"
				onClose={handleClose}
			>
				<div className="min-h-screen text-center">
					<Dialog.Overlay className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-75 z-[99]" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div className="inline-block w-11/12 min-[540px]:w-[380px] md:w-4/5 lg:w-11/12 max-w-[1141px] text-left align-middle transition-all z-[999] relative shadow-xl bg-[#fff] px-4 md:px-8 py-5 md:py-10 rounded-lg">
						<Dialog.Title
							as="div"
							className="flex items-center justify-between"
						>
							<div className="cursor-pointer ml-auto mt-[6px]">
								<Image
									src={closeIcon}
									onClick={handleClose}
									alt=""
									className="w-3 h-3"
								/>
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="mt-[18px] lg:mt-0 lg:grid grid-cols-2 items-center gap-x-9">
							<Image
								src={width! < 1024 ? waitlistImage : waitlistHero}
								alt=""
								className="w-full"
							/>
							<div className="">
								<h1 className="mt-8 lg:mt-0 font-bold text-b1 text-2xl md:text-[40px] leading-[29px] md:leading-[48px]">
									Join our waiting list
								</h1>
								<p className="mt-2 mb-5 md:mb-10 text-b3 text-base leading-[19px]">
									Stay updated on our exciting new journey
								</p>
								<WaitListForm />
								<div className="mt-8 flex items-center gap-x-2">
									<Image src={lockIcon} alt="" />
									<p className="text-b4 text-sm leading-[17px]">
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
