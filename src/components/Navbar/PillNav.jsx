import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import logo from '../../assets/logo.png'
import VisitorCounter from '../VisitorCounter/VisitorCounter.jsx'
import './pillnav.css'

const LINKS = [
  { href: '#home',      label: 'Home' },
  { href: '#brands',    label: 'Brands' },
  { href: '#vehicles',  label: 'Vehicles' },
  { href: '#ownership', label: 'Plans' },
  { href: '#gallery',   label: 'Gallery' },
  { href: '#about',     label: 'About' },
  { href: '#contact',    label: 'Contact' },
]

function smoothScrollTo(id) {
  const el = document.querySelector(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function PillNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  // Track scroll for nav bg opacity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer to highlight active nav link
  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const handleLink = (href, e) => {
    e.preventDefault()
    setOpen(false)
    smoothScrollTo(href)
  }

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="pillnav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className={`pillnav-wrap${scrolled ? ' scrolled' : ''}`}>
        <nav className="pillnav glass-panel">
          {/* Brand */}
          <a href="#home" className="pillnav-brand" onClick={e => handleLink('#home', e)}>
            <img src={logo} alt="Carrio Motors" />
            <span>Carrio Motors</span>
          </a>

          {/* Desktop visitor badge */}
          <div className="pillnav-visitor-desktop">
            <VisitorCounter />
          </div>

          {/* Desktop links */}
          <ul className="pillnav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={'pillnav-link' + (active === l.href ? ' active' : '')}
                  onClick={e => handleLink(l.href, e)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-gold pillnav-cta" onClick={e => handleLink('#contact', e)}>
            Book Test Drive
          </a>

          <button
            className="pillnav-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="pillnav-mobile"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pillnav-mobile-links">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className={'pillnav-mobile-link' + (active === l.href ? ' active' : '')}
                    onClick={e => handleLink(l.href, e)}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <span className="mobile-link-num">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                ))}
              </div>

              <div className="pillnav-mobile-footer">
                <VisitorCounter />
                <a href="#contact" className="btn-gold" onClick={e => handleLink('#contact', e)}>
                  Book Test Drive
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
