import { useEffect, useRef, useState } from "react"
import { Film } from "../interfaces"
import Image from "./Image"
import { search } from "../api/tmdb-api"
import { tmdbImageSrc } from "../utils"
import { useGlobalContext } from "../App"
import { useNavigate } from "react-router-dom"

export interface ISearchResultProps {
	keyword: string
	goToSearchPage: Function
}

const SearchResult = (props: ISearchResultProps) => {
	const navigate = useNavigate()
	const [items, setItems] = useState<Film[]>([])
	const [totalItems, setTotalItems] = useState(0)
	const searchTimeout = useRef<any>("")

	const globalContext = useGlobalContext()

	const fetch = async () => {
		if (!props.keyword) return
		clearTimeout(searchTimeout.current)
		searchTimeout.current = setTimeout(async () => {
			const res = await search(props.keyword)
			setTotalItems(res.totalResults)
			setItems(res.films)
		}, 120)
	}

	useEffect(() => {
		fetch()
	}, [props.keyword])

	return (
		<div className="absolute top-[48px] left-0 right-0 rounded-md overflow-auto bg-header max-h-[480px] shadow-lg">
			{items.map((film, i) => (
				<div
					key={i}
					className="flex items-start p-1.5 rounded-lg hover:bg-primary cursor-pointer m-1.5"
					onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
				>
					{/* image */}
					<Image
						src={tmdbImageSrc(film.posterPath)}
						className="h-[72px] max-w-[102px] w-[102px] rounded-md"
					></Image>
					{/* title and genre */}
					<div className="px-3 truncate">
						<p className="text-base truncate">{film.title}</p>
						<ul className="flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
							{film.genreIds.map((id, i) => (
								<li key={i}>
									{
										globalContext.genres[film.mediaType].find(
											(genre) => genre.id === id
										)?.name
									}
									{i !== film.genreIds.length - 1 ? ", " : ""}
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
			{totalItems > 5 && (
				<button
					onClick={() => props.goToSearchPage()}
					className="px-3 py-1.5 bg-primary w-full hover:text-body sticky bottom-0 shadow-lg"
				>
					{" "}
					More results
				</button>
			)}
		</div>
	)
}

export default SearchResult
