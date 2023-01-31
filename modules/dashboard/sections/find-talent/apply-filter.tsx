import { CheckBox } from "@/modules/common/components/input";
import { Button } from "@/modules/common/components/input/button";
import { useState } from "react";

const specialtiesOptions = [
	"Animation",
	"Brand / Graphic Design",
	"Illustration",
	"Mobile Design",
	"UI / Visual Design",
	"web design",
	"front end development",
	"backend development",
	"artificial intelligence"
];

const ApplyFilter = () => {
	const [checkedState, setCheckedState] = useState<boolean[]>(
		new Array(specialtiesOptions.length).fill(false)
	);

	const ratings = Array.from(Array(6).keys());
	// change for checkbox
	const handleOnChange = (position: number) => {
		console.log(position);
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item
		);
		setCheckedState(updatedCheckedState);
		const _support_types = updatedCheckedState
			.map((item, index) => (item === true ? specialtiesOptions[index] : null))
			.filter((item) => item !== null);
		// @ts-ignore
		// setFormData({ ...formData, support_types: _support_types })
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<div className="bg-white p-6 h-fit hidden lg:block">
			<h1 className="text-xl font-bold capitalize leading-[21px] text-[#101828]">
				filter
			</h1>
			{/* rating */}
			<div className="py-4">
				<p className="text-base leading-[21px] text-[#101828]">Ratings</p>

				<form onSubmit={handleSubmit}>
					<div className="mb-2">
						<div className="mt-[17px] flex flex-col space-y-[17px] border-b border-[#F0F0F0] pb-5 mb-2">
							{ratings.map((item, index) => (
								<CheckBox
									key={index}
									value={item}
									onChange={() => handleOnChange(index)}
									checked={checkedState[index]}
									rating
								/>
							))}
						</div>
					</div>
					<div className="mt-4 flex flex-col space-y-[17px]">
						{specialtiesOptions.map((item, index) => (
							<CheckBox
								key={index}
								value={item}
								onChange={() => handleOnChange(index)}
								checked={checkedState[index]}
							/>
						))}
					</div>
					<Button title="filter results" className="mt-7 w-[262px]" />
				</form>
			</div>
		</div>
	);
};

export default ApplyFilter;
