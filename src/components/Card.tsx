import { useNavigate } from "react-router-dom"
import { Film } from "../interfaces"
import Image from "./Image"

export interface ICardProps {
	title: string
	imageSrc: string
	onClick?: Function
}

const Card = (props: ICardProps) => {
	const navigate = useNavigate()

	return (
		<div
			onClick={() => props.onClick && props.onClick}
			className="mx-3 my-1.5 cursor-pointer"
		>
			<Image src="" className="min-h-[200px] h-[200px]"></Image>
			<p className="py-1.5 line-clamp-2 leading-8">{props.title}</p>
		</div>
	)
}

export default Card
