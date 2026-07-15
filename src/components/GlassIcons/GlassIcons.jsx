import * as Fa6 from 'react-icons/fa6'
import { motion } from 'framer-motion'
import services from '../../data/services.json'
import './glassicons.css'

export default function GlassIcons() {
  return (
    <section className="section" id="services">
      <p className="section-label">Dealership Services</p>
      <h2 className="section-title">Complete Ownership Experience</h2>
      <p className="section-sub">From first test drive to lifetime maintenance, Carrio Motors is with you every mile.</p>

      <div className="glassicon-grid">
        {services.map((s, i) => {
          const Icon = Fa6[s.icon] || Fa6.FaCarSide
          return (
            <motion.div
              key={s.id}
              className="glassicon-card"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="glassicon-badge"><Icon size={22} /></div>
              <h4>{s.title}</h4>
              <p>{s.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
