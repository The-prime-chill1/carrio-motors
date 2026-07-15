import { useState } from 'react'
import {
  FaPhone, FaLocationDot, FaClock,
  FaFacebookF, FaInstagram, FaXTwitter, FaYoutube,
  FaArrowRight, FaCarSide,
} from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import logo from '../../assets/logo.png'
import './footer.css'

const NAV = [
  { label: 'Home',     href: '#home' },
  { label: 'Brands',   href: '#brands' },
  { label: 'Vehicles', href: '#vehicles' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
]

const BRANDS = ['BMW', 'Audi', 'Hyundai', 'Kia', 'Jeep', 'Suzuki', 'MG']

const SOCIAL = [
  { Icon: FaFacebookF,  href: '#', label: 'Facebook' },
  { Icon: FaInstagram,  href: '#', label: 'Instagram' },
  { Icon: FaXTwitter,   href: '#', label: 'X (Twitter)' },
  { Icon: FaYoutube,    href: '#', label: 'YouTube' },
]

function smoothTo(href) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer" id="footer">

      {/* ── Top ambient glow ───────────────────── */}
      <div className="footer-glow" aria-hidden="true" />

      {/* ── CTA Banner ───────────────────────── */}
      <div className="footer-cta glass-panel">
        <div className="footer-cta-text">
          <FaCarSide className="footer-cta-icon" />
          <div>
            <h3>Ready to find your perfect vehicle?</h3>
            <p>Book a private test drive or speak with a dedicated advisor today.</p>
          </div>
        </div>
        <div className="footer-cta-actions">
          <a href="tel:+2349137632195" className="btn-gold">Call Now</a>
          <a href="#contact" className="btn-outline" onClick={e => { e.preventDefault(); smoothTo('#contact') }}>
            Book Test Drive
          </a>
        </div>
      </div>

      {/* ── Main grid ───────────────────────── */}
      <div className="footer-grid">

        {/* Col 1 — Brand */}
        <div className="footer-col footer-col--brand">
          <div className="footer-brand">
            <img src={logo} alt="Carrio Motors" />
            <span>Carrio Motors</span>
          </div>
          <p className="footer-about">
            Nigeria's premier luxury automobile dealership, curating world-class vehicles
            for discerning clients across Lagos and beyond since 2012.
          </p>
          <div className="footer-brands-row">
            {BRANDS.map(b => <span key={b} className="footer-brand-pill">{b}</span>)}
          </div>
          <div className="footer-social">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="footer-social-btn">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigate</h4>
          <ul className="footer-nav-list">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={e => { e.preventDefault(); smoothTo(href) }}
                  className="footer-nav-link"
                >
                  <span className="footer-nav-arrow">›</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-icon"><FaPhone /></span>
              <a href="tel:+2349137632195">+234 913 763 2195</a>
            </li>
            <li>
              <span className="footer-contact-icon"><MdEmail /></span>
              <a href="mailto:chiltech2k26@gmail.com">chiltech2k26@gmail.com</a>
            </li>
            <li>
              <span className="footer-contact-icon"><FaLocationDot /></span>
              <span>31 Grace Court, Chois Oasis, Abijo GRA, Ibeju-Lekki, Lagos, Nigeria</span>
            </li>
            <li>
              <span className="footer-contact-icon"><FaClock /></span>
              <span>Mon – Sat: 8:00 AM – 8:00 PM &middot; Sun: Closed</span>
            </li>
          </ul>
        </div>

        {/* Col 4 — Newsletter */}
        <div className="footer-col">
          <h4 className="footer-heading">Stay Updated</h4>
          <p className="footer-newsletter-text">
            Get first access to new arrivals, exclusive finance offers and dealership news.
          </p>
          <form className="footer-newsletter" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email for newsletter"
            />
            <button type="submit" aria-label="Subscribe" className="footer-newsletter-btn">
              <FaArrowRight />
            </button>
          </form>
          {subscribed && (
            <p className="footer-newsletter-success">
              ✓ Subscribed — welcome to the Carrio family.
            </p>
          )}

          {/* Business hours mini card */}
          <div className="footer-hours-card">
            <div className="footer-hours-dot active" />
            <div>
              <p className="footer-hours-label">Showroom Open</p>
              <p className="footer-hours-time">Mon – Sat &nbsp;·&nbsp; 8 AM – 8 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider line ───────────────────── */}
      <div className="footer-divider" />

      {/* ── Bottom bar ───────────────────── */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Carrio Motors. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#home" onClick={e => { e.preventDefault(); smoothTo('#home') }}>Privacy Policy</a>
          <span>·</span>
          <a href="#home" onClick={e => { e.preventDefault(); smoothTo('#home') }}>Terms of Service</a>
        </div>
        <p className="footer-credit">Crafted by <strong>CHILL TECH</strong></p>
      </div>
    </footer>
  )
}
