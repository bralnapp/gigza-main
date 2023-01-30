import { useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useUploadFileIpfsMutation } from "utils/hooks";

// images
import plusIcon from "@/public/asset/icons/plus-icon.svg";

type ProfileUploadProps = {
 onChange: (value:string) => void;
 value: string;
 error: string;
}

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
			"image/png": [".png"]
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
		console.log("loading status", isLoading);
	}, [isLoading, isSuccess, isError]);

	return (
		<>
			<div
				onClick={open}
				className="cursor-pointer mb-3 md:mb-8 border-2 border-stroke h-16 w-16 md:h-[142px] md:w-[142px] rounded-full flex items-center justify-center"
				{...getRootProps}
			>
				<input {...getInputProps()} />
				{value ? (
					<div className="relative h-16 w-16 md:h-[142px] md:w-[142px]">
						<Image src={value} alt="" fill className="object-contain rounded-full" />
					</div>
				) : (
					<div className="">
						<Image
							src={plusIcon}
							alt=""
							className="w-3 md:w-4 h-3 md:h-4 mx-auto"
						/>
						<p className="mt-[10px] hidden md:block text-b4 capitalize text-base leading-[19px]">
							add photo
						</p>
					</div>
				)}
			</div>
			<p
				className={` text-b4 capitalize text-sm leading-[17px] md:hidden ${
					error ? "" : "mb-6"
				}`}
			>
				add photo
			</p>
			<div className="text-sm leading-[17px] text-red-500 mt-[6px] mb-6">
				{error ? <p>Please upload a profile picture</p> : null}
			</div>
		</>
	);
};

export default ProfileUpload;
