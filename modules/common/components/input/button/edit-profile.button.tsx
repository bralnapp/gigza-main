import Button from "./button";

const EditProfileButton = () => {
	return (
		<Button
			href="/dashboard/profile/edit"
			title="Edit Profile"
			className="w-[125px] h-[42px] text-primary border-primary bg-white border"
		/>
	);
};

export default EditProfileButton;
