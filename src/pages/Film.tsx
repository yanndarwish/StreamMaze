import { useNavigate, useParams } from "react-router-dom"
import { MediaType } from "../types"
import Image from "../components/Image"
import Section from "../components/Section"
import { useEffect, useState } from "react"
import { Cast, Film, Trailer } from "../interfaces"
import Card from "../components/Card"
import Slider from "../components/slider/Slider"

export interface IFilmProps {
	mediaType: MediaType
}

const Film = (props: IFilmProps) => {
	const { params } = useParams()
	const navigate = useNavigate()

	const [film, setFilm] = useState<Film>({
		id: 0,
		title:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem est quia saepe, adipisci natus ut ex similique deserunt. Repellendus maxime quos ab in repudiandae sunt pariatur accusamus impedit? Maxime, magnam!",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem est quia saepe, adipisci natus ut ex similique deserunt. Repellendus maxime quos ab in repudiandae sunt pariatur accusamus impedit? Maxime, magnam!",
		coverPath: "",
		posterPath: "",
		mediaType: props.mediaType,
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

	const [cast, setCast] = useState<Cast[]>([])
	const [trailers, setTrailers] = useState<Trailer[]>([])
	const [recommendations, setRecommendations] = useState<Film[]>([])

	const fetch = () => {
		const arrs: any[] = []

		for (let i = 0; i < 20; i++) {
			arrs.push({})
		}
		setCast(arrs)
		setTrailers(arrs)
		setRecommendations(arrs)
	}

	useEffect(() => {
		fetch()
	}, [])

	return (
		<>
			{/* background */}
			<div className="h-[300px] left-0 right-0 top-0 relative">
				<div className="overlay-film"></div>
				<Image src=""></Image>
			</div>
			{/* poster and text */}
			<Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
				<Image
					src=""
					className="max-w-[200px] min-w-[200px] h-[295px] mobile:mx-auto"
				></Image>
				<div className="px-3 flex flex-col items-start gap-3">
					<p className="text-xl line-clamp-1">{film.title}</p>
					<ul className="flex items-center gap-3">
						{film.genreIds.map((genre, i) => (
							<li
								key={i}
								className="px-3 py-1.5  bg-primary rounded-lg text-sm"
							>
								item {i}
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
								<Card
									title="lorem ipsum elid dhfdjshv sjdlsf sl spoef pdkfsln sldkhf slkdhflsheiohfjslkdn slkdhflksd"
									imageSrc=""
								></Card>
							</div>
						))}
					</div>
				</div>
			</Section>
			{/* trailers */}
			<Section title="Trailers">
				<div className="scrollbar scrollbar-thumb-primary scrollbar-track-header overflow-x-scroll">
					<div className="flex items-center gap-3">
						{cast.map((cast, i) => (
							<div className="flex-shrink-0 w-[300px] my-3" key={i}>
								<Card title="" imageSrc=""></Card>
							</div>
						))}
					</div>
				</div>
			</Section>
			{/* seasons */}
			<Section title="Seasons">
				<Slider slidesToShow={2} slidesToScroll={2} swipe={false}>
					{(_) =>
						film.seasons.map((season, i) => (
							<Card
								onClick={() =>
									navigate(`/tv/${film.id}/season/${season.seasonNumber}`)
								}
								title={`Season ${season.seasonNumber}`}
								imageSrc={film.coverPath}
								key={i}
							/>
						))
					}
				</Slider>
			</Section>
			{/* recommendations */}
			<Section title="Recommendations">
				<Slider isMovieCard={true} autoplay={true}>
					{(_) =>
						recommendations.map((film, i) => (
							<Card title={film.title} imageSrc={film.coverPath} key={i} />
						))
					}
				</Slider>
			</Section>
		</>
	)
}

export default Film
