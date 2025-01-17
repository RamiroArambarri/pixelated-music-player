import Modal from './Modal'
import songs from '../data'
import viewInYoutubeStyles from "../modules/viewInYoutube.module.scss"

const ViewInYoutube = ({ setShowViewInYoutube, color, currentSong }) => {
    return (
        <Modal setShowModal={setShowViewInYoutube} color={color} width={'30vw'} closeButton={false}>
            <h2 className={viewInYoutubeStyles.title}>¿Ver en Youtube?</h2>
            <div className={viewInYoutubeStyles.options}>
                <a href={songs[currentSong].youtubeURL}>Sí</a>
                <a onClick={() => setShowViewInYoutube(false)}>No</a>
            </div>
        </Modal>
    )
}

export default ViewInYoutube