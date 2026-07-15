import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaXmark, FaGaugeHigh, FaGasPump, FaChevronRight } from 'react-icons/fa6'
import carsData from '../../data/cars.json'
import './brandmodal.css'

const formatPrice = (n) => `₦${n.toLocaleString('en-NG')}`

export default function BrandModal({ brand, onClose, onSelectCar }) {
  const brandCars = useMemo(() => {
    if (!brand) return []
    return carsData.filter((c) => c.brand.toLowerCase() === brand.name.toLowerCase())
  }, [brand])

  if (!brand) return null

  return (
    <AnimatePresence>
      <motion.div
        className="brandmodal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="brandmodal glass-panel"
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="brandmodal-header">
            <button className="brandmodal-close" onClick={onClose} aria-label="Close">
              <FaXmark size={20} />
            </button>
            <div className="brandmodal-header-content">
              <p className="brandmodal-eyebrow">Brand Collection</p>
              <h2>{brand.name} Showroom</h2>
              <p className="brandmodal-tagline">"{brand.tagline}"</p>
              <p className="brandmodal-desc">{brand.description}</p>
            </div>
          </div>

          {/* Cars List / Grid */}
          <div className="brandmodal-body">
            <h3 className="brandmodal-section-title">Available Models ({brandCars.length})</h3>
            
            {brandCars.length === 0 ? (
              <p className="brandmodal-empty">No vehicles currently in showroom for {brand.name}.</p>
            ) : (
              <div className="brandmodal-grid">
                {brandCars.map((car, idx) => (
                  <motion.div
                    key={car.id}
                    className="brandmodal-car-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => onSelectCar(car)}
                  >
                    <div
                      className="brandmodal-car-img"
                      style={
                        car.images?.[0]
                          ? {
                              backgroundImage: `url(${car.images[0]})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }
                          : undefined
                      }
                    >
                      <div className="brandmodal-car-watermark">{car.brand}</div>
                      <span className="brandmodal-car-badge">{car.category}</span>
                    </div>

                    <div className="brandmodal-car-info">
                      <div className="brandmodal-car-top">
                        <h4>{car.model}</h4>
                        <span className="brandmodal-car-price">{formatPrice(car.price)}</span>
                      </div>
                      <p className="brandmodal-car-year">{car.year} &middot; {car.mileage}</p>
                      
                      <div className="brandmodal-car-specs">
                        <span><FaGaugeHigh /> {car.horsepower} hp</span>
                        <span><FaGasPump /> {car.fuel}</span>
                      </div>

                      <button className="btn-outline brandmodal-car-cta">
                        View Specifications <FaChevronRight size={10} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
