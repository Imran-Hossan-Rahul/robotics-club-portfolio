"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

// Dynamically import components below the fold to reduce initial JS bundle size
const Committee = dynamic(() => import('../components/Committee'));
const Events = dynamic(() => import('../components/Events'));
const Workshops = dynamic(() => import('../components/Workshops'));
const Teaser = dynamic(() => import('../components/Teaser'));
const Partner = dynamic(() => import('../components/Partner'));
const Footer = dynamic(() => import('../components/Footer'));

export default function Home() {
  useEffect(() => {
    let fancyboxInstance = null;

    // Dynamically load Fancybox to prevent it from blocking the initial page load JS bundle
    Promise.all([
      import("@fancyapps/ui"),
      import("@fancyapps/ui/dist/fancybox/fancybox.css")
    ]).then(([{ Fancybox }]) => {
      fancyboxInstance = Fancybox;
      fancyboxInstance.bind("img:not([src*='logo']):not([alt*='Logo']):not([alt*='UAP'])", {
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
      });
    });
    
    return () => {
      if (fancyboxInstance) {
        fancyboxInstance.destroy();
      }
    }
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
