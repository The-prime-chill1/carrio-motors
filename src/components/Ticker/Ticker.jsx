import { FaCalendarDays, FaClock, FaLocationDot } from 'react-icons/fa6'
import useDateTime from '../../hooks/useDateTime'
import useGeolocation from '../../hooks/useGeolocation'
import './ticker.css'

const NEWS = [
  'New arrival: 2024 BMW M4 Competition now available at Carrio Motors',
  'Finance from 11.5% p.a. on the Carrio Elite Plan',
  'Ibeju-Lekki showroom open Mon–Sat, 8:00 AM – 8:00 PM',
  'Book a private test drive today: +234 913 763 2195',
  'Certified pre-owned Audi, BMW and Jeep inventory updated weekly',
]

export default function Ticker() {
  const { date, time } = useDateTime()
  const location = useGeolocation()

  const items = [...NEWS, ...NEWS]

  return (
    <div className="ticker">
      <div className="ticker-live">
        <span><FaCalendarDays /> {date}</span>
        <span><FaClock /> {time}</span>
        <span><FaLocationDot /> {location}</span>
      </div>
      <div className="ticker-scroll">
        <div className="ticker-track">
          {items.map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
