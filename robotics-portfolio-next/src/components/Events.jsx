"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer'
import styles from './Events.module.css'
import 'swiper/css';
import 'swiper/css/navigation';

export default function Events() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.02, rootMargin: '0px 0px 50px 0px' })

  return (
    <section className={`events section mt-5 pt-5 fade-in ${inView ? 'visible' : ''}`} id="events" ref={sectionRef}>

      {/* Banner */}
      <div className="container text-center mb-5 pb-4">
        <div className={`events-banner ${styles.eventsBanner}`}>
          <div className={styles.bannerBg1}></div>
          <div className={styles.bannerBg2}></div>
          <h2 className={`fw-bold mb-3 ${styles.bannerTitle}`}>
            Flagship <br className="d-md-none" /><span className={styles.bannerTitleAccent}>Events</span>
          </h2>
          <div className={styles.bannerDivider}></div>
        </div>
      </div>

      {/* ================= EXPO 03 ================= */}
      <div className="event-section mb-5">
        <div className="event-header text-center mb-4">
          <h3 className="event-title display-5 fw-bold" style={{ color: 'var(--text-primary)' }}>Robo Expo 3.0</h3>
          <div className="event-date text-secondary">Fall 2025</div>
        </div>
        <div className="event-pin-container">
          <div className={`event-details-sidebar ${styles.eventDetailsSidebar}`}>
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
          <Swiper
            className="event-gallery-window"
            modules={[Navigation, Autoplay]}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.5 }
            }}
            spaceBetween={12}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            grabCursor={true}
            speed={800}
          >
            {[1,2,3,4,5,6,7].map(n => (
              <SwiperSlide className="event-slide" key={n}>
                <Image src={`/photo/flagship-expo-3.0-image-${n}.jpg`} alt="Robo Expo 3" fill sizes="(max-width: 768px) 100vw, 50vw" className="card-bg-img" />
              </SwiperSlide>
            ))}
          </Swiper>
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
          <div className={`event-details-sidebar ${styles.eventDetailsSidebar}`}>
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
          <Swiper
            className="event-gallery-window"
            modules={[Navigation, Autoplay]}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.5 }
            }}
            spaceBetween={12}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            grabCursor={true}
            speed={800}
          >
            {['flagship-expo-2.0-image-1.jpeg','flagship-expo-2.0-image-2.jpeg','flagship-expo-2.0-image-3.jpeg',
              'flagship-expo-2.0-image-4.jpeg','flagship-expo-2.0-image-5.jpg','flagship-expo-2.0-image-6.jpeg',
              'flagship-expo-2.0-image-7.jpeg','flagship-expo-2.0-image-8.jpeg','flagship-expo-2.0-image-9.jpeg',
              'flagship-expo-2.0-image-10.jpeg','flagship-expo-2.0-image-10.jpg','flagship-expo-2.0-image-11.jpg',
              'flagship-expo-2.0-image-112.jpg','flagship-expo-2.0-image-13.jpg'].map((img, i) => (
              <SwiperSlide className="event-slide" key={i}>
                <Image src={`/photo/${img}`} alt="Robo Expo 2" fill sizes="(max-width: 768px) 100vw, 50vw" className="card-bg-img" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ================= EXPO 01 ================= */}
      <div className="event-section mt-5 mb-5">
        <div className="event-header text-center mb-4 mt-5 pt-5">
          <h3 className="event-title display-5 fw-bold" style={{ color: 'var(--text-primary)' }}>Robo Expo 1.0</h3>
          <div className="event-date text-secondary">2022</div>
        </div>
        <div className="event-pin-container mb-5">
          <div className={`event-details-sidebar ${styles.eventDetailsSidebar}`}>
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
          <Swiper
            className="event-gallery-window"
            modules={[Navigation, Autoplay]}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.5 }
            }}
            spaceBetween={12}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            grabCursor={true}
            speed={800}
          >
            {[1,2,3,4,5,6].map(n => (
              <SwiperSlide className="event-slide" key={n}>
                <Image src={`/photo/flagship-expo-1.0-image-${n}.jpg`} alt="Robo Expo 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="card-bg-img" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </section>
  )
}
