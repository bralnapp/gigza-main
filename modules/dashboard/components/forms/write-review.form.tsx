import { Button } from "@/modules/common/components/input/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStoreContext } from "context/StoreContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { TextArea } from "../input";
import { StarRating } from "../misc";

const schema = yup
	.object()
	.shape({
		review: yup.string().required(),
		rating: yup.number().required()
	})
	.required();

type FormData = {
	review: string;
	rating: number;
};

type WriteReviewFormProps = {
	jobId: number | undefined;
	handleClose: () => void;
};

const WriteReviewForm = ({ jobId, handleClose }: WriteReviewFormProps) => {
	const [isSendingReview, setisSendingReview] = useState(false);
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

	const handleCloseModal = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		handleClose();
	};

	const onSubmit = async (data: FormData) => {
		const notification = toast.loading("Please wait...Sending review");
		setisSendingReview(true);
		try {
			// @ts-ignore
			const txHash = await initGigzaContract!.createReview(
				jobId,
				data.review,
				data.rating
			);
			const receipt = await txHash.wait();
			if (receipt) {
				setisSendingReview(false);
				toast.success("Review has been sent", {
					id: notification
				});
				router.reload();
			}
			router.reload();
		} catch (error) {
			setisSendingReview(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-[25px]">
			<TextArea
				id="review"
				name="review"
				label="describe your experience"
				placeholder=""
				className="h-[107px] md:h-[163px]"
				{...{ register, errors }}
			/>
			<div className="">
				<p className="mb-[13px] text-base capitalize leading-[21px] text-b1">
					give your ratings
				</p>
				<Controller
					name="rating"
					control={control}
					render={({ field: { onChange } }) => (
						<StarRating {...{ onChange }} error={errors?.rating?.message!} />
					)}
				/>
			</div>
			<div className="flex items-center gap-x-5 md:justify-between md:gap-x-0">
				<Button
					title="cancel"
					className="w-full bg-[#EBEEF2] text-b1 md:w-[109px]"
					onClick={handleCloseModal}
				/>
				<Button
					title="post"
					disabled={isSendingReview}
					className="w-full md:w-[92px]"
				/>
			</div>
		</form>
	);
};

export default WriteReviewForm;
