import { useEffect } from "react"

const useColor = (elementRef, prop, color) => {
    useEffect(() => {
        if(!elementRef.current) return
        elementRef.current.style[prop] = color
    }, [color])
}

export default useColor