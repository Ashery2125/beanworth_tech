// App.jsx
import React, { useState, useEffect } from "react";

// Images / assets (ensure these files exist in ./assets)
import bg1 from "./assets/ph.jpg";
import bg2 from "./assets/tech.jpeg";
import bg3 from "./assets/bg.jpg";
import bg7 from "./assets/bg7.jpg";
import bg6 from "./assets/ps4.jpg";
import logo from "./assets/beanworth1.png";
import whatsappIcon from "./assets/icons/whatsapp.svg";
import twitterIcon from "./assets/icons/twitter.svg";
import instagramIcon from "./assets/icons/instagram.svg";
import facebookIcon from "./assets/icons/facebook.svg";
import linkedinIcon from "./assets/icons/linkedin.svg";
import "./App.css";

function App() {
  const logoColor = "#461719ff";
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
  };

  // slides use the same ids as menu
  const slides = [
    { img: bg1, alt: "About us", link: "/about" },
    { img: bg2, alt: "Information Technology", link: "/information technology" },
    { img: bg3, alt: "Energy", link: "/energy" },
    { img: bg7, alt: "Organization Learning", link: "/organization" },
    { img: bg6, alt: "Holdings", link: "/holdings" },
  ];

  // auto-slide every 5 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((s) => (s + 1) % slides.length);
  }, 10000); 
  return () => clearInterval(interval);
}, [slides.length]);


  const menu = [
    {
      id: "about",
      label: "About",
      icon: "ℹ️",
      overview: "Beanworth — who we are, our mission and values.",
      subPages: [
        { id: "beanworth", label: "Beanworth", content: "Company story, vision & mission." },
        { id: "management", label: "Beanworth Management", content: "Leadership & governance team." },
      ],
    },
    {
      id: "information technology",
      label: "Information Technology",
      icon: "💻",
      overview: "IT solutions: platforms, software, and enterprise services.",
      subPages: [
        { id: "enterprise-rule", label: "Enterprise Rule Management", content: "Enterprise rule management solutions." },
        { id: "data-platform", label: "Data Platform", content: "Data platform & analytics." },
        { id: "enterprise-service", label: "Enterprise Service Business", content: "Enterprise service solutions." },
        { id: "software-development", label: "Software Development", content: "Custom software development." },
      ],
    },
    {
      id: "energy",
      label: "Energy",
      icon: "⚡",
      overview: "Energy consulting, PPA/IP, trading and renewable design.",
      subPages: [
        { id: "feasibility", label: "Feasibility Studies", content: "Project feasibility & assessments." },
        { id: "ppa-ip", label: "PPA / IP", content: "Power Purchase Agreements & Independent Power." },
        { id: "trades", label: "Energy Trades", content: "Energy trading services." },
        { id: "renewable-design", label: "Renewable Energy Design", content: "Renewable energy system design." },
      ],
    },
    {
      id: "organization",
      label: "Organization Learning",
      icon: "📚",
      overview: "Training, customer experience & business transformation.",
      subPages: [
        { id: "customer-experience", label: "Customer Experience / Care", content: "Customer care programs." },
        { id: "public-speakers", label: "Public Speakers", content: "Speaker & coaching services." },
        { id: "business-transformation", label: "Business Transformation", content: "Transformation & change management." },
      ],
    },
    {
      id: "holdings",
      label: "Holdings",
      icon: "🏢",
      overview: "Beanworth holdings and investments.",
      subPages: [
        { id: "softnet", label: "SoftNet", content: "SoftNet — IT subsidiary." },
        { id: "lipalala", label: "LipaLala", content: "LipaLala — payments/fintech." },
      ],
    },
  ];

  const pages = [
    { id: "home", label: "Home", icon: "🏠" },
    ...menu.map((m) => ({ id: m.id, label: m.label, icon: m.icon })),
  ];

  // navigation handlers
  const handleMenuItemClick = (id) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };
  const handleSubPageClick = (mainId, subId) => {
    setCurrentPage(`${mainId}/${subId}`);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // helpers
  const getCurrentCategoryId = () => {
    if (currentPage === "home") return "home";
    return currentPage.split("/")[0];
  };

  const getCurrentSubPageLabel = () => {
    const [main, sub] = currentPage.split("/");
    if (!sub) return null;
    const section = menu.find((m) => m.id === main);
    if (!section) return null;
    const sp = section.subPages.find((s) => s.id === sub);
    return sp ? sp.label : null;
  };

  // slide click: normalize link like '/it' -> 'it'
  const handleSlideClick = (link, e) => {
    if (e && e.preventDefault) e.preventDefault();
    const slug = (link || "").replace(/^\//, "");
    if (slug) setCurrentPage(slug);
    window.scrollTo(0, 0);
  };

  // Navigation component
  const Navigation = () => {
    const currentCategoryId = getCurrentCategoryId();
    const getSubPages = (id) => {
      const section = menu.find((m) => m.id === id);
      return section ? section.subPages : [];
    };
    const hasDropdown = (id) => getSubPages(id).length > 0;
    const subIcon = <span style={{ marginRight: 8, color: logoColor }}>•</span>;

    return (
      <>
        <nav
          className="desktop-nav"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1001,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            background: "white",
            borderBottom: `1px solid rgba(67, 5, 5, 0.08)`,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {pages.map((p) => {
              const dropdown = hasDropdown(p.id);
              return (
                <div
                  key={p.id}
                  style={{ position: "relative", display: "inline-block" }}
                  onMouseEnter={() => dropdown && setOpenDropdown(p.id)}
                  onMouseLeave={() => dropdown && setOpenDropdown(null)}
                >
                  <button
                    onClick={() => handleMenuItemClick(p.id)}
                    style={{
                      background: currentCategoryId === p.id ? logoColor : "white",
                      color: currentCategoryId === p.id ? "white" : logoColor,
                      border: `1px solid rgba(49, 8, 8, 0.08)`,
                      padding: "6px 12px",
                      borderRadius: 20,
                      cursor: "pointer",
                      fontWeight: currentCategoryId === p.id ? 700 : 400,
                      minWidth: 110,
                    }}
                  >
                    <span style={{ marginRight: 6 }}>{p.icon}</span>
                    {p.label}
                    {dropdown && <span style={{ marginLeft: 6, fontSize: 12, opacity: 0.7 }}>▼</span>}
                  </button>

                  {dropdown && openDropdown === p.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: 44,
                        left: 0,
                        background: "#fff",
                        border: `1px solid rgba(74, 7, 7, 0.08)`,
                        borderRadius: 8,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        minWidth: 220,
                        zIndex: 2000,
                      }}
                    >
                      {getSubPages(p.id).map((sp) => (
                        <button
                          key={sp.id}
                          onClick={() => {
                            handleSubPageClick(p.id, sp.id);
                            setOpenDropdown(null);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            background: "none",
                            border: "none",
                            padding: "12px 18px",
                            cursor: "pointer",
                            fontSize: 15,
                            color: logoColor,
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                        >
                          {subIcon}
                          {sp.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Beanworth" style={{ width: 120, height: 50, objectFit: "contain" }} />
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          style={{
            position: "fixed",
            top: 14,
            left: 14,
            zIndex: 1002,
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "white",
            border: `1px solid rgba(54, 6, 6, 0.08)`,
            cursor: "pointer",
            color: logoColor,
          }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile sliding panel */}
        <div
          className="mobile-slide"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: 0,
            left: isMenuOpen ? 0 : "-320px",
            height: "100vh",
            width: 280,
            background: "white",
            zIndex: 1001,
            transition: "left .25s ease",
            paddingTop: 80,
            borderRight: `1px solid rgba(63, 8, 8, 0.08)`,
          }}
        >
          <div style={{ padding: "0 16px" }}>
            <img src={logo} alt="Beanworth" style={{ width: 80, display: "block", margin: "0 auto 8px" }} />
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => handleMenuItemClick(p.id)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 12px",
                  margin: "6px 0",
                  textAlign: "left",
                  borderRight: "none",
                  borderLeft: "none",
                  borderBlockEnd: "1px solid #00000022",
                  borderTop: "none",
                  background: getCurrentCategoryId() === p.id ? logoColor : "white",
                  color: getCurrentCategoryId() === p.id ? "white" : logoColor,
                  fontWeight: getCurrentCategoryId() === p.id ? 700 : 400,
                }}
              >
                <span style={{ marginRight: 8 }}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* backdrop when mobile menu open */}
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.12)",
              zIndex: 1000,
            }}
          />
        )}
      </>
    );
  };

  // Home page UI
  const HomePage = () => (
    <div style={{ padding: "80px 20px 40px", maxWidth: 1200, margin: "0 auto", background: "white" }}>
      {/* mobile logo overlay */}
      <img
        src={logo}
        alt="beanworth"
        onClick={(e) => {
          if (isMobile) e.stopPropagation();
        }}
        style={{
          display: isMobile ? "block" : "none",
          position: "absolute",
          right: isMobile ? 12 : 24,
          top: isMobile ? 8 : 24,
          zIndex: 8,
          width: isMobile ? 110 : 120,
          height: "auto",
          objectFit: "contain",
          padding: 6,
          cursor: "pointer",
          border: "none",

        }}
      />

      <div
        style={{
          position: "relative",
          height: isMobile ? 260 : 460,
          marginTop: -40,
          marginBottom: 20,
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: isMobile ? 90 : 240,
            zIndex: 2,
            pointerEvents: "none",
            boxShadow: `inset 60px 0 70px rgba(23,70,33,0.65), 0 6px 24px rgba(0,0,0,0.08)`,
            mixBlendMode: "normal",
          }}
        />

        <a
          href={slides[currentSlide].link}
          onClick={(e) => handleSlideClick(slides[currentSlide].link, e)}
          style={{ position: "absolute", inset: 0, zIndex: 1, display: "block" }}
        >
          <img
            src={slides[currentSlide].img}
            alt={slides[currentSlide].alt}
            style={{
              width: "100%",
              height: isMobile ? 260 : 460,
              objectFit: "cover",
              filter: "brightness(.95)",
              display: "block",
              boxShadow: `inset 24px 0 48px rgba(70, 45, 23, 0.15), 0 8px 24px rgba(0,0,0,0.12)`,
              position: "relative",
              zIndex: 1,
            }}
            loading="lazy"
          />
        </a>

        <a
          href={slides[currentSlide].link}
          onClick={(e) => handleSlideClick(slides[currentSlide].link, e)}
          style={{
            position: "absolute",
            left: 12,
            bottom: 12,
            zIndex: 7,
            background: "white",
            color: logoColor,
            padding: "6px 10px",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
            display: "inline-block",
            borderBottom: `2px solid rgba(57, 9, 9, 0.08)`,
          }}
        >
          {slides[currentSlide].link ? slides[currentSlide].link.replace(/^\//, "") : "home"}
        </a>

        <button
          onClick={() => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length)}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 7,
            background: "white",
            border: `1px solid rgba(46, 8, 8, 0.08)`,
            padding: "8px 10px",
            borderRadius: 6,
            cursor: "pointer",
            color: logoColor,
            fontSize: 18,
          }}
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentSlide((s) => (s + 1) % slides.length)}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 7,
            background: "white",
            border: `1px solid rgba(43, 9, 9, 0.08)`,
            padding: "8px 10px",
            borderRadius: 6,
            cursor: "pointer",
            color: logoColor,
            fontSize: 18,
          }}
        >
          ›
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p style={{ maxWidth: 800, margin: "8px auto 0", color: logoColor }}>
          Your trusted partner for innovative technology solutions and exceptional service
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
        <div style={{ padding: 16, background: "white", borderRadius: 8, border: `1px solid ${logoColor}` }}>
          Web Development
        </div>
        <div style={{ padding: 16, background: "white", borderRadius: 8, border: `1px solid ${logoColor}` }}>
          Mobile Apps
        </div>
        <div style={{ padding: 16, background: "white", borderRadius: 8, border: `1px solid ${logoColor}` }}>
          Cloud Solutions
        </div>
        <div style={{ padding: 16, background: "white", borderRadius: 8, border: `1px solid ${logoColor}` }}>
          IT Consulting
        </div>
      </div>

      {/* Contact */}
      <div style={{ marginTop: 26 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            border: `1px solid ${logoColor}`,
            padding: 16,
            borderRadius: 8,
            background: "white",
          }}
        >
          <div style={{ flex: "1 1 280px", minWidth: 200 }}>
            <h2 style={{ margin: "0 0 8px 0", color: logoColor }}>Contact Us</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>
                <strong>Phone:</strong> +255 754710606
              </div>
              <div>
                <strong>Email:</strong> <a href="mailto:info@beanworth.co.tz">info@beanworth.co.tz</a>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flex: "0 1 auto" }}>
            <a href="https://wa.me/255754710606" target="_blank" rel="noreferrer">
              <img src={whatsappIcon} alt="whatsapp" style={{ width: 28 }} />
            </a>
            <a href="https://www.twitter.com/beanworth/" target="_blank" rel="noreferrer">
              <img src={twitterIcon} alt="twitter" style={{ width: 28 }} />
            </a>
            <a href="https://www.instagram.com/beanworth/" target="_blank" rel="noreferrer">
              <img src={instagramIcon} alt="instagram" style={{ width: 28 }} />
            </a>
            <a href="https://www.facebook.com/beanworth/" target="_blank" rel="noreferrer">
              <img src={facebookIcon} alt="facebook" style={{ width: 28 }} />
            </a>
            <a href="https://www.linkedin.com/beanworth/" target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="linkedin" style={{ width: 28 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Render main menu overview and sub-pages
  const renderSection = (section) => {
    // If on overview

    

    if (currentPage === section.id) {
      // Special About layout
      if (section.id === "about") {
        return (
          <div style={{ padding: "120px 20px 40px", maxWidth: 1000, margin: "0 auto" }}>
            <h1 style={{ margin: 0 }}>{section.label} Us</h1>
            <p>{section.overview}</p>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
              {section.subPages.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => handleSubPageClick(section.id, sp.id)}
                  style={{
                    padding: 16,
                    background: "#fff",
                    border: `1px solid ${logoColor}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <strong>{sp.label}</strong>
                  <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{sp.content}</div>
                </button>
              ))}
            </div>
          </div>
        );
      }

      // Default overview layout for other sections
      return (
        
        <div style={{ padding: "120px 20px 40px", maxWidth: 1000, margin: "0 auto" }}>

          <h1 style={{ margin: 0 }}>{section.label} Overview</h1>
          <p>{section.overview}</p>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
            {section.subPages.map((sp) => (
              <button
                key={sp.id}
                onClick={() => handleSubPageClick(section.id, sp.id)}
                style={{
                  padding: 16,
                  background: "#fff",
                  border: `1px solid ${logoColor}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <strong>{sp.label}</strong>
                <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{sp.content}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    
    const sub = section.subPages.find((sp) => currentPage === `${section.id}/${sp.id}`);
    if (sub) {
      return (
        <div style={{ padding: "120px 20px 40px", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ marginBottom: 12, color: logoColor, fontWeight: 600 }}>
            <span style={{ opacity: 0.7 }}>{section.label}</span>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>{sub.label}</span>
          </div>

          <button
            onClick={() => setCurrentPage(section.id)}
            style={{
              marginBottom: 18,
              background: "#f5f5f5",
              border: `1px solid ${logoColor}`,
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
              color: logoColor,
            }}
          >
            &larr; Back to {section.label} Overview
          </button>

          <h2>{sub.label}</h2>
          <p>{sub.content}</p>
        </div>
      );
    }

    return null;
  };

  const renderPage = () => {
    if (currentPage === "home") return <HomePage />;
    for (const section of menu) {
      const out = renderSection(section);
      if (out) return out;
    }
    
    return <HomePage />;
  };

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <Navigation />
      <main style={{ marginTop: 72 }}>{renderPage()}</main>
      <footer
        style={{
          textAlign: "center",
          padding: 16,
          background: "#f9f9f9",
          borderTop: "1px solid #ddd",
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        &copy; {new Date().getFullYear()} Beanworth Technology Ltd.
      </footer>
    </div>
  );
}


export function getSlideOrderFromLink(link) {
  if (!link) return null;
  const slides = ["/about", "/it", "/energy", "/org", "/holdings"];
  const normalized = link.replace(/^\//, "").toLowerCase();
  const idx = slides.map((s) => s.replace(/^\//, "").toLowerCase()).indexOf(normalized);
  return idx >= 0 ? idx + 1 : null;
}

export default App;
