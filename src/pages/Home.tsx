import Slider from "react-slick"
import Section from "../components/Section"
import { useEffect, useState } from "react"
import { Film } from "../interfaces"

export interface IHomeProps {}

const Home = (props: IHomeProps) => {
	const [trendings, setTrendings] = useState<Film[]>([])

	const fetchTrendings = () => {
		const arrs: Film[] = []

		for (let i = 0; i < 6; i++) {
			arrs.push({
				id: i,
				title:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illum possimus tempore qui ducimus. Provident, totam cum aspernatur voluptatibus voluptatum dicta ullam iure reprehenderit natus nam iusto. Officiis, natus quis!",
				genreIds: [1, 2, 3, 4, 5],
				coverPath: "",
				posterPath: "",
				seasons: [],
			})
		}
		setTrendings(arrs)
	}

    useEffect(() => {
        fetchTrendings()
    }, [])
	return (
		<>
			{/* trending */}
			<Section className="py-0">
				<Slider>{
                    trendings.map((film, i) => (
                        <div className=""></div>
                    ))
                    }</Slider>
			</Section>
			{/* in theater */}

			{/* popular */}

			{/* top rated tv */}

			{/* top rated movies */}
		</>
	)
}

export default Home
