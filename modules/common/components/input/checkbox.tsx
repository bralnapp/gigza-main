import Stars from "@/modules/dashboard/components/stars";

type CheckboxProps = {
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	rating?: boolean;
	name: string;
	formData: string;
};

const CheckBox = ({
	value,
	onChange,
	rating,
	name,
	formData
}: CheckboxProps) => {
	return (
		<label className="checkbox-container text-base capitalize leading-[22px] text-[#475467]">
			<input
				type="radio"
				{...{ value, onChange, name }}
				checked={formData?.toLowerCase() === value?.toLowerCase()}
			/>
			<span className="checkmark"></span>
			{rating ? <Stars reviews={Number(value)} /> : <p>{value}</p>}
		</label>
	);
};

export default CheckBox;
