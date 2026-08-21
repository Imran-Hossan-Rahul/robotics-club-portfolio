"use client";
import { useEffect } from 'react'

export default function Events() {
  useEffect(() => {
    // Initialize Swiper for each event gallery
    const initSwipers = () => {
      if (!window.Swiper) return
      const swiperInstances = document.querySelectorAll('.event-gallery-window.swiper')
      swiperInstances.forEach((swiperEl) => {
        if (swiperEl.swiper) return // already initialized
        new window.Swiper(swiperEl, {
          loop: true,
          slidesPerView: 'auto',
          spaceBetween: 12,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          navigation: {
            nextEl: swiperEl.querySelector('.swiper-button-next'),
            prevEl: swiperEl.querySelector('.swiper-button-prev'),
          },
          grabCursor: true,
          speed: 800,
        })
      })
    }

    initSwipers()
    const timer = setTimeout(initSwipers, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="events section mt-5 pt-5" id="events">

      {/* Banner */}
      <div className="container text-center mb-5 pb-4">
        <div className="events-banner" style={{ position: 'relative', padding: 'clamp(2rem, 5vw, 4rem) clamp(0.5rem, 3vw, 2rem)', overflow: 'hidden', borderRadius: '30px', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-100%', left: '-25%', width: '100%', height: '300%', background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(34,211,238,0) 60%)', transform: 'rotate(30deg)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', bottom: '-100%', right: '-25%', width: '100%', height: '300%', background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0) 60%)', transform: 'rotate(-30deg)', pointerEvents: 'none' }}></div>
          <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 10vw, 4rem)', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: 'clamp(1px, 1vw, 4px)', textShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}>
            Flagship <br className="d-md-none" /><span style={{ color: 'var(--accent-cyan)' }}>Events</span>
          </h2>
          <div style={{ width: 'clamp(60px, 15vw, 100px)', height: '4px', background: 'var(--accent-cyan)', margin: '0 auto', borderRadius: '2px', boxShadow: '0 0 15px var(--accent-cyan)' }}></div>
        </div>
      </div>

      {/* ================= EXPO 03 ================= */}
      <div className="event-section mb-5">
        <div className="event-header text-center mb-4">
          <h3 className="event-title display-5 fw-bold" style={{ color: 'var(--text-primary)' }}>Robo Expo 3.0</h3>
          <div className="event-date text-secondary">Fall 2025</div>
        </div>
        <div className="event-pin-container">
          <div className="event-details-sidebar">
            <p className="event-desc mb-4">Innovation took center stage at the University of Asia Pacific Robotics Club as we successfully hosted <strong>Robo Expo 3.0</strong>, our Intra-University Robotics Competition for Fall 2025.</p>
            <p className="event-desc mb-4">From creative engineering solutions to competitive robotic innovations, the event showcased the passion, dedication, and technical excellence of UAP students.</p>
            <p className="event-desc mb-4">A heartfelt thank you to all participants, volunteers, judges, and faculty members for making this event a remarkable success.</p>
            <div className="segments-section mb-4">
              <h4>Key Segments</h4>
              <div className="segment-chips">
                {['Project Showcase', 'LFR', 'CM14 Rumble', 'RM22 Battle', 'Robo Quiz'].map(s => (
                  <span className="segment-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="event-gallery-window swiper">
            <div className="swiper-wrapper">
              {[1,2,3,4,5,6,7].map(n => (
                <div className="event-slide swiper-slide" key={n}>
                  <img src={`/photo/flagship-expo-3.0-image-${n}.jpg`} alt="Robo Expo 3" className="card-bg-img" />
                </div>
              ))}
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>

      {/* ================= HALL OF FAME ================= */}
      <div className="hof-section">
        <h3 className="hof-title">
          <span style={{ display: 'block', fontSize: '3rem', marginBottom: '12px', filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.5))' }}>🏆</span>
          Hall of Fame
        </h3>
        <p className="hof-subtitle">ROBO EXPO 3.0 — WINNERS &amp; RUNNERS-UP</p>

        {/* Row 1 */}
        <div className="hof-row hof-row-top">
          <div className="hof-card">
            <div className="hof-segment-name">LFR — Line Follower Robot</div>
            <div className="hof-entry">
              <div className="hof-rank champion">🥇 CHAMPION</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">Shadow Hunter</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Md. Noman Chowdhury &nbsp;·&nbsp; Naim Rahman Santo</div>
            </div>
            <hr className="hof-divider" />
            <div className="hof-entry">
              <div className="hof-rank runner">🥈 1ST RUNNER-UP</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">Circuit Breaker</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Md. Yeamin Bhuiyan &nbsp;·&nbsp; Sadia Afrin Mohona &nbsp;·&nbsp; Sumaiya Akter</div>
            </div>
          </div>
          <div className="hof-card">
            <div className="hof-segment-name">Project Showcase</div>
            <div className="hof-entry">
              <div className="hof-rank champion">🥇 CHAMPION</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">Quanta Dot</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Arnica Sarker &nbsp;·&nbsp; Julias Uddin Khan &nbsp;·&nbsp; Shams Shahriar Haque</div>
            </div>
            <hr className="hof-divider" />
            <div className="hof-entry">
              <div className="hof-rank runner">🥈 1ST RUNNER-UP</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">S.H.I.E.L.D</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Md. Sakib Hossaine &nbsp;·&nbsp; Faiza Haque Shoily &nbsp;·&nbsp; Md. Tabiur Rahman &nbsp;·&nbsp; Asif Rezwan</div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="hof-row hof-row-bottom">
          <div className="hof-card">
            <div className="hof-segment-name">CM14 Robot Battle</div>
            <div className="hof-entry">
              <div className="hof-rank champion">🥇 CHAMPION</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">Microbot</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Onindo Dey Niloy &nbsp;·&nbsp; Farhana Chowdhury &nbsp;·&nbsp; Md. Shahriaul Islam &nbsp;·&nbsp; Sadia Akter Keya</div>
            </div>
            <hr className="hof-divider" />
            <div className="hof-entry">
              <div className="hof-rank runner">🥈 1ST RUNNER-UP</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">S.H.I.E.L.D</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Md. Sakib Hossaine &nbsp;·&nbsp; Faiza Haque Shoily &nbsp;·&nbsp; Md. Tabiur Rahman &nbsp;·&nbsp; Asif Rezwan</div>
            </div>
          </div>
          <div className="hof-card">
            <div className="hof-segment-name">Robo Quiz</div>
            <div className="hof-entry">
              <div className="hof-rank champion">🥇 CHAMPION</div>
              <div className="hof-team-label">Winner</div>
              <div className="hof-team-name">Sanjida Rahman Toma</div>
            </div>
            <hr className="hof-divider" />
            <div className="hof-entry">
              <div className="hof-rank runner">🥈 1ST RUNNER-UP</div>
              <div className="hof-team-label">Winner</div>
              <div className="hof-team-name">Jannatul Fardous Nijhum</div>
            </div>
          </div>
          <div className="hof-card">
            <div className="hof-segment-name">RM22 Robot Rumble</div>
            <div className="hof-entry">
              <div className="hof-rank champion">🥇 CHAMPION</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">Bot er Battery Low</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Labiba Umme Tasim &nbsp;·&nbsp; Swapnil Sotej Ekanto</div>
            </div>
            <hr className="hof-divider" />
            <div className="hof-entry">
              <div className="hof-rank runner">🥈 1ST RUNNER-UP</div>
              <div className="hof-team-label">Team Name</div>
              <div className="hof-team-name">The Cage</div>
              <div className="hof-member-label">Members</div>
              <div className="hof-members">Ridwanul Bari &nbsp;·&nbsp; Junait Hossain Dipto</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXPO 02 ================= */}
      <div className="event-section mt-5 mb-5">
        <div className="event-header text-center mb-4 mt-5 pt-5">
          <h3 className="event-title display-5 fw-bold" style={{ color: 'var(--text-primary)' }}>Robo Expo 2.0</h3>
          <div className="event-date text-secondary">2024</div>
        </div>
        <div className="event-pin-container">
          <div className="event-details-sidebar">
            <p className="event-desc mb-4">On <strong>November 24, 2024</strong>, the Robotics Club, CSE-UAP, hosted an unforgettable event showcasing groundbreaking robotics projects and innovations!</p>
            <p className="event-desc mb-4">We were honored to have <strong>Prof. Dr. Sultan Mahmud</strong>, Pro Vice-Chancellor of UAP, along with the esteemed Heads &amp; Faculty members of the CSE department, join us in celebrating the spirit of creativity and learning!</p>
            <p className="event-desc mb-4">Huge thanks to all the brilliant participants and attendees who made <strong>Robo Expo 2.0</strong> a tremendous success!</p>
            <div className="segments-section mb-4">
              <h4>Key Segments</h4>
              <div className="segment-chips">
                {['Project Showcase', 'LFR', 'Robo Quiz'].map(s => (
                  <span className="segment-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="event-gallery-window swiper">
            <div className="swiper-wrapper">
              {['flagship-expo-2.0-image-1.jpeg','flagship-expo-2.0-image-2.jpeg','flagship-expo-2.0-image-3.jpeg',
                'flagship-expo-2.0-image-4.jpeg','flagship-expo-2.0-image-5.jpg','flagship-expo-2.0-image-6.jpeg',
                'flagship-expo-2.0-image-7.jpeg','flagship-expo-2.0-image-8.jpeg','flagship-expo-2.0-image-9.jpeg',
                'flagship-expo-2.0-image-10.jpeg','flagship-expo-2.0-image-10.jpg','flagship-expo-2.0-image-11.jpg',
                'flagship-expo-2.0-image-112.jpg','flagship-expo-2.0-image-13.jpg'].map((img, i) => (
                <div className="event-slide swiper-slide" key={i}>
                  <img src={`/photo/${img}`} alt="Robo Expo 2" className="card-bg-img" />
                </div>
              ))}
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>

      {/* ================= EXPO 01 ================= */}
      <div className="event-section mt-5 mb-5">
        <div className="event-header text-center mb-4 mt-5 pt-5">
          <h3 className="event-title display-5 fw-bold" style={{ color: 'var(--text-primary)' }}>Robo Expo 1.0</h3>
          <div className="event-date text-secondary">2022</div>
        </div>
        <div className="event-pin-container mb-5">
          <div className="event-details-sidebar">
            <p className="event-desc mb-4">The story of how the very first Expo was organized and its initial success. This laid the foundation for our robotics community and sparked a culture of innovation.</p>
            <div className="segments-section mb-4">
              <h4>Key Segments</h4>
              <div className="segment-chips">
                {['Project Showcase', 'LFR', 'Robo Quiz'].map(s => (
                  <span className="segment-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="event-gallery-window swiper">
            <div className="swiper-wrapper">
              {[1,2,3,4,5,6].map(n => (
                <div className="event-slide swiper-slide" key={n}>
                  <img src={`/photo/flagship-expo-1.0-image-${n}.jpg`} alt="Robo Expo 1" className="card-bg-img" />
                </div>
              ))}
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>

    </section>
  )
}
