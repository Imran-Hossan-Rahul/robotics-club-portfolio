"use client";
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import ContactButton from './ContactButton'
import styles from './Teaser.module.css'

export default function Teaser() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.02, rootMargin: '0px 0px 50px 0px' })
  const daysRef = useRef(null)
  const hoursRef = useRef(null)
  const minutesRef = useRef(null)
  const secondsRef = useRef(null)

  useEffect(() => {
    const countdownDate = new Date('Dec 14, 2026 00:00:00').getTime()

    function updateCountdown() {
      const now = new Date().getTime()
      const distance = countdownDate - now

      if (distance < 0) return false

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (daysRef.current) {
        daysRef.current.innerText = String(days).padStart(2, '0')
        hoursRef.current.innerText = String(hours).padStart(2, '0')
        minutesRef.current.innerText = String(minutes).padStart(2, '0')
        secondsRef.current.innerText = String(seconds).padStart(2, '0')
      }
      return true
    }

    if (updateCountdown()) {
      const interval = setInterval(() => {
        if (!updateCountdown()) clearInterval(interval)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <section className={`teaser section fade-in ${inView ? 'visible' : ''}`} id="teaser" ref={sectionRef}>
      <div className="container text-center">
        <h2 className="teaser-title">Something is being built.</h2>

        <div className={`countdown-wrapper mt-4 mb-5 ${styles.countdownWrapper}`} id="countdown">
          <div className={`countdown-box ${styles.countdownBox}`}>
            <span ref={daysRef} className={`countdown-num ${styles.countdownNum}`} id="cd-days">00</span>
            <span className={`countdown-label ${styles.countdownLabel}`}>Days</span>
          </div>
          <div className={`countdown-box ${styles.countdownBox}`}>
            <span ref={hoursRef} className={`countdown-num ${styles.countdownNum}`} id="cd-hours">00</span>
            <span className={`countdown-label ${styles.countdownLabel}`}>Hours</span>
          </div>
          <div className={`countdown-box ${styles.countdownBox}`}>
            <span ref={minutesRef} className={`countdown-num ${styles.countdownNum}`} id="cd-minutes">00</span>
            <span className={`countdown-label ${styles.countdownLabel}`}>Minutes</span>
          </div>
          <div className={`countdown-box ${styles.countdownBox}`}>
            <span ref={secondsRef} className={`countdown-num ${styles.countdownNum}`} id="cd-seconds">00</span>
            <span className={`countdown-label ${styles.countdownLabel}`}>Seconds</span>
          </div>
        </div>

        <div className="mt-4">
          <ContactButton text="Be part of it before anyone else — Partner With Us" />
        </div>
      </div>
    </section>
  )
}
