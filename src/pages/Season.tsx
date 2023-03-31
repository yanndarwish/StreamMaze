import { useEffect, useState } from "react"
import Image from "../components/Image"
import Section from "../components/Section"
import { Film } from "../interfaces"

export interface IEpisodesProps {}

const Season = (props: IEpisodesProps) => {
	const [film, setFilm] = useState<Film>({
		id: 0,
		title:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem est quia saepe, adipisci natus ut ex similique deserunt. Repellendus maxime quos ab in repudiandae sunt pariatur accusamus impedit? Maxime, magnam!",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem est quia saepe, adipisci natus ut ex similique deserunt. Repellendus maxime quos ab in repudiandae sunt pariatur accusamus impedit? Maxime, magnam!",
		coverPath: "",
		posterPath: "",
		mediaType: "tv",
		genreIds: [1, 2, 3, 4],
		seasons: [
			{
				id: 1,
				seasonNumber: 1,
			},
			{
				id: 2,
				seasonNumber: 2,
			},
			{
				id: 3,
				seasonNumber: 3,
			},
		],
	})

	const [episodes, setEpisodes] = useState<any[]>([])

	const fetch = () => {
		const arrs: any[] = []

		for (let i = 0; i < 12; i++) {
			arrs.push({})
		}
		setEpisodes(arrs)
	}

	useEffect(() => {
		fetch()
	}, [])

	return (
		<>
			{/* background */}
			<div className="h-[150px] left-0 right-0 top-0 relative">
				<div className="overlay-film"></div>
				<Image src=""></Image>
			</div>
			{/* poster and text */}
			<Section className="-mt-[75px] flex items-center relative z-10 mobile:block">
				<Image
					src=""
					className="max-w-[150px] min-w-[150px] min-h-[200px] h-[200px] mobile:mx-auto"
				></Image>
				<div className="px-3 flex flex-col items-start gap-3">
					<p className="text-xl line-clamp-1">{film.title}</p>

					<p className="opacity-[0.7]">
						Season 1 - {episodes?.length} episodes
					</p>
				</div>
			</Section>
			{/* episodes */}
			<Section title="Episodes">
				{episodes?.map((episode, i) => (
					<div
						className="my-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-primary px-3 py-1.5"
						key={i}
					>
						<Image
							src=""
							className="w-[300px] min-w-[300px] min-h-[300px]"
						></Image>
						<div className="overflow-hidden flex flex-col gap-3">
							<p className="text-lg truncate">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Recusandae tempore laborum, nam magnam ipsa at quae mollitia
								sint nesciunt alias odio quas, exercitationem debitis earum
								praesentium asperiores ut quisquam? Dolore?
							</p>
							<p className="opacity-[0.7] line-clamp-5">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Cupiditate optio magni quae inventore aperiam non suscipit neque
								sit illo molestiae enim numquam necessitatibus, in laboriosam,
								corporis dignissimos maxime excepturi placeat!
							</p>
							<div className="pt-3 text-right mt-auto">23 March 2023</div>
						</div>
					</div>
				))}
			</Section>
		</>
	)
}

export default Season
