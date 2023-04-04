import { CustomComponentProps } from "../interfaces"
import { mergeClassName } from "../utils"
import Image from "./Image"

export interface ICardProps extends CustomComponentProps {
	title?: string
	imageSrc: string
	onClick?: Function
}

const Card = (props: ICardProps) => {
	return (
		<div
			onClick={() => props.onClick && props.onClick()}
			className={mergeClassName("mx-3 my-1.5 cursor-pointer", props.className)}
		>
			<Image
				src={props.imageSrc}
				className="flex-1 h-[200px] rounded-lg overflow-hidden"
			></Image>
			<p className="py-1.5 line-clamp-2 leading-8">{props.title}</p>
			{props.children}
		</div>
	)
}

export default Card
