// ─── Pricing Matrix ────────────────────────────────────────────────────────
// Never hardcode prices in UI. All values derived from this matrix.
export const pricingMatrix = {
  basePrices: {
    starter:    10,
    pro:        39,
    enterprise: 99,
  },
  // Annual discount multiplier
  annualMultiplier: 0.8,
  // Regional tariff multipliers relative to USD
  currencyConfig: {
    USD: { symbol: '$', multiplier: 1,    label: 'USD' },
    EUR: { symbol: '€', multiplier: 0.92, label: 'EUR' },
    INR: { symbol: '₹', multiplier: 83.5, label: 'INR' },
  },
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'For individuals and small teams',
      features: [
        '5,000 automations / mo',
        '10 active workflows',
        '3 AI models',
        'Community support',
        'Basic analytics',
        'REST API access',
      ],
      cta: 'Start free trial',
      highlight: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'For scaling teams that move fast',
      features: [
        '100,000 automations / mo',
        'Unlimited workflows',
        'All AI models',
        'Priority support',
        'Advanced analytics',
        'Webhooks + MCP integrations',
        'Custom triggers',
        'Team workspace',
      ],
      cta: 'Start Pro trial',
      highlight: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Custom infrastructure, custom contracts',
      features: [
        'Unlimited automations',
        'Unlimited workflows',
        'Dedicated AI cluster',
        '24/7 dedicated support',
        'Full audit logs',
        'SSO & SCIM',
        'On-prem deployment',
        'SLA guarantee',
        'Custom contracts',
      ],
      cta: 'Contact sales',
      highlight: false,
    },
  ],
}

// ─── Features ──────────────────────────────────────────────────────────────
export const features = [
  {
    id: 'orchestration',
    title: 'Real-time Orchestration',
    description:
      'Route billions of events per day across any system with sub-15ms median latency. Nexora\'s streaming engine adapts topology in real time.',
    icon: 'orchestration',
    size: 'large',  // bento sizing hint
    accent: '#FFC801',
  },
  {
    id: 'models',
    title: 'Model-Agnostic AI',
    description:
      'Connect GPT-4, Claude, Gemini, Llama, or your private fine-tuned model. Switch providers without touching a single workflow.',
    icon: 'models',
    size: 'small',
    accent: '#FF9932',
  },
  {
    id: 'nocode',
    title: 'Visual Flow Builder',
    description:
      'Drag-and-drop canvas for non-engineers. Production-grade logic, zero YAML.',
    icon: 'nocode',
    size: 'small',
    accent: '#114C5A',
  },
  {
    id: 'analytics',
    title: 'Observability Suite',
    description:
      'End-to-end tracing, latency histograms, token cost accounting, and anomaly alerts — all in one dashboard.',
    icon: 'analytics',
    size: 'medium',
    accent: '#FFC801',
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II, GDPR, ISO 27001. Zero-knowledge encryption at rest and in transit. Private VPC deployments available.',
    icon: 'security',
    size: 'medium',
    accent: '#FF9932',
  },
  {
    id: 'integrations',
    title: '150+ Integrations',
    description:
      'Slack, Salesforce, Notion, GitHub, Stripe, and 145 more. One-click auth, instant data sync.',
    icon: 'integrations',
    size: 'small',
    accent: '#114C5A',
  },
]

// ─── Testimonials ──────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'VP Engineering',
    company: 'Prismatic Labs',
    avatar: 'SC',
    rating: 5,
    text: 'Nexora cut our data pipeline build time by 70%. What used to take three engineers two weeks now takes one engineer two hours. The state isolation on the pricing engine alone is architecture worth studying.',
  },
  {
    id: 2,
    name: 'Marcus Odinaka',
    role: 'CTO',
    company: 'Helios Finance',
    avatar: 'MO',
    rating: 5,
    text: 'We process 4.2 billion events daily through Nexora. It hasn\'t missed a beat. The sub-15ms latency isn\'t marketing — we\'ve measured it ourselves across three continents.',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Head of AI',
    company: 'Tandem Health',
    avatar: 'PS',
    rating: 5,
    text: 'Switching AI model providers used to mean a two-day migration. With Nexora\'s model-agnostic layer, we swapped from GPT-4 to Claude in 20 minutes — no workflow changes at all.',
  },
  {
    id: 4,
    name: 'James Whitfield',
    role: 'Staff Engineer',
    company: 'Orbit Commerce',
    avatar: 'JW',
    rating: 5,
    text: 'The bento grid UI in their own product sold us before we even tried it. Then we found out the codebase behind it is just as clean. Rare combination.',
  },
  {
    id: 5,
    name: 'Aiko Tanaka',
    role: 'Founding Engineer',
    company: 'Vaultline',
    avatar: 'AT',
    rating: 5,
    text: 'SOC 2 compliance used to be a quarterly panic. Nexora\'s audit logs and zero-knowledge encryption have made our security reviews genuinely calm.',
  },
]

// ─── Logos / social proof ──────────────────────────────────────────────────
export const socialProof = [
  'Prismatic Labs', 'Helios Finance', 'Tandem Health',
  'Orbit Commerce', 'Vaultline', 'Meridian AI',
  'Cascade Systems', 'Fluxpoint', 'Ardent Analytics',
]

// ─── Nav links ─────────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Product',      href: '#features' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Docs',         href: '#' },
]

// ─── Footer columns ────────────────────────────────────────────────────────
export const footerLinks = {
  Product:   ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Status'],
  Developers:['Documentation', 'API Reference', 'SDK', 'MCP Server', 'GitHub'],
  Company:   ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal:     ['Privacy', 'Terms', 'Security', 'Cookie Policy'],
}