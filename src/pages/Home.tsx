import Section from "../components/Section"
import { useEffect, useState } from "react"
import { Film } from "../interfaces"
import TrendingHero from "../components/TrendingHero"
import Slider from "../components/slider/Slider"
import Card from "../components/Card"
import { useNavigate } from "react-router-dom"
import {
	getInTheaters,
	getPopulars,
	getTopRated,
	getTrendings,
} from "../api/tmdb-api"
import { isFilm, mergeFilms, tmdbImageSrc } from "../utils"

export interface IHomeProps {}

const Home = (props: IHomeProps) => {
	const navigate = useNavigate()
	const [trendings, setTrendings] = useState<Film[]>([])
	const [inTheaters, setInTheaters] = useState<Film[]>([])
	const [populars, setPopulars] = useState<Film[]>([])
	const [topRatedMovies, setTopRatedMovies] = useState<Film[]>([])
	const [topRatedTVs, setTopRatedTVs] = useState<Film[]>([])

	const fetchInTheaters = async () => {
		setInTheaters(await getInTheaters())
	}

	const fetchTrending = async () => {
		const movies = await getTrendings("movie")
		const tvs = await getTrendings("tv")

		setTrendings(mergeFilms(movies, tvs))
	}

	const fetchPopular = async () => {
		const movies = await getPopulars("movie")
		const tvs = await getPopulars("tv")

		setPopulars(mergeFilms(movies, tvs, 20))
	}

	const fetchTopRatedMovies = async () => {
		setTopRatedMovies(await getTopRated("movie"))
	}
	const fetchTopRatedTVs = async () => {
		setTopRatedTVs(await getTopRated("tv"))
	}

	useEffect(() => {
		fetchTrending()
		fetchInTheaters()
		fetchPopular()
		fetchTopRatedMovies()
		fetchTopRatedTVs()
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
					{(onSwipe) =>
						trendings.map((film, i) => (
							<TrendingHero
								onClick={() =>
									!onSwipe && navigate(`/${film.mediaType}/${film.id}`)
								}
								film={film}
								key={i}
							/>
						))
					}
				</Slider>
			</Section>
			{/* in theater */}
			<Section title="In theaters">
				<Slider isMovieCard={true}>
					{(_) =>
						inTheaters.map((film, i) => (
							<Card
								title={film.title}
								imageSrc={tmdbImageSrc(film.posterPath)}
								key={i}
							/>
						))
					}
				</Slider>
			</Section>
			{/* popular */}
			<Section title="What's Popular">
				<Slider isMovieCard={true}>
					{(_) =>
						populars.map((film, i) => (
							<Card
								title={film.title}
								imageSrc={tmdbImageSrc(film.posterPath)}
								key={i}
							/>
						))
					}
				</Slider>
			</Section>
			{/* top rated tv */}
			<Section title="Top Rated TV">
				<Slider isMovieCard={true}>
					{(_) =>
						topRatedTVs.map((film, i) => (
							<Card
								title={film.title}
								imageSrc={tmdbImageSrc(film.posterPath)}
								key={i}
							/>
						))
					}
				</Slider>
			</Section>
			{/* top rated movies */}
			<Section title="Top Rated Movies">
				<Slider isMovieCard={true}>
					{(_) =>
						topRatedMovies.map((film, i) => (
							<Card
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

export default Home
