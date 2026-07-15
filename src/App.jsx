import PillNav from './components/Navbar/PillNav.jsx'
import Ticker from './components/Ticker/Ticker.jsx'
import Footer from './components/Footer/Footer.jsx'
import useLenis from './hooks/useLenis.js'
import Hero from './components/Hero/Hero.jsx'
import Brands from './components/Brands/Brands.jsx'
import FeaturedCars from './components/FeaturedCars/FeaturedCars.jsx'
import GlassIcons from './components/GlassIcons/GlassIcons.jsx'
import Contact from './components/Contact/Contact.jsx'

export default function App() {
  useLenis()

  return (
    <>
      <PillNav />
      <main>
        <Hero />
        <Brands />
        <FeaturedCars />
        <GlassIcons />
        <Contact />
      </main>
      <Footer />
      <Ticker />
    </>
  )
}
