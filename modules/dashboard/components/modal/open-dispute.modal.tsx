import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Button } from "@/modules/common/components/input/button";
import { TextArea, TextInput } from "../input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useStoreContext } from "context/StoreContext";

// images
import closeIcon from "@/public/asset/icons/close.svg";

const schema = yup
	.object()
	.shape({
		dispute: yup.string().required(),
		url: yup.string().url().required()
	})
	.required();

type FormData = {
	dispute: string;
	url: string;
};

type OpenDisputeModalProps = {
	showDisputeModal: boolean;
	setShowDisputeModal: React.Dispatch<React.SetStateAction<boolean>>;
	jobId: number | undefined;
};
const OpenDisputeModal = ({
	showDisputeModal,
	setShowDisputeModal,
	jobId
}: OpenDisputeModalProps) => {

	const [isOpeningDispute, setIsOpeningDispute] = useState(false);
	const router = useRouter();

	const {initGigzaContract} = useStoreContext()

	const handleClose = () => setShowDisputeModal(false);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: FormData) => {
		const notification = toast.loading("Opening dispute");
		setIsOpeningDispute(true);
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.openDispute(jobId);
			const receipt = await txHash.wait();
			if (receipt) {
				toast.success("Dispute has been submitted", {
					id: notification
				});
				setShowDisputeModal(false)
				router.reload();
				// setIsSubmittingJob(false);
			}
		} catch (error) {
			setIsOpeningDispute(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
			console.log(error)
		}
	};
	return (
		<Transition appear show={showDisputeModal} as={Fragment}>
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
							<h1 className="text-[28px] leading-[38px] text-b1">Dispute</h1>
							<div className="cursor-pointer">
								<Image src={closeIcon} onClick={handleClose} alt="" />
							</div>
							{/* <XMarkIcon onClick={handleClose} className="h-8 w-8 text-[#9C9D9F] cursor-pointer" /> */}
						</Dialog.Title>
						<section className="my-6">
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<TextArea
									id="dispute"
									name="dispute"
									placeholder="write out your issue"
									label="Enter your dispute"
									className="h-[163px]"
									{...{ register, errors }}
								/>

								<TextInput
									id="url"
									name="url"
									type="url"
									label="link to files"
									placeholder=""
									{...{ register, errors }}
								/>

								<Button
									title="Submit"
									className="w-full"
									disabled={isOpeningDispute}
								/>
							</form>
						</section>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default OpenDisputeModal;
