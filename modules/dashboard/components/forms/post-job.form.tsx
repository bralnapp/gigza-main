import React, { FormEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AmountTextInput, TagInput, TextArea, TextInput } from "../input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "../input/select";
import { Button } from "@/modules/common/components/input/button";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useAccount, useContractRead } from "wagmi";
import { DaiContractAbi, DiaContractAddress, formatUnit } from "utils/helper";
import numeral from "numeral";
import { useStoreContext } from "context/StoreContext";

const schema = yup.object().shape({
	title: yup.string().required(),
	description: yup.string().required(),
	skills: yup.array().min(1).max(5).required(),
	amount: yup.number().required(),
	timeline: yup.number().required()
});

type FormData = {
	title: string;
	description: string;
	mainSkill: string;
	skills: string[];
	profileUrl: string;
	timeline: number;
};

const PostJobForm = () => {
	const timeDurationOptions = ["2", "4", "6", "8"];
	const router = useRouter();

	const { address } = useAccount();
	const [isFundingWallet, setIsFundingWallet] = useState(false);
	const { initDaiContract } = useStoreContext();

	const { data: balance, refetch } = useContractRead({
		address: DiaContractAddress,
		abi: DaiContractAbi,
		functionName: "balanceOf",
		args: [address]
	});

	const fundWallet = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const notification = toast.loading("Minting testnet Dai");
		setIsFundingWallet(true);

		try {
			// @ts-ignore
			const txHash = await initDaiContract!.mint();
			const receipt = await txHash.wait();
			if (receipt) {
				setIsFundingWallet(false);
				refetch();
				toast.success("Testnet Dai has been minted successfully", {
					id: notification
				});
			}
		} catch (error) {
			setIsFundingWallet(false);
			// @ts-ignore
			toast.error(error?.reason || "Opps, something went wrong", {
				id: notification
			});
		}
	};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<FormData>({ resolver: yupResolver(schema) });

	const onSubmit = (data: FormData) => {
		router.push({
			pathname: "/dashboard/post-job/preview",
			query: {
				data: JSON.stringify(data)
			}
		});
	};

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
				id="amount"
				name="amount"
				label="Budget"
				placeholder="Enter Amount"
				type="text"
				{...{ register, errors }}
			/>
			<div className="flex flex-col gap-y-10 md:flex-row md:justify-between md:gap-y-0">
				<Button title="Preview" className="h-10 w-full md:w-[253px]" />
				<Button
					disabled={isFundingWallet}
					onClick={fundWallet}
					title="Mint testnet Dai"
					className="h-10 w-full bg-[#EBEEF2] text-[#5F6062] disabled:text-white md:w-[253px]"
				/>
			</div>
		</form>
	);
};

export default PostJobForm;
