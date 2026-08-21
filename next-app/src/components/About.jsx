export default function About() {
  return (
    <section className="about section fade-in" id="about">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2>About Us</h2>
        </div>
        
        {/* Legacy of Innovation Section */}
        <div className="details-section p-4 p-md-5" style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(34, 211, 238, 0.15)", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
          <h3 className="display-6 fw-bold mb-4 text-center legacy-heading" style={{ color: "var(--text-primary)" }}>A Legacy of Innovation</h3>
          <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
            The Robotics Club at the University of Asia Pacific has been at the forefront of technological excellence. Over the years, we have grown from a small group of enthusiasts to a powerhouse of innovation. Our journey is defined by the incredible passion of our members, the countless hours spent in the lab, and the relentless pursuit of perfection in every circuit we solder and every line of code we write.
          </p>
          <p className="text-secondary" style={{ lineHeight: "1.8" }}>
            Through our flagship events, technical workshops, and national competitions, we have consistently pushed the boundaries of what student-led robotics can achieve. This platform is not just about building robots; it's about building the leaders, thinkers, and engineers of tomorrow.
          </p>
        </div>

      </div>
    </section>
  );
}
