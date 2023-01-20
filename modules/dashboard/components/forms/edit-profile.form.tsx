import { Button } from "@/modules/common/components/input/button";
import { useState } from "react";
import { TagInput, TextArea, TextInput } from "../input";

const EditProfileForm = () => {
	const initialFormData = {
		name: "",
		bio: "",
		role: "",
		skills: [""]
	};
	const [formData, setFormData] = useState(initialFormData);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleTag = (tag: string[]) => {
		setFormData((prev) => ({
			...prev,
			skills: tag
		}));
	};

	return (
		<form className="pb-[55px]">
			<div className="space-y-6">
				<TextInput
					id="name"
					type="text"
					name="name"
					label="name"
					placeholder="John Doe"
					value={formData.name}
					handleTextChange={handleTextChange}
				/>
				<TextArea
					id="bio"
					name="bio"
					label="bio"
					placeholder="Tell us about yourself"
					value={formData.bio}
					className="h-[152px]"
					handleTextChange={handleTextChange}
				/>
				<TextInput
					id="role"
					type="text"
					name="role"
					label="what's your role"
					placeholder="ex: Product designer"
					value={formData.name}
					handleTextChange={handleTextChange}
				/>
				<TagInput
					id="skills"
					name="skills"
					type="text"
					handleTag={handleTag}
					label="skills"
					placeholder="Ex. Product Design, No-code, ReactJS"
				/>
			</div>
			<Button title="Save Changes" className="w-full mt-[37px] md:w-[161px]" />
		</form>
	);
};

export default EditProfileForm;
