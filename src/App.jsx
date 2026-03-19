import { useState, useEffect } from "react";

const BLUE_DARK = "#1a2b6b";
const BLUE_MID = "#2d4bbf";
const BLUE_LIGHT = "#4a6cf7";
const BLUE_PALE = "#c8d4f8";
const BLUE_BG = "#f0f4ff";

/* ── Global Styles (single source of truth) ── */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'Barlow', sans-serif; }

      /* Nav */
      .nav-link-btn { background: transparent; }
      .nav-link-btn:hover { background: ${BLUE_PALE} !important; }
      .nav-cta-btn:hover { transform: translateY(-1px); }

      /* Hero buttons */
      .btn-primary { box-shadow: 0 8px 28px rgba(45,75,191,0.4); }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(45,75,191,0.5) !important; }
      .btn-outline:hover { background: ${BLUE_PALE} !important; }

      /* Program cards */
      .program-card { box-shadow: 0 4px 24px rgba(26,43,107,0.07); }
      .program-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(26,43,107,0.15) !important; }

      /* Partner cards */
      .partner-card { box-shadow: 0 2px 12px rgba(26,43,107,0.05); }
      .partner-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(26,43,107,0.12) !important; border-color: ${BLUE_LIGHT} !important; }

      /* Contact links */
      .contact-wa-btn:hover { transform: translateY(-2px); }
      .contact-link-btn:hover { transform: translateY(-2px); background: rgba(255,255,255,0.25) !important; }

      /* Responsive */
      @media (max-width: 768px) {
        .desktop-nav { display: none !important; }
        .hamburger { display: flex !important; }
      }
      @media (max-width: 900px) {
        .programs-scroll-wrapper {
          overflow-x: auto !important;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 16px !important;
        }
        .programs-scroll-wrapper::-webkit-scrollbar { height: 4px; }
        .programs-scroll-wrapper::-webkit-scrollbar-track { background: #e0e8ff; border-radius: 4px; }
        .programs-scroll-wrapper::-webkit-scrollbar-thumb { background: ${BLUE_LIGHT}; border-radius: 4px; }
        .programs-grid { grid-template-columns: repeat(4, 280px) !important; padding-right: 24px !important; }
        .programs-scroll-hint { display: block !important; }
      }
      @media (max-width: 640px) {
        .case-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 600px) {
        .programs-grid { grid-template-columns: repeat(4, 85vw) !important; }
      }
    `}</style>
  );
}

/* ── Logo ── */
const LogoSVG = ({ size = 40, textColor = "#111" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <img src="/logo.png" alt="SELOGAN" width={size} height={size} style={{ objectFit: "contain" }} />
    <div>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: size * 0.55, letterSpacing: 1, color: textColor, lineHeight: 1 }}>SELOGAN</div>
      <div style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: size * 0.22, letterSpacing: 2, color: BLUE_MID, lineHeight: 1.2 }}>YOUR CLEAR PATH UPWARD</div>
    </div>
  </div>
);

/* ── Decorative S watermark ── */
const SWatermark = ({ opacity = 0.06, right = true }) => (
  <svg
    style={{ position: "absolute", [right ? "right" : "left"]: -60, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 0 }}
    width={320} height={420} viewBox="0 0 320 420" fill="none"
  >
    <path d="M260 60 C260 60 60 60 60 130 C60 200 260 180 260 250 C260 320 60 320 60 360"
      stroke={BLUE_DARK} strokeWidth="80" strokeLinecap="round" opacity={opacity} fill="none" />
  </svg>
);

/* ── NAV ── */
const navLinks = [
  { id: "about", label: "About" },
  { id: "programs", label: "Programs" },
  { id: "cases", label: "Case Studies" },
  { id: "partners", label: "Partners" },
  { id: "contact", label: "Contact" },
];

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)",
      boxShadow: scrolled ? "0 2px 24px rgba(26,43,107,0.10)" : "none",
      transition: "all 0.3s ease",
      borderBottom: scrolled ? `2px solid ${BLUE_PALE}` : "2px solid transparent",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <LogoSVG size={36} />

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              className="nav-link-btn"
              style={{
                background: active === link.id ? BLUE_LIGHT : undefined,
                color: active === link.id ? "#fff" : BLUE_DARK,
                border: "none", cursor: "pointer",
                padding: "8px 18px", borderRadius: 8,
                fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 14,
                letterSpacing: 0.5, transition: "all 0.2s",
              }}
            >{link.label}</button>
          ))}
          <button onClick={() => scrollTo("contact")}
            className="nav-cta-btn"
            style={{
              background: `linear-gradient(135deg, ${BLUE_MID}, ${BLUE_DARK})`,
              color: "#fff", border: "none", cursor: "pointer",
              padding: "9px 22px", borderRadius: 8, marginLeft: 8,
              fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14,
              letterSpacing: 0.5, boxShadow: "0 4px 14px rgba(45,75,191,0.35)",
              transition: "transform 0.15s",
            }}
          >Let's Connect</button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="hamburger" style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          padding: 8, flexDirection: "column", gap: 5, alignItems: "center"
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 26, height: 2.5, borderRadius: 2,
              background: BLUE_DARK,
              transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none",
              transition: "all 0.2s",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#fff", borderTop: `1px solid ${BLUE_PALE}`,
          padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 4
        }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 0", textAlign: "left",
              fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 16,
              color: active === link.id ? BLUE_LIGHT : BLUE_DARK,
              borderBottom: `1px solid ${BLUE_PALE}`,
            }}>{link.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", background: `linear-gradient(150deg, #fff 0%, ${BLUE_BG} 50%, ${BLUE_PALE} 100%)`,
      display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      paddingTop: 68,
    }}>
      <SWatermark opacity={0.07} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{
          display: "inline-block", background: BLUE_PALE, color: BLUE_DARK,
          padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
          letterSpacing: 1.5, marginBottom: 28, textTransform: "uppercase"
        }}>Business Communication Advisory</div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
          fontSize: "clamp(52px, 8vw, 96px)", lineHeight: 0.95, color: BLUE_DARK,
          marginBottom: 28, letterSpacing: -1,
        }}>
          YOUR<br />
          <span style={{ color: BLUE_LIGHT }}>CLEAR PATH</span><br />
          UPWARD
        </h1>
        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)", color: "#444", maxWidth: 540,
          lineHeight: 1.7, marginBottom: 44, fontWeight: 400,
        }}>
          We help growing organizations align people, clarify value, and strengthen revenue execution through structured communication systems.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
            style={{
              background: `linear-gradient(135deg, ${BLUE_LIGHT}, ${BLUE_DARK})`,
              color: "#fff", border: "none", cursor: "pointer",
              padding: "16px 36px", borderRadius: 10,
              fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
          >Explore Programs</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline"
            style={{
              background: "transparent", color: BLUE_DARK,
              border: `2px solid ${BLUE_MID}`, cursor: "pointer",
              padding: "14px 36px", borderRadius: 10,
              fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 16,
              transition: "all 0.15s",
            }}
          >Let's Connect</button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
          {[["4+", "Programs Offered"], ["3+", "Case Studies"], ["8+", "Partner Organizations"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 44, color: BLUE_DARK, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 13, color: "#666", fontWeight: 500, letterSpacing: 0.5, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about" style={{
      background: "#fff", padding: "100px 24px", position: "relative", overflow: "hidden"
    }}>
      <SWatermark opacity={0.05} />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 3, color: BLUE_LIGHT, marginBottom: 16, textTransform: "uppercase" }}>About Selogan</div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
          fontSize: "clamp(36px, 5vw, 64px)", color: BLUE_DARK, lineHeight: 1,
          marginBottom: 40,
        }}>ABOUT<br /><span style={{ color: BLUE_LIGHT }}>SELOGAN</span></h2>
        <p style={{ fontSize: 17, color: "#444", lineHeight: 1.9, marginBottom: 24 }}>
          SELOGAN is a <strong style={{ color: BLUE_DARK }}>Business Communication Advisory</strong> that helps growing organizations align people, clarify value, and strengthen revenue execution through structured communication systems. What began as an English-focused communication studio evolved through a deeper realization: companies rarely struggle because of language — they struggle because their communication systems do not scale with growth.
        </p>
        <p style={{ fontSize: 17, color: "#444", lineHeight: 1.9 }}>
          Today, we serve founders and leadership teams as a strategic thinking partner during scale-up and transition phases. By designing People Alignment, Value Narrative, and Revenue Communication systems, we help organizations ensure that strategy is not only defined at the top — but clearly interpreted, consistently executed, and translated into measurable business results.
        </p>
      </div>
    </section>
  );
}

/* ── PROGRAMS ── */
const programs = [
  {
    image: "/program-images/english-career.jpeg",
    title: "English for Career Growth",
    subtitle: "English Communication Advisory",
    desc: "A structured English development program designed for professionals who aim to advance their career, expand global opportunities, and communicate with confidence in strategic environments.",
    color: BLUE_LIGHT,
  },
  {
    image: "/program-images/hr-communication.jpeg",
    title: "HR Communication Advisory",
    subtitle: "Internal Communication Systems",
    desc: "Advisory program to strengthen internal communication structure, leadership messaging, and performance alignment within the organization.",
    color: "#2563c6",
  },
  {
    image: "/program-images/marketing-branding.png",
    title: "Marketing & Branding Communication Advisory",
    subtitle: "Brand Messaging Strategy",
    desc: "Strategic guidance to refine market positioning, brand messaging, and communication direction so businesses can speak clearly to the right audience.",
    color: BLUE_MID,
  },
  {
    image: "/program-images/sales-communication.jpeg",
    title: "Sales Communication Advisory",
    subtitle: "Revenue Communication",
    desc: "Advisory support to design structured sales communication that improves conversion, strengthens negotiation confidence, and builds a consistent sales pipeline.",
    color: BLUE_DARK,
  },
];

function Programs() {
  return (
    <section id="programs" style={{ background: BLUE_BG, padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <SWatermark opacity={0.05} right={false} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 3, color: BLUE_LIGHT, marginBottom: 12, textTransform: "uppercase" }}>What We Offer</div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", color: BLUE_DARK, lineHeight: 1 }}>
            PROGRAMS<br /><span style={{ color: BLUE_LIGHT }}>WE OFFER</span>
          </h2>
        </div>
      </div>

      {/* Scroll hint on mobile */}
      <div className="programs-scroll-hint" style={{ display: "none", textAlign: "center", marginBottom: 12, fontSize: 12, color: "#888" }}>
        ← Swipe to see more →
      </div>

      {/* Horizontally scrollable on mobile, grid on desktop */}
      <div className="programs-scroll-wrapper" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 8 }}>
        <div className="programs-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(260px, 1fr))",
          gap: 24,
          padding: "0 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          {programs.map((prog) => (
            <div key={prog.title}
              className="program-card"
              style={{
                background: "#fff", borderRadius: 20, padding: "36px 28px",
                border: "1px solid rgba(200,212,248,0.5)",
                transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative", overflow: "hidden",
                scrollSnapAlign: "start",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 4,
                background: prog.color, borderRadius: "20px 20px 0 0"
              }} />
              <img src={prog.image} alt={prog.title} style={{
                width: "100%", height: 160, objectFit: "cover",
                borderRadius: 12, marginBottom: 20, display: "block",
              }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: prog.color, textTransform: "uppercase", marginBottom: 8 }}>{prog.subtitle}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: BLUE_DARK, marginBottom: 16, lineHeight: 1.2 }}>{prog.title}</h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{prog.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CASE STUDIES ── */
const cases = [
  {
    category: "English for Career Growth",
    name: "Rizkia",
    program: "English Communication Advisory (ECA)",
    challenge: "A young professional faced difficulties communicating confidently in English during job interviews due to limited fluency and low self-confidence. These challenges affected the client's ability to articulate ideas clearly in a competitive recruitment process.",
    approach: "Through structured speaking practice, interview simulations, and targeted communication frameworks, the client progressively improved fluency, clarity, and confidence in professional English conversations.",
    result: "As a result, the client successfully passed the English interview stage and secured a position at their targeted company.",
    image: "/case-images/rizkia_1.jpeg",
    icon: "🎓",
    color: BLUE_LIGHT,
  },
  {
    category: "English for Career Growth",
    name: "Angga",
    program: "English Communication Advisory (ECA)",
    challenge: "A scholarship applicant struggled to structure a compelling and competitive essay, unsure how to articulate personal goals and academic vision effectively in English.",
    approach: "Through guided essay structuring, narrative refinement, and strategic positioning of achievements, the applicant developed a clear and persuasive scholarship application.",
    result: "As a result, the candidate received a scholarship offer in Dubai and is currently pursuing their studies there.",
    image: "/case-images/angga_1.jpeg",
    icon: "✈️",
    color: "#2563c6",
  },
  {
    category: "Marketing & Sales Communication Advisory",
    name: "OZA Tea, Bandung",
    program: "M&S Communication Advisory",
    challenge: "The marketing team struggled to identify the right target market and lacked a structured approach to accelerate B2B conversions. As a result, market outreach was inconsistent and closing rates remained uncertain.",
    approach: "Through strategic market-fit analysis and structured communication frameworks, the marketing team learned how to identify and validate their target segments more systematically. At the same time, the sales team was equipped with practical frameworks and roleplay simulations to strengthen B2B closing conversations.",
    result: "As a result, the team developed a more scalable market analysis approach and improved confidence in handling B2B sales discussions and closing opportunities.",
    image: "/case-images/oza-tea_1.jpeg",
    icon: "📊",
    color: BLUE_MID,
  },
];

function CaseStudies() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <section id="cases" style={{ background: "#fff", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <SWatermark opacity={0.05} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 3, color: BLUE_LIGHT, marginBottom: 12, textTransform: "uppercase" }}>Real Results</div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", color: BLUE_DARK, lineHeight: 1 }}>
            CASE<br /><span style={{ color: BLUE_LIGHT }}>STUDIES</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap", justifyContent: "center" }}>
          {cases.map((c, i) => (
            <button key={i} onClick={() => { setActive(i); setLightbox(false); }} style={{
              background: active === i ? c.color : "transparent",
              color: active === i ? "#fff" : BLUE_DARK,
              border: `2px solid ${active === i ? c.color : BLUE_PALE}`,
              padding: "10px 20px", borderRadius: 10, cursor: "pointer",
              fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: 13,
              transition: "all 0.2s",
            }}>{c.name}</button>
          ))}
        </div>

        {/* Case card */}
        <div style={{
          background: BLUE_BG, borderRadius: 24, padding: "48px",
          border: `1px solid ${BLUE_PALE}`,
          boxShadow: "0 8px 40px rgba(26,43,107,0.07)",
          display: "grid", gridTemplateColumns: "auto 1fr",
          gap: 48, alignItems: "start",
        }} className="case-grid">
          {/* Left image/meta */}
          <div style={{ textAlign: "center", width: 220 }}>
            <div
              onClick={() => setLightbox(true)}
              style={{
                width: 220, borderRadius: 16, marginBottom: 16, overflow: "hidden",
                boxShadow: `0 4px 20px rgba(26,43,107,0.15)`,
                border: `3px solid ${cases[active].color}`,
                cursor: "zoom-in", position: "relative",
              }}
            >
              <img
                src={cases[active].image}
                alt={cases[active].name}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0, background: "rgba(0,0,0,0)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
                className="img-overlay"
              />
            </div>
            <div style={{ fontWeight: 700, color: BLUE_DARK, fontSize: 16, marginBottom: 4 }}>{cases[active].name}</div>
            <div style={{ fontSize: 12, color: cases[active].color, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{cases[active].program}</div>
          </div>

          {/* Right content */}
          <div>
            <div style={{
              display: "inline-block", background: `${cases[active].color}18`,
              color: cases[active].color, padding: "4px 12px", borderRadius: 6,
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
              marginBottom: 20,
            }}>{cases[active].category}</div>

            {[
              { label: "Challenge", text: cases[active].challenge, icon: "⚡" },
              { label: "Approach", text: cases[active].approach, icon: "🔍" },
              { label: "Result", text: cases[active].result, icon: "✅" },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${BLUE_PALE}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 2, color: cases[active].color, textTransform: "uppercase" }}>{item.label}</div>
                </div>
                <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, cursor: "zoom-out",
          }}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <img
              src={cases[active].image}
              alt={cases[active].name}
              style={{
                maxWidth: "90vw", maxHeight: "90vh",
                borderRadius: 16, objectFit: "contain",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              }}
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(false)}
              style={{
                position: "absolute", top: -16, right: -16,
                width: 36, height: 36, borderRadius: "50%",
                background: "#fff", border: "none", cursor: "pointer",
                fontSize: 18, fontWeight: 700, color: BLUE_DARK,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >×</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── PARTNERS ── */
const partners = [
  { name: "lulusnegeri.com", sub: "Teman Sukses Lulus PTN", emoji: "🎓" },
  { name: "OZA Premium", sub: "Preanger 1835 Planters", emoji: "🍵" },
  { name: "Selamat Pagi Korea", sub: "", emoji: "🇰🇷" },
  { name: "JMC Indonesia", sub: "", emoji: "📋" },
  { name: "Lucky Cheese", sub: "Korean Cheese Coin Pancake", emoji: "🧀" },
  { name: "eduLab", sub: "", emoji: "🔬" },
  { name: "JOGIIA", sub: "", emoji: "💎" },
  { name: "Alfa Gamma", sub: "Pilihan Pelajar Berprestasi", emoji: "⭐" },
];

function Partners() {
  return (
    <section id="partners" style={{ background: BLUE_BG, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <SWatermark opacity={0.05} right={false} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 3, color: BLUE_LIGHT, marginBottom: 12, textTransform: "uppercase" }}>Trusted By</div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", color: BLUE_DARK, lineHeight: 1 }}>
            OUR <span style={{ color: BLUE_LIGHT }}>PARTNERS</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {partners.map((p) => (
            <div key={p.name}
              className="partner-card"
              style={{
                background: "#fff", borderRadius: 16, padding: "28px 20px",
                textAlign: "center", border: `1px solid ${BLUE_PALE}`,
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{p.emoji}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: BLUE_DARK, lineHeight: 1.2 }}>{p.name}</div>
              {p.sub && <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{p.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section id="contact" style={{
      background: `linear-gradient(150deg, ${BLUE_DARK} 0%, ${BLUE_MID} 60%, ${BLUE_LIGHT} 100%)`,
      padding: "100px 24px", position: "relative", overflow: "hidden", color: "#fff",
    }}>
      {/* Watermark */}
      <svg style={{ position: "absolute", right: -80, bottom: -80, opacity: 0.08, pointerEvents: "none" }} width={400} height={400} viewBox="0 0 400 400">
        <path d="M300 60 C300 60 100 60 100 150 C100 240 300 210 300 300 C300 390 100 390 100 390"
          stroke="#fff" strokeWidth="80" strokeLinecap="round" fill="none" />
      </svg>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{
          display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#fff",
          padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
          letterSpacing: 2, marginBottom: 24, textTransform: "uppercase", backdropFilter: "blur(8px)"
        }}>Get In Touch</div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
          fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 0.95, marginBottom: 20,
        }}>
          LET'S<br />CONNECT
        </h2>
        <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 500, margin: "0 auto 56px", lineHeight: 1.6 }}>
          Ready to align your people, clarify your value, and strengthen your revenue execution?
        </p>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <a href="https://wa.me/628812456880" target="_blank" rel="noopener noreferrer"
            className="contact-wa-btn"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#25D366", color: "#fff",
              padding: "18px 32px", borderRadius: 12,
              textDecoration: "none", fontWeight: 700, fontSize: 16,
              boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
              transition: "transform 0.15s",
            }}
          >
            <span style={{ fontSize: 22 }}>💬</span>
            Chat on WhatsApp
          </a>
          <a href="https://linktr.ee/seloganid" target="_blank" rel="noopener noreferrer"
            className="contact-link-btn"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.15)", color: "#fff",
              padding: "18px 32px", borderRadius: 12,
              textDecoration: "none", fontWeight: 700, fontSize: 16,
              border: "2px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(8px)",
              transition: "transform 0.15s, background 0.15s",
            }}
          >
            <span style={{ fontSize: 22 }}>🔗</span>
            linktr.ee/seloganid
          </a>
        </div>

        {/* Footer logo */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <LogoSVG size={32} textColor="#fff" />
          <p style={{ fontSize: 13, opacity: 0.6 }}>© {new Date().getFullYear()} SELOGAN. Your Clear Path Upward.</p>
        </div>
      </div>
    </section>
  );
}

/* ── BACK TO TOP BUTTON ── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 48, height: 48, borderRadius: "50%",
        background: `linear-gradient(135deg, ${BLUE_LIGHT}, ${BLUE_DARK})`,
        color: "#fff", border: "none", cursor: "pointer",
        fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 6px 24px rgba(26,43,107,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
        pointerEvents: visible ? "auto" : "none",
      }}
      title="Back to top"
    >↑</button>
  );
}

/* ── ACTIVE SECTION HOOK ── */
function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["about", "programs", "cases", "partners", "contact"];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ── APP ── */
export default function App() {
  const active = useActiveSection();

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif" }}>
      <GlobalStyles />
      <Navbar active={active} />
      <Hero />
      <About />
      <Programs />
      <CaseStudies />
      <Partners />
      <Contact />
      <BackToTop />
    </div>
  );
}
