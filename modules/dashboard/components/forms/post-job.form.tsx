import React from "react";
import { Controller, useForm } from "react-hook-form";
import { AmountTextInput, TagInput, TextArea, TextInput } from "../input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "../input/select";
import { Button } from "@/modules/common/components/input/button";

const schema = yup.object().shape({
	title: yup.string().required(),
	description: yup.string().required(),
	skills: yup.array().min(1).max(5).required(),
	budget: yup.number().required()
});

type FormData = {
	title: string;
	description: string;
	mainSkill: string;
	skills: string[];
	profileUrl: string;
};

const PostJobForm = () => {
	const timeDurationOptions = ["2", "4", "6", "8"];

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	const onSubmit = (data:FormData) => {

	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
			<TextInput
				id="title"
				type="text"
				name="title"
				placeholder="Enter Title"
				label="Project title*"
				{...{ register, errors }}
			/>
			<TextArea
				id="description"
				name="description"
				label="describe your brief*"
				placeholder="Enter Description"
				className="h-[163px]"
				{...{ register, errors }}
			/>
			<div className="py-4">
				<Controller
					name="skills"
					control={control}
					render={({ field: { value, onChange } }) => (
						<TagInput
							value={value}
							handleTag={onChange}
							error={errors.skills?.message}
							label="What type of skills are you looking for? (up to 5)"
						/>
					)}
				/>
			</div>

			<div className="py-4">
				<Controller
					name="timeline"
					control={control}
					render={({ field: { onChange } }) => (
						<Select
							options={timeDurationOptions}
							defaultValue={timeDurationOptions[0]}
							onChange={onChange}
							headerTitle="Timeline for project"
						/>
					)}
				/>
			</div>
			<AmountTextInput
				id="budget"
				name="budget"
				label="Budget"
				placeholder="Enter Amount"
				type='text'
				{...{ register, errors }}
			/>
			<Button title="Preview" className="w-full md:w-[253px] md:mx-auto" />
		</form>
	);
};

export default PostJobForm;
