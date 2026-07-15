import Brands from '../components/Brands/Brands.jsx'
import FeaturedCars from '../components/FeaturedCars/FeaturedCars.jsx'
import GlassIcons from '../components/GlassIcons/GlassIcons.jsx'
import Contact from '../components/Contact/Contact.jsx'
import Gallery from '../components/Gallery/Gallery.jsx'
import LightRays from '../components/LightRays/LightRays.jsx'
import finance from '../data/finance.json'
import warranty from '../data/warranty.json'

const PageHeader = ({ label, title, sub }) => (
  <div className="section" style={{ paddingBottom: 0 }}>
    <p className="section-label">{label}</p>
    <h1 className="section-title">{title}</h1>
    <p className="section-sub">{sub}</p>
  </div>
)

export function BrandsPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Brands />
    </div>
  )
}

export function VehiclesPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <FeaturedCars showFilters limit={100} />
    </div>
  )
}

export function FinancePage() {
  return (
    <div style={{ paddingTop: 100 }} className="section">
      <PageHeader label="Own It Your Way" title="Finance Plans" sub="Transparent, flexible financing tailored to your budget." />
      <div className="brand-grid" style={{ marginTop: 40 }}>
        {finance.map((f) => (
          <div key={f.id} className="brand-card">
            <h3>{f.planName}</h3>
            <p className="brand-tagline">{f.interestRate}</p>
            <p className="brand-desc">Monthly: {f.monthlyPayment} &middot; Duration: {f.loanDuration} &middot; Down payment: {f.downPayment}</p>
            <div className="brand-models">
              {f.highlights.map((h) => <span key={h}>{h}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WarrantyPage() {
  return (
    <div style={{ paddingTop: 100 }} className="section">
      <PageHeader label="Peace of Mind" title="Warranty Coverage" sub="Every Carrio Motors vehicle is backed by manufacturer-grade protection." />
      <div className="brand-grid" style={{ marginTop: 40 }}>
        {warranty.map((w) => (
          <div key={w.id} className="brand-card">
            <h3>{w.manufacturer}</h3>
            <p className="brand-tagline">{w.coverage}</p>
            <p className="brand-desc">{w.details}</p>
            <div className="brand-models"><span>{w.duration}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ServicesPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <GlassIcons />
    </div>
  )
}

export function GalleryPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Gallery />
    </div>
  )
}

const ABOUT_STATS = [
  { value: '12+', label: 'Years of Trust' },
  { value: '7', label: 'Global Brands' },
  { value: '450+', label: 'Vehicles Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
]

const CORE_VALUES = [
  { title: 'Transparency', text: 'Every price, spec and warranty term disclosed upfront — no surprises at the counter.' },
  { title: 'Craftsmanship', text: 'Every vehicle passes a rigorous multi-point certification before it reaches our floor.' },
  { title: 'Relationship', text: 'A dedicated advisor guides you from first enquiry through years of ownership.' },
]

export function AboutPage() {
  return (
    <div style={{ paddingTop: 100, position: 'relative', overflow: 'hidden' }} className="section">
      <div className="about-rays" aria-hidden="true"><LightRays opacity={0.16} /></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader
          label="Our Story"
          title="About Carrio Motors"
          sub="Nigeria's trusted destination for premium automobiles."
        />
        <p className="section-sub" style={{ maxWidth: 760 }}>
          Founded on a commitment to transparency and craftsmanship, Carrio Motors has grown into
          one of Lagos's most trusted multi-brand luxury dealerships. Based in Ibeju-Lekki, we
          represent BMW, Audi, Hyundai, Kia, Jeep, Suzuki and MG, offering certified vehicles,
          flexible financing, and a client experience built around trust from first enquiry to
          lifetime ownership.
        </p>

        <div className="hero-stats glass-panel" style={{ marginTop: 20, marginBottom: 60, maxWidth: 900 }}>
          {ABOUT_STATS.map((s) => (
            <div key={s.label} className="hero-stat">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <h4 className="carmodal-subhead" style={{ fontSize: '1.1rem', marginBottom: 20 }}>Mission &amp; Vision</h4>
        <p className="section-sub" style={{ maxWidth: 760, marginBottom: 50 }}>
          Our mission is to make world-class automobile ownership accessible, transparent and
          enjoyable for every client in Nigeria. Our vision is to be West Africa's most trusted
          name in luxury automotive retail — recognised for integrity as much as for the vehicles
          we sell.
        </p>

        <h4 className="carmodal-subhead" style={{ fontSize: '1.1rem', marginBottom: 20 }}>Core Values</h4>
        <div className="brand-grid">
          {CORE_VALUES.map((v) => (
            <div key={v.title} className="brand-card">
              <h3>{v.title}</h3>
              <p className="brand-desc">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ContactPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Contact />
    </div>
  )
}

const SITE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/brands', label: 'Brands' },
  { to: '/vehicles', label: 'Vehicles' },
  { to: '/finance', label: 'Finance' },
  { to: '/warranty', label: 'Warranty' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/sitemap', label: 'Site Map' },
]

export function SitemapPage() {
  return (
    <div style={{ paddingTop: 100 }} className="section">
      <PageHeader label="Navigate" title="Site Map" sub="Every page on Carrio Motors, one click away." />
      <div className="brand-grid" style={{ marginTop: 40 }}>
        {SITE_LINKS.map((l) => (
          <a key={l.to} href={l.to} className="brand-card" style={{ display: 'block' }}>
            <h3>{l.label}</h3>
            <p className="brand-desc">{l.to}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
