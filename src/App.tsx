import { BrowserRouter } from "react-router-dom"
import Body from "./layout/Body"
import Footer from "./layout/Footer"
import Header from "./layout/Header"

const App = () => {
	return (
		<div className="pb-[64px]">
			<BrowserRouter>
				{/* header */}
				<Header />
				{/* body */}
				<Body />
				{/* footer */}
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
