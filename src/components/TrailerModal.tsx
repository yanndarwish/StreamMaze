import { useEffect, useState } from "react"
import Container from "./Container"
import { IoIosClose } from "react-icons/io"

export interface ITrailerModalProps {
	src: string | null
    onHide: () => void
}

const TrailerModal = (props: ITrailerModalProps) => {
	const [show, setShow] = useState(false)

    const hide = () => {
        setShow(false)
        props.onHide()
    }

	useEffect(() => {
		if (props.src) setShow(true)
	}, [props.src])

	return (
		<div
			onClick={() => hide()}
			className={`
                ${show ? "opacity-[1]" : "opacity-0 pointer-events-none"}
                fixed 
                top-0 
                bottom-0 
                right-0 
                left-0
                z-[100]
                flex
                justify-center
                items-center
                ease-in-out
                duration-300
                after:fixed
                after:content-['']
                after:top-0
                after:bottom-0
                after:left-0
                after:right-0
                after:bg-black
                after:opacity-[0.8]
            `}
		>
			<Container
				className={`
                relative 
                z-10
                transition-[margin, opacity]
                ease-in-out
                duration-300
                w-full
                ${
									show
										? `
                        mt-0
                        opacity-[1]
                    `
										: `
                        -mt-[200px]
                        opacity-0
                    `
								}
                `}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="bg-header rounded-lg"
				>
					<div className="p-3 text-right">
						<button onClick={() => hide()}>
							<IoIosClose size={36} />
						</button>
					</div>
					{show && (
						<iframe
							src={props.src as string}
							className="w-full h-[500px]"
							title="title"
						></iframe>
					)}
				</div>
			</Container>
		</div>
	)
}

export default TrailerModal
