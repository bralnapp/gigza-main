import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";

// images
import closeIcon from "@/public/asset/icons/close.svg";
import { WriteReviewForm } from "../forms";

type WriteReviewModalProps = {
	showReviewModal: boolean;
	setShowReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
	jobId: number | undefined;
};

const WriteReviewModal = ({
	showReviewModal,
	setShowReviewModal,
	jobId
}: WriteReviewModalProps) => {
	const handleClose = () => setShowReviewModal(false);
	return (
		<Transition appear show={showReviewModal} as={Fragment}>
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
					<div className="relative z-[999] inline-block w-11/12 max-w-[709px] rounded-lg bg-[#fff] px-6 py-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title
							as="div"
							className="flex items-center justify-between"
						>
							<h1 className="text-xl font-bold capitalize leading-6 text-b1 md:text-[28px] md:leading-[34px]">
								write review
							</h1>
							<div className="cursor-pointer">
								<Image src={closeIcon} onClick={handleClose} alt="" />
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="mt-[25px]">
							<WriteReviewForm {...{ jobId, handleClose }} />
						</section>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default WriteReviewModal;
