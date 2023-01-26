import { InputProps } from "./typing";

const TextInput = ({
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
				<input
					{...{ name, type, id, placeholder, ...props }}
					{...register(name)}
					className={`block py-2 px-3 placeholder:text-[#979797] text-sm bg-[#FCFDFD] mt-2 rounded-[5px] border border-[#E8E8EF] focus:outline-none w-full ${className}`}
				/>
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

export default TextInput;
