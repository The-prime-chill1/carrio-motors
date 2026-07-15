import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import gallery from '../../data/gallery.json'
import './gallery.css'

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const categories = useMemo(() => ['All', ...new Set(gallery.map((g) => g.category))], [])
  const items = useMemo(
    () => (filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)),
    [filter]
  )

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const next = () => setLightboxIndex((i) => (i + 1) % items.length)
  const prev = () => setLightboxIndex((i) => (i - 1 + items.length) % items.length)

  return (
    <section className="section" id="gallery">
      <p className="section-label">Showroom &amp; Beyond</p>
      <h2 className="section-title">Gallery</h2>
      <p className="section-sub">A visual tour of Carrio Motors — vehicles, interiors and moments.</p>

      <div className="car-filter-pills gallery-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={'car-filter-pill' + (filter === c ? ' active' : '')}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="gallery-masonry">
        {items.map((g, i) => (
          <motion.div
            key={g.id}
            className="gallery-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
            onClick={() => openLightbox(i)}
          >
            <img src={g.image} alt={g.caption} loading="lazy" />
            <div className="gallery-overlay">
              <span className="gallery-cat">{g.category}</span>
              <p>{g.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close"><FaXmark size={22} /></button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>

            <motion.figure
              className="lightbox-figure"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={items[lightboxIndex].image} alt={items[lightboxIndex].caption} />
              <figcaption>{items[lightboxIndex].caption}</figcaption>
            </motion.figure>

            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
