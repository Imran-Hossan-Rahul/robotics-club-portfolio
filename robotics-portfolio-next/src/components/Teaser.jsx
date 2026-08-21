"use client";
import { useEffect, useRef } from 'react'

export default function Teaser() {
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

  const revealEmail = (e) => {
    const btn = e.currentTarget
    if (btn.classList.contains('email-revealed')) return
    const email = 'roboticsclub@uap-bd.edu'
    btn.innerHTML = `<span style="text-transform: none; letter-spacing: normal;">${email}</span>`

    const copyBtn = document.createElement('a')
    copyBtn.href = '#'
    copyBtn.className = 'btn btn-outline copy-email-btn'
    copyBtn.style.cssText = 'padding: 1rem 1.2rem; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s ease;'
    copyBtn.title = 'Copy to clipboard'
    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>`

    copyBtn.onclick = (ev) => {
      ev.stopPropagation(); ev.preventDefault()
      navigator.clipboard.writeText(email).then(() => {
        copyBtn.style.opacity = '0'
        setTimeout(() => {
          copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> <span style="font-size: 0.9rem; margin-left: 6px; font-weight: 500;">Copied</span>`
          copyBtn.classList.remove('btn-outline'); copyBtn.classList.add('btn-amber')
          copyBtn.style.opacity = '1'
        }, 300)
      })
    }

    const parent = btn.parentNode
    if (window.getComputedStyle(parent).display !== 'flex') {
      parent.style.display = 'flex'; parent.style.gap = '10px'
      parent.style.alignItems = 'stretch'; parent.style.justifyContent = 'center'
    } else if (!parent.style.gap) {
      parent.style.gap = '15px'
    }
    parent.insertBefore(copyBtn, btn.nextSibling)
    btn.classList.add('email-revealed')
    btn.style.cursor = 'text'
    btn.onclick = null
  }

  const countdownBoxStyle = { textAlign: 'center' }
  const numStyle = {
    display: 'block', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-heading)',
    fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--accent-cyan)', lineHeight: 1,
  }
  const labelStyle = {
    display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
    color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '5px',
  }

  return (
    <section className="teaser section fade-in" id="teaser">
      <div className="container text-center">
        <h2 className="teaser-title">Something is being built.</h2>

        <div className="countdown-wrapper mt-4 mb-5" id="countdown" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1.5rem', justifyContent: 'center', maxWidth: '800px', margin: '0 auto',
        }}>
          <div className="countdown-box" style={countdownBoxStyle}>
            <span ref={daysRef} className="countdown-num" id="cd-days" style={numStyle}>00</span>
            <span className="countdown-label" style={labelStyle}>Days</span>
          </div>
          <div className="countdown-box" style={countdownBoxStyle}>
            <span ref={hoursRef} className="countdown-num" id="cd-hours" style={numStyle}>00</span>
            <span className="countdown-label" style={labelStyle}>Hours</span>
          </div>
          <div className="countdown-box" style={countdownBoxStyle}>
            <span ref={minutesRef} className="countdown-num" id="cd-minutes" style={numStyle}>00</span>
            <span className="countdown-label" style={labelStyle}>Minutes</span>
          </div>
          <div className="countdown-box" style={countdownBoxStyle}>
            <span ref={secondsRef} className="countdown-num" id="cd-seconds" style={numStyle}>00</span>
            <span className="countdown-label" style={labelStyle}>Seconds</span>
          </div>
        </div>

        <div className="mt-4">
          <a href="#" onClick={(e) => { e.preventDefault(); revealEmail(e); }} className="btn btn-amber">
            Be part of it before anyone else — Partner With Us
          </a>
        </div>
      </div>
    </section>
  )
}
