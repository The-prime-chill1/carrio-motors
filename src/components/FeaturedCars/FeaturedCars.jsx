import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGaugeHigh, FaGasPump, FaLocationDot, FaArrowRight } from 'react-icons/fa6'
import cars from '../../data/cars.json'
import CarModal from '../CarModal/CarModal.jsx'
import './featuredcars.css'

const formatPrice = (n) => `₦${n.toLocaleString('en-NG')}`

/**
 * Pick up to `perBrand` vehicles from every brand so all 7 makes appear.
 * Falls back to the raw slice when showFilters=true (full list with filters).
 */
function getCuratedList(limit) {
  const byBrand = {}
  for (const car of cars) {
    if (!byBrand[car.brand]) byBrand[car.brand] = []
    byBrand[car.brand].push(car)
  }
  const brands = Object.keys(byBrand)
  const perBrand = Math.max(1, Math.ceil(limit / brands.length))
  const result = []
  for (const brand of brands) {
    result.push(...byBrand[brand].slice(0, perBrand))
  }
  return result.slice(0, limit)
}

export default function FeaturedCars({ showFilters = false, limit = 7 }) {
  const [selectedCar, setSelectedCar] = useState(null)
  const [brandFilter, setBrandFilter] = useState('All')
  const [perfFilter, setPerfFilter] = useState('All')

  const brands = useMemo(() => ['All', ...new Set(cars.map((c) => c.brand))], [])
  const categories = useMemo(() => ['All', ...new Set(cars.map((c) => c.category))], [])

  const filtered = useMemo(() => {
    return cars.filter(
      (c) =>
        (brandFilter === 'All' || c.brand === brandFilter) &&
        (perfFilter === 'All' || c.category === perfFilter)
    )
  }, [brandFilter, perfFilter])

  // Homepage: curated list with 1 car per brand so all brands are visible.
  // Vehicles page (showFilters): full filtered list.
  const list = showFilters ? filtered : getCuratedList(limit)

  return (
    <section className="section" id="vehicles">
      <p className="section-label">Curated Inventory</p>
      <h2 className="section-title">Featured Vehicles</h2>
      <p className="section-sub">
        {showFilters
          ? 'Browse by brand or by performance category.'
          : 'A hand-picked selection across all seven of our premium brands.'}
      </p>

      {showFilters && (
        <div className="car-filters">
          <div className="car-filter-group">
            <span>Brand</span>
            <div className="car-filter-pills">
              {brands.map((b) => (
                <button
                  key={b}
                  className={'car-filter-pill' + (brandFilter === b ? ' active' : '')}
                  onClick={() => setBrandFilter(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="car-filter-group">
            <span>Category</span>
            <div className="car-filter-pills">
              {categories.map((c) => (
                <button
                  key={c}
                  className={'car-filter-pill' + (perfFilter === c ? ' active' : '')}
                  onClick={() => setPerfFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="car-grid">
        {list.map((c, i) => (
          <motion.div
            key={c.id}
            className="car-card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: (i % 7) * 0.07 }}
            onClick={() => setSelectedCar(c)}
          >
            {/* Image with graceful fallback */}
            <div
              className="car-card-image"
              style={
                c.images?.[0]
                  ? {
                      backgroundImage: `url(${c.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              {/* Brand watermark if image fails to load */}
              <div className="car-card-brand-tag">{c.brand}</div>
              <span className="car-badge">{c.category}</span>
            </div>

            <div className="car-card-body">
              <div className="car-card-top">
                <h3>{c.brand} {c.model}</h3>
                <span className="car-price">{formatPrice(c.price)}</span>
              </div>
              <p className="car-year">{c.year} &middot; {c.mileage}</p>
              <div className="car-specs">
                <span><FaGaugeHigh /> {c.horsepower} hp</span>
                <span><FaGasPump /> {c.fuel}</span>
                <span><FaLocationDot /> {c.location}</span>
              </div>
              <button className="btn-outline car-cta">
                View Details <FaArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        ))}
        {list.length === 0 && (
          <p className="car-empty">No vehicles match this filter.</p>
        )}
      </div>

      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </section>
  )
}
