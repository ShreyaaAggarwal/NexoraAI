import { useState, useEffect, useRef, useCallback } from 'react'
import { features } from '../data/index.js'
import { useInView } from '../hooks/useInView.js'
import { useWindowSize } from '../hooks/useWindowSize.js'
import {
  IconOrchestration, IconModels, IconNoCode,
  IconAnalytics, IconSecurity, IconIntegrations,
} from '../utils/icons.jsx'

const ICON_MAP = {
  orchestration: IconOrchestration,
  models:        IconModels,
  nocode:        IconNoCode,
  analytics:     IconAnalytics,
  security:      IconSecurity,
  integrations:  IconIntegrations,
}

// ─── Bento card ──────────────────────────────────────────────────────────────
function BentoCard({ feature, isActive, onHover, delay }) {
  const Icon = ICON_MAP[feature.icon]

  return (
    <div
      role="article"
      aria-label={feature.title}
      data-feature-id={feature.id}
      onMouseEnter={() => onHover(features.findIndex(f => f.id === feature.id))}
      onMouseLeave={() => onHover(null)}
      style={{
        borderRadius: '16px',
        background: isActive
          ? 'rgba(255,200,1,0.05)'
          : 'rgba(23,43,54,0.55)',
        border: `1px solid ${isActive ? 'rgba(255,200,1,0.22)' : 'rgba(255,255,255,0.07)'}`,
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        opacity: 0,
        animation: `fade-up 0.55s ease ${delay}s forwards`,
        transition: 'border-color 0.22s ease, background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isActive
          ? '0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,200,1,0.08)'
          : 'none',
        cursor: 'default',
      }}
    >
      {/* Glow accent */}
      {isActive && (
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: '-40px', right: '-40px',
          width: '180px', height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${feature.accent}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Corner decoration */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '80px', height: '80px',
        background: `linear-gradient(135deg, ${feature.accent}10, transparent)`,
        borderRadius: '0 16px 0 80px',
      }} />

      {/* Icon */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px', height: '44px',
        borderRadius: '10px',
        background: `${feature.accent}18`,
        border: `1px solid ${feature.accent}30`,
        marginBottom: '18px',
        transition: 'transform 0.22s ease',
        transform: isActive ? 'scale(1.08)' : 'scale(1)',
      }}>
        <Icon size={22} color={feature.accent} />
      </div>

      <h3 style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: '700',
        fontSize: '17px',
        color: '#fff',
        marginBottom: '10px',
        letterSpacing: '-0.01em',
      }}>{feature.title}</h3>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        lineHeight: '1.65',
        color: 'rgba(255,255,255,0.5)',
      }}>{feature.description}</p>

      {/* Active indicator */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        height: '2px',
        width: isActive ? '100%' : '0%',
        background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
        transition: 'width 0.3s ease',
      }} />
    </div>
  )
}

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({ feature, isOpen, onToggle }) {
  const Icon = ICON_MAP[feature.icon]
  const bodyRef = useRef(null)

  return (
    <div style={{
      borderRadius: '12px',
      border: `1px solid ${isOpen ? 'rgba(255,200,1,0.2)' : 'rgba(255,255,255,0.07)'}`,
      background: isOpen ? 'rgba(255,200,1,0.04)' : 'rgba(23,43,54,0.45)',
      transition: 'border-color 0.25s ease, background 0.25s ease',
      overflow: 'hidden',
    }}>
      <button
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${feature.id}`}
        id={`accordion-header-${feature.id}`}
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px', height: '36px',
          borderRadius: '8px',
          background: `${feature.accent}18`,
          border: `1px solid ${feature.accent}28`,
          flexShrink: 0,
        }}>
          <Icon size={18} color={feature.accent} />
        </div>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: '600',
          fontSize: '15px',
          color: '#fff',
          flex: 1,
        }}>{feature.title}</span>
        <div style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.28s ease',
          color: isOpen ? '#FFC801' : 'rgba(255,255,255,0.4)',
          lineHeight: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>

      <div
        id={`accordion-body-${feature.id}`}
        role="region"
        aria-labelledby={`accordion-header-${feature.id}`}
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? `${bodyRef.current?.scrollHeight || 200}px` : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease-in-out, opacity 0.28s ease',
        }}
      >
        <div style={{ padding: '0 20px 20px 70px' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            lineHeight: '1.65',
            color: 'rgba(255,255,255,0.52)',
          }}>{feature.description}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Section label ─────────────────────────────────────────────────────────
function SectionHeader({ inView }) {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '60px',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>
      <div style={{ marginBottom: '14px' }}>
        <span className="section-label">FEATURES</span>
      </div>
      <h2 className="section-title" style={{ marginBottom: '16px' }}>
        Everything your pipeline<br />needs to move at AI speed.
      </h2>
      <p className="section-sub" style={{ margin: '0 auto' }}>
        From real-time orchestration to enterprise security — Nexora covers
        every layer of your automation stack.
      </p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Features() {
  const { ref, inView } = useInView()
  const { width }       = useWindowSize()
  const isMobile        = width < 768

  // Shared active index — persists across bento↔accordion transitions
  const [activeIdx, setActiveIdx] = useState(null)

  const handleBentoHover = useCallback((idx) => {
    setActiveIdx(idx)
  }, [])

  const handleAccordionToggle = useCallback((idx) => {
    setActiveIdx(prev => (prev === idx ? null : idx))
  }, [])

  // Bento grid layout: large | small small | medium medium | small
  const BENTO_AREAS = [
    // [gridColumn, gridRow]
    'span 2', 'span 1', 'span 1', 'span 1', 'span 1', 'span 2',
  ]

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        padding: 'clamp(80px, 10vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #0B1B24, #0F2330)',
      }}
    >
      {/* Subtle mid-section blob */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(17,76,90,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }} ref={ref}>
        <SectionHeader inView={inView} />

        {/* Desktop: Bento Grid */}
        {!isMobile && (
          <div
            role="list"
            aria-label="Feature list"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            {features.map((feature, i) => (
              <div
                key={feature.id}
                role="listitem"
                style={{
                  gridColumn: BENTO_AREAS[i],
                }}
              >
                <BentoCard
                  feature={feature}
                  isActive={activeIdx === i}
                  onHover={handleBentoHover}
                  delay={0.08 * i}
                />
              </div>
            ))}
          </div>
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <div
            role="list"
            aria-label="Feature list"
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {features.map((feature, i) => (
              <div key={feature.id} role="listitem">
                <AccordionItem
                  feature={feature}
                  isOpen={activeIdx === i}
                  onToggle={() => handleAccordionToggle(i)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}