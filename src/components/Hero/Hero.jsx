import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCarSide } from 'react-icons/fa6'
import heroCarImg from '../../assets/audi-r8-hero.jpg'
import LightRays from '../LightRays/LightRays.jsx'
import './hero.css'

// Each stat: label, end value, prefix/suffix, duration (ms)
const STATS = [
  { label: 'Global Brands',      end: 7,    suffix: '',   prefix: '' },
  { label: 'Vehicles Delivered', end: 450,  suffix: '+',  prefix: '' },
  { label: 'Years of Trust',     end: 12,   suffix: '',   prefix: '' },
  { label: 'Client Satisfaction',end: 98,   suffix: '%',  prefix: '' },
]

function useCountUp(end, duration = 1400, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, start])
  return count
}

function StatCounter({ label, end, suffix, prefix }) {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const count = useCountUp(end, 1600, started)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="hero-stat" ref={ref}>
      <h3>{prefix}{count}{suffix}</h3>
      <p>{label}</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-rays"><LightRays opacity={0.18} /></div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-2" aria-hidden="true" />

      <div className="hero-grid">
        <div className="hero-content">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaCarSide />
            Ibeju-Lekki, Lagos — Nigeria's Premier Dealership
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Engineered for<br />
            <span className="gold-text">Extraordinary</span> Journeys
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Carrio Motors curates the finest selection of BMW, Audi, Hyundai, Kia, Jeep, Suzuki
            and MG vehicles — backed by premium warranty, flexible finance and white-glove service.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a
              href="#vehicles"
              className="btn-gold"
              onClick={e => { e.preventDefault(); document.querySelector('#vehicles')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Explore Vehicles <FaArrowRight />
            </a>
            <a
              href="#contact"
              className="btn-outline"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Book Test Drive
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <span className="hero-trust-badge">✓ Certified Pre-Owned</span>
            <span className="hero-trust-badge">✓ 0% Finance Available</span>
            <span className="hero-trust-badge">✓ Free Test Drive</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-car-wrap"
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-car-glow" aria-hidden="true" />
          <img
            src={heroCarImg}
            alt="Audi R8 — available at Carrio Motors"
            className="hero-car-img"
          />
        </motion.div>
      </div>

      {/* Animated stats bar */}
      <motion.div
        className="hero-stats glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
      >
        {STATS.map((s) => (
          <StatCounter key={s.label} {...s} />
        ))}
      </motion.div>
    </section>
  )
}
