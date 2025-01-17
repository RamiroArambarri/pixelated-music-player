import buttonsStyles from "../modules/buttons.module.scss"

const LogoButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className={buttonsStyles['button-logo']}>
            <div className={buttonsStyles['button-logo-icon']}></div>
        </button>
    )
} 

export default LogoButton