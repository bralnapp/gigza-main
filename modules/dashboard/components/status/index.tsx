import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type StatusProps = {
	title: string;
	className?: string;
};

const statusStyles = cva(
	"px-3 py-[6px] lg:w-fit capitalize flex items-center justify-center rounded-lg ",
	{
		variants: {
			intent: {
				pending: "text-[#F29B4F] bg-[#F29B4F]/10",
				complete: "text-[#209653] bg-[rgb(32_150_83)] bg-opacity-10"
			}
		}
	}
);

interface Props extends StatusProps, VariantProps<typeof statusStyles> {}

const Status = ({ title, className, intent }: Props) => {
	return (
		<p className={twMerge(`${statusStyles({ intent })} ${className}`)}>
			{title}
		</p>
	);
};

export default Status;
