import { Button } from "@/modules/common/components/input/button";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
	.object()
	.shape({
		search: yup.string().required()
	})
	.required();

type FormData = {
	search: string;
};

const SearchTalents = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data: FormData) => {
		console.log(data);
	};

	return (
		<div className="mx-auto mt-6 mb-4 max-w-[502px] pb-6 md:mb-12 md:pb-8">
			<h1 className="mb-2 text-center text-[19px] font-bold leading-[23px] text-[#101828] min-[540px]:text-[32px] min-[540px]:leading-[38px]">
				Hire talents
			</h1>
			<p className="text-center text-xs leading-[14px] text-[#667085] min-[540px]:text-sm min-[540px]:leading-[17px]">
				Find the world’s best professionals on Gigza
			</p>

			<form
				className="mt-8 flex items-center gap-x-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					name="search"
					id="search"
					placeholder="Search for skills"
					type="text"
					className="block h-[41px] flex-1 rounded-[5px] border border-[#E8E8EF] bg-[#FCFDFD] py-2 px-3 text-sm placeholder:text-[#979797] focus:outline-none"
					{...{ register }}
				/>
				<Button title="Search" className="h-[41px] w-[110px]" />
			</form>
			{errors?.search ? (
				<p className="mt-[6px] text-sm leading-[17px] text-red-500">
					This field is required
				</p>
			) : null}
		</div>
	);
};

export default SearchTalents;
