import { useEffect, useState } from "react"
import { Film } from "../interfaces"
import Image from "./Image"

export interface ISearchResultProps {
	keyword: string
	goToSearchPage: Function
}

const SearchResult = (props: ISearchResultProps) => {
	const [items, setItems] = useState<Film[]>([])
	const [totalItems, setTotalItems] = useState(6)

	const fetch = () => {
		const arrs: Film[] = []

		for (let i = 0; i < 6; i++) {
			arrs.push({
				id: i,
				mediaType: "tv",
				title:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illum possimus tempore qui ducimus. Provident, totam cum aspernatur voluptatibus voluptatum dicta ullam iure reprehenderit natus nam iusto. Officiis, natus quis!",
				description: "",
				genreIds: [1, 2, 3, 4, 5],
				coverPath: "",
				posterPath: "",
				seasons: [],
			})
		}
		setItems(arrs)
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
				>
					{/* image */}
					<Image
						src=""
						className="h-[82px] min-w-[102px] w-[102px] rounded-md"
					></Image>
					{/* title and genre */}
					<div className="px-3 truncate">
						<p className="text-base truncate">{film.title}</p>
						<ul className="flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
							{film.genreIds.map((id, i) => (
								<li key={i}>item {i}</li>
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
