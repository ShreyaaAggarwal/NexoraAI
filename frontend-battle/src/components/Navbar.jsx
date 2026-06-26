import { useState, useEffect, useCallback } from 'react'
import { navLinks } from '../data/index.js'
import { IconNexora, IconMenu, IconClose } from '../utils/icons.jsx'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeLink,  setActiveLink]  = useState('')

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handle = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handle, { passive: true })
    return () => window.removeEventListener('resize', handle)
  }, [])

  // Trap focus / close on Escape
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  const handleLinkClick = (href, label) => {
    setActiveLink(label)
    setMobileOpen(false)
    // smooth scroll
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 999,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        background: scrolled
          ? 'rgba(11, 27, 36, 0.88)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 4px 32px rgba(0,0,0,0.3)'
          : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Nexora AI — Home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            transition: 'opacity 0.18s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <IconNexora size={28} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: '700',
            fontSize: '17px',
            color: '#fff',
            letterSpacing: '-0.01em',
          }}>
            Nexora<span style={{ color: '#FFC801' }}>AI</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul
          role="list"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            listStyle: 'none',
          }}
          className="hidden-mobile"
        >
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-current={activeLink === link.label ? 'page' : undefined}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href, link.label) }}
                style={{
                  display: 'block',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '500',
                  fontSize: '14px',
                  color: activeLink === link.label ? '#FFC801' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.18s ease, background 0.18s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = activeLink === link.label ? '#FFC801' : 'rgba(255,255,255,0.65)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="hidden-mobile">
          <a
            href="#"
            style={{
              padding: '8px 16px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              transition: 'color 0.18s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
          >
            Sign in
          </a>
          <button
            className="btn-primary"
            style={{ padding: '9px 20px', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
            aria-label="Get started with Nexora AI"
          >
            Get started →
          </button>
        </div>

        {/* Hamburger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(o => !o)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            color: '#fff',
            borderRadius: '8px',
            transition: 'background 0.18s ease',
          }}
          className="show-mobile"
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {mobileOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        style={{
          display: mobileOpen ? 'block' : 'none',
          background: 'rgba(11,27,36,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 24px 28px',
          animation: mobileOpen ? 'slide-down 0.25s ease' : 'none',
        }}
      >
        <ul role="list" style={{ listStyle: 'none', marginBottom: '20px' }}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href, link.label) }}
                style={{
                  display: 'block',
                  padding: '13px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '500',
                  fontSize: '16px',
                  color: activeLink === link.label ? '#FFC801' : 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.18s ease',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="btn-primary"
          style={{ width: '100%', padding: '13px', fontSize: '15px', fontFamily: "'Inter', sans-serif" }}
          aria-label="Get started with Nexora AI"
        >
          Get started →
        </button>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile   { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}