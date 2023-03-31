import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Catalog from "../pages/Catalog"

const Body = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/movies" element={<Catalog type="movie"/>}></Route>
            <Route path="/series" element={<Catalog type="tv"/>}></Route>
            <Route path="/search" element={<Catalog type="search"/>}></Route>
        </Routes>
    )
}

export default Body