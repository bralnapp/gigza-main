import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Button } from "@/modules/common/components/input/button";
import { initGigzaContract } from "utils/helper/contract.helper";
import { ProfileUpload, TagInput, TextArea, TextInput } from "../input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";

const schema = yup
	.object()
	.shape({
		name: yup.string().required(),
		bio: yup.string().required(),
		mainSkill: yup.string().required(),
		skills: yup.array().min(1).max(5).required(),
		profileUrl: yup.string().required()
	})
	.required();

type FormData = {
	name: string;
	bio: string;
	mainSkill: string;
	skills: string[];
	profileUrl: string;
};

const EditProfileForm = () => {
	const [isCreatingProfile, setIsCreatingProfile] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: FormData) => {
		const notification = toast.loading("Please wait...Updating profile");

		try {
			const response = await initGigzaContract();
			// @ts-ignore
			const contract = response.contract;
			const txHash = await contract.createProfile(
				data.name,
				data.bio,
				data.mainSkill,
				data.skills,
				data.profileUrl
			);
			const receipt = await txHash.wait();
			if (receipt) {
				setIsCreatingProfile(false);
				toast.success("Profile has been updated", {
					id: notification
				});
				router.push("/dashboard/profile");
			}
		} catch (error) {
			setIsCreatingProfile(false);
			toast.error("Opps! Something went wrong.", {
				id: notification
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="pb-[55px]">
			<Controller
				name="profileUrl"
				control={control}
				render={({ field: { value, onChange } }) => (
					<ProfileUpload
						{...{ value, onChange }}
						error={errors.profileUrl?.message!}
					/>
				)}
			/>
			<div className="space-y-6">
				<TextInput
					id="name"
					type="text"
					name="name"
					label="name"
					placeholder="John Doe"
					{...{ register, errors }}
				/>
				<TextArea
					id="bio"
					name="bio"
					label="bio"
					placeholder="Tell us about yourself"
					className="h-[152px]"
					{...{ register, errors }}
				/>
				<TextInput
					id="role"
					type="text"
					name="mainSkill"
					label="what's your role"
					placeholder="ex: Product designer"
					{...{ register, errors }}
				/>

				<Controller
					name="skills"
					control={control}
					render={({ field: { value, onChange } }) => (
						<TagInput
							value={value}
							handleTag={onChange}
							error={errors.skills?.message}
						/>
					)}
				/>
			</div>
			<Button
				title="Save Changes"
				className="w-full mt-[37px] md:w-[161px]"
				disabled={isCreatingProfile}
			/>
		</form>
	);
};

export default EditProfileForm;
