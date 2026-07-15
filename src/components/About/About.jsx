import { motion } from 'framer-motion'
import { FaCircleCheck, FaEye, FaBullseye } from 'react-icons/fa6'
import LightRays from '../LightRays/LightRays.jsx'
import './about.css'

const CORE_VALUES = [
  {
    title: 'Transparency',
    text: 'Every price, spec and warranty term disclosed upfront — no surprises at the counter.',
  },
  {
    title: 'Craftsmanship',
    text: 'Every vehicle passes a rigorous multi-point certification before it reaches our floor.',
  },
  {
    title: 'Relationship',
    text: 'A dedicated advisor guides you from first enquiry through years of ownership.',
  },
]

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-rays" aria-hidden="true">
        <LightRays opacity={0.15} />
      </div>
      <div className="about-glow" aria-hidden="true" />

      <div className="about-container">
        {/* Story Content */}
        <div className="about-story">
          <p className="section-label">Our Story</p>
          <h2 className="section-title">About Carrio Motors</h2>
          <p className="about-lead">
            Nigeria's trusted destination for premium automobiles.
          </p>
          <p className="about-paragraph">
            Founded on a commitment to transparency and craftsmanship, Carrio Motors has grown into
            one of Lagos's most trusted multi-brand luxury dealerships. Based in Ibeju-Lekki, we
            represent BMW, Audi, Hyundai, Kia, Jeep, Suzuki and MG, offering certified vehicles,
            flexible financing, and a client experience built around trust from first enquiry to
            lifetime ownership.
          </p>

          <div className="about-mission-vision">
            <div className="about-mv-card glass-panel">
              <div className="about-mv-icon"><FaBullseye /></div>
              <div>
                <h4>Our Mission</h4>
                <p>To make world-class automobile ownership accessible, transparent and enjoyable for every client in Nigeria.</p>
              </div>
            </div>
            <div className="about-mv-card glass-panel">
              <div className="about-mv-icon"><FaEye /></div>
              <div>
                <h4>Our Vision</h4>
                <p>To be West Africa's most trusted name in luxury automotive retail — recognised for integrity as much as for the vehicles we sell.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values / Cards */}
        <div className="about-values">
          <p className="section-label">Values</p>
          <h3 className="about-values-title">What Guides Us</h3>
          <div className="about-values-list">
            {CORE_VALUES.map((val, idx) => (
              <motion.div
                key={val.title}
                className="about-value-card glass-panel"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="about-value-check">
                  <FaCircleCheck />
                </div>
                <div>
                  <h4>{val.title}</h4>
                  <p>{val.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
