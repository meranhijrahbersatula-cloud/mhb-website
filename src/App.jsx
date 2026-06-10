import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Beranda", href: "#hero" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Kegiatan", href: "#kegiatan" },
  { label: "Galeri", href: "#galeri" },
  { label: "Donasi", href: "#donasi" },
  { label: "Kontak", href: "#kontak" },
];

const KEGIATAN = [
  {
    icon: "🤲",
    title: "Santunan Anak Yatim",
    desc: "Memberikan santunan rutin kepada anak-anak yatim di sekitar lingkungan kami sebagai bentuk kepedulian dan kasih sayang.",
    color: "#1a6b3c",
  },
  {
    icon: "🕌",
    title: "Jumat Berkah",
    desc: "Berbagi kebahagiaan setiap Jumat dengan membagikan makanan dan kebutuhan pokok kepada yang membutuhkan.",
    color: "#b8860b",
  },
  {
    icon: "🐄",
    title: "Pemotongan Hewan Kurban",
    desc: "Menyelenggarakan pemotongan hewan kurban setiap Idul Adha dan mendistribusikan daging kepada warga sekitar.",
    color: "#1a6b3c",
  },
  {
    icon: "🎉",
    title: "Perayaan 17 Agustus",
    desc: "Merayakan Hari Kemerdekaan Indonesia bersama seluruh warga dengan berbagai perlombaan dan kegiatan seru.",
    color: "#b8860b",
  },
  {
    icon: "📖",
    title: "Pengajian",
    desc: "Kegiatan pengajian rutin untuk meningkatkan keimanan, pengetahuan agama, dan mempererat ukhuwah Islamiyah.",
    color: "#1a6b3c",
  },
  {
    icon: "🌴",
    title: "Tamasya Bersama Yatim",
    desc: "Mengajak anak-anak yatim untuk berwisata dan menikmati kebersamaan agar mereka merasakan kebahagiaan.",
    color: "#b8860b",
  },
  {
    icon: "🎣",
    title: "Memancing Bersama",
    desc: "Kegiatan memancing bersama sebagai ajang silaturahmi dan rekreasi yang menyenangkan antar anggota komunitas.",
    color: "#1a6b3c",
  },
  {
  icon: "🏥",
  title: "Menjenguk Orang Sakit",
  desc: "Mengunjungi anggota komunitas atau warga yang sedang sakit sebagai bentuk kepedulian, dukungan moral, dan mempererat tali silaturahmi.",
  color: "#b8860b",
  },
];

const STATS = [
  { value: "98+", label: "Anggota Aktif" },
  { value: "100+", label: "Yatim Disantuni" },
  { value: "8", label: "Program Kegiatan" },
  { value: "6", label: "Tahun Berdiri" },
];

function useIntersect(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useIntersect();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyRek = () => {
    navigator.clipboard.writeText("193544110");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", background: "#faf8f4", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(15,42,23,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? "1px solid rgba(184,134,11,0.3)" : "none",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
<div
  style={{
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  }}
  onClick={() => scrollTo("#hero")}
>
  <img
    src="/mhb-website/mhb-logo-horizontal.png"
    alt="Meran Hijrah Bersatu"
    style={{
      height: "46px",
      width: "auto",
      display: "block",
      objectFit: "contain",
    }}
  />
</div>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.85)", fontSize: 14, fontFamily: "'Lora',serif", letterSpacing: 0.5, padding: "4px 0", borderBottom: "1px solid transparent", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.color = "#f0c040"; e.target.style.borderBottomColor = "#f0c040"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.85)"; e.target.style.borderBottomColor = "transparent"; }}
              >{l.label}</button>
            ))}
            <button onClick={() => scrollTo("#donasi")}
              style={{ background: "linear-gradient(135deg, #b8860b, #d4a017)", border: "none", borderRadius: 24, padding: "8px 20px", color: "#fff", fontFamily: "'Lora',serif", fontSize: 13, cursor: "pointer", fontWeight: 600, letterSpacing: 0.5, boxShadow: "0 2px 12px rgba(184,134,11,0.4)" }}>
              💛 Donasi
            </button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 26 }} className="hamburger">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "rgba(15,42,23,0.98)", padding: "16px 5% 24px", borderTop: "1px solid rgba(184,134,11,0.2)" }}>
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.85)", fontSize: 16, fontFamily: "'Lora',serif", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(160deg, #0b2718 0%, #1a5c35 45%, #0e3520 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,11,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,155,90,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        {/* Pattern overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", padding: "120px 5% 80px", maxWidth: 820, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, letterSpacing: 4, color: "#f0c040", textTransform: "uppercase", marginBottom: 24, opacity: 0.9 }}>
            ﷽ &nbsp; Bismillahirrahmanirrahim
          </div>
          <h1 style={{
            fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
            fontSize: "clamp(36px, 7vw, 78px)",
            fontWeight: 700, lineHeight: 1.1,
            color: "#fff", marginBottom: 16,
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}>
            <span style={{ color: "#f0c040" }}>Meran</span> Hijrah<br />Bersatu
          </h1>
          <div style={{ width: 80, height: 3, background: "linear-gradient(90deg, transparent, #f0c040, transparent)", margin: "24px auto" }} />
          <p style={{ fontSize: "clamp(16px, 2.2vw, 20px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px" }}>
            Komunitas sosial non-profit yang berlandaskan nilai-nilai keislaman, kebersamaan, dan kepedulian terhadap sesama di lingkungan Lenteng Agung, Jakarta Selatan.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("#kegiatan")}
              style={{ background: "linear-gradient(135deg, #1a6b3c, #2d9b5a)", border: "none", borderRadius: 32, padding: "14px 32px", color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "'Lora',serif", fontWeight: 600, boxShadow: "0 4px 24px rgba(26,107,60,0.5)", letterSpacing: 0.5 }}>
              🌿 Lihat Kegiatan
            </button>
            <button onClick={() => scrollTo("#donasi")}
              style={{ background: "transparent", border: "2px solid rgba(240,192,64,0.6)", borderRadius: 32, padding: "14px 32px", color: "#f0c040", fontSize: 15, cursor: "pointer", fontFamily: "'Lora',serif", fontWeight: 600, letterSpacing: 0.5 }}>
              💛 Donasi Sekarang
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 2 }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(240,192,64,0.6), transparent)", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "linear-gradient(135deg, #1a6b3c 0%, #0e4a28 100%)", padding: "60px 5%" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div style={{ color: "#f0c040", fontFamily: "'Cinzel', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 8, letterSpacing: 1 }}>{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 5%", background: "#faf8f4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <div style={{ background: "linear-gradient(135deg, #1a6b3c, #2d9b5a)", borderRadius: 24, padding: "52px 40px", color: "#fff", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(240,192,64,0.12)" }} />
                <div style={{ fontSize: 52, marginBottom: 16 }}>🕌</div>
                <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 22, marginBottom: 16, color: "#f0c040" }}>Visi Kami</h3>
                <p style={{ lineHeight: 1.8, opacity: 0.9, fontSize: 15 }}>
                  Menjadi komunitas yang membawa manfaat nyata bagi masyarakat sekitar melalui semangat hijrah, kebersamaan, dan nilai-nilai Islam yang rahmatan lil 'alamin.
                </p>
              </div>
              <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", marginTop: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)", borderLeft: "4px solid #b8860b" }}>
                <h4 style={{ color: "#1a6b3c", fontFamily: "'Cinzel',serif", marginBottom: 10, fontSize: 16 }}>📍 Lokasi Kami</h4>
                <p style={{ color: "#555", lineHeight: 1.7, fontSize: 14 }}>Jl. Raya Lenteng Agung Gg. H. Meran RT10/RW005<br />Kel. Lenteng Agung, Kec. Jagakarsa,<br />Jakarta Selatan</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <div style={{ fontSize: 13, color: "#b8860b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Tentang Komunitas</div>
              <h2 style={{ fontFamily: "'Cinzel Decorative','Cinzel',serif", fontSize: "clamp(26px, 4vw, 40px)", color: "#0e3520", lineHeight: 1.25, marginBottom: 24 }}>
                Bersatu dalam<br />Kebaikan & Hijrah
              </h2>
              <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #1a6b3c, #b8860b)", marginBottom: 28, borderRadius: 2 }} />
              <p style={{ color: "#444", lineHeight: 1.9, fontSize: 15, marginBottom: 20 }}>
                <strong>Komunitas Meran Hijrah Bersatu (MHB)</strong> adalah komunitas non-profit yang lahir dari semangat warga Gg. H. Meran untuk berhijrah bersama menuju kebaikan. Kami hadir untuk menguatkan silaturahmi, meningkatkan kepedulian sosial, dan menjalankan program-program yang bermanfaat bagi masyarakat.
              </p>
              <p style={{ color: "#444", lineHeight: 1.9, fontSize: 15, marginBottom: 32 }}>
                Dengan dukungan donasi dari masyarakat dan semangat gotong royong, kami terus bergerak mewujudkan kegiatan sosial yang menyentuh hati dan memberikan dampak nyata bagi mereka yang membutuhkan.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {["Non-Profit", "Sosial & Religi", "Gotong Royong"].map(tag => (
                  <span key={tag} style={{ background: "rgba(26,107,60,0.1)", color: "#1a6b3c", borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, border: "1px solid rgba(26,107,60,0.2)" }}>{tag}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── KEGIATAN ── */}
      <section id="kegiatan" style={{ padding: "100px 5%", background: "linear-gradient(180deg, #f0ece4 0%, #faf8f4 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 13, color: "#b8860b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Program Kami</div>
              <h2 style={{ fontFamily: "'Cinzel Decorative','Cinzel',serif", fontSize: "clamp(26px, 4vw, 42px)", color: "#0e3520", marginBottom: 16 }}>Kegiatan Komunitas</h2>
              <div style={{ width: 80, height: 3, background: "linear-gradient(90deg, #1a6b3c, #b8860b)", margin: "0 auto", borderRadius: 2 }} />
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
            {KEGIATAN.map((k, i) => (
              <FadeIn key={k.title} delay={i * 0.08}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "36px 28px",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
                    borderTop: `4px solid ${k.color}`,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "default",
                    minHeight: 330,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.13)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.07)";
                  }}
                >
                  <div style={{ fontSize: 44, marginBottom: 20 }}>{k.icon}</div>
                  <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: 17, color: k.color, marginBottom: 12, lineHeight: 1.3 }}>{k.title}</h3>
                  <p style={{ color: "#555", lineHeight: 1.8, fontSize: 14, flexGrow: 1 }}>
                    {k.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERI placeholder ── */}
      <section id="galeri" style={{ padding: "100px 5%", background: "#0e3520" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 13, color: "#f0c040", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Momen Bersama</div>
              <h2 style={{ fontFamily: "'Cinzel Decorative','Cinzel',serif", fontSize: "clamp(26px, 4vw, 40px)", color: "#fff", marginBottom: 16 }}>Galeri Kegiatan</h2>
              <div style={{ width: 80, height: 3, background: "linear-gradient(90deg, #2d9b5a, #f0c040)", margin: "0 auto", borderRadius: 2 }} />
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { label: "Santunan Yatim 2024", icon: "🤲", bg: "#1a5c35" },
              { label: "Jumat Berkah", icon: "🕌", bg: "#0e4228" },
              { label: "Kurban Idul Adha", icon: "🐄", bg: "#1a5c35" },
              { label: "Perayaan 17 Agustus", icon: "🎉", bg: "#0e4228" },
              { label: "Pengajian Rutin", icon: "📖", bg: "#1a5c35" },
              { label: "Tamasya Bersama", icon: "🌴", bg: "#0e4228" },
              { label: "Memancing Bersama", icon: "🎣", bg: "#1a5c35" },
              { label: "Menjenguk Orang Sakit", icon: "🏥", bg: "#0e4228" },
            ].map((g, i) => (
              <FadeIn key={g.label} delay={i * 0.07}>
                <div style={{
                  background: g.bg, borderRadius: 16, aspectRatio: "4/3",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(240,192,64,0.2)",
                  transition: "all 0.3s",
                  position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(240,192,64,0.6)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,192,64,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{g.icon}</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, letterSpacing: 0.5, textAlign: "center", padding: "0 16px" }}>{g.label}</div>
                  <div style={{ position: "absolute", bottom: 12, right: 12, fontSize: 11, color: "rgba(240,192,64,0.6)", letterSpacing: 1 }}>📷 Foto segera hadir</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginTop: 32, fontSize: 13, letterSpacing: 1 }}>
              Dokumentasi foto & video akan terus diperbarui
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── DONASI ── */}
      <section id="donasi" style={{ padding: "100px 5%", background: "linear-gradient(135deg, #faf8f4, #f0ece4)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontSize: 13, color: "#b8860b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Berbagi Kebaikan</div>
            <h2 style={{ fontFamily: "'Cinzel Decorative','Cinzel',serif", fontSize: "clamp(26px, 4vw, 42px)", color: "#0e3520", marginBottom: 16 }}>Donasi & Dukungan</h2>
            <div style={{ width: 80, height: 3, background: "linear-gradient(90deg, #1a6b3c, #b8860b)", margin: "0 auto 28px", borderRadius: 2 }} />
            <p style={{ color: "#555", lineHeight: 1.8, fontSize: 16, marginBottom: 48 }}>
              Setiap donasi Anda adalah amal jariyah yang membantu kami menjalankan program sosial untuk anak yatim dan warga yang membutuhkan. Jazakallahu khairan.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: "#fff", borderRadius: 28, padding: "48px 40px", boxShadow: "0 16px 64px rgba(0,0,0,0.1)", border: "1px solid rgba(184,134,11,0.15)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #1a6b3c, #b8860b, #1a6b3c)" }} />
              <div style={{ fontSize: 56, marginBottom: 8 }}>🏦</div>
              <div style={{ fontSize: 13, color: "#b8860b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Bank BNI</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(28px, 5vw, 44px)", color: "#0e3520", fontWeight: 700, letterSpacing: 4, marginBottom: 8 }}>193544110</div>
              <div style={{ color: "#666", fontSize: 15, marginBottom: 32 }}>a/n <strong style={{ color: "#1a6b3c" }}>Bambang Sucipto</strong></div>
              <button onClick={copyRek} style={{
                background: copied ? "linear-gradient(135deg, #1a6b3c, #2d9b5a)" : "linear-gradient(135deg, #b8860b, #d4a017)",
                border: "none", borderRadius: 32, padding: "14px 36px",
                color: "#fff", fontSize: 15, cursor: "pointer",
                fontFamily: "'Lora',serif", fontWeight: 600,
                boxShadow: copied ? "0 4px 20px rgba(26,107,60,0.4)" : "0 4px 20px rgba(184,134,11,0.4)",
                transition: "all 0.3s", letterSpacing: 0.5,
              }}>
                {copied ? "✅ Tersalin!" : "📋 Salin Nomor Rekening"}
              </button>
              <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(26,107,60,0.06)", borderRadius: 16, border: "1px solid rgba(26,107,60,0.12)" }}>
                <p style={{ color: "#1a6b3c", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  💚 Donasi Anda akan langsung digunakan untuk kegiatan sosial komunitas. Komunitas kami bersifat <strong>non-profit</strong> dan mengedepankan transparansi dalam pengelolaan dana.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── KONTAK ── */}
      <section id="kontak" style={{ padding: "100px 5%", background: "#0b2718" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontSize: 13, color: "#f0c040", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Hubungi Kami</div>
            <h2 style={{ fontFamily: "'Cinzel Decorative','Cinzel',serif", fontSize: "clamp(26px, 4vw, 40px)", color: "#fff", marginBottom: 16 }}>Bergabung Bersama Kami</h2>
            <div style={{ width: 80, height: 3, background: "linear-gradient(90deg, #2d9b5a, #f0c040)", margin: "0 auto 48px", borderRadius: 2 }} />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { icon: "📍", title: "Alamat", info: "Jl. Raya Lenteng Agung Gg. H. Meran RT10/RW005, Kel. Lenteng Agung, Kec. Jagakarsa, Jakarta Selatan", color: "#2d9b5a" },
              { icon: "🕌", title: "Yuk Bergabung!", info: "Kami terbuka untuk siapa saja yang ingin berkontribusi dan berhijrah bersama menuju kebaikan.", color: "#f0c040" },
              { icon: "💳", title: "Info Donasi", info: "Bank BNI • 193544110 • a/n Bambang Sucipto", color: "#2d9b5a" },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: "36px 28px", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(240,192,64,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
                  <h3 style={{ fontFamily: "'Cinzel',serif", color: c.color, fontSize: 16, marginBottom: 12 }}>{c.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.8 }}>{c.info}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#060f09", padding: "40px 5%", textAlign: "center", borderTop: "1px solid rgba(240,192,64,0.15)" }}>
        <div style={{ fontFamily: "'Cinzel',serif", color: "#f0c040", fontSize: 20, marginBottom: 8 }}>MHB</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 16, letterSpacing: 1 }}>Meran Hijrah Bersatu</div>
        <div style={{ width: 60, height: 1, background: "rgba(240,192,64,0.3)", margin: "0 auto 20px" }} />
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, letterSpacing: 0.5 }}>
          © 2025 Komunitas Meran Hijrah Bersatu · Jakarta Selatan · Non-Profit Organization
        </p>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, marginTop: 8 }}>
          Semoga setiap langkah kita menjadi amal jariyah 🌙
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }
        /* Grid adjustments for about section */
        @media (max-width: 860px) {
          #about > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
