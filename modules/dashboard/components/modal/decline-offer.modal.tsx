import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/modules/common/components/input/button";

// images
import closeIcon from "@/public/asset/icons/close.svg";
import Image from "next/image";

type DeclineOfferModalProps = {
	isDeclineModalOpen: boolean;
	setIsDeclineModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeclineOfferModal = ({
	isDeclineModalOpen,
	setIsDeclineModalOpen
}: DeclineOfferModalProps) => {
	const handleClose = () => {
		setIsDeclineModalOpen(false);
	};
	return (
		<Transition appear show={isDeclineModalOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-[999999]"
				onClose={handleClose}
			>
				<div className="min-h-screen text-center">
					<Dialog.Overlay className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-75 z-[999999]" />
					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div className="inline-block w-11/12 text-left align-middle transition-all z-[999999999] relative shadow-xl bg-[#fff] max-w-lg px-6 py-6 rounded-lg">
						<Dialog.Title
							as="div"
							className="flex items-center justify-between"
						>
							<div className="cursor-pointer ml-auto">
								<Image
									src={closeIcon}
									onClick={handleClose}
									alt=""
									className="w-3 h-3"
								/>
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="">
							<div className="my-6 min-[540px]:mt-[30px]">
								<h4 className="mb-2 capitalize text-b1 font-bold text-xl leading-6">
									decline offer
								</h4>
								<p className="text-b3 text-sm min-[540px]:text-base leading-5 min-[540px]:leading-[19px]">
									You would not have access to this offer again. You may contact
									the client instead
								</p>
							</div>
							<div className="flex items-center gap-x-4 min-[540px]:justify-end">
								<Button
									title="Cancel"
									onClick={handleClose}
									className="bg-[#E8E8EF] w-[158px] min-[540px]:w-[109px] text-b1 font-normal"
								/>
								<Button
									title="Yes, Continue"
									onClick={handleClose}
									className="bg-[#F02323] w-[174px] min-[540px]:w-[156px] text-white font-normal"
								/>
							</div>
						</section>
						{/* <section className="my-6">
							<form onSubmit={handleSubmit}>
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
									<p className="capitalize mb-4 text-base text-[#101828]">
										Attach file
									</p>
									<AttachFile handleFile={handleFile} />
								</div>

								<Button title="Submit" className="w-full" />
							</form>
						</section> */}
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default DeclineOfferModal;
