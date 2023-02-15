import Stars from "@/modules/dashboard/components/stars";

type CheckboxProps = {
	value: string | number;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	rating?: boolean;
	name: string;
};

const CheckBox = ({ value, onChange, rating, name }: CheckboxProps) => {
	return (
		<label className="checkbox-container text-base capitalize leading-[22px] text-[#475467]">
			<input type="radio" {...{ value, onChange, name }} />
			<span className="checkmark"></span>
			{rating ? <Stars reviews={Number(value)} /> : <p>{value}</p>}
		</label>
	);
};

export default CheckBox;
