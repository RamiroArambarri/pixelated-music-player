import volumeStyles from "../modules/volume.module.scss"
import { useEffect, useRef, useState } from 'react'
import songs from "../data"
import useIsMobile from "../hooks/useIsMobile"

const Volume = ({ songRef, currentSong }) => {
    const volumeBarRef = useRef(1)
    const lastVolume = useRef(1)
    const [muted, setMuted] = useState(false)
    const [thumbStyle, setThumbStyle] = useState()
    const [isMobile, setIsMobile] = useState(useIsMobile(0.58))

    const changeHandler = (ev) => {
        if (!songRef.current) return;
        lastVolume.current = ev.target.value
        songRef.current.volume = ev.target.value
    }

    const clickHandler = () => {
        if (!muted) {
            setMuted(true)
            songRef.current.volume = 0
            volumeBarRef.current.value = 0
        } else {
            setMuted(false)
            songRef.current.volume = lastVolume.current
            volumeBarRef.current.value = lastVolume.current
        }
    }

    useEffect(() => {

        setThumbStyle(
            `.${volumeStyles['volume-bar']}::-webkit-slider-thumb {
                   box-shadow: 0 20vh 0 20vh ${songs[currentSong].color};
                }`
        )

        if (isMobile) {
            setThumbStyle(
                `.${volumeStyles['volume-bar']}::-webkit-slider-thumb {
                       box-shadow: -20vh 0 0 20vh ${songs[currentSong].color};
                    }`
            )
        }
    }, [currentSong])

    return (
        <div className={volumeStyles['volume-div']}>
            <style>
                {thumbStyle}
            </style>
            <input onChange={changeHandler} ref={volumeBarRef} type='range' className={volumeStyles['volume-bar']} min='0' max='1' step='.001' />
            <button className={volumeStyles[`volume-icon${muted ? '-muted' : ''}`]} onClick={clickHandler} aria-label={muted ? 'Desilenciar' : 'silenciar'}></button>
        </div>
    )
}

export default Volume