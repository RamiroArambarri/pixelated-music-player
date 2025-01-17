import mainScreenStyles from "../modules/mainScreen.module.scss"
import songs from '../data'

const MainScreen = ({ currentSong, setShowViewInYoutube }) => {

    return (
        <div className={mainScreenStyles['screen-container']} onClick={() => setShowViewInYoutube(true)}>
            <img src={songs[currentSong].image} className={mainScreenStyles.screen}></img>
            <div className={mainScreenStyles.shine}>
            </div>
            <div className={mainScreenStyles['screen-border']}></div>
        </div>
    )
}

export default MainScreen