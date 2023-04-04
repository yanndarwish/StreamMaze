import axios, { AxiosResponse } from "axios"
import { MediaType } from "../types"
import { Cast, Film, Genre, Season, Trailer } from "../interfaces"
import { formatResult } from "../utils"

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_TMDB_API_URL,
})

axiosClient.interceptors.request.use((config) => {
	return {
		...config,
		params: {
			...config.params,
			api_key: import.meta.env.VITE_TMDB_API_KEY,
		},
	}
})

export const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[]
			}>
		>(`/trending/${mediaType}/week`)

		return data.results.map((val) => formatResult(val, mediaType))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const getInTheaters = async (): Promise<Film[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[]
			}>
		>(`/movie/now_playing`)

		return data.results.map((val) => formatResult(val, "movie"))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const getPopulars = async (
	mediaType: MediaType,
	page = 1
): Promise<Film[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[]
			}>
		>(`/${mediaType}/popular`, {
			params: {
				page,
			},
		})

		return data.results.map((val) => formatResult(val, mediaType))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const getTopRated = async (
	mediaType: MediaType,
	page = 1
): Promise<{ films: Film[]; totalPages: number }> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[]
				total_pages: number
			}>
		>(`/${mediaType}/top_rated`, {
			params: {
				page,
			},
		})

		return {
			films: data.results.map((val) => formatResult(val, mediaType)),
			totalPages: data.total_pages,
		}
	} catch (error) {
		console.error(error)
	}
	return {
		films: [],
		totalPages: 0,
	}
}

export const search = async (
	query: string,
	page = 1
): Promise<{
	totalResults: number
	totalPages: number
	films: Film[]
}> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				total_results: number
				total_pages: number
				results: unknown[]
			}>
		>(`/search/multi`, {
			params: {
				page,
				query,
			},
		})

		return {
			totalResults: data.total_results,
			totalPages: data.total_pages,
			films: data.results.map((val) => formatResult(val)),
		}
	} catch (error) {
		console.error(error)
	}
	return {
		totalResults: 0,
		totalPages: 0,
		films: [],
	}
}

export const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				genres: unknown[]
			}>
		>(`/genre/${mediaType}/list`)

		return data.genres as Genre[]
	} catch (error) {
		console.error(error)
	}
	return []
}

export const getDetails = async (
	mediaType: MediaType,
	id: number
): Promise<Film | null> => {
	try {
		const { data } = await axiosClient.get(`/${mediaType}/${id}`)

		return formatResult(data, mediaType)
	} catch (error) {
		console.error(error)
	}
	return null
}

export const getCasts = async (
	mediaType: MediaType,
	id: number
): Promise<Cast[]> => {
	try {
		const { data } = await axiosClient.get<any, AxiosResponse<{ cast: any[] }>>(
			`/${mediaType}/${id}/credits`
		)

		return data.cast.map((cast) => ({
			id: cast.id,
			characterName: cast.character,
			name: cast.name,
			profilePath: cast.profile_path,
		}))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const getTrailers = async (
	mediaType: MediaType,
	id: number
): Promise<Trailer[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{ results: any[] }>
		>(`/${mediaType}/${id}/videos`)

		return data.results
			.filter((item) => item.site.toLowerCase() === "youtube")
			.map((item) => ({
				id: item.id,
				key: item.key,
			}))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const getRecommendations = async (
	mediaType: MediaType,
	id: number
): Promise<Film[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[]
			}>
		>(`/${mediaType}/${id}/recommendations`)

		return data.results.map((val) => formatResult(val, mediaType))
	} catch (error) {
		console.error(error)
	}
	return []
}

export const getSeason = async (
	tvId: number,
	seasonNumber: number
): Promise<Season | null> => {
	try {
		const { data } = await axiosClient.get<any, any>(
			`/tv/${tvId}/season/${seasonNumber}`
		)

		const film = await getDetails("tv", tvId)
		return {
			id: data.id,
			filmName: film?.title || "",
			name: data.name,
			airDate: data.air_date,
			posterPath: data.poster_path,
			seasonNumber: data.season_number,
			episodes: data.episodes.map((episode: any) => ({
				id: episode.id,
				title: episode.name,
				overview: episode.overview,
				airDate: episode.air_date,
				stillPath: episode.still_path,
				episodeNumber: episode.episode_number,
			})),
		}
	} catch (error) {
		console.error(error)
	}
	return null
}

export const discover = async (
	mediaType: MediaType,
	page = 1
): Promise<{
	films: Film[]
	totalPages: number
}> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				total_pages: number
				results: unknown[]
			}>
		>(`/discover/${mediaType}`, {
			params: {
				page,
			},
		})

		return {
			films: data.results.map((val) => formatResult(val, mediaType)),
			totalPages: data.total_pages,
		}
	} catch (error) {
		console.error(error)
	}
	return {
		films: [],
		totalPages: 0,
	}
}
