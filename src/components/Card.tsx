import { CustomComponentProps } from "../interfaces"
import { mergeClassName } from "../utils"
import { MdPlayCircleFilled } from "react-icons/md"
import Image from "./Image"

export interface ICardProps extends CustomComponentProps {
	title?: string
	imageSrc: string
	onClick?: Function
	withPlay?: boolean
}

const Card = (props: ICardProps) => {
	const withPlay = props.withPlay ?? true

	return (
		<div
			onClick={() => props.onClick && props.onClick()}
			className={mergeClassName(
				"group mx-3 my-1.5 cursor-pointer",
				props.className
			)}
		>
			<div className="h-[248px] relative rounded-lg overflow-hidden">
				{withPlay && (
					<div
						className="
					absolute
					hidden
					group-hover:flex
					items-center
					justify-center
					left-0
					right-0
					top-0
					bottom-0
					before:absolute
					before:content['']
					before:bg-black
					before:opacity-[0.7]
					before:left-0
					before:right-0
					before:top-0
					before:bottom-0

				"
					>
						<button className="relative z-10">
							<MdPlayCircleFilled size={24} />
						</button>
					</div>
				)}
				<Image
					src={props.imageSrc}
					className="flex-1 h-[200px] rounded-lg overflow-hidden"
				></Image>
			</div>
			<p className="py-1.5 line-clamp-2 leading-8">{props.title}</p>
			{props.children}
		</div>
	)
}

export default Card
