import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/modules/common/components/input/button";
import { TextArea } from "../input";
import * as yup from "yup";
import Select from "../input/select";
import { toast } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	convertToNumber,
	currentEpochTime,
	initGigzaContract
} from "utils/helper";

const schema = yup
	.object()
	.shape({
		timeline: yup.number().required(),
		description: yup.string().required()
	})
	.required();

type FormData = {
	timeline: string;
	description: string;
};

type JobBidFormProps = {
	jobId: number;
};

const JobBidForm = ({ jobId }: JobBidFormProps) => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const timeDurationOptions = ["2", "4", "6", "8"];

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: FormData) => {
		const notification = toast.loading("Please wait...Submitting Proposal");
		try {
			const response = await initGigzaContract();
			const contract = response.contract;
			const txHash = await contract.submitProposal(
				jobId,
				data.description,
				currentEpochTime + 604800 * convertToNumber(data.timeline)
			);
			const receipt = await txHash.wait();
			if (receipt) {
				setIsSubmitting(false);
				toast.success("Your proposal have been sent", {
					id: notification
				});
			}
			setIsSubmitting(false);
		} catch (error) {
			toast.error("Something went wrong", {
				id: notification
			});
			console.log(error);
			setIsSubmitting(false);
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-8 pb-12 lg:pb-[145px]"
		>
			<Controller
				name="timeline"
				control={control}
				render={({ field: { onChange } }) => (
					<Select
						options={timeDurationOptions}
						defaultValue={timeDurationOptions[0]}
						onChange={onChange}
						headerTitle="How long will it take you?"
					/>
				)}
			/>
			<TextArea
				id="description"
				name="description"
				label="submit proposal"
				placeholder="Write Message"
				className="h-[124px]"
				{...{ register, errors }}
			/>
			<div className="flex items-center gap-x-4">
				<Button
					title="cancel"
					className="w-[182px] bg-[#EBEEF2] text-[#5F6062] lg:hidden"
					onClick={() => router.back()}
				/>
				<Button
					title="submit proposal"
					className="w-[182px] lg:w-full disabled:bg-gray-600 disabled:cursor-not-allowed"
					disabled={isSubmitting}
				/>
			</div>
		</form>
	);
};

export default JobBidForm;
