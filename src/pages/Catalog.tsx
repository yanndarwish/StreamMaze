import { useEffect, useRef, useState } from "react"
import { MediaType } from "../types"
import { Film } from "../interfaces"
import Image from "../components/Image"
import Section from "../components/Section"
import {
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom"
import Card from "../components/Card"
import { discover, getTopRated, search } from "../api/tmdb-api"
import { tmdbImageSrc } from "../utils"

export interface ICatalogProps {
	type: MediaType | "search" | "list"
}

const Catalog = (props: ICatalogProps) => {
	let title = ""
	let request: (page: number) => Promise<{
		totalPages: number
		films: Film[]
	}>

	const [films, setFilms] = useState<Film[]>([])
	const [params, _] = useSearchParams()
	const page = useRef(1)
	const totalPage = useRef(2)
	const loadingRef = useRef(false)
	const [onLoading, setOnLoading] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()
	const { listTitle } = useParams<any>()

	switch (props.type) {
		case "movie":
			title = "Movies"
			request = (page: number) => discover("movie", page)
			break
		case "tv":
			title = "Series"
			request = (page: number) => discover("tv", page)
			break
		case "search":
			title = `Search results for <i>${params.get("q")}<i/>`
			request = (page: number) => search(params.get("q") || "", page)
			break
		case "list":
			title = listTitle as string
			if (title === "top-rated-tv") {
				request = (page: number) => getTopRated("tv", page)
			} else if (title === "top-rated-movies") {
				request = (page: number) => getTopRated("movie", page)
			}
			break
		default:
			break
	}

	const fetch = async () => {
		loadingRef.current = true
		setOnLoading(true)

		const { films, totalPages } = await request(page.current)

		setOnLoading(false)
		loadingRef.current = false

		totalPage.current = totalPages
		setFilms((arrs) => [...arrs, ...films])
	}

	const onWindowScroll = () => {
		if (loadingRef.current) return

		if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
			if (totalPage.current > page.current) {
				page.current++
				fetch()
			}
		}
	}

	useEffect(() => {
		setFilms([])
		page.current = 1
		fetch()
	}, [location])

	useEffect(() => {
		window.addEventListener("scroll", onWindowScroll)

		return () => window.removeEventListener("scroll", onWindowScroll)
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
						<div key={i}>
							<Card
								onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
								imageSrc={tmdbImageSrc(film.posterPath)}
								title={film.title}
							></Card>
						</div>
					))}
				</div>
			</Section>
		</>
	)
}

export default Catalog
