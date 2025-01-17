import aboutStyles from '../modules/about.module.scss'
import photo from '/public/media/images/photo.png'
import Modal from './Modal'
import Button from './Button'
import { useState } from 'react'
import { useAspectRatio } from '../hooks/useIsMobile'

const About = ({ setShowAbout, color }) => {
    const [aspectRatio, setAspectRatio] =  useState()

    useAspectRatio(aspectRatio, setAspectRatio)

    return (
        <Modal setShowModal={setShowAbout} color={color} width={'70vw'}>
            <h1>Hola!</h1>
            <img src={photo} alt='Ramiro Arambarri' className={aboutStyles.photo} />
            <p>
                Este sitio fue íntegramente diseñado y desarrollado por Ramiro Arambarri.<br />
                Toda la música que se puede reproducir en este sitio ha sido compuesta y producida por Ramiro Arambarri.<br />
                Todas las imágenes y animaciones de esate sitio han sido diseñadas y producidas por Ramiro Arambarri.<br />
                Contacto:<br /><br />
                Puedes contactar conmigo enviando un mail a <a href='mailto:raarambarri@gmail.com'>raarambarri@gmail.com</a>.
            </p>
            <a href='https://www.instagram.com/ramiro_arambarri/' target='_blank'><Button type='instagram' color='transparent' ariaLabel='Instagram' /></a>
            <a href='https://www.youtube.com/channel/UCwwtu-nl-G_SKWY06ree4rQ' target='_blank'><Button type='youtube' color='transparent' ariaLabel='Instagram' /></a>
            <a href='https://www.linkedin.com/in/ramiro-gabriel-arambarri-878616264/' target='_blank'><Button type='linkedin' color='transparent' ariaLabel='Instagram' /></a>
            <a href='https://github.com/RamiroArambarri' target='_blank'><Button type='github' color='transparent' ariaLabel='Instagram' /></a>
        </Modal>
    )
}

export default About