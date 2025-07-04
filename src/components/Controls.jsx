import { useEffect, useState, useRef } from 'react'
import songs from '../data'
import timeBarStyles from "../modules/timeBar.module.scss"
import useColor from '../hooks/useColor'
import Button from './Button'

const Controls = ({ currentSong, setCurrentSong, songRef }) => {
    const [paused, setPaused] = useState(true)

    useState(() => {
        if (songRef.current) {
            setPaused(songRef.current.paused)
        }
    }, [])

    const playButtonHandler = () => {
        songRef.current.play()
        setPaused(false)
    }

    const pauseButtonHandler = () => {
        songRef.current.pause()
        setPaused(true)
    }

    const changeSongHandler = (dir) => {
        if (dir == 'prev') {
            currentSong == 0 ? setCurrentSong(songs.length - 1) : setCurrentSong(currentSong - 1)
        } else {
            currentSong == songs.length - 1 ? setCurrentSong(0) : setCurrentSong(currentSong + 1)
        }
    }



    return (
        <>
            <TimeBar color={songs[currentSong].color} songRef={songRef} />
            <div>
                <Button type='previous' ariaLabel='Previous' onClick={() => changeSongHandler('prev')} color={songs[currentSong].color} />
                <Button type='play' ariaLabel='Play' onClick={playButtonHandler} selectedCondition={!paused} color={songs[currentSong].color} />
                <Button type='pause' ariaLabel='Pause' onClick={pauseButtonHandler} selectedCondition={paused} color={songs[currentSong].color} />
                <Button type='next' ariaLabel='Next' onClick={() => changeSongHandler('next')} color={songs[currentSong].color} />
            </div>
        </>
    )
}

export default Controls


const TimeBar = ({ color, songRef }) => {
    const colorDivRef = useRef(null)
    const progressBarRef = useRef(null)
    const rangeRef = useRef(null)

    useEffect(() => {
        const loadDuration = () => {
            rangeRef.current.max = songRef.current.duration
        }
        songRef.current.addEventListener('loadedmetadata', loadDuration)
        return () => {
            songRef.current.addEventListener('loadedmetadata', loadDuration)
        }
    }, [songRef])

    useEffect(() => {
        const changeTime = () => {
            console.log('Tiempo cambiado')
            rangeRef.current.value = songRef.current.currentTime
            const progress = 100 * songRef.current.currentTime / rangeRef.current.max
            progressBarRef.current.style.width = `${progress}%`
            console.log(songRef.current.currentTime)
            console.log(songRef.current.duration)
            console.log(progress)
            console.log(progressBarRef.current.style.width)
        }
        songRef.current.addEventListener('timeupdate', changeTime)
        return () => {
            songRef.current.removeEventListener('timeupdate', changeTime)
        }
    }, [])


    useColor(colorDivRef, 'backgroundColor', color)

    const changeHandler = (ev) => {
        songRef.current.currentTime = ev.target.value
    }

    return (
        <div className={timeBarStyles['time-bar']}>
            <div className={timeBarStyles['long-rectangle']}>
            </div>
            <div className={timeBarStyles['main-rectangle']}>
                <div className={timeBarStyles['progress-bar']} ref={progressBarRef}>
                    <div ref={colorDivRef} className={timeBarStyles.color}>
                    </div>
                </div>
                <input type="range" ref={rangeRef} onChange={ev => changeHandler(ev)} min="0" max="60" value="0" className={timeBarStyles['range']} />
            </div>
        </div>
    )
}