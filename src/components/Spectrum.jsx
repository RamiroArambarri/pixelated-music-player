import { useRef, createRef, useEffect } from "react";
import spectrumStyles from "../modules/spectrum.module.scss"

const Spectrum = ({ source, context, state, dir, bins = 4 }) => {
  const analyser = useRef(null)
  const animationFrameId = useRef(null)
  const barRef = useRef(Array.from({ length: bins }, () => createRef()));
  const values = useRef(new Uint8Array(16))

  const updateSpectrum = () => {
    analyser.current.getByteFrequencyData(values.current)

    barRef.current.forEach((bar, index) => {
      if (bar) {
        if (dir == 'lr') {
          bar.current.style.height = `${150 * 10 * Math.floor(values.current[Math.floor(4 + index * 9 / (bins - 1))] / 10) / 255}%`;
        } else {
          bar.current.style.height = `${150 * 10 * Math.floor(values.current[Math.floor(13 - index * 9 / (bins - 1))] / 10) / 255}%`;
        }

      }
    });


    animationFrameId.current = requestAnimationFrame(updateSpectrum);
  };

  useEffect(() => {
    if (state == 'off') return;
    analyser.current = context.createAnalyser()
    source.connect(analyser.current)
    analyser.current.fftSize = 32;
    analyser.current.smoothingTimeConstant = 0.9
    animationFrameId.current = requestAnimationFrame(updateSpectrum);

    return () => {
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [state])


  return (
    < div className={spectrumStyles['spectrum-div']} >
      {
        barRef.current.map((ref, index) => (
          <div className={spectrumStyles['spectrum-bar-container']} key={index}>
            <div
              className={spectrumStyles['spectrum-bar']}
              ref={ref}
            ></div>
          </div>
        ))
      }
    </div >)

}

export default Spectrum

