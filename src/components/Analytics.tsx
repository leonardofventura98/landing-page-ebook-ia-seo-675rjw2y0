import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics Measurement ID is not set.')
      return
    }

    const scriptId = 'ga-tracking-script'
    if (document.getElementById(scriptId)) {
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []

    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        window.dataLayer.push(args)
      }

    window.gtag('js', new Date())

    return () => {
      const scriptElement = document.getElementById(scriptId)
      if (scriptElement && scriptElement.parentElement) {
        scriptElement.parentElement.removeChild(scriptElement)
      }
    }
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return
    }

    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return null
}
