import { Button } from "@/modules/common/components/input/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStoreContext } from "context/StoreContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { TextArea, TextInput } from "../input";

const schema = yup.object().shape({
	message: yup.string().required(),
	url: yup.string().url()
});

type FormData = {
	message: string;
	url: string;
};

type SubmitJobFormProps = {
	jobId: number | undefined;
};

const SubmitJobForm = ({ jobId }: SubmitJobFormProps) => {
	const { initGigzaContract } = useStoreContext();
	const [isSubmittingJob, setIsSubmittingJob] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: FormData) => {
		const notification = toast.loading("Submitting work...");
		setIsSubmittingJob(true);
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.submitJob(
				jobId,
				data.message,
				data.url
			);
			const receipt = await txHash.wait();
			if (receipt) {
				toast.success("Job has been submitted", {
					id: notification
				});
				router.reload();
				// setIsSubmittingJob(false);
			}
		} catch (error) {
			setIsSubmittingJob(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
			<TextArea
				id="message"
				name="message"
				className="h-[159px]"
				label="send message to client"
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
				title="submit"
				disabled={isSubmittingJob}
				className="mt-6 h-10 w-full"
			/>
		</form>
	);
};

export default SubmitJobForm;
