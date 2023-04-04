import { BrowserRouter } from "react-router-dom"
import { createContext, useContext, useEffect, useState } from "react"

import Body from "./layout/Body"
import Footer from "./layout/Footer"
import Header from "./layout/Header"
import { MediaType } from "./types"
import { Genre } from "./interfaces"
import Loader from "./components/Loader"
import { getGenres } from "./api/tmdb-api"

type Genres = {
	[key in MediaType]: Genre[]
}

export const GlobalContext = createContext<{ genres: Genres }>({
	genres: {
		movie: [],
		tv: [],
	},
})

export const useGlobalContext = () => useContext(GlobalContext)

const App = () => {
	const [genres, setGenres] = useState<Genres>({
		movie: [],
		tv: [],
	})

	const fetchGenres = async () => {
		const movie = await getGenres("movie")
		const tv = await getGenres("tv")

		setGenres({
			movie,
			tv,
		})
	}

	useEffect(() => {
		fetchGenres()
	}, [])

	if (!genres.movie.length || !genres.tv.length) {
		return (
			<div className="fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center">
				<Loader></Loader>
			</div>
		)
	}
	return (
		<BrowserRouter>
			<GlobalContext.Provider value={{ genres }}>
				{/* header */}
				<Header />
				{/* body */}
				<Body />
				{/* footer */}
				<Footer />
			</GlobalContext.Provider>
		</BrowserRouter>
	)
}

export default App
