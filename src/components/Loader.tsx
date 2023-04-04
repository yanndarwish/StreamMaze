import { FaSpinner } from "react-icons/fa"

const Loader = () => {
	return (
		<div className="flex items-center justify-center gap-3">
			<FaSpinner className="animate-spin" size={18} />
			<span>Loading...</span>
		</div>
	)
}

export default Loader
