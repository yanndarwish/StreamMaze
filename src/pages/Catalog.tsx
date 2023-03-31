import { useEffect, useState } from "react"
import { MediaType } from "../types"
import { Film } from "../interfaces"
import Image from "../components/Image"
import Section from "../components/Section"
import { useSearchParams } from "react-router-dom"
import Card from "../components/Card"

export interface ICatalogProps {
	type: MediaType | "search"
}

const Catalog = (props: ICatalogProps) => {
	let title = ""
	const [films, setFilms] = useState<Film[]>([])
	const [params, _] = useSearchParams()

	switch (props.type) {
		case "movie":
			title = "Movies"
			break
		case "tv":
			title = "Series"
			break
		case "search":
			title = `Search results for <i>${params.get("q")}<i/>`
			break
		default:
			break
	}

	const fetch = () => {
		const arrs: any[] = []

		for (let i = 0; i < 20; i++) {
			arrs.push({
				title:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quasi voluptates et perferendis placeat laboriosam nam fuga aperiam, ullam a velit explicabo! Ducimus officia eveniet reprehenderit nesciunt hic magni blanditiis.",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quasi voluptates et perferendis placeat laboriosam nam fuga aperiam, ullam a velit explicabo! Ducimus officia eveniet reprehenderit nesciunt hic magni blanditiis.",
			})
		}
		setFilms(arrs)
	}

	useEffect(() => {
		fetch()
	}, [])

	return (
		<>
			{/* background */}
			<div className="h-[120px] left-0 right-0 top-0 relative">
				<div className="overlay-film"></div>
				<div className="bg-primary h-full w-full"></div>
			</div>
			{/* page title */}
			<Section
				className="-mt-[90px] flex items-center relative z-10 "
				title={title}
			></Section>
			{/* Films */}
			<Section>
				<div className="grid lg:grid-cols-5 sm:grid-cols-4 mobile:grid-cols-3 relative z-[11]">
					{films.map((film, i) => (
						<div>
							<Card imageSrc="" title={film.title} key={i}></Card>
						</div>
					))}
				</div>
			</Section>
		</>
	)
}

export default Catalog
