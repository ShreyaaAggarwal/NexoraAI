import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Typed headline ──────────────────────────────────────────────────────────
function TypedWord() {
  const words = ['Automate.', 'Orchestrate.', 'Dominate.']
  const [wordIdx,  setWordIdx]  = useState(0)
  const [charIdx,  setCharIdx]  = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let delay = deleting
      ? (charIdx > 0 ? 40 : 0)
      : (charIdx < word.length ? 70 : 1800)

    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setCharIdx(c => c - 1)
      } else {
        setDeleting(false)
        setWordIdx(i => (i + 1) % words.length)
      }
    }, delay)

    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx])

  return (
    <span
      className="gradient-text"
      aria-live="polite"
      aria-label={words[wordIdx]}
    >
      {words[wordIdx].slice(0, charIdx)}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '3px',
          height: '0.85em',
          background: '#FFC801',
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'cursor-blink 1s step-end infinite',
        }}
      />
    </span>
  )
}

// ─── Live dashboard card ─────────────────────────────────────────────────────
const PIPELINE = [
  { label: 'Ingest',  pct: 100, color: '#FFC801' },
  { label: 'Parse',   pct: 84,  color: '#FF9932' },
  { label: 'Route',   pct: 67,  color: '#114C5A' },
  { label: 'Execute', pct: 92,  color: '#FFC801' },
]

const NODES = [
  { x: 18, y: 32 }, { x: 50, y: 14 }, { x: 82, y: 32 },
  { x: 34, y: 62 }, { x: 66, y: 62 },
]
const EDGES = [[0,1],[1,2],[0,3],[3,4],[2,4],[1,3],[1,4]]

function DashboardCard() {
  const [tick,  setTick]  = useState(0)
  const [evps,  setEvps]  = useState(48291)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const id = setInterval(() => {
      setTick(t => t + 1)
      setEvps(v => Math.max(40000, v + Math.floor(Math.random() * 120 - 40)))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  const activeNode = tick % NODES.length

  return (
    <div
      role="img"
      aria-label="Live AI pipeline dashboard showing real-time processing metrics"
      style={{
        width: 'min(340px, 90vw)',
        borderRadius: '20px',
        background: 'rgba(15,35,48,0.88)',
        border: '1px solid rgba(255,200,1,0.14)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset',
        overflow: 'hidden',
        position: 'relative',
        animation: loaded ? 'float-card 6s ease-in-out infinite' : 'none',
      }}
    >
      {/* Scan line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255,200,1,0.5), transparent)',
          animation: 'scan-line 3s linear infinite',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '8px', height: '8px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 6px #22c55e',
            }} />
            <div style={{
              position: 'absolute', inset: '-4px',
              borderRadius: '50%',
              border: '1px solid #22c55e',
              animation: 'pulse-ring 1.8s ease-out infinite',
            }} />
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#9FBAAF',
            letterSpacing: '0.1em',
          }}>PIPELINE · LIVE</span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#FFC801',
          fontWeight: '600',
        }}>
          {evps.toLocaleString()} ev/s
        </span>
      </div>

      {/* Node graph */}
      <div style={{ padding: '14px 18px 8px' }}>
        <svg viewBox="0 0 100 80" style={{ width: '100%', height: '76px' }} aria-hidden="true">
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.7"
            />
          ))}
          {NODES.map((n, i) => {
            const isActive = i === activeNode
            return (
              <g key={i}>
                <circle
                  cx={n.x} cy={n.y} r="4.5"
                  fill={isActive ? '#FFC801' : 'rgba(255,255,255,0.08)'}
                  stroke={isActive ? '#FFC801' : 'rgba(255,255,255,0.14)'}
                  strokeWidth="0.8"
                  style={{
                    transition: 'fill 0.4s ease, stroke 0.4s ease',
                    animation: `node-pulse ${1.8 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
                {isActive && (
                  <circle cx={n.x} cy={n.y} r="8"
                    fill="none"
                    stroke="#FFC801"
                    strokeWidth="0.6"
                    opacity="0.4"
                    style={{ animation: 'pulse-ring 1.4s ease-out infinite' }}
                  />
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Bars */}
      <div style={{ padding: '0 18px 14px' }}>
        {PIPELINE.map((step, i) => (
          <div key={step.label} style={{ marginBottom: '9px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: '#9FBAAF',
                letterSpacing: '0.06em',
              }}>{step.label}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: step.color,
              }}>{step.pct}%</span>
            </div>
            <div style={{
              height: '3px', borderRadius: '2px',
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                borderRadius: '2px',
                background: step.color,
                width: `${step.pct}%`,
                '--w': `${step.pct}%`,
                animation: `bar-grow 1.2s ease ${0.8 + i * 0.12}s both`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)',
        }}>Avg. orchestration</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '14px',
          fontWeight: '700',
          color: '#FFC801',
        }}>11.2ms</span>
      </div>
    </div>
  )
}

// ─── Stat pill ───────────────────────────────────────────────────────────────
function StatPill({ value, label, delay }) {
  return (
    <div style={{
      padding: '14px 16px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      opacity: 0,
      animation: `fade-up 0.6s ease ${delay}s forwards`,
      transition: 'transform 0.18s ease, border-color 0.18s ease',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = 'rgba(255,200,1,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '22px',
        fontWeight: '700',
        color: '#FFC801',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        marginBottom: '4px',
      }}>{value}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)',
        fontWeight: '500',
      }}>{label}</div>
    </div>
  )
}

const STATS = [
  { value: '99.97%', label: 'Uptime SLA' },
  { value: '11.2ms', label: 'Avg. Latency' },
  { value: '4.2B+',  label: 'Events / day' },
  { value: '150+',   label: 'Integrations' },
]

const BADGES = ['SOC 2 Type II', 'GDPR Ready', 'ISO 27001', 'Zero Trust']

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Nexora AI — Hero"
      style={{
        minHeight: '100vh',
        background: '#0B1B24',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '80px',
      }}
    >
      {/* Grid */}
      <div aria-hidden="true" className="bg-grid" style={{
        position: 'absolute', inset: 0,
        opacity: 0,
        animation: 'fade-in 1.8s ease 0.3s forwards',
      }} />

      {/* Blobs */}
      <div aria-hidden="true">
        <div className="blob-a" style={{
          position: 'absolute', top: '-12%', left: '-8%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,1,0.16) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        <div className="blob-b" style={{
          position: 'absolute', bottom: '-18%', right: '-10%',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,153,50,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div className="blob-c" style={{
          position: 'absolute', top: '35%', left: '38%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(17,76,90,0.28) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 60px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
      }}>

        {/* Left */}
        <div style={{ flex: '1 1 480px', maxWidth: '580px' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(255,200,1,0.07)',
            border: '1px solid rgba(255,200,1,0.22)',
            marginBottom: '28px',
            opacity: 0,
            animation: 'fade-up 0.6s ease 0.05s forwards',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#FFC801',
              boxShadow: '0 0 6px #FFC801',
            }} />
            <span className="section-label" style={{ fontSize: '10px' }}>
              NOW IN PUBLIC BETA
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '800',
            fontSize: 'clamp(40px, 6vw, 74px)',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            color: '#fff',
            marginBottom: '12px',
            opacity: 0,
            animation: 'fade-up 0.65s ease 0.15s forwards',
          }}>
            The intelligence<br />layer your workflows<br />deserve.
          </h1>

          {/* Typed */}
          <div style={{
            fontSize: 'clamp(24px, 3.5vw, 42px)',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            fontFamily: "'JetBrains Mono', monospace",
            minHeight: '56px',
            marginBottom: '22px',
            opacity: 0,
            animation: 'fade-up 0.65s ease 0.28s forwards',
          }}>
            <TypedWord />
          </div>

          {/* Subtitle */}
          <p className="section-sub" style={{
            marginBottom: '36px',
            opacity: 0,
            animation: 'fade-up 0.65s ease 0.38s forwards',
          }}>
            Nexora AI connects every system, model, and workflow into a single
            real-time automation fabric — processing billions of events with
            sub-15ms precision.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '40px',
            opacity: 0,
            animation: 'fade-up 0.65s ease 0.48s forwards',
          }}>
            <button
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '15px', fontFamily: "'Inter', sans-serif" }}
              aria-label="Start building with Nexora AI for free"
            >
              Start building free →
            </button>
            <button
              className="btn-ghost"
              style={{ padding: '14px 28px', fontSize: '15px', fontFamily: "'Inter', sans-serif" }}
              aria-label="Watch the Nexora AI product demo"
            >
              ▶ Watch demo
            </button>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '40px',
            opacity: 0,
            animation: 'fade-up 0.65s ease 0.56s forwards',
          }}>
            {BADGES.map(b => (
              <span key={b} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.07em',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>{b}</span>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}>
            {STATS.map((s, i) => (
              <StatPill key={s.label} {...s} delay={0.62 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* Right — dashboard */}
        <div style={{
          flex: '0 1 380px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          opacity: 0,
          animation: 'fade-up 0.8s ease 0.55s forwards',
        }}>
          {/* Halo */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            width: '340px', height: '340px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,200,1,0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }} />
          <DashboardCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-label="Scroll down"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0,
          animation: 'fade-in 1s ease 1.4s forwards',
          zIndex: 3,
        }}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
        }}>SCROLL</span>
        <div style={{
          width: '20px', height: '32px',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '5px',
        }}>
          <div style={{
            width: '4px', height: '8px',
            borderRadius: '2px',
            background: 'rgba(255,200,1,0.6)',
            animation: 'scroll-dot 1.8s ease infinite',
          }} />
        </div>
      </div>

      {/* Bottom fade */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '140px',
        background: 'linear-gradient(to bottom, transparent, #0B1B24)',
        zIndex: 3,
      }} />

      <style>{`
        @keyframes cursor-blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes bar-grow {
          from { width: 0; }
          to   { width: var(--w); }
        }
        @keyframes node-pulse {
          0%,100% { opacity: 0.35; }
          50%     { opacity: 1; }
        }
        @keyframes float-card {
          0%,100% { transform: translateY(0px) rotate(0.5deg); }
          50%     { transform: translateY(-14px) rotate(0.5deg); }
        }
        @keyframes scan-line {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes scroll-dot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        @media (max-width: 640px) {
          #hero > div:nth-child(3) > div:first-child {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  )
}