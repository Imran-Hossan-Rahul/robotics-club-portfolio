export default function Hero() {
  return (
    <header className="hero section fade-in" id="hero">
      <div className="container text-center hero-content" style={{ position: "relative", zIndex: 10 }}>
        <img
          src="/photo/robotics-club-logo.png"
          alt="Robotics Club Logo"
          id="hero-main-logo"
          style={{ width: "130px", height: "auto", marginBottom: "25px" }}
        />
        <h1 className="hero-title">Robotics Club</h1>
        <h2 className="hero-subtitle">University of Asia Pacific</h2>
        <p className="hero-mission">
          We are dedicated to fostering innovation in robotics, providing students with hands-on experience, and building competitive autonomous systems.
        </p>
        <div className="hero-buttons">
          <a href="#committee" className="btn btn-outline">
            Meet the Team
          </a>
          <a href="#partner" className="btn btn-amber">
            Partner With Us
          </a>
        </div>
      </div>
    </header>
  );
}
