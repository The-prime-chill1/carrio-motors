import PillNav from './components/Navbar/PillNav.jsx'
import Ticker from './components/Ticker/Ticker.jsx'
import Footer from './components/Footer/Footer.jsx'
import useLenis from './hooks/useLenis.js'
import Hero from './components/Hero/Hero.jsx'
import Brands from './components/Brands/Brands.jsx'
import FeaturedCars from './components/FeaturedCars/FeaturedCars.jsx'
import Warranty from './components/Warranty/Warranty.jsx'
import GlassIcons from './components/GlassIcons/GlassIcons.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import About from './components/About/About.jsx'
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
        <Warranty />
        <GlassIcons />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      <Ticker />
    </>
  )
}
