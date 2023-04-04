import axios, { AxiosResponse } from "axios"
import { MediaType } from "../types"
import { Cast, Film, Genre, Trailer } from "../interfaces"
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
): Promise<Film[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[]
			}>
		>(`/${mediaType}/top_rated`, {
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

export const search = async (
	query: string,
	page = 1
): Promise<{
	totalResults: number
	films: Film[]
}> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				total_results: number
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
			films: data.results.map((val) => formatResult(val)),
		}
	} catch (error) {
		console.error(error)
	}
	return {
		totalResults: 0,
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
