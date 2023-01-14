import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
	href?: string;
	title: string;
	className?: string;
	[x: string]: any;
};

const buttonStyles = cva(
	"rounded h-12 flex items-center justify-center capitalize text-base leading-[18px] font-medium",
	{
		variants: {
			intent: {
				primary: "bg-primary text-white",
				secondary: "bg-white text-primary"
			},
			centered: {
				true: "mx-auto"
			}
		},
		defaultVariants: {
			intent: "primary"
		}
	}
);

interface Props extends ButtonProps, VariantProps<typeof buttonStyles> {}

const Button = ({
	href,
	title,
	className,
	intent,
	centered,
	...props
}: Props) => {
	return href ? (
		<Link
			{...{ href }}
			className={twMerge(`${buttonStyles({ intent, centered })}  ${className}`)}
		>
			{title}
		</Link>
	) : (
		<button {...props}>{title}</button>
	);
};

export default Button;
