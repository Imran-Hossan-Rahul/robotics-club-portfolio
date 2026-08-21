import ContactButton from './ContactButton'
import { useInView } from 'react-intersection-observer'

export default function Partner() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.02, rootMargin: '0px 0px 50px 0px' })
  return (
    <section className={`partner section fade-in ${inView ? 'visible' : ''}`} id="partner" ref={sectionRef}>
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="sponsor-main-heading text-wrap text-break" style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            Power the Next Robo Expo
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Join us in shaping the next generation of engineering leaders.
          </p>
        </div>

        <div className="why-sponsor mt-5">
          <h3 className="text-center mb-3">Why Sponsor Us?</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h4>Brand Visibility</h4>
              <p>Reach over 2,909 engineering students and faculty.</p>
            </div>
            <div className="benefit-card">
              <h4>Media Reach</h4>
              <p>Extensive social media coverage and local press reach.</p>
            </div>
            <div className="benefit-card">
              <h4>Association with Innovation</h4>
              <p>Align your brand with cutting-edge student projects.</p>
            </div>
          </div>
        </div>

        <div className="partner-cta text-center mt-5">
          <ContactButton text="Become a Sponsor" />
        </div>
      </div>
    </section>
  )
}
