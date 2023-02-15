import { cva, VariantProps } from "class-variance-authority";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
	href?: string;
	title: string;
	className?: string;
	icon?: StaticImageData;
	[x: string]: any;
};

const buttonStyles = cva(
	"disabled:cursor-not-allowed disabled:bg-gray-600 rounded h-12 flex items-center justify-center capitalize text-base leading-[18px] font-medium ",
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
	icon,
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
		<button
			{...{ href }}
			className={twMerge(`${buttonStyles({ intent, centered })} gap-x-[11px] ${className}`)}
			{...props}
		>
			{icon ? <Image src={icon} alt="" className="" /> : null}
			{title}
		</button>
	);
};

export default Button;
