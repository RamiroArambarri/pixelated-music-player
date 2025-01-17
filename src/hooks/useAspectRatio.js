import { useState, useEffect } from "react"

const useAspectRatio = () => {
    const [aspectRatio, setAspectRatio] = useState(window.innerWidth / window.innerHeight)

    useEffect(() => {
        const handleResize = () => {
            setAspectRatio(window.innerWidth / window.innerHeight)
        };

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, []);

    return aspectRatio
}

export default useAspectRatio