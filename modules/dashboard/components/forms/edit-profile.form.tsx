import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Button } from "@/modules/common/components/input/button";
import { ProfileUpload, TagInput, TextArea, TextInput } from "../input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useStoreContext } from "context/StoreContext";

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
	const { initGigzaContract } = useStoreContext();

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
		setIsCreatingProfile(true);

		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.createProfile(
				data.name,
				data.bio,
				data.mainSkill,
				data.skills,
				data.profileUrl
			);
			const receipt = txHash.wait();
			if (receipt) {
				setIsCreatingProfile(false);
				toast.success("Profile has been updated", {
					id: notification
				});
				// router.push("/dashboard/profile");
			}
		} catch (error) {
			setIsCreatingProfile(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
			console.log({ error });
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
							label="Skills"
							error={errors.skills?.message}
						/>
					)}
				/>
			</div>
			<Button
				title="Save Changes"
				className="mt-[37px] w-full md:w-[161px]"
				disabled={isCreatingProfile}
			/>
		</form>
	);
};

export default EditProfileForm;

// {
//     "reason": "sending a transaction requires a signer",
//     "code": "UNSUPPORTED_OPERATION",
//     "operation": "sendTransaction"
// }
