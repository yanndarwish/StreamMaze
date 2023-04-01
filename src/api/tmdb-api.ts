import axios, { AxiosResponse } from "axios"
import { MediaType } from "../types"
import { Film } from "../interfaces"
import { formatResult } from "../utils"

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_TMDB_API_URL,
})

axiosClient.interceptors.request.use((config) => {
	return {
		...config,
		params: {
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

		return data.results.map((val) => formatResult(mediaType, val))
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

		return data.results.map((val) => formatResult("movie", val))
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

		return data.results.map((val) => formatResult(mediaType, val))
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

		return data.results.map((val) => formatResult(mediaType, val))
	} catch (error) {
		console.error(error)
	}
	return []
}
