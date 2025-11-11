import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

const Analytics = () => {
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
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID)

    return () => {
      const scriptElement = document.getElementById(scriptId)
      if (scriptElement) {
        document.head.removeChild(scriptElement)
      }
    }
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return
    }

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    })
  }, [location])

  return null
}

export { Analytics }
