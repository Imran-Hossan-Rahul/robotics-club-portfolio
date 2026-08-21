"use client";
export default function Partner() {
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

  return (
    <section className="partner section fade-in" id="partner">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="sponsor-main-heading text-wrap text-break" style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            Power the Next Robo Expo
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Join us in shaping the next generation of engineering leaders.
          </p>
        </div>

        <div className="why-sponsor mt-5">
          <h3 className="text-center mb-3">Why Sponsor Us?</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h4>Brand Visibility</h4>
              <p>Reach over 2,909 engineering students and faculty.</p>
            </div>
            <div className="benefit-card">
              <h4>Media Reach</h4>
              <p>Extensive social media coverage and local press reach.</p>
            </div>
            <div className="benefit-card">
              <h4>Association with Innovation</h4>
              <p>Align your brand with cutting-edge student projects.</p>
            </div>
          </div>
        </div>

        <div className="partner-cta text-center mt-5">
          <a href="#" onClick={(e) => { e.preventDefault(); revealEmail(e); }} className="btn btn-amber btn-large">
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  )
}
