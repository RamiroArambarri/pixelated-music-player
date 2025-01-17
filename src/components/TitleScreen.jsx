import titleScreenStyles from "../modules/titleScreen.module.scss"
import { useRef, useEffect } from 'react'
import useColor from "../hooks/useColor"

const TitleScreen = ({ children, color }) => {
    const titleRef1 = useRef(null)
    const titleRef2 = useRef(null)

    useColor(titleRef1, 'color', color)
    useColor(titleRef2, 'color', color)

    useEffect(() => {
        titleRef1.current.style.animation = 'none'
        titleRef2.current.style.animation = 'none'
        void titleRef1.current.offsetWidth;
        void titleRef2.current.offsetWidth;
        titleRef1.current.style.animation = `${titleScreenStyles.scroll1} 10s linear infinite`
        titleRef2.current.style.animation = `${titleScreenStyles.scroll2} 10s linear infinite`

    }, [children])


    return (
        <div className={titleScreenStyles['title-screen']}>
            <h1 ref={titleRef1} className={titleScreenStyles.title}>{children}</h1>
            <h1 ref={titleRef2} className={titleScreenStyles['title-clone']}>{children}</h1>
            <div className={titleScreenStyles.border}></div>
        </div>
    )
}

export default TitleScreen