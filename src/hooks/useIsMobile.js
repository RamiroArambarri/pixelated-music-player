import { useState, useEffect } from 'react'

const useIsMobile = (breakpoint = 1) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth / window.innerHeight < breakpoint)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth / window.innerHeight < breakpoint)
    };

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;


export const useAspectRatio = (aspectRatio, setAspectRatio) => {

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight)

      console.log(aspectRatio)
    };

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, []);
};