import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/modules/common/components/input/button";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { formatUnit } from "utils/helper";
import { useStoreContext } from "context/StoreContext";

// images
import closeIcon from "@/public/asset/icons/close.svg";

type DeclineOfferModalProps = {
	isDeclineModalOpen: boolean;
	setIsDeclineModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	jobId: any;
};

const DeclineOfferModal = ({
	isDeclineModalOpen,
	setIsDeclineModalOpen,
	jobId
}: DeclineOfferModalProps) => {
	const router = useRouter();

	const { initGigzaContract } = useStoreContext();

	const [isDeclining, setIsDeclining] = useState(false);

	const handleDeclineOffer = async () => {
		const notification = toast.loading("Declining offer");
		setIsDeclining(true);
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.declineOffer(
				formatUnit(jobId)! * 10 ** 18
			);
			const receipt = await txHash.wait();
			if (receipt) {
				setIsDeclining(false);
				toast.success("Offer has been declined", {
					id: notification
				});
				router.push("/dashboard/contract");
			}
		} catch (error) {
			setIsDeclining(false);
			setIsDeclineModalOpen(false);
			console.log(error);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
		}
	};

	const handleClose = () => {
		setIsDeclineModalOpen(false);
	};
	return (
		<Transition appear show={isDeclineModalOpen} as={Fragment}>
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
						<Dialog.Title
							as="div"
							className="flex items-center justify-between"
						>
							<div className="ml-auto cursor-pointer">
								<Image
									src={closeIcon}
									onClick={handleClose}
									alt=""
									className="h-3 w-3"
								/>
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="">
							<div className="my-6 min-[540px]:mt-[30px]">
								<h4 className="mb-2 text-xl font-bold capitalize leading-6 text-b1">
									decline offer
								</h4>
								<p className="text-sm leading-5 text-b3 min-[540px]:text-base min-[540px]:leading-[19px]">
									You would not have access to this offer again. You may contact
									the client instead
								</p>
							</div>
							<div className="flex items-center gap-x-4 min-[540px]:justify-end">
								<Button
									title="Cancel"
									onClick={handleClose}
									className="w-[158px] bg-[#E8E8EF] font-normal text-b1 min-[540px]:w-[109px]"
								/>
								<Button
									title="Yes, Continue"
									onClick={handleDeclineOffer}
									disabled={isDeclining}
									className="w-[174px] bg-[#F02323] font-normal text-white min-[540px]:w-[156px]"
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
