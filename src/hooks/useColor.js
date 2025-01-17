import { useEffect } from "react"

const useColor = (elementRef, prop, color) => {
    useEffect(() => {
        elementRef.current.style[prop] = color
    }, [color])
}

export default useColor