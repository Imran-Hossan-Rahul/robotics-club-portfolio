"use client";
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import ContactButton from './ContactButton'
import Image from 'next/image'
import useSwarmAnimation from '../hooks/useSwarmAnimation'

export default function Hero() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.02, rootMargin: '0px 0px 50px 0px' })
  const canvasRef = useRef(null)
  const isHoveringButton = useRef(false)

  useSwarmAnimation(canvasRef, isHoveringButton)

  return (
    <>
      <canvas id="circuit-canvas" ref={canvasRef}></canvas>
      <header className={`hero section fade-in ${inView ? 'visible' : ''}`} id="hero" ref={sectionRef}>
        <div className="container text-center hero-content" style={{ position: 'relative', zIndex: 10 }}>
          <Image src="/photo/robotics-club-logo.png" alt="Robotics Club Logo" id="hero-main-logo" width={130} height={130} priority style={{ width: '130px', height: 'auto', marginBottom: '25px' }} />
          <h1 className="hero-title">Robotics Club</h1>
          <h2 className="hero-subtitle">University of Asia Pacific</h2>
          <p className="hero-mission">We are dedicated to fostering innovation in robotics, providing students with hands-on experience, and building competitive autonomous systems.</p>
          <div className="hero-buttons">
            <a href="#committee" className="btn btn-outline">Meet the Team</a>
            <ContactButton />
          </div>
        </div>
      </header>
    </>
  )
}
