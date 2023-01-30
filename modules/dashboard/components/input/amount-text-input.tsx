import { InputProps } from "./typing";
import Image from "next/image";

// images
import usdtLogo from "@/public/asset/icons/usdt-logo.svg";

const AmountTextInput = ({
	id,
	type,
	placeholder,
	label,
	name,
	labelClassName,
	className,
	register,
	errors,
	...props
}: InputProps) => {
	return (
		<div>
			<div className="">
				<label
					htmlFor={id}
					className={`text-b1 text-base leading-[19px] capitalize ${labelClassName}`}
				>
					{label}
				</label>
				<div className="flex items-center pr-1 border border-[#E8E8EF] py-1 rounded-[5px] mt-[13px]">
					<input
						{...{ name, type, id, placeholder, ...props }}
						{...register(name)}
						className={`block py-2 px-3 placeholder:text-[#979797] text-sm bg-[#FCFDFD] focus:outline-none flex-1 ${className}`}
					/>
					<div className="flex items-center gap-x-[9px] rounded w-fit py-[5px] px-[6px] bg-[#F5F5F5]">
						<Image src={usdtLogo} alt="" />
						<p className="text-b1 uppercase text-sm leading-[17px]">usdt</p>
					</div>
				</div>
			</div>
			<div className="mt-[6px] text-sm leading-[17px] text-red-500">
				{errors?.[name]?.type === "required" ? (
					<p>This field is required</p>
				) : errors?.[name] ? (
					<p>Kindly check your input</p>
				) : null}
			</div>
		</div>
	);
};

export default AmountTextInput;
