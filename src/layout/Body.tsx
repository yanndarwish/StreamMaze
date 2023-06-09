import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Catalog from "../pages/Catalog"
import Film from "../pages/Film"
import Season from "../pages/Season"

const Body = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/movies" element={<Catalog type="movie" />}></Route>
			<Route path="/tv" element={<Catalog type="tv" />}></Route>
			<Route path="/search" element={<Catalog type="search" />}></Route>
			<Route path="/list/:listTitle" element={<Catalog type="list" />}></Route>

			<Route path="/movie/:id" element={<Film mediaType="movie" />}></Route>
			<Route path="/tv/:id" element={<Film mediaType="tv" />}></Route>
			<Route path="/tv/:id/season/:seasonNumber" element={<Season />}></Route>
		</Routes>
	)
}

export default Body
