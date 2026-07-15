import { useEffect, useState } from 'react'

export default function useGeolocation() {
  const [location, setLocation] = useState('Locating...')

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation('Location unavailable')
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()
          const city = data?.address?.city || data?.address?.town || data?.address?.state || 'Nearby'
          const country = data?.address?.country || ''
          setLocation(`${city}${country ? ', ' + country : ''}`)
        } catch {
          setLocation('Location unavailable')
        }
      },
      () => setLocation('Location permission denied'),
      { timeout: 8000 }
    )
  }, [])

  return location
}
