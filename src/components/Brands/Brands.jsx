import { useState } from 'react'
import { motion } from 'framer-motion'
import brands from '../../data/brands.json'
import BrandModal from './BrandModal.jsx'
import CarModal from '../CarModal/CarModal.jsx'
import './brands.css'

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedCar, setSelectedCar] = useState(null)

  return (
    <section className="section" id="brands">
      <p className="section-label">Authorized Dealer</p>
      <h2 className="section-title">Brands We Carry</h2>
      <p className="section-sub">
        Seven world-class manufacturers, one uncompromising standard of service. Click on any brand to view available models.
      </p>

      <div className="brand-grid">
        {brands.map((b, i) => (
          <motion.div
            key={b.id}
            className="brand-card"
            style={{ cursor: 'pointer' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            onClick={() => setSelectedBrand(b)}
          >
            <h3>{b.name}</h3>
            <p className="brand-tagline">{b.tagline}</p>
            <p className="brand-desc">{b.description}</p>
            <div className="brand-models">
              {b.featuredModels.map((m) => <span key={m}>{m}</span>)}
            </div>
            <button
              className="brand-showroom-btn"
              onClick={(e) => { e.stopPropagation(); setSelectedBrand(b); }}
            >
              <span>View Showroom</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Brand Showroom Modal */}
      {selectedBrand && (
        <BrandModal
          brand={selectedBrand}
          onClose={() => setSelectedBrand(null)}
          onSelectCar={(car) => setSelectedCar(car)}
        />
      )}

      {/* Car Specs Modal */}
      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </section>
  )
}

