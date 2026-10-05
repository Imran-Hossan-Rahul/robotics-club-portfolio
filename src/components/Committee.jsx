"use client";
import Image from 'next/image';
import { useInView } from 'react-intersection-observer'
export default function Committee() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.02, rootMargin: '0px 0px 50px 0px' })
  return (
    <section className={`committee section fade-in ${inView ? 'visible' : ''}`} id="committee" style={{ paddingTop: '50px' }} ref={sectionRef}>
      <div className="container">
        <div className="section-header text-center">
          <h2>Leadership</h2>
        </div>

        {/* Core Leaders */}
        <div className="core-leaders mt-4">
          <div className="leader-card prominent">
            <Image src="/photo/convener.jpeg" alt="Convener" width={400} height={400} className="leader-photo" />
            <h3 className="leader-name">A S Zaforullah Momtaz</h3>
            <div className="leader-role">CONVENER</div>
          </div>
          <div className="leader-card prominent">
            <Image src="/photo/co-convener.jpeg" alt="Co-Convener" width={400} height={400} className="leader-photo" />
            <h3 className="leader-name">Dr. Nazmun Nahid</h3>
            <div className="leader-role">CO-CONVENER</div>
          </div>
        </div>
      </div>

      {/* Executive Leaders - Wider Container */}
      <div className="container-fluid px-3 px-md-5">
        <div className="executive-leaders mt-5">
          {[
            { img: 'nazia rahman omee.jpg', name: 'Nazia Rahman Omee', role: 'PRESIDENT' },
            { img: 'Hafsa Priya(VP).jpeg', name: 'Hafsa Afrin Priya', role: 'VICE-PRESIDENT' },
            { img: 'Chowdhury Fatmi Monzur Neha.jpg', name: 'Chowdhury Fatmi Monzur Neha', role: 'GENERAL SECRETARY' },
            { img: 'Md Helal Hossain Mollah(CME).jpeg', name: 'Helal Hossen Molla', role: 'CHIEF MEDIA EXECUTIVE' },
            { img: 'Abdullah All Rafi.png', name: 'Abdullah Al Rafi', role: 'TREASURER' },
            { img: 'Md Nasiruddin Sha Rafi.jpg', name: 'Md. Nasiruddin Sha Rafi', role: 'ORGANIZATION MANAGER' },
            { img: 'Saima Ahmed Troyee_.jpg', name: 'Saima Ahmed Troyee', role: 'MEDIA AND PUBLICATION' },
            { img: 'Imran Hossan (Media & Publication).jpeg', name: 'Imran Hossan', role: 'MEDIA AND PUBLICATION' },
            { img: 'Mohammad Fayez Uddin - Senior Executive.jpg', name: 'Mohammad Fayez Uddin Jawad', role: 'SENIOR EXECUTIVE' },
            { img: 'Jannatul Tajremin.jpg', name: 'Jannatul Tajremin', role: 'SENIOR EXECUTIVE' },
            { img: 'Md Mahfuzur Rahman.jpg', name: 'Md. Mahfuzur Rahman', role: 'JUNIOR EXECUTIVE' },
            { img: 'Tasfia Tanzum Orthy.jpeg', name: 'Tasfia Tanzum Orthy', role: 'JUNIOR EXECUTIVE' },
            { img: 'Moatta Al Fahim(Club Representative).png', name: 'Moatta Al Fahim', role: 'JUNIOR EXECUTIVE' },
            { img: 'Jayed Yousuf(Junior executive).jpg', name: 'Jayed Yousuf', role: 'JUNIOR EXECUTIVE' },
            { img: 'Suborna Noor (Club representative).jpg', name: 'Suborna Noor', role: 'CLUB REPRESENTATIVE' },
            { img: 'LINET JOACHIM ROZARIO (Club Representative).jpg', name: 'Linet Joachim Rozario', role: 'CLUB REPRESENTATIVE' },
          ].map((member, idx) => (
            <div className="leader-card" key={idx}>
              <Image src={`/photo/${member.img}`} alt={member.role} width={200} height={200} className="leader-photo" />
              <h3 className="leader-name">{member.name}</h3>
              <div className="leader-role">{member.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expo Highlight Grid */}
      <div className="expo-highlight-grid mt-5">
        {['robo-expo-3.jpg', 'robo-expo-2.jpeg', 'robo-expo-1.png', 'under-4.jpg', 'under-5.jpg', 'under-6.jpg', 'under-7.jpg', 'under-8.jpg'].map((img, idx) => (
          <div className="event-highlight-card" style={{ padding: 0 }} key={idx}>
            <Image src={`/photo/${img}`} alt={`Event ${idx + 1}`} width={800} height={600} className="expo-photo" />
          </div>
        ))}
      </div>

      {/* Legacy text */}
      <div className="container mt-5 pt-4">
        <div className="details-section p-4 p-md-5" style={{ background: 'rgba(17, 24, 39, 0.7)', border: '1px solid rgba(34, 211, 238, 0.15)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <h3 className="display-6 fw-bold mb-4 text-center legacy-heading" style={{ color: 'var(--text-primary)' }}>A Legacy of Innovation</h3>
          <p className="text-secondary mb-4" style={{ lineHeight: 1.8 }}>
            The Robotics Club at the University of Asia Pacific has been at the forefront of technological excellence. Over the years, we have grown from a small group of enthusiasts to a powerhouse of innovation. Our journey is defined by the incredible passion of our members, the countless hours spent in the lab, and the relentless pursuit of perfection in every circuit we solder and every line of code we write.
          </p>
          <p className="text-secondary" style={{ lineHeight: 1.8 }}>
            Through our flagship events, technical workshops, and national competitions, we have consistently pushed the boundaries of what student-led robotics can achieve. This platform is not just about building robots; it's about building the leaders, thinkers, and engineers of tomorrow.
          </p>
        </div>
      </div>

      {/* ===== IRO BANGLADESH OPEN 2026 ANNOUNCEMENT ===== */}
      <div className="container pt-5 pb-5 position-relative announcement-container" style={{ marginTop: '150px', zIndex: 1 }}>
        {/* Announcement Heading */}
        <div className="text-center mb-5 position-relative" style={{ zIndex: 10 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Light clipping container */}
            <div style={{
              position: 'absolute', top: '100%', left: '-800px', right: '-800px',
              height: '800px', overflow: 'hidden', zIndex: 1, pointerEvents: 'none',
              mixBlendMode: 'screen',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 100px, transparent 290px)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 100px, transparent 290px)',
            }}>
              {/* Smooth 3D Ripples */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', bottom: 0,
                transform: 'translateX(-50%)', width: '1600px',
                WebkitMaskImage: 'conic-gradient(from 115deg at 50% 0%, transparent 0deg, black 65deg, transparent 130deg)',
                maskImage: 'conic-gradient(from 115deg at 50% 0%, transparent 0deg, black 65deg, transparent 130deg)',
                pointerEvents: 'none',
              }}>
                <div className="wave-ripple" style={{ animationDelay: '0s' }}></div>
                <div className="wave-ripple" style={{ animationDelay: '-3.33s' }}></div>
                <div className="wave-ripple" style={{ animationDelay: '-6.66s' }}></div>
              </div>

              {/* Cinematic Lens Flare */}
              <div style={{
                position: 'absolute', top: '0px', left: '50%', transform: 'translateX(-50%)',
                width: 'clamp(100px, 30vw, 250px)', height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(245,158,11,1) 30%, #fff 50%, rgba(245,158,11,1) 70%, transparent)',
                boxShadow: '0 0 20px #F59E0B, 0 0 40px #F59E0B', borderRadius: '50%',
              }}></div>

              {/* Core high-temp glow */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '200px', height: '150px',
                background: 'radial-gradient(ellipse at top center, rgba(255,255,255,0.4) 0%, transparent 60%)',
                filter: 'blur(15px)',
              }}></div>

              {/* Light source point (bulb) */}
              <div style={{
                position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)',
                width: '16px', height: '16px', background: '#fff', borderRadius: '50%',
                boxShadow: '0 0 10px #fff, 0 0 30px #F59E0B, 0 0 60px #F59E0B, 0 0 100px #F59E0B',
              }}></div>

              {/* Ambient glow spreading downwards */}
              <div className="announcement-glow">
                <div className="announcement-glow-inner"></div>
              </div>
            </div>

            <h2 className="display-4 fw-bold announcement-title" style={{
              position: 'relative', zIndex: 2, margin: 0,
              fontFamily: "'Orbitron', sans-serif", color: '#E8EDF5',
              letterSpacing: '2px', textShadow: '0 0 30px rgba(255,255,255,0.3)',
              background: 'rgba(10, 14, 20, 0.85)', padding: '15px 50px',
              borderRadius: '50px', border: '1px solid rgba(34, 211, 238, 0.15)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(34, 211, 238, 0.05)',
              backdropFilter: 'blur(20px)',
            }}>
              Announcement
            </h2>
          </div>
        </div>

        {/* Card Wrapper */}
        <div style={{ position: 'relative', marginTop: '180px', zIndex: 5 }}>
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: '-3px', left: '-3px', right: '-3px', height: '40px',
            background: 'linear-gradient(90deg, transparent, #F59E0B 15%, #F59E0B 85%, transparent)',
            borderRadius: '23px 23px 0 0', zIndex: -1,
          }}></div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(15,20,35,0.98) 0%, rgba(8,12,22,1) 100%)',
            border: '1px solid rgba(34,211,238,0.3)', borderRadius: '20px', overflow: 'hidden',
            display: 'flex', flexDirection: 'row', alignItems: 'stretch', flexWrap: 'wrap', position: 'relative',
          }}>
            {/* Left: poster image */}
            <div style={{
              flex: '1 1 420px', maxWidth: 'clamp(250px, 100%, 420px)',
              background: '#ffffff', display: 'flex', alignItems: 'center',
              justifyContent: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <Image src="/photo/745a421a-f181-415a-ab98-c771c1ecd470.jpg" alt="IRO Bangladesh Open 2026"
                width={800} height={500}
                style={{ width: '100%', height: 'auto', border: '1px solid var(--border-cyan)', padding: '4px' }} />
            </div>

            {/* Right: content */}
            <div style={{
              flex: '1 1 250px', minWidth: 0,
              padding: 'clamp(20px, 5vw, 36px) clamp(15px, 5vw, 40px)',
              display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', position: 'relative',
            }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 700, color: '#E8EDF5', margin: 0, lineHeight: 1.2,
                wordBreak: 'break-word', overflowWrap: 'break-word',
              }}>IRO Bangladesh Open 2026 is coming to UAP!</h3>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#94A3B8', margin: 0, lineHeight: 1.75, wordBreak: 'break-word' }}>
                The <strong style={{ color: '#E8EDF5' }}>University of Asia Pacific (UAP) Robotics Club</strong> is proud to serve as the <strong style={{ color: '#22D3EE' }}>Co-Host</strong> of IRO Bangladesh Open 2026, organized by <strong style={{ color: '#E8EDF5' }}>Bangladesh Robot Olympiad (BDRO)</strong>.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#94A3B8', margin: 0, lineHeight: 1.75 }}>
                Join us for two exciting days of innovation and creativity!
              </p>

              {/* Event details chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>Venue</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: '#E8EDF5', fontWeight: 600 }}>University of Asia Pacific (UAP), Dhaka</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>Date</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: '#F59E0B', fontWeight: 600 }}>11–12 September 2026</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="expo-btn-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px', alignItems: 'flex-start', justifyContent: 'center' }}>
                <a href="https://www.facebook.com/photo.php?fbid=1475872681228466&set=a.554159330066477" target="_blank" rel="noopener noreferrer" className="btn btn-outline expo-btn"
                  style={{ flex: '0 1 auto', border: '1px solid rgba(34,211,238,0.35)', textAlign: 'center', justifyContent: 'center', padding: '10px 18px', fontSize: 'clamp(0.75rem, 3.5vw, 0.95rem)', whiteSpace: 'nowrap' }}>
                  View Post
                </a>
                <a href="https://www.bdro.org" target="_blank" rel="noopener noreferrer" className="btn btn-amber expo-btn"
                  style={{ flex: '0 1 auto', textAlign: 'center', justifyContent: 'center', padding: '10px 18px', fontSize: 'clamp(0.75rem, 3.5vw, 0.95rem)', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.4 }}>
                  Register → bdro.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PRIORITY IMAGES ===== */}
      <div className="container-fluid px-3 px-xl-5 mt-5 position-relative">
        <style>{`
          .priority-img {
            height: clamp(150px, 20vw, 280px);
            width: auto;
            border-radius: 16px;
            display: block;
          }
          @media (max-width: 768px) {
            .priority-img {
              height: auto;
              width: 100%;
            }
          }
        `}</style>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(10px, 1.5vw, 20px)' }}>
          {['priority (3).jpg', 'priority (1).jpg', 'priority (2).jpg'].map((img, idx) => (
            <div className="event-highlight-card" style={{ padding: 0, display: 'flex', justifyContent: 'center', overflow: 'hidden' }} key={idx}>
              <img src={`/photo/${img}`} alt={`Priority Image ${idx + 1}`} className="priority-img" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      {/* ===== UNUSUAL MARQUEE GALLERY ===== */}
      <div className="mt-5 pt-5 pb-5 position-relative" style={{ overflow: 'hidden', width: '100%', background: 'linear-gradient(to bottom, transparent, rgba(10, 14, 20, 0.8) 20%, rgba(10, 14, 20, 0.8) 80%, transparent)' }}>
        <style>{`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            gap: 13px;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          .marquee-item {
            flex: 0 0 auto;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
            border-radius: 0;
            overflow: hidden;
            border: 1px solid rgba(34, 211, 238, 0.15);
            background: #000;
          }
          .marquee-item:hover {
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 15px 30px rgba(34, 211, 238, 0.25);
            z-index: 10;
            border-color: rgba(34, 211, 238, 0.5);
          }
          .marquee-photo {
            height: 220px;
            width: auto;
            display: block;
            opacity: 0.85;
            transition: opacity 0.4s ease;
          }
          .marquee-item:hover .marquee-photo {
            opacity: 1;
          }
          @media (max-width: 768px) {
            .marquee-photo {
              height: 160px;
            }
          }
        `}</style>

        {/* Row 1 */}
        <div className="marquee-track" style={{ animation: 'marqueeLeft 35s linear infinite' }}>
          {[...['unusual (1).jpg', 'unusual (2).jpg', 'unusual (3).jpg', 'unusual (4).jpg', 'unusual (5).jpg', 'unusual (6).jpg', 'unusual (7).jpg', 'unusual (8).jpg'], ...['unusual (1).jpg', 'unusual (2).jpg', 'unusual (3).jpg', 'unusual (4).jpg', 'unusual (5).jpg', 'unusual (6).jpg', 'unusual (7).jpg', 'unusual (8).jpg']].map((img, idx) => (
            <div className="marquee-item" key={`row1-${idx}`}>
              <img src={`/photo/${img}`} alt={`Gallery image ${idx}`} className="marquee-photo" loading="lazy" />
            </div>
          ))}
        </div>

        {/* Row 2 - Left to Right */}
        <div className="marquee-track" style={{ animation: 'marqueeRight 40s linear infinite', marginTop: '13px' }}>
          {[...['unusual (9).jpg', 'unusual (10).jpg', 'unusual (11).jpeg', 'unusual (12).jpeg', 'unusual (13).jpeg', 'unusual (1).jpeg', 'unusual (2).jpeg', 'unusual (3).jpeg'], ...['unusual (9).jpg', 'unusual (10).jpg', 'unusual (11).jpeg', 'unusual (12).jpeg', 'unusual (13).jpeg', 'unusual (1).jpeg', 'unusual (2).jpeg', 'unusual (3).jpeg']].map((img, idx) => (
            <div className="marquee-item" key={`row2-${idx}`}>
              <img src={`/photo/${img}`} alt={`Gallery image ${idx}`} className="marquee-photo" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== SPECIAL ENDING GRAPHIC ===== */}
      <div className="container mt-5 pt-5 pb-5" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="position-relative d-inline-flex" style={{ maxWidth: '100%', width: 'fit-content', transition: 'transform 0.4s ease', justifyContent: 'center' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          {/* Subtle Ambient Glow Behind Image */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '110%',
            height: '110%',
            background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.15) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 70%)',
            filter: 'blur(50px)',
            zIndex: 0,
            pointerEvents: 'none'
          }}></div>
          
          {/* Image Card */}
          <div style={{ 
            position: 'relative', 
            zIndex: 1, 
            display: 'inline-flex',
            borderRadius: '24px', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.5) 100%)', 
            border: '1px solid rgba(34, 211, 238, 0.25)', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), inset 0 0 20px rgba(34, 211, 238, 0.05)',
            padding: '8px'
          }}>
            <img 
              src="/photo/4f1faac4-02f0-402a-9443-3defaf96a462.jpg" 
              alt="Thank You" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '75vh',
                width: 'auto',
                height: 'auto',
                borderRadius: '16px', 
                display: 'block' 
              }} 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
