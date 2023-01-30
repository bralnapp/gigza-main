import React from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../input";

const PostJobForm = () => {
  const {register} = useForm()
	return (
		<form>
			<TextInput
				id="title"
				type="text"
				name="title"
				placeholder="Enter Title"
				label="Project title*"
        // {...{register,}}
			/>
		</form>
	);
};

export default PostJobForm;
