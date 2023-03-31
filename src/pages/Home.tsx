import Section from "../components/Section"
import { useEffect, useState } from "react"
import { Film } from "../interfaces"
import TrendingHero from "../components/TrendingHero"
import Slider from "../components/slider/Slider"
import Card from "../components/Card"

export interface IHomeProps {}

const Home = (props: IHomeProps) => {
	const [trendings, setTrendings] = useState<Film[]>([])
	const [inTheaters, setInTheaters] = useState<Film[]>([])

	const fetch = () => {
		const arrs: Film[] = []

		for (let i = 0; i < 6; i++) {
			arrs.push({
				id: i,
				mediaType: "tv",
				title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illum possimus tempore qui ducimus. Provident, totam cum aspernatur voluptatibus voluptatum dicta ullam iure reprehenderit natus nam iusto. Officiis, natus quis!",
				genreIds: [1, 2, 3, 4, 5],
				coverPath: "",
				posterPath: "",
				seasons: [],
			})
		}
		setTrendings(arrs)
		setInTheaters(arrs)
	}

	useEffect(() => {
		fetch()
	}, [])
	return (
		<>
			{/* trending */}
			<Section className="pt-0 pb-0">
				<Slider
					className="slick-hero"
					autoplay={true}
					slidesToShow={1}
					slidesToScroll={1}
				>
					{trendings.map((film, i) => (
						<TrendingHero film={film} key={i} />
					))}
				</Slider>
			</Section>
			{/* in theater */}
			<Section title="In theaters">
				<Slider isMovieCard={true} autoplay={true}>
					{inTheaters.map((film, i) => (
						<Card title={film.title} imageSrc={film.coverPath} key={i} />
					))}
				</Slider>
			</Section>
			{/* popular */}

			{/* top rated tv */}

			{/* top rated movies */}
		</>
	)
}

export default Home
