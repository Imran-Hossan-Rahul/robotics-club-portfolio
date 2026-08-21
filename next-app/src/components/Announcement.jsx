export default function Announcement() {
  return (
    <div className="container pt-5 pb-5 position-relative announcement-container" style={{ marginTop: "150px", zIndex: 1 }}>
      <div className="text-center mb-5 position-relative" style={{ zIndex: 10 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes premiumBulbPulse {
                0%, 100% { box-shadow: 0 0 10px #fff, 0 0 30px #F59E0B, 0 0 60px #F59E0B, 0 0 100px #F59E0B; transform: translateX(-50%) scale(1); }
                50% { box-shadow: 0 0 20px #fff, 0 0 40px #F59E0B, 0 0 80px #F59E0B, 0 0 150px #F59E0B; transform: translateX(-50%) scale(1.2); }
            }
            @keyframes premiumFlarePulse {
                0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
                50% { opacity: 1; transform: translateX(-50%) scaleX(1.4); }
            }
            @keyframes premiumGlowPulse {
                0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(0.95); }
                50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
            }
            @keyframes smoothRipple {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                10% { opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
            }
            .wave-ripple {
                position: absolute; top: -300px; left: 50%; width: 1200px; height: 1200px; transform-origin: center; transform: translate(-50%, -50%) scale(0.5); border-radius: 50%; border: 4px solid rgba(245,158,11,0.85); box-shadow: 0 0 8px rgba(245,158,11,0.7), inset 0 0 8px rgba(245,158,11,0.7); animation: smoothRipple 10s linear infinite; will-change: transform, opacity;
            }
          `}} />
          <div style={{ position: "absolute", top: "100%", left: "-800px", right: "-800px", height: "800px", overflow: "hidden", zIndex: 1, pointerEvents: "none", mixBlendMode: "screen", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 100px, transparent 290px)", maskImage: "linear-gradient(to bottom, black 0%, black 100px, transparent 290px)" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", bottom: 0, transform: "translateX(-50%)", width: "1600px", WebkitMaskImage: "conic-gradient(from 115deg at 50% 0%, transparent 0deg, black 65deg, transparent 130deg)", maskImage: "conic-gradient(from 115deg at 50% 0%, transparent 0deg, black 65deg, transparent 130deg)", pointerEvents: "none" }}>
              <div className="wave-ripple" style={{ animationDelay: "0s" }}></div>
              <div className="wave-ripple" style={{ animationDelay: "-3.33s" }}></div>
              <div className="wave-ripple" style={{ animationDelay: "-6.66s" }}></div>
            </div>
            <div style={{ position: "absolute", top: "0px", left: "50%", transform: "translateX(-50%)", width: "clamp(100px, 30vw, 250px)", height: "2px", background: "linear-gradient(90deg, transparent, rgba(245,158,11,1) 30%, #fff 50%, rgba(245,158,11,1) 70%, transparent)", boxShadow: "0 0 20px #F59E0B, 0 0 40px #F59E0B", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "150px", background: "radial-gradient(ellipse at top center, rgba(255,255,255,0.4) 0%, transparent 60%)", filter: "blur(15px)" }}></div>
            <div style={{ position: "absolute", top: "-8px", left: "50%", transform: "translateX(-50%)", width: "16px", height: "16px", background: "#fff", borderRadius: "50%", boxShadow: "0 0 10px #fff, 0 0 30px #F59E0B, 0 0 60px #F59E0B, 0 0 100px #F59E0B" }}></div>
            <div className="announcement-glow"><div className="announcement-glow-inner"></div></div>
          </div>
          <h2 className="display-4 fw-bold announcement-title" style={{ position: "relative", zIndex: 2, margin: 0, fontFamily: "var(--font-orbitron)", color: "#E8EDF5", letterSpacing: "2px", textShadow: "0 0 30px rgba(255,255,255,0.3)", background: "rgba(10, 14, 20, 0.85)", padding: "15px 50px", borderRadius: "50px", border: "1px solid rgba(34, 211, 238, 0.15)", boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(34, 211, 238, 0.05)", backdropFilter: "blur(20px)" }}>
            Announcement
          </h2>
        </div>
      </div>

      <div style={{ position: "relative", marginTop: "180px", zIndex: 5 }}>
        <div style={{ position: "absolute", top: "-3px", left: "-3px", right: "-3px", height: "40px", background: "linear-gradient(90deg, transparent, #F59E0B 15%, #F59E0B 85%, transparent)", borderRadius: "23px 23px 0 0", zIndex: -1 }}></div>
        <div style={{ background: "linear-gradient(135deg, rgba(15,20,35,0.98) 0%, rgba(8,12,22,1) 100%)", border: "1px solid rgba(34,211,238,0.3)", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "stretch", flexWrap: "wrap", position: "relative" }}>
          <div style={{ flex: "1 1 420px", maxWidth: "clamp(250px, 100%, 420px)", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <img src="/photo/745a421a-f181-415a-ab98-c771c1ecd470.jpg" alt="IRO Bangladesh Open 2026" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
          </div>
          <div style={{ flex: "1 1 250px", minWidth: 0, padding: "clamp(20px, 5vw, 36px) clamp(15px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center", position: "relative" }}>
            <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 700, color: "#E8EDF5", margin: 0, lineHeight: 1.2, wordBreak: "break-word", overflowWrap: "break-word" }}>IRO Bangladesh Open 2026 is coming to UAP!</h3>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "#94A3B8", margin: 0, lineHeight: 1.75, wordBreak: "break-word", overflowWrap: "break-word" }}>
              The <strong style={{ color: "#E8EDF5" }}>University of Asia Pacific (UAP) Robotics Club</strong> is proud to serve as the <strong style={{ color: "#22D3EE" }}>Co-Host</strong> of IRO Bangladesh Open 2026, organized by <strong style={{ color: "#E8EDF5" }}>Bangladesh Robot Olympiad (BDRO)</strong>.
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "#94A3B8", margin: 0, lineHeight: 1.75, wordBreak: "break-word", overflowWrap: "break-word" }}>
              Join us for two exciting days of innovation and creativity!
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.65rem", color: "#94A3B8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>Venue</div>
                  <div style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "0.9rem", color: "#E8EDF5", fontWeight: 600 }}>University of Asia Pacific (UAP), Dhaka</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.65rem", color: "#94A3B8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>Date</div>
                  <div style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "0.9rem", color: "#F59E0B", fontWeight: 600 }}>11–12 September 2026</div>
                </div>
              </div>
            </div>
            <div className="expo-btn-container" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
              <a href="https://www.bdro.org" target="_blank" rel="noopener noreferrer" className="btn btn-amber expo-btn" style={{ flex: "1 1 140px", minWidth: 0, textAlign: "center", justifyContent: "center", padding: "12px 15px", fontSize: "clamp(0.85rem, 4vw, 1rem)" }}>
                Register &rarr; bdro.org
              </a>
              <a href="https://www.facebook.com/photo.php?fbid=1475872681228466&set=a.554159330066477" target="_blank" rel="noopener noreferrer" className="btn btn-outline expo-btn" style={{ flex: "1 1 120px", minWidth: 0, border: "1px solid rgba(34,211,238,0.35)", textAlign: "center", justifyContent: "center", padding: "12px 15px", fontSize: "clamp(0.85rem, 4vw, 1rem)" }}>
                View Post
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
