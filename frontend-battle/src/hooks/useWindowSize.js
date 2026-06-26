import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    let raf
    const handle = () => {
      raf = requestAnimationFrame(() =>
        setSize({ width: window.innerWidth, height: window.innerHeight })
      )
    }
    window.addEventListener('resize', handle, { passive: true })
    return () => {
      window.removeEventListener('resize', handle)
      cancelAnimationFrame(raf)
    }
  }, [])

  return size
}