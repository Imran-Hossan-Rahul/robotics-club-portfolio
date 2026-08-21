"use client";
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background/padding shrink
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Handle logo appearance in navbar when main hero logo scrolls out
      const heroMainLogo = document.getElementById('hero-main-logo')
      if (heroMainLogo) {
        const heroLogoRect = heroMainLogo.getBoundingClientRect()
        if (heroLogoRect.bottom < 60) {
          setShowLogo(true)
        } else {
          setShowLogo(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once on mount to set initial state
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled-logo' : ''}`} id="navbar" style={{ 
      background: 'rgba(10, 14, 20, 0.25)', 
      backdropFilter: 'blur(20px) saturate(150%)', 
      WebkitBackdropFilter: 'blur(20px) saturate(150%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="nav-container">
        <div className="nav-logo" id="nav-logo-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '60px' }}>
          <div id="nav-animated-logo-wrapper" style={{ 
            height: showLogo ? '45px' : '0px', 
            opacity: showLogo ? '1' : '0', 
            overflow: 'hidden', 
            transition: 'all 0.4s ease', 
            display: 'flex', 
            justifyContent: 'flex-end', 
            flexDirection: 'column' 
          }}>
            <Image src="/photo/robotics-club-logo.png" alt="Robotics Club" width={35} height={35} style={{ width: '35px', height: 'auto', marginBottom: '2px' }} />
          </div>
          <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '0.8rem', lineHeight: 1, paddingBottom: '2px' }}>Robotics Club</span>
        </div>
        <div className="nav-links">
          <a href="#committee">Committee</a>
          <a href="#events">Flagship Events</a>
          <a href="#workshops">Workshops</a>
        </div>
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="nav-uap-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', height: '45px' }}>
              <Image src="/photo/university-logo.png" alt="UAP" width={36} height={36} style={{ width: '36px', height: 'auto', marginBottom: '2px' }} />
            </div>
            <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '0.8rem', lineHeight: 1, paddingBottom: '2px' }}>UAP</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
