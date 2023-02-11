import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { SubmitJobForm } from "../forms";

// images
import closeIcon from "@/public/asset/icons/close.svg";

type SubmitJobModalProps = {
	isSubmitJobModalOpen: boolean;
	setIsSubmitJobModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	jobId: number | undefined;
};

const SubmitJobModal = ({
	isSubmitJobModalOpen,
	setIsSubmitJobModalOpen,
	jobId
}: SubmitJobModalProps) => {
	const handleClose = () => setIsSubmitJobModalOpen(false);
	return (
		<Transition appear show={isSubmitJobModalOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-[999]"
				onClose={handleClose}
			>
				<div className="min-h-screen text-center">
					<Dialog.Overlay className="fixed left-0 top-0 z-[99] h-full w-full bg-black bg-opacity-75" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div className="relative z-[999] inline-block w-11/12 max-w-lg rounded-lg bg-[#fff] px-6 py-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title as="div" className="flex justify-end">
							<div className="cursor-pointer ">
								<Image src={closeIcon} onClick={handleClose} alt="" />
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="my-6">
							<h1 className="mb-2 text-xl capitalize leading-6 text-b1">
								Submit work
							</h1>
							<p className="text-base leading-[19px] text-b3">
								Attach links for client to review work
							</p>
							<SubmitJobForm {...{ jobId }} />
						</section>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SubmitJobModal;
