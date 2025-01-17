import { useState, useRef, useEffect } from 'react'
import './App.css'
import Controls from './components/Controls'
import Menu from './components/Menu'
import songs from './data'
import Spectrum from './components/Spectrum'
import Background from './components/Background'
import MainScreen from './components/MainScreen'
import TitleScreen from './components/TitleScreen'
import About from './components/About'
import Volume from './components/Volume'
import ViewInYoutube from './components/ViewInYoutube'
import useAudioNodes from './hooks/useAudioNodes'
import LogoButton from './components/LogoButton'
import useAspectRatio from './hooks/useAspectRatio'


const App = () => {
  console.log('v1.0.1')

  const aspectRatio = useAspectRatio()

  const [currentSong, setCurrentSong] = useState(0)
  const [showAbout, setShowAbout] = useState(false)
  const [showViewInYoutube, setShowViewInYoutube] = useState(false)
  const [audioContext, setAudioContext] = useState()
  const [audioNodes, setAudioNodes] = useState([])
  const songRef = useRef(null)


  useEffect(() => {
    let isPaused = songRef.current.paused
    let isEnded = songRef.current.ended
    songRef.current.src = songs[currentSong].fileURL
    if (!isPaused || isEnded) songRef.current.play()
  }, [currentSong]
  )


  const handleInteraction = () => {
    if (!audioContext) {
      useAudioNodes(songRef, 2, setAudioNodes, setAudioContext)
    }
    document.removeEventListener("click", handleInteraction)
    document.removeEventListener("keydown", handleInteraction)
  };

  useEffect(() => {
    document.addEventListener("click", handleInteraction)
    document.addEventListener("keydown", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])



  return (
    <>
      <audio src="public/music/pandora.wav" ref={songRef} onLoad={() => { this.volume = 0.5 }} />
      <Background />
      <Menu currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <div className="right-container">

        {aspectRatio > 1 ?
          <div className="top-container">
            {audioContext && audioNodes ? <Spectrum source={audioNodes[0]} context={audioContext} state='on' dir='lr' /> : <Spectrum state={'off'} />}
            <MainScreen currentSong={currentSong} setShowViewInYoutube={setShowViewInYoutube} />
            {(audioContext && audioNodes) ? <Spectrum source={audioNodes[1]} context={audioContext} state='on' dir='rl' /> : <Spectrum state={'off'} />}
          </div>
          :
          <>
            <MainScreen currentSong={currentSong} setShowViewInYoutube={setShowViewInYoutube} />
            <div className='spectrum-container'>
              {audioContext && audioNodes ? <Spectrum source={audioNodes[0]} context={audioContext} state='on' dir='lr' bins={8} /> : <Spectrum state={'off'} bins={8} />}
              {(audioContext && audioNodes) ? <Spectrum source={audioNodes[1]} context={audioContext} state='on' dir='rl' bins={8} /> : <Spectrum state={'off'} bins={8} />}
            </div>
          </>

        }
        <TitleScreen color={songs[currentSong].color}>{songs[currentSong].extTitle}</TitleScreen>
        {aspectRatio > 0.58 ?
          <div className='bottom-container'>
            <LogoButton onClick={() => setShowAbout(true)} />
            <div className='controls-container'>
              <Controls currentSong={currentSong} setCurrentSong={setCurrentSong} songRef={songRef} />
            </div>
            <Volume songRef={songRef} currentSong={currentSong} />
          </div>
          :
          <>
            <Volume songRef={songRef} currentSong={currentSong} />
            <div className='controls-container'>
              <Controls currentSong={currentSong} setCurrentSong={setCurrentSong} songRef={songRef} />
            </div>
            <LogoButton onClick={() => setShowAbout(true)} />
          </>
        }

      </div>
      {showAbout && <About setShowAbout={setShowAbout} color={songs[currentSong].color} />}
      {showViewInYoutube && <ViewInYoutube setShowViewInYoutube={setShowViewInYoutube} color={songs[currentSong].color} currentSong={currentSong} />}
    </>
  )
}

export default App


