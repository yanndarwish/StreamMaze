import { useEffect, useState } from "react"
import Image from "../components/Image"
import Section from "../components/Section"
import { Season } from "../interfaces"
import { getSeason } from "../api/tmdb-api"
import { useParams } from "react-router-dom"
import { formatDate, tmdbImageSrc } from "../utils"

export interface IEpisodesProps {}

const Season = (props: IEpisodesProps) => {
	const params = useParams()
	const [season, setSeason] = useState<Season | null>(null)

	const fetch = async () => {
		setSeason(
			await getSeason(
				parseInt(params.id as string),
				parseInt(params.seasonNumber as string)
			)
		)
	}

	useEffect(() => {
		fetch()
	}, [])

	if (!season) {
		return <></>
	}

	return (
		<>
			{/* background */}
			<div className="h-[150px] left-0 right-0 top-0 relative">
				<div className="overlay-film"></div>
				<Image src={tmdbImageSrc(season.posterPath)}></Image>
			</div>
			{/* poster and text */}
			<Section className="-mt-[75px] flex items-center relative z-10 mobile:block">
				<Image
					src={tmdbImageSrc(season.posterPath)}
					className="max-w-[150px] min-w-[150px] min-h-[200px] h-[200px] mobile:mx-auto"
				></Image>
				<div className="px-3 flex flex-col items-start gap-3 mobile:py-5">
					<p className="text-xl line-clamp-1  mobile:text-center">
						{season.filmName}
					</p>
					<p className="opacity-[0.7]">
						{season.name} ({new Date(season.airDate).getFullYear()}) &#8226;{" "}
						{season.episodes.length} episodes
					</p>
				</div>
			</Section>
			{/* episodes */}
			<Section title="Episodes">
				{season.episodes.map((episode, i) => (
					<div
						className="my-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-primary px-3 py-1.5 mobile:block"
						key={i}
					>
						<Image
							src={tmdbImageSrc(episode.stillPath)}
							className="w-[300px] max-w-[300px] max-h-[150px]"
						></Image>
						<div className="overflow-hidden flex flex-col gap-3 mobile:py-3">
							<p className="text-lg truncate">
								{episode.episodeNumber}. {episode.title}
							</p>
							<p className="opacity-[0.7] line-clamp-5">{episode.overview}</p>
							<div className="pt-3 text-right mt-auto">
								{formatDate(episode.airDate)}
							</div>
						</div>
					</div>
				))}
			</Section>
		</>
	)
}

export default Season
