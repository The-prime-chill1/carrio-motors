import { useState } from 'react'
import { FaPhone, FaLocationDot, FaClock } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import './contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section" id="contact">
      <p className="section-label">Get In Touch</p>
      <h2 className="section-title">Visit Carrio Motors</h2>

      <div className="contact-grid">
        <div className="contact-info glass-panel">
          <ul>
            <li><FaPhone /> <a href="tel:+2349137632195">+234 913 763 2195</a></li>
            <li><MdEmail /> <a href="mailto:chiltech2k26@gmail.com">chiltech2k26@gmail.com</a></li>
            <li><FaLocationDot /> 31 Grace Court, Chois Oasis, Abijo GRA, Ibeju-Lekki, Lagos, Nigeria</li>
            <li><FaClock /> Mon – Sat: 8:00 AM – 8:00 PM &middot; Sun: Closed</li>
          </ul>
          <div className="contact-btns">
            <a href="tel:+2349137632195" className="btn-gold">Call Now</a>
            <a href="mailto:chiltech2k26@gmail.com" className="btn-outline">Email Us</a>
          </div>
          <div className="contact-map">
            <iframe
              title="Carrio Motors Location"
              src="https://www.google.com/maps?q=Abijo+GRA+Ibeju-Lekki+Lagos&output=embed"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: '14px' }}
              loading="lazy"
            />
          </div>
        </div>

        <form className="contact-form glass-panel" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>Message</label>
          <textarea name="message" rows="4" value={form.message} onChange={handleChange} required />
          <button type="submit" className="btn-gold">{sent ? 'Message Sent' : 'Send Message'}</button>
        </form>
      </div>
    </section>
  )
}
