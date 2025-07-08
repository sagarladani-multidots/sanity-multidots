'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

type CalendlyButtonProps = {
    url: string
    text?: string
}
export default function CalendlyButton({
    url,
    text = 'Schedule a Meeting',
    }: CalendlyButtonProps) {

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => setLoaded(true)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])


  const handleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url
      })
    }
  }

  return (
    <button onClick={handleClick} disabled={!loaded} className="footer-schedule-link">
      {loaded ? text : 'Loading...'}
    </button>
  )
}
