import { useRef } from "react"
import buttonsStyles from '../modules/buttons.module.scss'
import useColor from "../hooks/useColor"

const Button = ({ type, color, ariaLabel, onClick, selectedCondition }) => {
    const colorRef = useRef(null)


    useColor(colorRef, 'backgroundColor', color)


    return (
        <button className={buttonsStyles['button']} aria-label={ariaLabel} onClick={onClick}>
            <div className={buttonsStyles[`icon-${type}${selectedCondition ? '-selected' : ''}`]}>
                <div className={buttonsStyles[`color-${type}`]} ref={colorRef}></div>
            </div>
        </button>
    )
}

export default Button