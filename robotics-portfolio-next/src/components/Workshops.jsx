"use client";
import Image from 'next/image';
import { useInView } from 'react-intersection-observer'
export default function Workshops() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.02, rootMargin: '0px 0px 50px 0px' })
  const workshopImages = [
    'workshop-image-1.jpg',
    'workshop-image-2.jpg',
    'workshop-image-3.jpg',
    'workshop-image- 3.jpg',
    'workshop-image-4.jpg',
    'workshop-image-5.jpg',
    'workshop-image-6.jpg',
    'workshop-image-7.jpg',
    'workshop-image-8.jpg',
    'workshop-image-11.jpg',
    'workshop-image-12.jpg',
    'workshop-image-14.jpg',
  ]

  return (
    <section className={`workshops section mt-5 pt-5 fade-in ${inView ? 'visible' : ''}`} id="workshops" ref={sectionRef}>
      <div className="full-width-container">
        <div className="section-header text-center mb-5">
          <h2>Workshops</h2>
        </div>
      </div>

      <div className="workshops-grid mt-4">
        {workshopImages.map((img, idx) => (
          <div className="workshop-img-card" key={idx}>
            <Image src={`/photo/${img}`} alt="Workshop" width={600} height={400} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      <div className="full-width-container">
        <div className="container mt-5 pt-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="details-section p-4 p-md-5" style={{ background: 'rgba(17, 24, 39, 0.7)', border: '1px solid rgba(34, 211, 238, 0.15)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <h3 className="display-6 fw-bold mb-4 workshop-heading text-center" style={{ color: 'var(--text-primary)' }}>About the last workshop..</h3>
            <p className="text-secondary mb-4" style={{ lineHeight: 1.8, fontSize: '1.125rem' }}>
              The Robotics Club of CSE, UAP, has organized a workshop on robotics on 20th April 2026. It was held in the Robotics Lab, CSE, UAP, and lasted for 150 minutes. In the session, a total of 5 "CM14 - An Advanced IoT-Powered Smart Robot" were assembled by the students of various semesters of CSE, UAP.
            </p>
            <p className="text-secondary mb-4" style={{ lineHeight: 1.8, fontSize: '1.125rem' }}>
              The CM14 (Capsule Mover of 1 Layer with 4 Engines) is a NodeMCU ESP8266 V2 board-based smart robot that can be commanded via internet media. This DIY project is equipped with 4 wheels and 1 layer of capsule-shaped drive platform(s). It is aimed at designing a robot that can be controlled through a smartphone over Wi-Fi technology.
            </p>
            <p className="text-secondary mb-0" style={{ lineHeight: 1.8, fontSize: '1.125rem' }}>
              It is to be noted that the workshop was a collaborative initiative by the Robotics Club, CSE, UAP, and eChithi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
