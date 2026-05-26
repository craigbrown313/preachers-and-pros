import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
const C = {
  bg: "#08131D",
  bg2: "#13212E",
  teal: "#4FD1C5",
  white: "#F5F7FA",
  gray: "#AEB8C2",
  dark: "#050E16",
};

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: #08131D;
      color: #F5F7FA;
      font-family: 'Manrope', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #08131D; }
    ::-webkit-scrollbar-thumb { background: #4FD1C5; border-radius: 2px; }

    .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }

    .fade-in {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .parallax-bg {
      background-attachment: fixed;
      background-size: cover;
      background-position: center;
    }

    @media (max-width: 768px) {
      .parallax-bg { background-attachment: scroll; }
    }

    /* Nav */
    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
    .nav-blur {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(8,19,29,0.85);
      border-bottom: 1px solid rgba(79,209,197,0.08);
    }

    /* Hero gradient */
    .hero-overlay {
      background: linear-gradient(
        to bottom,
        rgba(8,19,29,0.3) 0%,
        rgba(8,19,29,0.2) 40%,
        rgba(8,19,29,0.85) 80%,
        rgba(8,19,29,1) 100%
      );
    }

    /* Teal glow */
    .teal-glow { box-shadow: 0 0 32px rgba(79,209,197,0.25); }
    .teal-text { color: #4FD1C5; }

    /* Cards */
    .episode-card {
      background: #13212E;
      border: 1px solid rgba(79,209,197,0.1);
      border-radius: 2px;
      overflow: hidden;
      transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
      cursor: pointer;
    }
    .episode-card:hover {
      transform: translateY(-6px);
      border-color: rgba(79,209,197,0.4);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(79,209,197,0.1);
    }
    .episode-card:hover .card-thumb { transform: scale(1.04); }
    .card-thumb { transition: transform 0.6s ease; }

    /* Merch card */
    .merch-card {
      background: #13212E;
      border: 1px solid rgba(174,184,194,0.1);
      border-radius: 2px;
      overflow: hidden;
      transition: transform 0.4s ease, border-color 0.3s ease;
    }
    .merch-card:hover {
      transform: translateY(-4px);
      border-color: rgba(79,209,197,0.3);
    }

    /* Btn primary */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #4FD1C5;
      color: #08131D;
      font-family: 'Manrope', sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 14px 28px;
      border: none;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    }
    .btn-primary:hover {
      background: #38B2AC;
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(79,209,197,0.3);
    }

    /* Btn outline */
    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: #F5F7FA;
      font-family: 'Manrope', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 13px 28px;
      border: 1px solid rgba(245,247,250,0.35);
      cursor: pointer;
      transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
    }
    .btn-outline:hover {
      border-color: #4FD1C5;
      color: #4FD1C5;
      background: rgba(79,209,197,0.06);
    }

    /* Section label */
    .section-label {
      font-family: 'Manrope', sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #4FD1C5;
    }

    /* Divider */
    .teal-divider {
      width: 40px;
      height: 2px;
      background: #4FD1C5;
      margin: 16px 0;
    }

    /* Form */
    .form-input {
      width: 100%;
      background: rgba(19,33,46,0.8);
      border: 1px solid rgba(174,184,194,0.2);
      color: #F5F7FA;
      font-family: 'Manrope', sans-serif;
      font-size: 14px;
      padding: 14px 18px;
      outline: none;
      transition: border-color 0.3s ease;
      border-radius: 1px;
    }
    .form-input:focus { border-color: #4FD1C5; }
    .form-input::placeholder { color: #AEB8C2; }

    /* Logo mark */
    .logo-mark {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1.5px solid #4FD1C5;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(79,209,197,0.06);
      flex-shrink: 0;
    }

    /* Video placeholder */
    .video-placeholder {
      background: linear-gradient(135deg, #08131D 0%, #13212E 50%, #0a1822 100%);
      position: relative;
      overflow: hidden;
    }
    .video-placeholder::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 30% 50%, rgba(79,209,197,0.04) 0%, transparent 60%);
    }

    /* Play button */
    .play-btn {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 2px solid rgba(79,209,197,0.6);
      background: rgba(79,209,197,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
    }
    .play-btn:hover {
      border-color: #4FD1C5;
      background: rgba(79,209,197,0.2);
      transform: scale(1.08);
    }

    /* Mobile nav */
    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(8,19,29,0.98);
      z-index: 99;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 32px;
      backdrop-filter: blur(20px);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .grain-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      pointer-events: none;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 128px 128px;
    }

    /* Stat number */
    .stat-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(40px, 6vw, 72px);
      color: #4FD1C5;
      line-height: 1;
    }

    /* Social icon */
    .social-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px;
      background: #13212E;
      border: 1px solid rgba(174,184,194,0.1);
      border-radius: 2px;
      transition: border-color 0.3s ease, background 0.3s ease;
      cursor: pointer;
      text-decoration: none;
      color: #F5F7FA;
    }
    .social-pill:hover {
      border-color: rgba(79,209,197,0.4);
      background: rgba(19,33,46,0.8);
    }

    /* Timeline line */
    .timeline-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #4FD1C5;
      flex-shrink: 0;
      box-shadow: 0 0 12px rgba(79,209,197,0.5);
    }

    @keyframes pulse-teal {
      0%, 100% { box-shadow: 0 0 12px rgba(79,209,197,0.4); }
      50% { box-shadow: 0 0 24px rgba(79,209,197,0.7); }
    }
    .pulse { animation: pulse-teal 2.5s ease-in-out infinite; }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .hero-title-line {
      overflow: hidden;
      display: block;
    }
    .hero-title-text {
      display: block;
      transform: translateY(100%);
      animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .hero-title-text.d1 { animation-delay: 0.2s; }
    .hero-title-text.d2 { animation-delay: 0.4s; }
    .hero-title-text.d3 { animation-delay: 0.6s; }
    .hero-sub { opacity: 0; animation: fadeUp 0.8s ease 0.9s forwards; }
    .hero-btns { opacity: 0; animation: fadeUp 0.8s ease 1.1s forwards; }

    @keyframes slideUp {
      to { transform: translateY(0); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Scroll indicator */
    @keyframes scrollBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(6px); }
    }
    .scroll-indicator { animation: scrollBounce 2s ease-in-out infinite; }

    /* Quote block */
    .quote-mark {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 120px;
      color: rgba(79,209,197,0.08);
      line-height: 0.7;
      user-select: none;
    }
  `}</style>
);

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── SVG ICONS ──────────────────────────────────────────────────────────────
const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const TiktokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.94a8.17 8.17 0 004.77 1.52V7.01a4.85 4.85 0 01-1-.32z"/>
  </svg>
);
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="9" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ─── GOLF SCENE SVG ─────────────────────────────────────────────────────────
const GolfScene = ({ style = {} }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", ...style }}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050E16"/>
        <stop offset="60%" stopColor="#0D1F2D"/>
        <stop offset="100%" stopColor="#13212E"/>
      </linearGradient>
      <linearGradient id="fairway" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0D2818"/>
        <stop offset="100%" stopColor="#0A1F12"/>
      </linearGradient>
      <linearGradient id="light1" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#4FD1C5" stopOpacity="0.08"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
      <radialGradient id="sunGlow" cx="0.7" cy="0.25">
        <stop offset="0%" stopColor="#4FD1C5" stopOpacity="0.12"/>
        <stop offset="50%" stopColor="#4FD1C5" stopOpacity="0.04"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <filter id="blur4">
        <feGaussianBlur stdDeviation="4"/>
      </filter>
      <filter id="blur2">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
    </defs>
    <rect width="1200" height="700" fill="url(#sky)"/>
    <ellipse cx="840" cy="175" rx="420" ry="260" fill="url(#sunGlow)"/>
    <rect width="1200" height="700" fill="url(#light1)"/>
    {[
      [120,80],[340,55],[560,90],[780,42],[950,70],[1080,50],[200,130],[450,110],[670,60],[1100,95]
    ].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="1.2" fill="#4FD1C5" opacity="0.35"/>
    ))}
    <g opacity="0.22">
      {[0,80,160,240,320,400,480,560,640,720,800,880,960,1040,1120].map((x,i)=>(
        <polygon key={i} points={`${x+30},${350-Math.sin(i*1.4)*18} ${x+55},${290-Math.cos(i*0.9)*22} ${x+80},${350-Math.sin(i*1.7)*15}`}
          fill="#0B1F14"/>
      ))}
    </g>
    <g opacity="0.5">
      {[0,70,140,210,280,350,420,490,560,630,700,770,840,910,980,1050,1120].map((x,i)=>(
        <polygon key={i} points={`${x+20},${370-Math.sin(i*1.2)*12} ${x+42},${320-Math.cos(i*0.8)*18} ${x+64},${370-Math.sin(i*1.5)*10}`}
          fill="#0D2418"/>
      ))}
    </g>
    <ellipse cx="600" cy="620" rx="700" ry="180" fill="url(#fairway)"/>
    <rect x="0" y="580" width="1200" height="120" fill="#0A1F12" opacity="0.8"/>
    <ellipse cx="600" cy="600" rx="200" ry="40" fill="#0F2B18" opacity="0.6"/>
    <line x1="820" y1="420" x2="820" y2="540" stroke="#AEB8C2" strokeWidth="1.5"/>
    <polygon points="820,420 860,432 820,444" fill="#4FD1C5"/>
    <circle cx="820" cy="542" r="8" fill="#0F2B18" stroke="#4FD1C5" strokeWidth="1"/>
    <g transform="translate(320, 420)" opacity="0.85">
      <ellipse cx="0" cy="-100" rx="14" ry="17" fill="#1a3040"/>
      <rect x="-8" y="-83" width="16" height="50" fill="#1a3040" rx="4"/>
      <line x1="-8" y1="-55" x2="-28" y2="-10" stroke="#1a3040" strokeWidth="8" strokeLinecap="round"/>
      <line x1="8" y1="-55" x2="20" y2="-15" stroke="#1a3040" strokeWidth="8" strokeLinecap="round"/>
      <line x1="-5" y1="-33" x2="-12" y2="20" stroke="#1a3040" strokeWidth="9" strokeLinecap="round"/>
      <line x1="5" y1="-33" x2="14" y2="20" stroke="#1a3040" strokeWidth="9" strokeLinecap="round"/>
    </g>
    <g transform="translate(390, 425)" opacity="0.75">
      <ellipse cx="0" cy="-95" rx="13" ry="16" fill="#162A38"/>
      <rect x="-7" y="-79" width="14" height="46" fill="#162A38" rx="4"/>
      <line x1="-7" y1="-52" x2="-22" y2="-8" stroke="#162A38" strokeWidth="7" strokeLinecap="round"/>
      <line x1="7" y1="-52" x2="18" y2="-14" stroke="#162A38" strokeWidth="7" strokeLinecap="round"/>
      <line x1="-4" y1="-33" x2="-10" y2="18" stroke="#162A38" strokeWidth="8" strokeLinecap="round"/>
      <line x1="4" y1="-33" x2="10" y2="18" stroke="#162A38" strokeWidth="8" strokeLinecap="round"/>
    </g>
    <g transform="translate(295, 460)" opacity="0.6">
      <rect x="-6" y="-40" width="14" height="42" rx="4" fill="#0F2020"/>
      <line x1="8" y1="-38" x2="8" y2="0" stroke="#4FD1C5" strokeWidth="1" opacity="0.4"/>
      {[-5,-2,2].map((y,i)=>(
        <line key={i} x1="-6" y1={y} x2="8" y2={y} stroke="#4FD1C5" strokeWidth="0.8" opacity="0.2"/>
      ))}
    </g>
    <ellipse cx="400" cy="550" rx="300" ry="40" fill="#13212E" opacity="0.25" filter="url(#blur4)"/>
    <ellipse cx="800" cy="560" rx="260" ry="35" fill="#13212E" opacity="0.2" filter="url(#blur4)"/>
    <rect x="0" y="0" width="1200" height="48" fill="#050E16"/>
    <rect x="0" y="652" width="1200" height="48" fill="#050E16"/>
    <circle cx="760" cy="195" r="90" fill="#4FD1C5" opacity="0.015" filter="url(#blur4)"/>
    <circle cx="760" cy="195" r="8" fill="#4FD1C5" opacity="0.08" filter="url(#blur2)"/>
    <circle cx="760" cy="195" r="2" fill="#4FD1C5" opacity="0.25"/>
    <line x1="400" y1="0" x2="400" y2="700" stroke="#4FD1C5" strokeWidth="0.3" opacity="0.08"/>
    <line x1="800" y1="0" x2="800" y2="700" stroke="#4FD1C5" strokeWidth="0.3" opacity="0.08"/>
  </svg>
);

// ─── EPISODE THUMBNAIL SVG ──────────────────────────────────────────────────
const EpThumb = ({ ep = 1, title = "" }: { ep?: number; title?: string }) => {
  const hues: [string, string][] = [
    ["#0A2018","#4FD1C5"],
    ["#0A1828","#4FD1C5"],
    ["#180A20","#A78BFA"],
    ["#1A1208","#FBBF24"],
    ["#0A2018","#34D399"],
    ["#141428","#60A5FA"],
  ];
  const [bg, acc] = hues[(ep-1) % hues.length];
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
      <defs>
        <linearGradient id={`epg${ep}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bg}/>
          <stop offset="100%" stopColor="#08131D"/>
        </linearGradient>
        <radialGradient id={`epr${ep}`} cx="0.3" cy="0.5">
          <stop offset="0%" stopColor={acc} stopOpacity="0.12"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="480" height="270" fill={`url(#epg${ep})`}/>
      <rect width="480" height="270" fill={`url(#epr${ep})`}/>
      <g transform="translate(340,150)" opacity="0.5">
        <ellipse cx="0" cy="-60" rx="18" ry="22" fill={bg}/>
        <rect x="-10" y="-38" width="20" height="58" fill={bg} rx="5"/>
        <line x1="-10" y1="-20" x2="-32" y2="15" stroke={bg} strokeWidth="10" strokeLinecap="round"/>
        <line x1="10" y1="-20" x2="25" y2="15" stroke={bg} strokeWidth="10" strokeLinecap="round"/>
        <line x1="-4" y1="20" x2="-8" y2="60" stroke={bg} strokeWidth="11" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="10" y2="60" stroke={bg} strokeWidth="11" strokeLinecap="round"/>
      </g>
      <text x="20" y="36" fontFamily="'Bebas Neue',sans-serif" fontSize="12" fill={acc} opacity="0.9" letterSpacing="3">EP. {String(ep).padStart(2,"0")}</text>
      <text x="20" y="230" fontFamily="'Bebas Neue',sans-serif" fontSize="22" fill="#F5F7FA" opacity="0.9">{title}</text>
      <rect x="0" y="0" width="480" height="20" fill="#050E16" opacity="0.7"/>
      <rect x="0" y="250" width="480" height="20" fill="#050E16" opacity="0.7"/>
      <rect x="20" y="46" width="40" height="1.5" fill={acc} opacity="0.7"/>
    </svg>
  );
};

// ─── MERCH PRODUCT SVG ───────────────────────────────────────────────────────
const MerchThumb = ({ type = "polo", label = "" }: { type?: string; label?: string }) => (
  <svg viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
    <defs>
      <linearGradient id={`mg${type}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#13212E"/>
        <stop offset="100%" stopColor="#0A1820"/>
      </linearGradient>
    </defs>
    <rect width="320" height="380" fill={`url(#mg${type})`}/>
    {type === "polo" && (
      <g transform="translate(60,60)">
        <path d="M100,0 L160,30 L175,90 L170,280 L30,280 L25,90 L40,30 Z" fill="#13303F" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <path d="M100,0 L115,50 L100,60 L85,50 Z" fill="#0F2838" stroke="#4FD1C5" strokeWidth="0.6" strokeOpacity="0.4"/>
        <path d="M40,30 L0,80 L25,90" fill="none" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <path d="M160,30 L200,80 L175,90" fill="none" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <text x="100" y="180" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#4FD1C5" opacity="0.6" textAnchor="middle" letterSpacing="3">P&amp;P</text>
        <circle cx="100" cy="170" r="22" fill="none" stroke="#4FD1C5" strokeWidth="0.8" opacity="0.5"/>
        <text x="100" y="165" fontFamily="'Bebas Neue',sans-serif" fontSize="11" fill="#4FD1C5" opacity="0.5" textAnchor="middle">PREACHERS</text>
        <text x="100" y="178" fontFamily="'Bebas Neue',sans-serif" fontSize="7" fill="#4FD1C5" opacity="0.4" textAnchor="middle" letterSpacing="2">&amp; PROS</text>
      </g>
    )}
    {type === "hat" && (
      <g transform="translate(60,80)">
        <path d="M100,40 C20,40 0,80 0,100 L200,100 C200,80 180,40 100,40Z" fill="#0D2028" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <rect x="0" y="100" width="200" height="16" rx="3" fill="#0B1C28" stroke="#4FD1C5" strokeWidth="0.6" strokeOpacity="0.2"/>
        <rect x="160" y="104" width="50" height="8" rx="2" fill="#0F2030"/>
        <text x="100" y="86" fontFamily="'Bebas Neue',sans-serif" fontSize="16" fill="#4FD1C5" opacity="0.7" textAnchor="middle" letterSpacing="4">P&amp;P</text>
        <path d="M0,100 Q100,95 200,100" stroke="#4FD1C5" strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="3,3"/>
      </g>
    )}
    {type === "tee" && (
      <g transform="translate(55,50)">
        <path d="M100,0 L170,25 L185,85 L180,300 L20,300 L15,85 L30,25 Z" fill="#0A1F2D" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <path d="M100,0 L120,45 L100,55 L80,45 Z" fill="#091828"/>
        <path d="M30,25 L0,70 L15,85" fill="none" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <path d="M170,25 L200,70 L185,85" fill="none" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <text x="100" y="185" fontFamily="'Bebas Neue',sans-serif" fontSize="28" fill="#F5F7FA" opacity="0.08" textAnchor="middle" letterSpacing="2">PREACHERS</text>
        <text x="100" y="215" fontFamily="'Bebas Neue',sans-serif" fontSize="28" fill="#F5F7FA" opacity="0.08" textAnchor="middle" letterSpacing="2">&amp; PROS</text>
        <circle cx="100" cy="120" r="30" fill="none" stroke="#4FD1C5" strokeWidth="0.8" opacity="0.4"/>
        <text x="100" y="114" fontFamily="'Bebas Neue',sans-serif" fontSize="10" fill="#4FD1C5" opacity="0.6" textAnchor="middle" letterSpacing="2">PREACHERS</text>
        <text x="100" y="127" fontFamily="'Bebas Neue',sans-serif" fontSize="8" fill="#4FD1C5" opacity="0.5" textAnchor="middle">&amp;</text>
        <text x="100" y="140" fontFamily="'Bebas Neue',sans-serif" fontSize="10" fill="#4FD1C5" opacity="0.6" textAnchor="middle" letterSpacing="2">PROS</text>
      </g>
    )}
    {type === "qzip" && (
      <g transform="translate(55,50)">
        <path d="M100,0 L165,22 L180,80 L175,300 L25,300 L20,80 L35,22 Z" fill="#0F2438" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <path d="M100,0 L112,40 L100,120 L88,40 Z" fill="#0A1B2B" stroke="#4FD1C5" strokeWidth="0.5" strokeOpacity="0.3"/>
        <path d="M35,22 L0,65 L20,80" fill="none" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <path d="M165,22 L200,65 L180,80" fill="none" stroke="#4FD1C5" strokeWidth="0.8" strokeOpacity="0.3"/>
        <text x="68" y="200" fontFamily="'Bebas Neue',sans-serif" fontSize="12" fill="#4FD1C5" opacity="0.5" letterSpacing="2">P&amp;P</text>
      </g>
    )}
    <text x="160" y="352" fontFamily="'Manrope',sans-serif" fontSize="12" fill="#AEB8C2" textAnchor="middle">{label}</text>
  </svg>
);

// ─── FORM HELPERS ────────────────────────────────────────────────────────────
function submitForm(formData: FormData): Promise<boolean> {
  return fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
  }).then(r => r.ok);
}

function NewsletterForm() {
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await submitForm(new FormData(e.currentTarget));
    setStatus(ok ? 'ok' : 'err');
  };
  if (status === 'ok') return (
    <p className="bebas" style={{ fontSize: 22, color: C.teal }}>You're in. Welcome to the circle.</p>
  );
  return (
    <form name="newsletter" onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      <input type="hidden" name="form-name" value="newsletter"/>
      <input name="bot-field" style={{ display: "none" }}/>
      <input type="email" name="email" placeholder="Your email address" className="form-input" required style={{ flex: "1 1 240px", maxWidth: 340 }}/>
      <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>Subscribe <ArrowRight/></button>
      {status === 'err' && <p style={{ width: "100%", color: "#f87171", fontSize: 13 }}>Something went wrong. Please try again.</p>}
    </form>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await submitForm(new FormData(e.currentTarget));
    setStatus(ok ? 'ok' : 'err');
  };
  if (status === 'ok') return (
    <div style={{ padding: "48px 0" }}>
      <div className="timeline-dot pulse" style={{ marginBottom: 20 }}/>
      <p className="bebas" style={{ fontSize: 32, color: C.white, marginBottom: 12 }}>Message Received</p>
      <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.7 }}>Thanks for reaching out. We'll be in touch soon.</p>
    </div>
  );
  return (
    <form name="contact" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input type="hidden" name="form-name" value="contact"/>
      <input name="bot-field" style={{ display: "none" }}/>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gray, fontWeight: 700, marginBottom: 8 }}>First Name</label>
          <input type="text" name="firstName" className="form-input" placeholder="John"/>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gray, fontWeight: 700, marginBottom: 8 }}>Last Name</label>
          <input type="text" name="lastName" className="form-input" placeholder="Doe"/>
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gray, fontWeight: 700, marginBottom: 8 }}>Email</label>
        <input type="email" name="email" className="form-input" placeholder="john@example.com" required/>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gray, fontWeight: 700, marginBottom: 8 }}>Inquiry Type</label>
        <select name="inquiryType" className="form-input" style={{ appearance: "none", cursor: "pointer" }}>
          <option value="">Select inquiry type</option>
          <option>Partnership Inquiry</option>
          <option>Guest Inquiry</option>
          <option>Sponsorship</option>
          <option>Collaboration</option>
          <option>Media Inquiry</option>
          <option>General</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gray, fontWeight: 700, marginBottom: 8 }}>Company / Organization</label>
        <input type="text" name="company" className="form-input" placeholder="Optional"/>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gray, fontWeight: 700, marginBottom: 8 }}>Message</label>
        <textarea name="message" className="form-input" placeholder="Tell us about your inquiry..." rows={6} style={{ resize: "vertical" }}/>
      </div>
      <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: 8 }}>
        Send Message <ArrowRight/>
      </button>
      {status === 'err' && <p style={{ color: "#f87171", fontSize: 13 }}>Something went wrong. Please try again.</p>}
    </form>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
const pages = ["HOME","EPISODES","ABOUT","MERCH","WATCH","COMMUNITY","CONTACT"];

type Page = typeof pages[number];

function Nav({ currentPage, setPage }: { currentPage: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <>
      <nav className={scrolled ? "nav-blur" : ""} style={{ transition: "all 0.4s ease" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => go("HOME")}>
            <div className="logo-mark">
              <span className="bebas" style={{ fontSize: 15, color: C.teal, letterSpacing: 1 }}>P&P</span>
            </div>
            <div>
              <div className="bebas" style={{ fontSize: 17, color: C.white, lineHeight: 1, letterSpacing: "0.1em" }}>PREACHERS</div>
              <div className="bebas" style={{ fontSize: 11, color: C.teal, lineHeight: 1, letterSpacing: "0.22em" }}>& PROS</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {pages.filter(p=>p!=="HOME").map(p => (
              <button key={p} onClick={() => go(p)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Manrope',sans-serif", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: currentPage === p ? C.teal : C.gray,
                transition: "color 0.3s ease", padding: "4px 0",
                borderBottom: currentPage === p ? `1px solid ${C.teal}` : "1px solid transparent",
              }}>{p}</button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.white, display: "none" }} className="mobile-menu-btn">
            <MenuIcon/>
          </button>
        </div>
      </nav>
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: C.white }}>
            <CloseIcon/>
          </button>
          <div className="logo-mark" style={{ width: 56, height: 56, marginBottom: 8 }}>
            <span className="bebas" style={{ fontSize: 20, color: C.teal }}>P&P</span>
          </div>
          {pages.map(p => (
            <button key={p} onClick={() => go(p)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: "0.08em",
              color: currentPage === p ? C.teal : C.white,
              transition: "color 0.3s ease",
            }}>{p}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const epRef = useFadeIn();
  const statsRef = useFadeIn();
  const quoteRef = useFadeIn();

  const episodes = [
    { ep: 1, title: "PRESSURE", sub: "Finding calm under the weight of expectation", runtime: "28 min", guest: "Coach D. Reeves" },
    { ep: 2, title: "IDENTITY", sub: "Who are you when the game doesn't define you", runtime: "34 min", guest: "Pro Amari Simms" },
    { ep: 3, title: "PURPOSE", sub: "The moment everything changed on the back nine", runtime: "41 min", guest: "Marcus Cole" },
    { ep: 4, title: "DISCIPLINE", sub: "Structure, sacrifice and the long game of life", runtime: "37 min", guest: "James Whitfield" },
    { ep: 5, title: "FAITH", sub: "Belief in something bigger than the scorecard", runtime: "29 min", guest: "Pastor T. Brooks" },
    { ep: 6, title: "LEADERSHIP", sub: "The quiet voice that moves the room", runtime: "45 min", guest: "Ceo Kevin Marsh" },
  ];

  return (
    <div>
      <section style={{ position: "relative", height: "100vh", minHeight: 680, overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Hero background — looping muted video. Drop hero.mp4 into /public.
            GolfScene renders behind as a graceful fallback while the video loads / if it errors. */}
        <div style={{ position: "absolute", inset: 0 }}>
          <GolfScene style={{ minHeight: "100%", minWidth: "100%" }}/>
        </div>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        >
          <source
            src="https://video.wixstatic.com/video/cd5249_b2b70ae0241147e1895d7d27c4ab4489/1080p/mp4/file.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 2 }}/>
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,209,197,0.06) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ position: "relative", zIndex: 3, maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div className="section-label" style={{ marginBottom: 24 }}>— A Cinematic Golf Series</div>
          <h1 className="bebas" style={{ fontSize: "clamp(72px, 14vw, 180px)", lineHeight: 0.92, marginBottom: 28, color: C.white }}>
            <span className="hero-title-line"><span className="hero-title-text d1">PREACHERS</span></span>
            <span className="hero-title-line"><span className="hero-title-text d2" style={{ color: C.teal }}>&amp;</span></span>
            <span className="hero-title-line"><span className="hero-title-text d3">PROS</span></span>
          </h1>
          <p className="hero-sub" style={{ maxWidth: 520, fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.7, color: C.gray, marginBottom: 40, fontWeight: 300 }}>
            A cinematic conversation series exploring pressure, identity, purpose, faith, leadership, discipline, and the game behind the game.
          </p>
          <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button className="btn-primary" onClick={() => setPage("WATCH")}>
              <PlayIcon size={16}/> Watch Trailer
            </button>
            <a className="btn-outline" href="https://youtube.com" target="_blank" rel="noreferrer">
              <YoutubeIcon/> Subscribe
            </a>
            <button className="btn-outline" onClick={() => setPage("MERCH")}>
              Shop Merch
            </button>
          </div>
        </div>
        <div className="scroll-indicator" style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}>
          <span style={{ fontFamily: "'Manrope',sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gray }}>Scroll</span>
          <ChevronDown/>
        </div>
      </section>

      {/* ─── KICKOFF EPISODE — full playable video on the home page ─── */}
      <section style={{ background: C.bg, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-in visible" style={{ marginBottom: 32 }}>
            <div className="section-label">The Kickoff Episode</div>
            <div className="teal-divider"/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12, flexWrap: "wrap", gap: 16 }}>
              <h2 className="bebas" style={{ fontSize: "clamp(42px,7vw,80px)", lineHeight: 1, color: C.white }}>EP. 01 — AGAINST THE GRAIN</h2>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.gray, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                <ClockIcon/> Lucas Ramirez · Seth Carrol
              </span>
            </div>
            <p style={{ maxWidth: 720, fontSize: 15, color: C.gray, lineHeight: 1.7, marginBottom: 32 }}>
              The premiere conversation. Preacher <strong style={{ color: C.white, fontWeight: 500 }}>Lucas Ramirez</strong> and pro <strong style={{ color: C.white, fontWeight: 500 }}>Seth Carrol</strong> sit down on the fairway to talk family, the quiet pull of a dad with too much screen time, and what it actually looks like to build Bible literacy — working through Acts and the Epistles together. A first round that goes against the grain of how these conversations usually start.
            </p>
          </div>

          <div style={{ position: "relative", borderRadius: 2, overflow: "hidden", border: `1px solid rgba(79,209,197,0.15)`, background: C.dark }}>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/1195698872?h=89d35ed01a&title=0&byline=0&portrait=0"
                title="Preachers & Pros — EP. 01 — Against the Grain"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "#000" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={epRef} className="fade-in">
            <div className="section-label">Featured Episodes</div>
            <div className="teal-divider"/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <h2 className="bebas" style={{ fontSize: "clamp(42px,7vw,80px)", lineHeight: 1, color: C.white }}>THE CONVERSATIONS</h2>
              <button className="btn-outline" onClick={() => setPage("EPISODES")} style={{ flexShrink: 0 }}>
                All Episodes <ArrowRight/>
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,320px),1fr))", gap: 20 }}>
            {episodes.map((ep, i) => (
              <div key={i} className="episode-card" onClick={() => setPage("WATCH")}>
                <div style={{ height: 200, overflow: "hidden" }}>
                  <div className="card-thumb" style={{ height: "100%" }}>
                    <EpThumb ep={ep.ep} title={ep.title}/>
                  </div>
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: "0.2em", color: C.teal }}>EP. {String(ep.ep).padStart(2,"0")}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.gray }}>
                      <ClockIcon/> {ep.runtime}
                    </span>
                  </div>
                  <h3 className="bebas" style={{ fontSize: 26, color: C.white, marginBottom: 6 }}>{ep.title}</h3>
                  <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.6, marginBottom: 16 }}>{ep.sub}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: C.gray, fontWeight: 500 }}>{ep.guest}</span>
                    <button className="btn-primary" style={{ padding: "9px 16px", fontSize: 11 }}>Watch</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.bg2, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, left: -10, pointerEvents: "none" }}>
          <span className="quote-mark">"</span>
        </div>
        <div ref={quoteRef} className="fade-in" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p className="bebas" style={{ fontSize: "clamp(28px,5vw,56px)", color: C.white, lineHeight: 1.2, marginBottom: 28, letterSpacing: "0.02em" }}>
            Golf is just the environment.<br/>
            <span style={{ color: C.teal }}>The conversation is where everything happens.</span>
          </p>
          <div style={{ width: 40, height: 1, background: C.teal, margin: "0 auto 20px" }}/>
          <p style={{ color: C.gray, fontSize: 14, letterSpacing: "0.1em", fontWeight: 600 }}>— PREACHERS & PROS</p>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "80px 24px", borderTop: `1px solid rgba(79,209,197,0.06)` }}>
        <div ref={statsRef} className="fade-in" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 40, textAlign: "center" }}>
            {[
              { num: "6+", label: "Episodes" },
              { num: "40K", label: "Views" },
              { num: "12", label: "Guests" },
              { num: "1", label: "Fairway" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 0" }}>
                <div className="stat-num">{s.num}</div>
                <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gray, marginTop: 8, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.bg2, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <div className="section-label" style={{ justifyContent: "center", display: "flex", marginBottom: 12 }}>Follow the Series</div>
            <h2 className="bebas" style={{ fontSize: "clamp(36px,6vw,64px)", color: C.white }}>JOIN THE CONVERSATION</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 16 }}>
            {[
              { icon: <YoutubeIcon/>, name: "YouTube", handle: "@PreachersAndPros", href: "https://youtube.com" },
              { icon: <InstagramIcon/>, name: "Instagram", handle: "@wesleyfredericassi", href: "https://instagram.com/wesleyfredericassi" },
              { icon: <TiktokIcon/>, name: "TikTok", handle: "@PreachersAndPros", href: "https://tiktok.com" },
              { icon: <XIcon/>, name: "X", handle: "@PreachersAndPros", href: "https://x.com" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-pill">
                <span style={{ color: C.teal }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.gray }}>{s.handle}</div>
                </div>
                <ArrowRight/>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="section-label">The Collection</div>
              <div className="teal-divider"/>
              <h2 className="bebas" style={{ fontSize: "clamp(36px,6vw,72px)", color: C.white }}>WEAR THE STORY</h2>
            </div>
            <button className="btn-outline" onClick={() => setPage("MERCH")}>Shop All <ArrowRight/></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,240px),1fr))", gap: 16 }}>
            {[
              { type: "polo", label: "Fairway Polo — $85" },
              { type: "hat", label: "Rope Hat — $45" },
              { type: "tee", label: "Statement Tee — $55" },
              { type: "qzip", label: "Quarter-Zip — $110" },
            ].map((m, i) => (
              <div key={i} className="merch-card" onClick={() => setPage("MERCH")} style={{ cursor: "pointer" }}>
                <div style={{ height: 260 }}>
                  <MerchThumb type={m.type} label=""/>
                </div>
                <div style={{ padding: "16px 18px", borderTop: `1px solid rgba(79,209,197,0.08)` }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 4 }}>{m.label}</p>
                  <button className="btn-primary" style={{ padding: "9px 16px", fontSize: 11, width: "100%", justifyContent: "center", marginTop: 8 }}>Shop Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── EPISODES PAGE ────────────────────────────────────────────────────────────
function EpisodesPage({ setPage }: { setPage: (p: Page) => void }) {
  const episodes = [
    { ep: 1, title: "PRESSURE", sub: "Finding calm under the weight of expectation", runtime: "28 min", guest: "Coach D. Reeves", desc: "In this premiere episode, we sit down on the 18th fairway and explore what happens to identity when stakes are at their highest. A raw, unfiltered dialogue about performance anxiety, parental pressure, and learning to compete from a place of peace." },
    { ep: 2, title: "IDENTITY", sub: "Who are you when the game doesn't define you", runtime: "34 min", guest: "Pro Amari Simms", desc: "Former touring pro Amari Simms opens up about the moment his golf career ended and what remained. A conversation about identity, worth, and discovering who you are beyond the game." },
    { ep: 3, title: "PURPOSE", sub: "The moment everything changed on the back nine", runtime: "41 min", guest: "Marcus Cole", desc: "Marcus Cole played Division I golf for three years before walking away. Now a youth coach, he shares the decision that changed his trajectory — and why the hardest shot was choosing a different fairway entirely." },
    { ep: 4, title: "DISCIPLINE", sub: "Structure, sacrifice and the long game of life", runtime: "37 min", guest: "James Whitfield", desc: "Discipline isn't punishment — it's design. We walk Augusta-style holes discussing how the principles of the sport translate directly to business, family, and faith. A conversation for anyone who plays the long game." },
    { ep: 5, title: "FAITH", sub: "Belief in something bigger than the scorecard", runtime: "29 min", guest: "Pastor T. Brooks", desc: "What does faith look like on a golf course? Pastor T. Brooks joins us for an honest conversation about belief, doubt, and the spiritual underpinnings of competitive excellence. No sermon. Just a real talk." },
    { ep: 6, title: "LEADERSHIP", sub: "The quiet voice that moves the room", runtime: "45 min", guest: "CEO Kevin Marsh", desc: "Kevin Marsh built a $40M company and credits the golf course as his MBA. In our longest episode yet, we cover mentorship, decision-making under pressure, and why the game teaches what no boardroom can." },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: C.bg2, padding: "80px 24px 60px", borderBottom: `1px solid rgba(79,209,197,0.08)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Season One</div>
          <h1 className="bebas" style={{ fontSize: "clamp(48px,10vw,110px)", color: C.white, lineHeight: 0.92 }}>THE EPISODES</h1>
          <p style={{ color: C.gray, fontSize: 16, marginTop: 20, maxWidth: 560, lineHeight: 1.7 }}>
            Six conversations. Six fairways. One series exploring what it means to compete, lead, believe, and live with intention.
          </p>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          {episodes.map((ep, i) => (
            <div key={i} className="episode-card" style={{ display: "grid", gridTemplateColumns: "min(40%,300px) 1fr", gap: 0 }}>
              <div style={{ height: 220, minWidth: 0 }}>
                <div className="card-thumb" style={{ height: "100%" }}>
                  <EpThumb ep={ep.ep} title={ep.title}/>
                </div>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: "0.2em", color: C.teal }}>EP. {String(ep.ep).padStart(2,"0")}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.gray }}>
                    <ClockIcon/> {ep.runtime}
                  </span>
                </div>
                <h2 className="bebas" style={{ fontSize: "clamp(28px,4vw,44px)", color: C.white, marginBottom: 6 }}>{ep.title}</h2>
                <p style={{ fontSize: 13, color: C.teal, marginBottom: 12, fontWeight: 600 }}>{ep.guest}</p>
                <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, marginBottom: 24 }}>{ep.desc}</p>
                <button className="btn-primary" onClick={() => setPage("WATCH")}>
                  <PlayIcon size={14}/> Watch Episode
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <style>{`
        @media (max-width: 600px) {
          .episode-card[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const s1 = useFadeIn(), s2 = useFadeIn(), s3 = useFadeIn();

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ position: "relative", height: "70vh", minHeight: 480, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <GolfScene/>
        </div>
        <div className="hero-overlay" style={{ position: "absolute", inset: 0 }}/>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Who We Are</div>
          <h1 className="bebas" style={{ fontSize: "clamp(56px,10vw,120px)", color: C.white, lineHeight: 0.92 }}>
            THE GAME<br/><span style={{ color: C.teal }}>BEHIND</span><br/>THE GAME
          </h1>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div ref={s1} className="fade-in">
            <div className="section-label" style={{ marginBottom: 16 }}>Our Story</div>
            <div className="teal-divider"/>
            <h2 className="bebas" style={{ fontSize: "clamp(36px,6vw,64px)", color: C.white, marginBottom: 32, lineHeight: 1.1 }}>
              NOT A GOLF SHOW.<br/>A CONVERSATION SERIES<br/><span style={{ color: C.teal }}>ON A GOLF COURSE.</span>
            </h2>
            <p style={{ fontSize: 17, color: C.gray, lineHeight: 1.9, marginBottom: 24 }}>
              Preachers & Pros is a cinematic documentary series that uses the golf course as a backdrop for the conversations that actually matter — about pressure, identity, leadership, purpose, discipline, faith, and what it means to compete at the highest level of life.
            </p>
            <p style={{ fontSize: 17, color: C.gray, lineHeight: 1.9, marginBottom: 24 }}>
              We're not a sports show that mentions faith. We're not a ministry that uses golf. We're something in between and beyond — a storytelling platform built for men and women who want substance, not slogans.
            </p>
            <p style={{ fontSize: 17, color: C.gray, lineHeight: 1.9 }}>
              The fairway is our studio. The round is our interview format. The conversations are unscripted, unfiltered, and unforgettable.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: C.bg2, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={s2} className="fade-in" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label" style={{ justifyContent: "center", display: "flex", marginBottom: 12 }}>What We Explore</div>
            <h2 className="bebas" style={{ fontSize: "clamp(36px,6vw,64px)", color: C.white }}>THE PILLARS</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px),1fr))", gap: 20 }}>
            {[
              { title: "PRESSURE", desc: "Performing when everything is on the line. How do you compete from a place of calm?" },
              { title: "IDENTITY", desc: "Who are you beyond the title, the score, the role? The deepest question in the game." },
              { title: "PURPOSE", desc: "Why are you here? The course forces the question when the noise falls away." },
              { title: "FAITH", desc: "Not religion — belief. In something. In someone. In the unseen par you're always chasing." },
              { title: "LEADERSHIP", desc: "The quiet confidence that sets the pace for everyone behind you on the fairway." },
              { title: "DISCIPLINE", desc: "The long game. The pre-dawn practice. The invisible work behind every effortless shot." },
            ].map((p, i) => (
              <div key={i} style={{ padding: "32px 28px", background: C.bg, border: `1px solid rgba(79,209,197,0.08)`, borderRadius: 2 }}>
                <div className="timeline-dot pulse" style={{ marginBottom: 16 }}/>
                <h3 className="bebas" style={{ fontSize: 28, color: C.white, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={s3} className="fade-in" style={{ background: C.bg, padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="bebas" style={{ fontSize: "clamp(40px,7vw,72px)", color: C.white, marginBottom: 20 }}>
            JOIN THE <span style={{ color: C.teal }}>SERIES</span>
          </h2>
          <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Whether you're a golfer, a leader, a believer, or someone who just knows there's a deeper game being played — this series is for you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => setPage("WATCH")}><PlayIcon size={14}/> Watch Now</button>
            <button className="btn-outline" onClick={() => setPage("CONTACT")}>Partner With Us <ArrowRight/></button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── MERCH PAGE ───────────────────────────────────────────────────────────────
function MerchPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const cats = ["All","Tops","Headwear","Outerwear"];

  const products = [
    { type: "polo", name: "Fairway Polo", cat: "Tops", price: "$85", tag: "BESTSELLER" },
    { type: "hat", name: "Rope Hat", cat: "Headwear", price: "$45", tag: "NEW" },
    { type: "tee", name: "Statement Tee", cat: "Tops", price: "$55", tag: null },
    { type: "qzip", name: "Quarter-Zip", cat: "Outerwear", price: "$110", tag: "LIMITED" },
    { type: "polo", name: "Course Polo", cat: "Tops", price: "$90", tag: null },
    { type: "hat", name: "Snapback", cat: "Headwear", price: "$48", tag: null },
    { type: "tee", name: "Heavyweight Tee", cat: "Tops", price: "$60", tag: "NEW" },
    { type: "qzip", name: "Midlayer Fleece", cat: "Outerwear", price: "$130", tag: null },
  ];

  const filtered = selectedCat === "All" ? products : products.filter(p => p.cat === selectedCat);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: C.bg2, padding: "80px 24px 60px", borderBottom: `1px solid rgba(79,209,197,0.08)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>The Collection</div>
          <h1 className="bebas" style={{ fontSize: "clamp(48px,10vw,110px)", color: C.white, lineHeight: 0.92 }}>WEAR THE STORY</h1>
          <p style={{ color: C.gray, fontSize: 15, marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}>
            Premium golf apparel built for the course, the conversation, and the long game. Designed with intention. Worn with purpose.
          </p>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setSelectedCat(c)} style={{
                padding: "10px 22px",
                background: selectedCat === c ? C.teal : "transparent",
                color: selectedCat === c ? C.bg : C.gray,
                border: `1px solid ${selectedCat === c ? C.teal : "rgba(174,184,194,0.2)"}`,
                fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 12,
                letterSpacing: "0.12em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: 1, transition: "all 0.3s ease",
              }}>{c}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,260px),1fr))", gap: 20 }}>
            {filtered.map((p, i) => (
              <div key={i} className="merch-card" style={{ cursor: "pointer" }}>
                <div style={{ position: "relative", height: 300 }}>
                  <MerchThumb type={p.type} label=""/>
                  {p.tag && (
                    <div style={{ position: "absolute", top: 14, right: 14, background: C.teal, color: C.bg, fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: "0.15em", padding: "4px 10px" }}>
                      {p.tag}
                    </div>
                  )}
                </div>
                <div style={{ padding: "18px 20px", borderTop: `1px solid rgba(79,209,197,0.08)` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.white }}>{p.name}</p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: C.teal, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "0.05em" }}>{p.price}</p>
                  </div>
                  <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: 12 }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.bg2, padding: "80px 24px", textAlign: "center", borderTop: `1px solid rgba(79,209,197,0.06)` }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="logo-mark" style={{ width: 64, height: 64, margin: "0 auto 24px" }}>
            <span className="bebas" style={{ fontSize: 22, color: C.teal }}>P&P</span>
          </div>
          <p className="bebas" style={{ fontSize: "clamp(28px,4vw,44px)", color: C.white, marginBottom: 16 }}>
            DESIGNED FOR THE <span style={{ color: C.teal }}>LONG GAME</span>
          </p>
          <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.8 }}>
            Every piece in the Preachers & Pros collection carries the intention of the series — built for the course, the conversation, and the life you're building beyond it.
          </p>
        </div>
      </section>
    </div>
  );
}

// ─── WATCH PAGE ───────────────────────────────────────────────────────────────
function WatchPage() {
  const episodes = [
    { ep: 1, title: "PRESSURE", runtime: "28 min", guest: "Coach D. Reeves" },
    { ep: 2, title: "IDENTITY", runtime: "34 min", guest: "Pro Amari Simms" },
    { ep: 3, title: "PURPOSE", runtime: "41 min", guest: "Marcus Cole" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: C.bg2, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Watch</div>
          <h1 className="bebas" style={{ fontSize: "clamp(48px,10vw,110px)", color: C.white, lineHeight: 0.92 }}>ALL EPISODES</h1>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="video-placeholder" style={{ borderRadius: 2, overflow: "hidden", marginBottom: 60, border: `1px solid rgba(79,209,197,0.1)` }}>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
                <GolfScene style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}/>
                <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                  <div className="play-btn" style={{ margin: "0 auto 20px" }}>
                    <PlayIcon size={28}/>
                  </div>
                  <div className="bebas" style={{ fontSize: "clamp(24px,4vw,48px)", color: C.white }}>EP. 01 — PRESSURE</div>
                  <div style={{ color: C.gray, fontSize: 14 }}>28 min · Coach D. Reeves</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 60 }}>
            <div className="section-label" style={{ marginBottom: 16 }}>YouTube Channel</div>
            <div style={{ background: C.bg2, border: `1px solid rgba(79,209,197,0.08)`, borderRadius: 2, padding: "60px 24px", textAlign: "center" }}>
              <YoutubeIcon/>
              <p className="bebas" style={{ fontSize: 32, color: C.white, margin: "16px 0 8px" }}>SUBSCRIBE ON YOUTUBE</p>
              <p style={{ color: C.gray, fontSize: 14, marginBottom: 24 }}>Full episodes, behind-the-scenes, shorts & more</p>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none" }}>
                <YoutubeIcon/> Subscribe Free
              </a>
            </div>
          </div>

          <div className="section-label" style={{ marginBottom: 24 }}>More Episodes</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,300px),1fr))", gap: 20 }}>
            {episodes.map((ep, i) => (
              <div key={i} className="episode-card">
                <div style={{ height: 190, overflow: "hidden" }}>
                  <div className="card-thumb" style={{ height: "100%" }}>
                    <EpThumb ep={ep.ep} title={ep.title}/>
                  </div>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: "0.2em", color: C.teal }}>EP. {String(ep.ep).padStart(2,"0")}</span>
                  <h3 className="bebas" style={{ fontSize: 28, color: C.white, margin: "6px 0 4px" }}>{ep.title}</h3>
                  <p style={{ fontSize: 12, color: C.gray, marginBottom: 14 }}>{ep.guest} · {ep.runtime}</p>
                  <button className="btn-primary" style={{ padding: "9px 16px", fontSize: 11 }}>
                    <PlayIcon size={12}/> Watch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── COMMUNITY PAGE ───────────────────────────────────────────────────────────
function CommunityPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ position: "relative", minHeight: 440, overflow: "hidden", display: "flex", alignItems: "center", padding: "80px 24px" }}>
        <div style={{ position: "absolute", inset: 0 }}><GolfScene/></div>
        <div className="hero-overlay" style={{ position: "absolute", inset: 0 }}/>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Community</div>
          <h1 className="bebas" style={{ fontSize: "clamp(48px,10vw,110px)", color: C.white, lineHeight: 0.92 }}>
            THE<br/><span style={{ color: C.teal }}>CIRCLE</span>
          </h1>
          <p style={{ color: C.gray, fontSize: 16, marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}>
            A gathering of golfers, leaders, creatives, and thinkers who understand that the most important conversations happen somewhere between the tee box and the green.
          </p>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Follow & Connect</div>
            <h2 className="bebas" style={{ fontSize: "clamp(36px,6vw,64px)", color: C.white }}>FIND US EVERYWHERE</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              { icon: <YoutubeIcon/>, name: "YouTube", handle: "@PreachersAndPros", cta: "Subscribe", href: "https://youtube.com", desc: "Full episodes, behind-the-scenes content & documentary shorts" },
              { icon: <InstagramIcon/>, name: "Instagram", handle: "@wesleyfredericassi", cta: "Follow", href: "https://instagram.com/wesleyfredericassi", desc: "Course life, candid moments, and community conversations" },
              { icon: <TiktokIcon/>, name: "TikTok", handle: "@PreachersAndPros", cta: "Follow", href: "https://tiktok.com", desc: "Episode clips, golf lifestyle content & short-form storytelling" },
              { icon: <XIcon/>, name: "X", handle: "@PreachersAndPros", cta: "Follow", href: "https://x.com", desc: "Real-time thoughts, episode discussions, and community dialogue" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 28px", background: C.bg2, border: `1px solid rgba(79,209,197,0.08)`, borderRadius: 2 }}>
                <div style={{ color: C.teal, marginBottom: 16 }}>{s.icon}</div>
                <h3 className="bebas" style={{ fontSize: 26, color: C.white, marginBottom: 4 }}>{s.name}</h3>
                <p style={{ fontSize: 13, color: C.teal, marginBottom: 12, fontWeight: 600 }}>{s.handle}</p>
                <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7, marginBottom: 24 }}>{s.desc}</p>
                <a href={s.href} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", padding: "11px 22px", fontSize: 12 }}>
                  {s.cta} <ArrowRight/>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.bg2, padding: "80px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center", display: "flex", marginBottom: 12 }}>Stay Close</div>
          <h2 className="bebas" style={{ fontSize: "clamp(32px,5vw,56px)", color: C.white, marginBottom: 16 }}>
            JOIN THE <span style={{ color: C.teal }}>INNER CIRCLE</span>
          </h2>
          <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
            Episode drops, behind-the-scenes content, merch releases, and conversation starters — delivered to your inbox.
          </p>
          <NewsletterForm/>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "80px 24px", textAlign: "center", borderTop: `1px solid rgba(79,209,197,0.06)` }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 className="bebas" style={{ fontSize: "clamp(32px,5vw,56px)", color: C.white, marginBottom: 16 }}>
            WANT TO PARTNER<br/>OR APPEAR ON THE SHOW?
          </h2>
          <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            We're always looking for guests, sponsors, collaborators, and creatives who align with our mission.
          </p>
          <button className="btn-primary" onClick={() => setPage("CONTACT")}>
            Get In Touch <ArrowRight/>
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ position: "relative", minHeight: 400, overflow: "hidden", display: "flex", alignItems: "center", padding: "80px 24px" }}>
        <div style={{ position: "absolute", inset: 0 }}><GolfScene/></div>
        <div className="hero-overlay" style={{ position: "absolute", inset: 0 }}/>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Get In Touch</div>
          <h1 className="bebas" style={{ fontSize: "clamp(48px,10vw,110px)", color: C.white, lineHeight: 0.92 }}>
            LET'S<br/><span style={{ color: C.teal }}>TALK</span>
          </h1>
        </div>
      </section>

      <section style={{ background: C.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr min(380px,40%)", gap: 60, alignItems: "start" }}>
          <div>
            <div className="section-label" style={{ marginBottom: 12 }}>Send a Message</div>
            <div className="teal-divider" style={{ marginBottom: 32 }}/>
            <ContactForm/>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>Opportunities</div>
              <div className="teal-divider" style={{ marginBottom: 24 }}/>
            </div>
            {[
              { title: "Guest Inquiries", desc: "Interested in being featured on the series? We look for voices that bring depth, experience, and authenticity to the conversation." },
              { title: "Partnerships", desc: "Brands, organizations, and creatives who align with the Preachers & Pros mission are welcome to reach out about strategic partnerships." },
              { title: "Sponsorships", desc: "Reach an engaged audience of golfers, leaders, and storytellers who live with intention on and off the course." },
              { title: "Media & Press", desc: "Coverage, interviews, collaboration with media platforms, and creative projects that align with our documentary ethos." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "24px", background: C.bg2, border: `1px solid rgba(79,209,197,0.08)`, borderRadius: 2 }}>
                <div className="timeline-dot" style={{ marginBottom: 12 }}/>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}

            <div style={{ padding: "24px", background: C.bg2, border: `1px solid rgba(79,209,197,0.08)`, borderRadius: 2 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gray, marginBottom: 16 }}>Follow Us</p>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { icon: <YoutubeIcon/>, href: "https://youtube.com" },
                  { icon: <InstagramIcon/>, href: "https://instagram.com/wesleyfredericassi" },
                  { icon: <TiktokIcon/>, href: "https://tiktok.com" },
                  { icon: <XIcon/>, href: "https://x.com" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: C.bg, border: `1px solid rgba(79,209,197,0.15)`, borderRadius: 2, color: C.teal, transition: "border-color 0.3s ease", textDecoration: "none" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer style={{ background: C.dark, borderTop: `1px solid rgba(79,209,197,0.08)`, padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div className="logo-mark"><span className="bebas" style={{ fontSize: 14, color: C.teal }}>P&P</span></div>
              <div>
                <div className="bebas" style={{ fontSize: 14, color: C.white, letterSpacing: "0.1em" }}>PREACHERS & PROS</div>
                <div style={{ fontSize: 10, color: C.gray, letterSpacing: "0.15em" }}>A CINEMATIC GOLF SERIES</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7, maxWidth: 240 }}>
              Golf is the environment. Conversation is the brand.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>Navigation</p>
            {pages.map(p => (
              <div key={p} style={{ marginBottom: 10 }}>
                <button onClick={() => { setPage(p); window.scrollTo(0,0); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Manrope',sans-serif", fontSize: 13, color: C.gray, padding: 0, transition: "color 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.teal)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.gray)}>
                  {p}
                </button>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>Follow</p>
            {[
              { name: "YouTube", href: "https://youtube.com" },
              { name: "Instagram", href: "https://instagram.com/wesleyfredericassi" },
              { name: "TikTok", href: "https://tiktok.com" },
              { name: "X (Twitter)", href: "https://x.com" },
            ].map(s => (
              <div key={s.name} style={{ marginBottom: 10 }}>
                <a href={s.href} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: C.gray, textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.teal)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.gray)}>
                  {s.name}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(174,184,194,0.08)`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: C.gray }}>© 2025 Preachers & Pros. All rights reserved.</p>
          <p style={{ fontSize: 12, color: C.gray }}>Golf is the environment. The conversation is everything.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function PreachersApp() {
  const [currentPage, setPage] = useState<Page>("HOME");

  const renderPage = () => {
    switch (currentPage) {
      case "HOME": return <HomePage setPage={setPage}/>;
      case "EPISODES": return <EpisodesPage setPage={setPage}/>;
      case "ABOUT": return <AboutPage setPage={setPage}/>;
      case "MERCH": return <MerchPage/>;
      case "WATCH": return <WatchPage/>;
      case "COMMUNITY": return <CommunityPage setPage={setPage}/>;
      case "CONTACT": return <ContactPage/>;
      default: return <HomePage setPage={setPage}/>;
    }
  };

  return (
    <>
      <GlobalStyle/>
      <div className="grain-overlay"/>
      <Nav currentPage={currentPage} setPage={setPage}/>
      <main>{renderPage()}</main>
      <Footer setPage={setPage}/>
    </>
  );
}