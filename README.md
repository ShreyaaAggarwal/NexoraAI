# NexoraAI ⚡

A premium AI automation platform landing page built for **Frontend Battle Round 1** hackathon.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🔗 Links

- **Live Demo:** [NexoiraAI](https://nexora-cq92puxfu-shreyaaaggarwals-projects.vercel.app/)
- **GitHub:** [Repository Link](https://github.com/ShreyaaAggarwal/NexoraAI)

---

## 🚀 What is this?

NexoraAI is a responsive SaaS landing page for a fictional AI data automation platform. Built in a timed competition (4 hours), it includes dynamic pricing, a bento grid feature section, glassmorphism UI, and smooth animations — all without any external UI or animation libraries.

---

## ✨ Key Features

- **Dynamic Pricing** — Monthly/Annual toggle + USD, EUR, INR currency switcher. Prices calculated from a data matrix, nothing hardcoded.
- **Bento Grid → Accordion** — Features shown as a bento grid on desktop. On mobile it converts to an accordion. Active state is preserved on resize.
- **Glassmorphism UI** — Dark futuristic theme with frosted glass effects throughout.
- **Scroll Animations** — Elements animate in as you scroll using IntersectionObserver.
- **Fully Responsive** — Works on mobile, tablet, and desktop.
- **No banned libraries** — All animations and components written from scratch (competition rule).

---

## 🛠️ Tech Stack

- React + Vite
- Vanilla CSS (no Tailwind, no UI libraries)
- Custom hooks — `useInView`, `useWindowSize`
- Pure SVG icons (no icon library)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Features.jsx
│   ├── Pricing.jsx
│   ├── Testimonials.jsx
│   └── Footer.jsx
├── data/
│   └── index.js       # all content + pricing matrix
├── hooks/
│   ├── useInView.js
│   └── useWindowSize.js
├── utils/
│   ├── pricing.js
│   └── icons.jsx
├── App.jsx
└── index.css
```

---

## 🏃 Running Locally

```bash
git clone https://github.com/your-username/nexoraai.git
cd nexoraai/frontend-battle
npm install
npm run dev
```

---

## 👤 Author

**Your Name** — [GitHub](#) · [LinkedIn](#)

> Built for Frontend Battle Round 1, June 2026
