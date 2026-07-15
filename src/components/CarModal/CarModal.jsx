import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark, FaGaugeHigh, FaGasPump, FaLocationDot, FaCircleCheck } from 'react-icons/fa6'
import warrantyData from '../../data/warranty.json'
import financeData from '../../data/finance.json'
import './carmodal.css'

const formatPrice = (n) => `₦${n.toLocaleString('en-NG')}`

export default function CarModal({ car, onClose }) {
  if (!car) return null

  const warranty = warrantyData.find((w) => w.id === car.warrantyId)
  const finance = financeData.find((f) => f.id === car.financeId)

  return (
    <AnimatePresence>
      <motion.div
        className="carmodal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="carmodal glass-panel"
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="carmodal-close" onClick={onClose} aria-label="Close"><FaXmark size={20} /></button>

          <div
            className="carmodal-gallery"
            style={car.images?.[0] ? { backgroundImage: `url(${car.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          >
            <span className="car-badge">{car.category}</span>
          </div>

          <div className="carmodal-body">
            <div className="carmodal-top">
              <div>
                <h2>{car.brand} {car.model}</h2>
                <p className="carmodal-year">{car.year} &middot; {car.mileage}</p>
              </div>
              <span className="carmodal-price">{formatPrice(car.price)}</span>
            </div>

            <p className="carmodal-desc">{car.description}</p>

            <div className="carmodal-specs">
              <div><span>Engine</span><strong>{car.engine}</strong></div>
              <div><span>Horsepower</span><strong><FaGaugeHigh /> {car.horsepower} hp</strong></div>
              <div><span>Transmission</span><strong>{car.transmission}</strong></div>
              <div><span>Fuel Type</span><strong><FaGasPump /> {car.fuel}</strong></div>
              <div><span>Dealer</span><strong>{car.dealer}</strong></div>
              <div><span>Location</span><strong><FaLocationDot /> {car.location}</strong></div>
            </div>

            <h4 className="carmodal-subhead">Features</h4>
            <ul className="carmodal-features">
              {car.features.map((f) => (
                <li key={f}><FaCircleCheck /> {f}</li>
              ))}
            </ul>

            {warranty && (
              <>
                <h4 className="carmodal-subhead">Warranty</h4>
                <p className="carmodal-detail-text">{warranty.coverage} &middot; {warranty.duration} — {warranty.details}</p>
              </>
            )}

            {finance && (
              <>
                <h4 className="carmodal-subhead">Finance Option</h4>
                <p className="carmodal-detail-text">{finance.planName}: {finance.monthlyPayment}, {finance.interestRate}, {finance.loanDuration}, {finance.downPayment} down.</p>
              </>
            )}

            <div className="carmodal-actions">
              <a href="tel:+2349137632195" className="btn-gold">Call Dealer</a>
              <a
                href="#contact"
                className="btn-outline"
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book Test Drive
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
