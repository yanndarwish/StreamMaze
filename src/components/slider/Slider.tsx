import { ReactNode, useState } from "react"
import "./Slider.css"
import Slick, { Settings } from "react-slick"

interface Props extends Omit<Settings, "children"> {
	isMovieCard?: boolean
	isSeasonCard?: boolean
	children?: (onSwipe: boolean) => ReactNode
}

const Slider = (props: Props) => {
	let settings: Omit<Settings, "children"> = {
		...props,
	}

	if (props.isMovieCard) {
		settings = {
			...settings,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			swipe: false,
			responsive: [
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
			],
		}
	} else if (props.isSeasonCard) {
		settings = {
			...settings,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			swipe: false,
			responsive: [
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
			],
		}
	}

	const [onSwipe, setOnSwipe] = useState(false)

	return (
		<Slick {...settings} autoplaySpeed={5000} onSwipe={() => setOnSwipe(true)} afterChange={() => setOnSwipe(false)}>
			{props.children && props.children(onSwipe)}
		</Slick>
	)
}

export default Slider
