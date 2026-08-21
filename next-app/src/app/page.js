"use client";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Committee from "../components/Committee";
import Events from "../components/Events";
import Workshops from "../components/Workshops";
import Teaser from "../components/Teaser";
import Partner from "../components/Partner";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";

// Import libraries
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import "swiper/css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Script from "next/script";

export default function Home() {
  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animations
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Initialize Swiper
    new Swiper(".event-gallery-window", {
      slidesPerView: "auto",
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // Initialize Fancybox
    Fancybox.bind("img:not([src*='logo']):not([alt*='Logo']):not([alt*='UAP'])", {
      groupAll: false,
      hideScrollbar: true,
      showClass: "f-fadeIn",
      hideClass: "f-fadeOut",
      Thumbs: false,
      compact: false,
      closeButton: false,
      idle: false,
      Images: {
        initialSize: "fit",
      },
      Toolbar: {
        autoHide: false,
        display: {
          left: [],
          middle: ["zoomIn", "zoomOut", "close"],
          right: [],
        },
      },
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      Fancybox.destroy();
    };
  }, []);

  return (
    <>
      <Script src="/canvas-animation.js" strategy="lazyOnload" />
      <canvas id="circuit-canvas" style={{ position: "fixed", top: 0, left: 0, zIndex: -1, width: "100%", height: "100%" }}></canvas>
      <div className="ambient-orbs-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      <Navbar />
      <Hero />
      <About />
      <Announcement />
      <Committee />
      <Events />
      <Workshops />
      <Teaser />
      <Partner />
      <Footer />
    </>
  );
}
