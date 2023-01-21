import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/modules/common/components/input/button";
import { TextArea } from "../input";
import Select from "../input/select";

const JobBidForm = () => {
	const initialFormData = {
		duration: "2",
		proposal: ""
	};
	const [formData, setFormData] = useState(initialFormData);
	const router = useRouter();
	const timeDurationOptions = ["2", "4", "6", "8"];

	const handleSelect = (value: string) => {
		setFormData((prevState) => ({
			...prevState,
			duration: value
		}));
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-8 pb-12 lg:pb-[145px]">
			<Select
				options={timeDurationOptions}
				defaultValue={formData.duration}
				onChange={handleSelect}
				headerTitle="How long will it take you?"
			/>
			<TextArea
				id="proposal"
				name="proposal"
				label="submit proposal"
				placeholder="Write Message"
				value={formData.proposal}
				handleTextChange={handleTextChange}
				className="h-[124px]"
			/>
			<div className="flex items-center gap-x-4">
				<Button
					title="cancel"
					className="w-[182px] bg-[#EBEEF2] text-[#5F6062] lg:hidden"
					onClick={() => router.back()}
				/>
				<Button title="submit proposal" className="w-[182px] lg:w-full" />
			</div>
		</form>
	);
};

export default JobBidForm;
