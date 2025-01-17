const useAudioNodes = (audioRef, number, setAudioNodes, setAudioContext) => {
  const context = new AudioContext()
  const source = context.createMediaElementSource(audioRef.current)
  source.connect(context.destination)
  const gainNodes = []
  for (let i = 0; i < number; i++) {
    gainNodes[i] = context.createGain()
    source.connect(gainNodes[i])
  }
  setAudioNodes(gainNodes)
  setAudioContext(context)
}

export default useAudioNodes