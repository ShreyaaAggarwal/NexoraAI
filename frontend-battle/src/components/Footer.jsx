import { footerLinks } from '../data/index.js';
import { IconNexora, IconGithub, IconTwitter, IconLinkedIn } from '../utils/icons.jsx';

var socialLinks = [
  { icon: IconGithub,   href: '#', label: 'GitHub'   },
  { icon: IconTwitter,  href: '#', label: 'Twitter'  },
  { icon: IconLinkedIn, href: '#', label: 'LinkedIn' },
];

function hoverSocial(e) {
  e.currentTarget.style.background  = 'rgba(255,200,1,0.12)';
  e.currentTarget.style.borderColor = 'rgba(255,200,1,0.5)';
  e.currentTarget.style.color       = '#FFC801';
}
function leaveSocial(e) {
  e.currentTarget.style.background  = 'rgba(255,255,255,0.04)';
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
  e.currentTarget.style.color       = '#9BA8B4';
}
function hoverLink(e) {
  e.currentTarget.style.color       = '#FFC801';
  e.currentTarget.style.paddingLeft = '6px';
}
function leaveLink(e) {
  e.currentTarget.style.color       = '#9BA8B4';
  e.currentTarget.style.paddingLeft = '0px';
}
function hoverBtn(e) {
  e.currentTarget.style.background  = 'rgba(255,200,1,0.15)';
  e.currentTarget.style.borderColor = 'rgba(255,200,1,0.6)';
  e.currentTarget.style.color       = '#FFC801';
}
function leaveBtn(e) {
  e.currentTarget.style.background  = 'rgba(255,255,255,0.04)';
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
  e.currentTarget.style.color       = '#9BA8B4';
}

function renderSocial(item) {
  var Icon = item.icon;
  return (
    <a
      key={item.label}
      href={item.href}
      aria-label={item.label}
      style={styles.socialBtn}
      onMouseEnter={hoverSocial}
      onMouseLeave={leaveSocial}
    >
      <Icon size={16} color="currentColor" />
    </a>
  );
}

function getHref(category, link) {
  if (category === 'Product' && link === 'Features') { return '#features'; }
  if (category === 'Product' && link === 'Pricing')  { return '#pricing';  }
  return '#footer';
}

function renderLink(category, link) {
  return (
    <li key={link}>
      <a
        href={getHref(category, link)}
        style={styles.footerLink}
        onMouseEnter={hoverLink}
        onMouseLeave={leaveLink}
      >
        {link}
      </a>
    </li>
  );
}

function renderColumn(entry) {
  var category = entry[0];
  var links    = entry[1];
  return (
    <div key={category} style={styles.linkCol}>
      <h3 style={styles.colHeading}>{category}</h3>
      <ul style={styles.linkList}>
        {links.map(function(link) { return renderLink(category, link); })}
      </ul>
    </div>
  );
}

function handleBackToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer id="footer" style={styles.footer}>
      <div style={styles.topBorder} />

      <div style={styles.inner}>

        <div style={styles.brand}>
          <a href="#hero" style={styles.logoLink} onClick={handleBackToTop}>
            <IconNexora size={28} />
            <span style={styles.logoText}>Nexora</span>
          </a>
          <p style={styles.tagline}>
            Real-time AI orchestration for teams that move fast.
            Route billions of events with sub-15ms latency, no YAML required.
          </p>
          <div style={styles.socials}>
            {socialLinks.map(renderSocial)}
          </div>
        </div>

        <nav style={styles.linkGrid} aria-label="Footer navigation">
          {Object.entries(footerLinks).map(renderColumn)}
        </nav>

      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          2025 Nexora, Inc. All rights reserved.
        </p>
        <button
          onClick={handleBackToTop}
          style={styles.backToTop}
          aria-label="Back to top"
          onMouseEnter={hoverBtn}
          onMouseLeave={leaveBtn}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}

var styles = {
  footer: {
    position: 'relative',
    background: 'rgba(17,27,34,0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '0 clamp(1.25rem, 5vw, 5rem)',
    fontFamily: 'Inter, sans-serif',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,200,1,0.4), transparent)',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 0 2.5rem',
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 280px) 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#F1F6F4',
    letterSpacing: '0.04em',
  },
  tagline: {
    fontSize: '0.825rem',
    lineHeight: 1.7,
    color: '#6B7A85',
    margin: 0,
    maxWidth: '260px',
  },
  socials: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: '#9BA8B4',
    textDecoration: 'none',
    transition: 'all 0.18s ease-out',
    cursor: 'pointer',
  },
  linkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  colHeading: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#FFC801',
    margin: 0,
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
  },
  footerLink: {
    fontSize: '0.825rem',
    color: '#9BA8B4',
    textDecoration: 'none',
    transition: 'color 0.18s ease-out, padding-left 0.18s ease-out',
    display: 'inline-block',
  },
  bottomBar: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.25rem 0 2rem',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  copyright: {
    fontSize: '0.775rem',
    color: '#4A5568',
    margin: 0,
  },
  backToTop: {
    fontSize: '0.775rem',
    color: '#9BA8B4',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    padding: '0.4rem 0.9rem',
    cursor: 'pointer',
    transition: 'all 0.18s ease-out',
    fontFamily: 'JetBrains Mono, monospace',
    letterSpacing: '0.04em',
  },
};