import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";

// images
import closeIcon from "@/public/asset/icons/close.svg";

type SubmitJobModalProps = {
	isSubmitJobModalOpen: boolean;
	setIsSubmitJobModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const SubmitJobModal = ({
	isSubmitJobModalOpen,
	setIsSubmitJobModalOpen
}: SubmitJobModalProps) => {

    const handleClose = () => setIsSubmitJobModalOpen(false)
	return (
		<Transition appear show={isSubmitJobModalOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-[999999]"
				onClose={handleClose}
			>
				<div className="min-h-screen text-center">
					<Dialog.Overlay className="fixed left-0 top-0 z-[999999] h-full w-full bg-black bg-opacity-75" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div className="relative z-[999999999] inline-block w-11/12 max-w-lg rounded-lg bg-[#fff] px-6 py-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title
							as="div"
							className="flex items-center justify-between"
						>
							<h1 className="text-[28px] leading-[38px] text-b1">Dispute</h1>
							<div className="cursor-pointer">
								<Image src={closeIcon} onClick={handleClose} alt="" />
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="my-6">
							{/* <form onSubmit={handleSubmit}>
								<TextArea
									id="dispute"
									name="dispute"
									placeholder="write out your issue"
									label="Enter your dispute"
									value={formData.dispute}
									handleTextChange={handleTextChange}
									className="h-[163px]"
								/>

								<div className="my-[25px]">
									<p className="mb-4 text-base capitalize text-[#101828]">
										Attach file
									</p>
									<AttachFile handleFile={handleFile} />
								</div>

								<Button title="Submit" className="w-full" />
							</form> */}
						</section>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SubmitJobModal;
