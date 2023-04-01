import Image from "./Image"

export interface ICardProps {
	title: string
	imageSrc: string
	onClick?: Function
}

const Card = (props: ICardProps) => {
	return (
		<div
			onClick={() => props.onClick && props.onClick()}
			className="mx-3 my-1.5 cursor-pointer"
		>
			<Image
				src={props.imageSrc}
				className="h-[248px] rounded-lg overflow-hidden"
			></Image>
			<p className="py-1.5 line-clamp-2 leading-8">{props.title}</p>
		</div>
	)
}

export default Card
