import { CustomComponentProps } from "../interfaces"
import { mergeClassName } from "../utils"

export interface IImageProps extends CustomComponentProps {
	src: string
}

const Image = (props: IImageProps) => {
	return (
		<div
			className={mergeClassName("bg-primary w-full h-full", props.className)}
		>
			<img src={props.src} alt="" className="w-full h-full" />
		</div>
	)
}

export default Image
