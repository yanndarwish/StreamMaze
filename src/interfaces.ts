import { ReactNode } from "react"
import { MediaType } from "./types"

export interface CustomComponentProps {
	children?: ReactNode
	className?: string
}

export interface Season {
	id: number,
	name: string
	seasonNumber: number
	posterPath: string
}

export interface Film {
	id: number
	mediaType: MediaType
	title: string
	description: string
	posterPath: string
	coverPath: string
	genreIds: number[]
	seasons: Season[]
}

export interface Cast {
	id: number
	name: string
	characterName: string
	profilePath: string
}

export interface Trailer {
	id: number
	key: string
}

export interface Genre {
	id: number
	name: string
}
