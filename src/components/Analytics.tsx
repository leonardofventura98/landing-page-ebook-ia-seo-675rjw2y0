import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Add gtag to the window interface to avoid TypeScript errors
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

const Analytics = () => {
  const location = useLocation()

  // This effect runs only once to load the script and initialize the gtag shim.
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

    // Initialize gtag function if it's not already defined.
    // This shim queues commands until the GA script is loaded.
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

  // This effect runs on initial load and on every location change to track pageviews.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return
    }

    // We need to wait for gtag to be defined by the first effect's shim.
    // A simple check is enough, as the shim is defined synchronously.
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return null
}

export { Analytics }
