export default function Events() {
  const expo3Images = [
    "flagship-expo-3.0-image-1.jpg", "flagship-expo-3.0-image-2.jpg", "flagship-expo-3.0-image-3.jpg",
    "flagship-expo-3.0-image-4.jpg", "flagship-expo-3.0-image-5.jpg", "flagship-expo-3.0-image-6.jpg",
    "flagship-expo-3.0-image-7.jpg"
  ];

  return (
    <section className="events section mt-5 pt-5" id="events">
      <div className="container text-center mb-5 pb-4">
        <div className="events-banner" style={{ position: "relative", padding: "clamp(2rem, 5vw, 4rem) clamp(0.5rem, 3vw, 2rem)", overflow: "hidden", borderRadius: "30px", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-100%", left: "-25%", width: "100%", height: "300%", background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(34,211,238,0) 60%)", transform: "rotate(30deg)", pointerEvents: "none" }}></div>
          <div style={{ position: "absolute", bottom: "-100%", right: "-25%", width: "100%", height: "300%", background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0) 60%)", transform: "rotate(-30deg)", pointerEvents: "none" }}></div>
          
          <h2 className="fw-bold mb-3" style={{ fontSize: "clamp(1.5rem, 10vw, 4rem)", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "clamp(1px, 1vw, 4px)", textShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}>
            Flagship <br className="d-md-none" /><span style={{ color: "var(--accent-cyan)" }}>Events</span>
          </h2>
          <div style={{ width: "clamp(60px, 15vw, 100px)", height: "4px", background: "var(--accent-cyan)", margin: "0 auto", borderRadius: "2px", boxShadow: "0 0 15px var(--accent-cyan)" }}></div>
        </div>
      </div>

      <div className="event-section mb-5">
        <div className="event-header text-center mb-4">
          <h3 className="event-title display-5 fw-bold" style={{ color: "var(--text-primary)" }}>Robo Expo 3.0</h3>
          <div className="event-date text-secondary">Fall 2025</div>
        </div>
        <div className="event-pin-container">
          <div className="event-details-sidebar">
            <p className="event-desc mb-4">Innovation took center stage at the University of Asia Pacific Robotics Club as we successfully hosted <strong>Robo Expo 3.0</strong>.</p>
            <div className="segments-section mb-4">
              <h4>Key Segments</h4>
              <div className="segment-chips">
                <span className="segment-chip">Project Showcase</span>
                <span className="segment-chip">LFR</span>
                <span className="segment-chip">CM14 Rumble</span>
                <span className="segment-chip">RM22 Battle</span>
                <span className="segment-chip">Robo Quiz</span>
              </div>
            </div>
          </div>
          <div className="event-gallery-window swiper">
            <div className="swiper-wrapper">
              {expo3Images.map((img, i) => (
                <div className="event-slide swiper-slide" key={i}>
                  <img src={`/photo/${img}`} alt="Robo Expo 3" className="card-bg-img" />
                </div>
              ))}
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
