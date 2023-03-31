import { BrowserRouter } from "react-router-dom"
import Body from "./layout/Body"
import Footer from "./layout/Footer"
import Header from "./layout/Header"

const App = () => {
	return (
		<BrowserRouter>
			{/* header */}
			<Header />
			{/* body */}
			<Body />
			{/* footer */}
			<Footer />
		</BrowserRouter>
	)
}

export default App
