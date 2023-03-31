import { MediaType } from "../types"

export interface ICatalogProps {
    type: MediaType | "search"
}

const Catalog = (props: ICatalogProps) => {
	return <div>{props.type}</div>
}

export default Catalog
