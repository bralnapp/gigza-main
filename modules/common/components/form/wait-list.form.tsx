import { TextInput } from "@/modules/dashboard/components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { Button } from "../input/button";

const schema = yup
	.object()
	.shape({
		email: yup.string().required()
	})
	.required();

type FormData = {
	email: string;
};

const WaitListForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);
		const notificationId = toast.loading("Please wait...");
		const res = await fetch("/api/subscribe", {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		});

		const { error } = await res.json();
		if (error) {
			setIsSubmitting(false);
			toast.error("Something went wrong. Please try again later.", {
				id: notificationId
			});
			return;
		}
		reset({ email: "" });
		setIsSubmitting(false);
		toast.success("Success! 🎉  You've been added to the list!.", {
			id: notificationId
		});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				id="email"
				name="email"
				label="your email"
				placeholder="Enter your email"
				type="email"
				className="bg-[#F7F7F7] md:w-11/12"
				{...{ register, errors }}
			/>
			<Button
				title="submit"
				className="w-[178px] mt-4"
				disabled={isSubmitting}
			/>
		</form>
	);
};

export default WaitListForm;
