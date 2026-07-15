import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShieldHalved, FaCoins, FaCheck, FaArrowTrendUp, FaClock, FaPercent } from 'react-icons/fa6'
import warrantyData from '../../data/warranty.json'
import financeData from '../../data/finance.json'
import './warranty.css'

export default function Warranty() {
  const [activeTab, setActiveTab] = useState('warranty') // 'warranty' | 'finance'

  return (
    <section className="section warranty-section" id="ownership">
      <div className="warranty-glow" aria-hidden="true" />
      
      <div className="warranty-container">
        {/* Header section */}
        <div className="warranty-header">
          <p className="section-label">Ownership Programs</p>
          <h2 className="section-title">Warranty &amp; Finance</h2>
          <p className="section-sub">
            Flexible financial models and manufacturer-grade protective custody for your automotive investment.
          </p>

          {/* Luxury Tab Switcher */}
          <div className="ownership-tabs">
            <button
              className={`ownership-tab ${activeTab === 'warranty' ? 'active' : ''}`}
              onClick={() => setActiveTab('warranty')}
            >
              <FaShieldHalved size={14} />
              Warranty Coverage
            </button>
            <button
              className={`ownership-tab ${activeTab === 'finance' ? 'active' : ''}`}
              onClick={() => setActiveTab('finance')}
            >
              <FaCoins size={14} />
              Finance Options
            </button>
          </div>
        </div>

        {/* Dynamic content area */}
        <div className="ownership-content">
          <AnimatePresence mode="wait">
            {activeTab === 'warranty' ? (
              <motion.div
                key="warranty"
                className="ownership-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                {warrantyData.map((w, idx) => (
                  <div key={w.id} className="ownership-card glass-panel">
                    <div className="ownership-card-icon warranty-icon">
                      <FaShieldHalved />
                    </div>
                    <h3>{w.manufacturer}</h3>
                    <p className="ownership-card-tagline">{w.coverage}</p>
                    <p className="ownership-card-desc">{w.details}</p>
                    
                    <div className="ownership-card-specs">
                      <span className="ownership-pill">
                        <FaClock size={11} /> {w.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="finance"
                className="ownership-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                {financeData.map((f, idx) => (
                  <div key={f.id} className="ownership-card glass-panel">
                    <div className="ownership-card-icon finance-icon">
                      <FaCoins />
                    </div>
                    <h3>{f.planName}</h3>
                    <div className="finance-rate">
                      <span className="rate-num">{f.interestRate}</span>
                      <span className="rate-label">Interest APR</span>
                    </div>
                    
                    <ul className="finance-details-list">
                      <li>
                        <span className="list-label">Monthly Estimate:</span>
                        <strong className="list-value">{f.monthlyPayment}</strong>
                      </li>
                      <li>
                        <span className="list-label">Loan Term:</span>
                        <strong className="list-value">{f.loanDuration}</strong>
                      </li>
                      <li>
                        <span className="list-label">Minimum Down:</span>
                        <strong className="list-value">{f.downPayment}</strong>
                      </li>
                    </ul>

                    <div className="ownership-highlights">
                      {f.highlights.map((h) => (
                        <span key={h} className="highlight-tag">
                          <FaCheck size={10} /> {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
