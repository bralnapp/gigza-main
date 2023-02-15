import { useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useUploadFileIpfsMutation } from "utils/hooks";

// images
import plusIcon from "@/public/asset/icons/plus-icon.svg";

type ProfileUploadProps = {
	onChange: (value: string) => void;
	value: string;
	error: string;
};

const ProfileUpload = ({ onChange, value, error }: ProfileUploadProps) => {
	const {
		mutate: uploadFile,
		data: uploadedFileUri,
		isLoading,
		isSuccess,
		isError,
		reset
	} = useUploadFileIpfsMutation();

	const { getRootProps, getInputProps, open } = useDropzone({
		noClick: true,
		noKeyboard: true,
		maxFiles: 1,
		accept: {
			"image/png": [".png", ".jpg", ".jpeg"]
		},
		onDrop: (files) => {
			uploadFile(files[0]);
		}
	});

	useEffect(() => {
		if (uploadedFileUri) {
			onChange(uploadedFileUri);
			reset();
		}
	}, [onChange, reset, uploadedFileUri, value]);

	useEffect(() => {
		let notificationId;
		if (isLoading) {
			notificationId = toast.loading("uploading profile picture to Ipfs");
		} else {
			toast.dismiss(notificationId);
		}
		if (isSuccess) {
			toast.success("upload successfull");
		}
		if (isError) {
			toast.error("Opps!!!... something went wrong");
		}
	}, [isLoading, isSuccess, isError]);

	return (
		<>
			<div
				onClick={open}
				className="mb-3 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-stroke md:mb-8 md:h-[142px] md:w-[142px]"
				{...getRootProps}
			>
				<input {...getInputProps()} />
				{value ? (
					<div className="relative h-16 w-16 md:h-[142px] md:w-[142px]">
						<Image
							src={value}
							alt=""
							fill
							className="rounded-full object-cover"
						/>
					</div>
				) : (
					<div className="">
						<Image
							src={plusIcon}
							alt=""
							className="mx-auto h-3 w-3 md:h-4 md:w-4"
						/>
						<p className="mt-[10px] hidden text-base capitalize leading-[19px] text-b4 md:block">
							add photo
						</p>
					</div>
				)}
			</div>
			<p
				className={` text-sm capitalize leading-[17px] text-b4 md:hidden ${
					error ? "" : "mb-6"
				}`}
			>
				add photo
			</p>
			<div className="mt-[6px] mb-6 text-sm leading-[17px] text-red-500">
				{error ? <p>Please upload a profile picture</p> : null}
			</div>
		</>
	);
};

export default ProfileUpload;
