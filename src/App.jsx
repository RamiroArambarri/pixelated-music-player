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
  console.log('v1.2.3')

  const aspectRatio = useAspectRatio()

  const [currentSong, setCurrentSong] = useState(0)
  const [showAbout, setShowAbout] = useState(false)
  const [showViewInYoutube, setShowViewInYoutube] = useState(false)
  const [audioContext, setAudioContext] = useState()
  const [audioNodes, setAudioNodes] = useState([])
  const [paused, setPaused] = useState(true)
  const songRef = useRef(null)


  useEffect(() => {
    let isPaused = songRef.current.paused
    let isEnded = songRef.current.ended
    songRef.current.src = songs[currentSong].fileURL
    if (!isPaused || isEnded) songRef.current.play()
  }, [currentSong]
  )

  useEffect(() => {
    if(paused) {
      songRef.current.pause()
    } else {
      songRef.current.play()
    }
  }, [paused]
  )

  useEffect(() => {
    songRef.current.addEventListener('ended', pausePlayHandler)
    songRef.current.addEventListener('paused', pausePlayHandler)
    songRef.current.addEventListener('play', pausePlayHandler)

    return () => {
      songRef.current.removeEventListener('ended', pausePlayHandler)
      songRef.current.removeEventListener('paused', pausePlayHandler)
      songRef.current.removeEventListener('play', pausePlayHandler)
    }
  }, []
  )

  const pausePlayHandler = () => {
    'Se activó el handler'
    if(songRef.current.paused) {
      setPaused(true)
    } else {
      setPaused(false)
    }
  }


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

        {aspectRatio > 1.28 &&
          < div className="top-container">
            {audioContext && audioNodes ? <Spectrum source={audioNodes[0]} context={audioContext} state='on' dir='lr' color={songs[currentSong].color} /> : <Spectrum state={'off'} color={songs[currentSong].color}/>}
            <MainScreen currentSong={currentSong} setShowViewInYoutube={setShowViewInYoutube} />
            {(audioContext && audioNodes) ? <Spectrum source={audioNodes[1]} context={audioContext} state='on' dir='rl' color={songs[currentSong].color} /> : <Spectrum state={'off'} color={songs[currentSong].color} />}
          </div>
        }
        {aspectRatio < 1.28 && aspectRatio > 0.69 &&
          <>
            < div className="top-container">
              {audioContext && audioNodes ? <Spectrum source={audioNodes[0]} context={audioContext} state='on' dir='lr' bins={2} color={songs[currentSong].color} /> : <Spectrum state={'off'} bins={2} color={songs[currentSong].color} />}
              <MainScreen currentSong={currentSong} setShowViewInYoutube={setShowViewInYoutube} />
              {(audioContext && audioNodes) ? <Spectrum source={audioNodes[1]} context={audioContext} state='on' dir='rl' bins={2} color={songs[currentSong].color} /> : <Spectrum state={'off'} bins={2} color={songs[currentSong].color} />}
            </div>
          </>
        }
        {aspectRatio < 0.69 &&
          <>
            <MainScreen currentSong={currentSong} setShowViewInYoutube={setShowViewInYoutube} />
            <div className='spectrum-container'>
              {audioContext && audioNodes ? <Spectrum source={audioNodes[0]} context={audioContext} state='on' dir='lr' bins={10} color={songs[currentSong].color} /> : <Spectrum state={'off'} bins={10} color={songs[currentSong].color} />}
              {(audioContext && audioNodes) ? <Spectrum source={audioNodes[1]} context={audioContext} state='on' dir='rl' bins={10} color={songs[currentSong].color} /> : <Spectrum state={'off'} bins={10} color={songs[currentSong].color} />}
            </div>
          </>
        }




        <TitleScreen color={songs[currentSong].color}>{songs[currentSong].extTitle}</TitleScreen>
        {aspectRatio > 0.58 ?
          <div className='bottom-container'>
            <LogoButton onClick={() => setShowAbout(true)} />
            <div className='controls-container'>
              <Controls currentSong={currentSong} paused={paused} setPaused={setPaused} setCurrentSong={setCurrentSong} songRef={songRef} />
            </div>
            <Volume songRef={songRef} currentSong={currentSong} />
          </div>
          :
          <>
            <Volume songRef={songRef} currentSong={currentSong} />
            <div className='controls-container'>
              <Controls currentSong={currentSong} paused={paused} setPaused={setPaused} setCurrentSong={setCurrentSong} songRef={songRef} />
            </div>
            <LogoButton onClick={() => setShowAbout(true)} />
          </>
        }

      </div >
      {showAbout && <About setShowAbout={setShowAbout} color={songs[currentSong].color} />
      }
      {showViewInYoutube && <ViewInYoutube setShowViewInYoutube={setShowViewInYoutube} color={songs[currentSong].color} currentSong={currentSong} />}
    </>
  )
}

export default App


