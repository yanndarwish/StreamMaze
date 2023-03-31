import { CustomComponentProps } from "../interfaces"
import Container from "./Container"

export interface ISectionProps extends CustomComponentProps {
	title?: string
}

const Section = (props: ISectionProps) => {
	return (
		<Container className={props.className}>
			{props.title && <h1 className="text-xl px-6 py-1.5">{props.title}</h1>}
			{props.children}
		</Container>
	)
}

export default Section
