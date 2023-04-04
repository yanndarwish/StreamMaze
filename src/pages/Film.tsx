import { useLocation, useNavigate, useParams } from "react-router-dom"
import { MediaType } from "../types"
import Image from "../components/Image"
import Section from "../components/Section"
import { useEffect, useState } from "react"
import { Cast, Film, Trailer } from "../interfaces"
import Card from "../components/Card"
import Slider from "../components/slider/Slider"
import {
	getCasts,
	getDetails,
	getRecommendations,
	getTrailers,
} from "../api/tmdb-api"
import { tmdbImageSrc, youtubeThumbnail } from "../utils"
import { useGlobalContext } from "../App"
import Loader from "../components/Loader"

export interface IFilmProps {
	mediaType: MediaType
}

const Film = (props: IFilmProps) => {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const globalContext = useGlobalContext()

	const [film, setFilm] = useState<Film | null | undefined>(null)

	const [cast, setCast] = useState<Cast[]>([])
	const [trailers, setTrailers] = useState<Trailer[]>([])
	const [recommendations, setRecommendations] = useState<Film[]>([])

	const fetch = async () => {
		const film = await getDetails(props.mediaType, parseInt(id as string))

		if (film) {
			setFilm(film)
			setCast(await getCasts(film.mediaType, film.id))
			setTrailers(await getTrailers(film.mediaType, film.id))
			setRecommendations(await getRecommendations(film.mediaType, film.id))
		}
	}

	useEffect(() => {
		setFilm(undefined)
		window.scrollTo({
			top: 0,
		})
		fetch()
	}, [location])

	if (film === null) {
		// redirect to 404 page
		return <></>
	} else if (film === undefined) {
		return (
			<div className="text-center flex-1 p-6">
				<Loader></Loader>
			</div>
		)
	}

	return (
		<>
			{/* background */}
			<div className="h-[300px] left-0 right-0 top-0 relative">
				<div className="overlay-film"></div>
				<Image src={tmdbImageSrc(film.coverPath)}></Image>
			</div>
			{/* poster and text */}
			<Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
				<Image
					src={tmdbImageSrc(film.posterPath)}
					className="max-w-[200px] min-w-[200px] h-[295px] mobile:mx-auto"
				></Image>
				<div className="px-3 flex flex-col items-start gap-3">
					<p className="text-xl line-clamp-1">{film.title}</p>
					<ul className="flex items-center gap-3">
						{film.genreIds.map((id, i) => (
							<li
								key={i}
								className="px-3 py-1.5  bg-primary rounded-lg text-sm"
							>
								{
									globalContext.genres[film.mediaType]?.find(
										(genre) => genre.id === id
									)?.name
								}
							</li>
						))}
					</ul>
					<p className="line-clamp-3 opacity-[0.7]">{film.description}</p>
				</div>
			</Section>
			{/* cast */}
			<Section title="Cast">
				<div className="scrollbar scrollbar-thumb-primary scrollbar-track-header overflow-x-scroll">
					<div className="flex items-center gap-3">
						{cast.map((cast, i) => (
							<div className="flex-shrink-0 w-[200px] my-3" key={i}>
								<Card imageSrc={tmdbImageSrc(cast.profilePath)}>
									<p className="font-semibold">{cast.name}</p>
									<p className="opacity-[0.7] text-sm">{cast.characterName}</p>
								</Card>
							</div>
						))}
					</div>
				</div>
			</Section>
			{/* trailers */}
			<Section title="Trailers">
				<div className="scrollbar scrollbar-thumb-primary scrollbar-track-header overflow-x-scroll">
					<div className="flex items-center gap-3">
						{trailers.map((trailer, i) => (
							<div className="flex-shrink-0 w-[300px] my-3" key={i}>
								<Card imageSrc={youtubeThumbnail(trailer.key)}></Card>
							</div>
						))}
					</div>
				</div>
			</Section>
			{/* seasons */}
			<Section title="Seasons">
				<Slider
					slidesToShow={film.seasons.length > 2 ? 2 : 1}
					slidesToScroll={film.seasons.length > 2 ? 2 : 1}
					swipe={false}
				>
					{(_) =>
						film.seasons.map((season, i) => (
							<Card
								className="h-[248px]"
								onClick={() =>
									navigate(`/tv/${film.id}/season/${season.seasonNumber}`)
								}
								title={season.name}
								imageSrc={tmdbImageSrc(season.posterPath)}
								key={i}
							/>
						))
					}
				</Slider>
			</Section>
			{/* recommendations */}
			<Section title="Recommendations">
				<Slider isMovieCard={true}>
					{(_) =>
						recommendations.map((film, i) => (
							<Card
								onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
								title={film.title}
								imageSrc={tmdbImageSrc(film.posterPath)}
								key={i}
							/>
						))
					}
				</Slider>
			</Section>
		</>
	)
}

export default Film
