import { useState, useCallback, memo } from 'react'
import { pricingMatrix } from '../data/index.js'
import { computePrice }  from '../utils/pricing.js'
import { useInView }     from '../hooks/useInView.js'
import { IconCheck }     from '../utils/icons.jsx'

// ─── Price display — isolated, memo'd so only it re-renders on currency/billing change
const PriceDisplay = memo(function PriceDisplay({ planId, currency, billing }) {
  const price = computePrice(planId, currency, billing)
  return (
    <div aria-live="polite" aria-atomic="true">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', marginBottom: '4px' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '20px',
          fontWeight: '600',
          color: 'rgba(255,255,255,0.6)',
          marginTop: '6px',
        }}>{price.symbol}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '48px',
          fontWeight: '700',
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}>{price.amount}</span>
      </div>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        color: 'rgba(255,255,255,0.38)',
      }}>{price.perPeriod}</span>
    </div>
  )
})

// ─── Currency selector — isolated
const CurrencySelector = memo(function CurrencySelector({ currency, onChange }) {
  const currencies = Object.keys(pricingMatrix.currencyConfig)
  return (
    <div
      role="group"
      aria-label="Select currency"
      style={{ display: 'flex', gap: '4px' }}
    >
      {currencies.map(c => (
        <button
          key={c}
          aria-pressed={currency === c}
          onClick={() => onChange(c)}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            border: currency === c
              ? '1px solid rgba(255,200,1,0.4)'
              : '1px solid rgba(255,255,255,0.1)',
            background: currency === c
              ? 'rgba(255,200,1,0.1)'
              : 'transparent',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            fontWeight: '600',
            color: currency === c ? '#FFC801' : 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
          }}
        >
          {pricingMatrix.currencyConfig[c].symbol} {c}
        </button>
      ))}
    </div>
  )
})

// ─── Billing toggle — isolated
const BillingToggle = memo(function BillingToggle({ billing, onChange }) {
  const isAnnual = billing === 'annual'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: !isAnnual ? '#fff' : 'rgba(255,255,255,0.45)',
        fontWeight: !isAnnual ? '600' : '400',
        transition: 'color 0.18s ease',
      }}>Monthly</span>

      <button
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing for 20% discount"
        onClick={() => onChange(isAnnual ? 'monthly' : 'annual')}
        className={`toggle-track ${isAnnual ? 'active' : ''}`}
      >
        <div className="toggle-thumb" />
      </button>

      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: isAnnual ? '#fff' : 'rgba(255,255,255,0.45)',
        fontWeight: isAnnual ? '600' : '400',
        transition: 'color 0.18s ease',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        Annual
        {isAnnual && (
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: '700',
            color: '#0B1B24',
            background: '#FFC801',
            padding: '2px 8px',
            borderRadius: '999px',
            letterSpacing: '0.05em',
          }}>SAVE 20%</span>
        )}
      </span>
    </div>
  )
})

// ─── Single plan card
function PlanCard({ plan, currency, billing, inView, delay }) {
  const isHighlight = plan.highlight

  return (
    <div
      aria-label={`${plan.name} plan`}
      style={{
        borderRadius: '20px',
        border: isHighlight
          ? '1px solid rgba(255,200,1,0.3)'
          : '1px solid rgba(255,255,255,0.07)',
        background: isHighlight
          ? 'rgba(255,200,1,0.05)'
          : 'rgba(23,43,54,0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s, border-color 0.22s ease, box-shadow 0.22s ease`,
        boxShadow: isHighlight
          ? '0 0 0 1px rgba(255,200,1,0.12), 0 20px 60px rgba(0,0,0,0.4)'
          : 'none',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        if (!isHighlight) {
          e.currentTarget.style.borderColor = 'rgba(255,200,1,0.18)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.3)'
        } else {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 20px 64px rgba(255,200,1,0.12), 0 0 0 1px rgba(255,200,1,0.2)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = isHighlight
          ? 'rgba(255,200,1,0.3)'
          : 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = isHighlight
          ? '0 0 0 1px rgba(255,200,1,0.12), 0 20px 60px rgba(0,0,0,0.4)'
          : 'none'
      }}
    >
      {/* Highlight badge */}
      {isHighlight && (
        <div style={{
          position: 'absolute',
          top: '20px', right: '20px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          fontWeight: '700',
          letterSpacing: '0.1em',
          color: '#0B1B24',
          background: '#FFC801',
          padding: '4px 10px',
          borderRadius: '999px',
        }}>MOST POPULAR</div>
      )}

      {/* Glow */}
      {isHighlight && (
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: '-60px', right: '-60px',
          width: '200px', height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,1,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Plan name */}
      <div style={{ marginBottom: '8px' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          color: isHighlight ? '#FFC801' : 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
        }}>{plan.name}</span>
      </div>

      {/* Price — only this rerenders on currency/billing change */}
      <div style={{ marginBottom: '8px' }}>
        <PriceDisplay planId={plan.id} currency={currency} billing={billing} />
      </div>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: '24px',
        lineHeight: 1.5,
      }}>{plan.tagline}</p>

      {/* CTA */}
      <button
        className={isHighlight ? 'btn-primary' : 'btn-ghost'}
        style={{
          width: '100%',
          padding: '13px',
          fontSize: '14px',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '28px',
        }}
        aria-label={`${plan.cta} for ${plan.name} plan`}
      >
        {plan.cta}
      </button>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: isHighlight ? 'rgba(255,200,1,0.12)' : 'rgba(255,255,255,0.06)',
        marginBottom: '24px',
      }} />

      {/* Features */}
      <ul role="list" style={{ listStyle: 'none', flex: 1 }}>
        {plan.features.map(f => (
          <li key={f} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            marginBottom: '12px',
          }}>
            <div style={{
              width: '18px', height: '18px',
              borderRadius: '50%',
              background: isHighlight ? 'rgba(255,200,1,0.15)' : 'rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '1px',
            }}>
              <IconCheck size={10} color={isHighlight ? '#FFC801' : '#9FBAAF'} />
            </div>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: 'rgba(255,255,255,0.58)',
              lineHeight: 1.5,
            }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Pricing section ──────────────────────────────────────────────────────────
export default function Pricing() {
  const { ref, inView } = useInView()

  // CRITICAL: currency and billing are separate state slices.
  // Changing currency ONLY re-renders PriceDisplay via memo isolation.
  // No parent reflow on toggle.
  const [currency, setCurrency] = useState('USD')
  const [billing,  setBilling]  = useState('monthly')

  const handleCurrency = useCallback((c) => setCurrency(c), [])
  const handleBilling  = useCallback((b) => setBilling(b), [])

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{
        padding: 'clamp(80px,10vw,120px) 24px',
        background: 'linear-gradient(to bottom, #0F2330, #0B1B24)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: '-10%', left: '50%',
        transform: 'translateX(-50%)',
        width: '900px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,200,1,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }} ref={ref}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '52px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div style={{ marginBottom: '14px' }}>
            <span className="section-label">PRICING</span>
          </div>
          <h2
            id="pricing-heading"
            className="section-title"
            style={{ marginBottom: '16px' }}
          >
            Simple pricing.<br />Powerful at every tier.
          </h2>
          <p className="section-sub" style={{ margin: '0 auto 36px' }}>
            No surprises. Scale from prototype to production on a plan
            that matches where you are.
          </p>

          {/* Controls */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}>
            <BillingToggle billing={billing} onChange={handleBilling} />
            <div style={{
              width: '1px', height: '24px',
              background: 'rgba(255,255,255,0.1)',
            }} aria-hidden="true" />
            <CurrencySelector currency={currency} onChange={handleCurrency} />
          </div>
        </div>

        {/* Plan cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'stretch',
        }}>
          {pricingMatrix.plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currency={currency}
              billing={billing}
              inView={inView}
              delay={0.1 + i * 0.1}
            />
          ))}
        </div>

        {/* Footnote */}
        <p style={{
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: 'rgba(255,255,255,0.28)',
          marginTop: '36px',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease 0.5s',
        }}>
          All plans include a 14-day free trial. No credit card required.
          Enterprise billing available in all currencies.
        </p>
      </div>
    </section>
  )
}