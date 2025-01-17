import songs from "../data"
import menuStyles from "../modules/menu.module.scss"
import { useRef, useState } from "react"
import useColor from "../hooks/useColor"
import useAspectRatio from "../hooks/useAspectRatio"
import arrow from "/public/media/images/arrow.png"


const Menu = ({ currentSong, setCurrentSong }) => {
    const [showMenu, setShowMenu] = useState(false)
    const aspectRatio = useAspectRatio()

        console.log(aspectRatio)
    return (
        <>
            {aspectRatio < 1.64 && showMenu && <div className={menuStyles.background}></div>}
            <ul className={`${menuStyles.menu} ${!showMenu && menuStyles.compressed}`} onClick={() => setShowMenu(!showMenu)}>
                {songs.map((song, index) => <MenuItem index={index} currentSong={currentSong} song={song} setCurrentSong={setCurrentSong} key={index} />)}
                <img src={arrow} />
            </ul>
        </>
    )
}

const MenuItem = ({ index, currentSong, song, setCurrentSong }) => {
    const colorRef = useRef(null)


    useColor(colorRef, 'color', songs[index].color)


    const clickHandler = (ev, index) => {
        setCurrentSong(index)
        ev.stopPropagation()
    }

    return (
        <li className={`${menuStyles['menu-item-border']} ${(index == currentSong) && menuStyles.active}`} onClick={(ev) => clickHandler(ev, index)}>
            <div className={menuStyles['menu-item']}>
                <span className={menuStyles.text}>{song.title}</span>
                <span className={menuStyles.color} ref={colorRef}>{song.title}</span>
            </div>
        </li>

    )
}

export default Menu