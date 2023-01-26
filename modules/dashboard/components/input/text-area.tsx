import { InputProps } from "./typing";

const TextArea = ({
	id,
	label,
	name,
	placeholder,
	className,
	labelClassName,
	register,
	errors,
	...props
}: Omit<InputProps, "type">) => {
	return (
		<div>
			<div>
				<label
					className={`text-b1 text-base leading-[19px] capitalize ${labelClassName}`}
					htmlFor={id}
				>
					{label}
				</label>
				<textarea
					{...{ name, id, placeholder, ...props }}
					{...register(name)}
					className={`block focus:outline-none mt-2 w-full p-3 bg-[#FCFDFD] text-sm rounded-[5px] border border-[#E8E8EF]  ${className}`}
				/>
			</div>
			<div className="text-sm leading-[17px] text-red-500 mt-[6px]">
				{errors?.[name]?.type === "required" ? (
					<p className="myriad-regular mt-[6px] text-sm leading-[17px] text-error-500">
						This field is required
					</p>
				) : errors?.[name] ? (
					<p className="myriad-regular mt-[6px] text-sm leading-[17px] text-error-500">
						Kindly check your input
					</p>
				) : null}
			</div>
		</div>
	);
};

export default TextArea;
