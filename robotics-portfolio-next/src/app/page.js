"use client";

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Committee from '../components/Committee';
import Events from '../components/Events';
import Workshops from '../components/Workshops';
import Teaser from '../components/Teaser';
import Partner from '../components/Partner';
import Footer from '../components/Footer';

export default function Home() {
  // Global: Scroll-triggered fade-in animations (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.02,
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Global: Fancybox init
  useEffect(() => {
    const initFancybox = () => {
      if (window.Fancybox) {
        window.Fancybox.bind("img:not([src*='logo']):not([alt*='Logo']):not([alt*='UAP'])", {
          groupAll: false,
          hideScrollbar: true,
          showClass: 'f-fadeIn',
          hideClass: 'f-fadeOut',
          Thumbs: false,
          compact: false,
          closeButton: false,
          idle: false,
          Images: { initialSize: 'fit' },
          Toolbar: {
            autoHide: false,
            display: {
              left: [],
              middle: ['zoomIn', 'zoomOut', 'close'],
              right: [],
            },
          },
        })
      }
    }

    // Try immediately, then retry after short delay if Fancybox not loaded yet
    initFancybox()
    const timer = setTimeout(initFancybox, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Canvas for circuit animation (rendered by Hero component) */}
      <div className="ambient-orbs-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <Navbar />
      <Hero />
      <Committee />
      <Events />
      <Workshops />
      <Teaser />
      <Partner />
      <Footer />
    </>
  )
}
