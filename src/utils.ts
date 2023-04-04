import { MdSettingsApplications } from "react-icons/md"
import { Film, Season } from "./interfaces"
import { MediaType } from "./types"

export const mergeClassName = (val1: string, val2?: string) => {
	return val1 + " " + (val2 || "")
}

export const formatResult = (obj: any, mediaType?: MediaType): Film => {
	return {
		id: obj.id,
		title: obj.title || obj.name,
		description: obj.overview,
		coverPath: obj.backdrop_path,
		posterPath: obj.poster_path,
		genreIds: obj.genre_ids || obj.genres?.map((genre: any) => genre.id) || [],
		mediaType: mediaType || obj.media_type,
		seasons:
			obj.seasons?.map(
				(season: any) =>
					({
						id: season.id,
						name: season.name,
						posterPath: season.poster_path,
						seasonNumber: season.season_number,
					} satisfies Season)
			) || [],
	}
}
// check that object is valid Film interface
export const isFilm = (film: any): film is Film => {
	return <Film>film !== undefined
}
// get Image from path
export const tmdbImageSrc = (path: string) => {
	if (!path) return ""
	return `https://image.tmdb.org/t/p/original/${path}`
}

export const mergeFilms = (movies: Film[], tvs: Film[], limit = 6) => {
	let arrs: Film[] = []
	for (let i = 0; i < limit; i++) {
		let film: unknown
		if (i % 2 == 1) {
			if (tvs[i - 1]) {
				film = tvs[i - 1]
			}
		} else {
			if (movies[i - 1]) {
				film = tvs[i - 1]
			}
		}
		if (isFilm(film)) arrs.push(film)
	}
	return arrs
}

export const youtubeThumbnail = (key: string) => {
	return `https://img.youtube.com/vi/${key}/mqdefault.jpg`
}
