import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { CheckBox } from "@/modules/common/components/input";
import { Button } from "@/modules/common/components/input/button";
import { roles } from "utils/data";

type ApplyFilterProps = {
	formData: {
		rating: string;
		specialties: string;
	};
	setFormData: React.Dispatch<
		SetStateAction<{
			rating: string;
			specialties: string;
		}>
	>;
};

const ApplyFilter = ({ formData, setFormData }: ApplyFilterProps) => {
	const [isValid, setIsValid] = useState(false);
	// const [data, setData] = useState({
	// 	rating: "",
	// 	specialties: ""
	// });

	const ratings = Array.from(Array(6).keys());
	// change for checkbox
	const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget?.name]: e.currentTarget?.value
		});
	};

	const handleClear = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFormData({
			rating: "",
			specialties: ""
		});
	};
	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	setFormData(data);
	// };

	// useEffect(() => {
	// 	if (data?.rating || data?.specialties) {
	// 		setIsValid(true);
	// 	}
	// }, [data?.rating, data?.specialties]);

	return (
		<div className="hidden h-fit bg-white p-6 lg:block">
			<h1 className="text-xl font-bold capitalize leading-[21px] text-[#101828]">
				filter
			</h1>
			{/* rating */}
			<div className="py-4">
				{/* <p className="text-base leading-[21px] text-[#101828]">Ratings</p> */}

				<form>
					<div className="mb-2">
						<div className="mt-[17px] mb-2 flex flex-col space-y-[17px] border-b border-[#F0F0F0] pb-5">
							{ratings.map((item, index) => (
								<CheckBox
									key={index}
									value={item}
									onChange={handleOnChange}
									rating
									formData={formData.rating}
									name="rating"
								/>
							))}
						</div>
					</div>
					<div className="mt-4 flex flex-col space-y-[17px]">
						{roles.map((item, index) => (
							<CheckBox
								key={index}
								value={item}
								onChange={handleOnChange}
								name="specialties"
								formData={formData.specialties}
							/>
						))}
					</div>
					<button onClick={handleClear} className="mt-5 capitalize">
						clear filter
					</button>
					{/* <Button
						disabled={!isValid}
						title="filter results"
						className="mt-7 w-[262px]"
					/> */}
				</form>
			</div>
		</div>
	);
};

export default ApplyFilter;
