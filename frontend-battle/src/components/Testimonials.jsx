import { useRef } from 'react'
import { testimonials, socialProof } from '../data/index.js'
import { useInView } from '../hooks/useInView.js'
import { IconStar } from '../utils/icons.jsx'

// ─── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ initials, color }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '44px', height: '44px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}44, ${color}18)`,
        border: `1.5px solid ${color}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: '700',
        fontSize: '13px',
        color: color,
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </div>
  )
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }} role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} size={13} filled={i < count} />
      ))}
    </div>
  )
}

// ─── Testimonial card ─────────────────────────────────────────────────────────
const AVATAR_COLORS = ['#FFC801', '#FF9932', '#114C5A', '#FFC801', '#FF9932']

function TestimonialCard({ t, style = {} }) {
  const color = AVATAR_COLORS[t.id % AVATAR_COLORS.length]

  return (
    <article
      aria-label={`Testimonial from ${t.name}, ${t.role} at ${t.company}`}
      style={{
        width: '320px',
        flexShrink: 0,
        borderRadius: '16px',
        background: 'rgba(23,43,54,0.6)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '24px',
        transition: 'border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
        cursor: 'default',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,200,1,0.22)'
        e.currentTarget.style.transform   = 'translateY(-4px)'
        e.currentTarget.style.boxShadow   = '0 16px 48px rgba(0,0,0,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.transform   = 'translateY(0)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      <Stars count={t.rating} />

      <blockquote style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        lineHeight: '1.68',
        color: 'rgba(255,255,255,0.65)',
        margin: '16px 0 20px',
        fontStyle: 'normal',
      }}>
        "{t.text}"
      </blockquote>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar initials={t.avatar} color={color} />
        <div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '600',
            fontSize: '14px',
            color: '#fff',
            marginBottom: '2px',
          }}>{t.name}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
          }}>{t.role} · {t.company}</div>
        </div>
      </div>
    </article>
  )
}

// ─── Marquee row ──────────────────────────────────────────────────────────────
function MarqueeRow({ items, reverse = false }) {
  // Duplicate items to create seamless loop
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{
        display: 'flex',
        gap: '20px',
        width: 'max-content',
        animation: `marquee ${reverse ? '38s' : '32s'} linear infinite ${reverse ? 'reverse' : 'normal'}`,
      }}>
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

// ─── Social proof logos ───────────────────────────────────────────────────────
function SocialProofBar({ inView }) {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '64px',
      opacity: inView ? 1 : 0,
      transition: 'opacity 0.7s ease 0.2s',
    }}>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.1em',
        marginBottom: '24px',
      }}>TRUSTED BY TEAMS AT</p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px 28px',
      }}>
        {socialProof.map(name => (
          <span key={name} style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '600',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.22)',
            letterSpacing: '0.02em',
            transition: 'color 0.18s ease',
            cursor: 'default',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.22)'}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { ref, inView } = useInView()

  const row1 = testimonials.slice(0, 3)
  const row2 = testimonials.slice(2)

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      style={{
        padding: 'clamp(80px,10vw,120px) 0',
        background: 'linear-gradient(to bottom, #0B1B24, #0F2330)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background blob */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '20%', right: '-10%',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,153,50,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '52px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div style={{ marginBottom: '14px' }}>
            <span className="section-label">TESTIMONIALS</span>
          </div>
          <h2 id="testimonials-heading" className="section-title" style={{ marginBottom: '16px' }}>
            Builders who've made<br />the switch don't look back.
          </h2>
        </div>

        <SocialProofBar inView={inView} />
      </div>

      {/* Marquee rows — full width, no padding constraint */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.7s ease 0.3s',
      }}>
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

      {/* Edge fades */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
        width: '120px',
        background: 'linear-gradient(to right, #0B1B24, transparent)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: 0, bottom: 0, right: 0,
        width: '120px',
        background: 'linear-gradient(to left, #0B1B24, transparent)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}