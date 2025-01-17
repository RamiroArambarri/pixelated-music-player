import modalStyles from "../modules/modal.module.scss"
import Button from './Button'
import { useRef, useEffect } from "react"

const Modal = ({ children, setShowModal, color, width, closeButton=true }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        containerRef.current.style.width = width
    }, [])

    return (
        <div className={modalStyles['modal-background']}>
            <div className={modalStyles['modal-container']} ref={containerRef}>
                {closeButton && <Button type='close' color={color} ariaLabel='Close' onClick={() => { setShowModal(false) }} />}
                {children}
            </div>
        </div>
    )
}

export default Modal