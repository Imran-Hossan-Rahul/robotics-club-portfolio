"use client";
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width, height
    let bots = []
    let animFrameId

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, isActive: true, isClicked: false, velocity: 0 }
    let prevMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let autoAnchor = { x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 2, vy: 1.5, angle: 0, targetAngle: 0, speed: 2.0 }
    let steerAngle = 0

    let time = 0
    let idleTimer = 0
    let autoShapeTimer = 0
    let autoShapeSwitchTime = 400
    let transitionTimer = 0
    let shakeTimer = 0
    let walkPhase = 0
    let rotorAngle = 0
    let directionChanges = 0
    let lastDirection = 0

    let activeState = 0
    let isAutonomous = false
    let isHoveringButton = false

    document.querySelectorAll('.btn, button, a').forEach(el => {
      el.addEventListener('mouseenter', () => isHoveringButton = true)
      el.addEventListener('mouseleave', () => isHoveringButton = false)
    })

    let isBlinking = false
    let blinkCountdown = Math.random() * 150 + 100
    let aweTimer = 0
    let barrelRollTimer = 0
    let barrelRollOffset = 0
    let laserTimer = 0
    let bullets = []

    function sampleLine(x1, y1, x2, y2, count, part = null) {
      let pts = []
      for (let i = 0; i < count; i++) {
        let t = count <= 1 ? 0.5 : i / (count - 1)
        pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, part: part })
      }
      return pts
    }

    function sampleArc(cx, cy, r, startAngle, endAngle, count) {
      let pts = []
      for (let i = 0; i < count; i++) {
        let t = count <= 1 ? 0.5 : i / (count - 1)
        let angle = startAngle + (endAngle - startAngle) * t
        pts.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) })
      }
      return pts
    }

    function generateFace(expression, numBots) {
      let targets = []
      let eyeBots = Math.floor(numBots * 0.2)
      let mouthBots = numBots - (eyeBots * 2)
      let ex = 45, ey = -25

      if (expression === 0) {
        targets.push(...sampleLine(-ex - 15, ey, -ex + 15, ey, eyeBots))
        targets.push(...sampleLine(ex - 15, ey, ex + 15, ey, eyeBots))
        targets.push(...sampleArc(0, 10, 40, Math.PI * 0.1, Math.PI * 0.9, mouthBots))
      } else if (expression === 1) {
        targets.push(...sampleLine(-ex - 15, ey - 5, -ex + 15, ey + 10, eyeBots))
        targets.push(...sampleLine(ex - 15, ey + 10, ex + 15, ey - 5, eyeBots))
        targets.push(...sampleArc(0, 60, 30, Math.PI * 1.2, Math.PI * 1.8, mouthBots))
      } else if (expression === 2) {
        let halfEye = Math.floor(eyeBots / 2)
        targets.push(...sampleLine(-ex - 15, ey, -ex, ey - 15, halfEye))
        targets.push(...sampleLine(-ex, ey - 15, -ex + 15, ey, eyeBots - halfEye))
        targets.push(...sampleLine(ex - 15, ey, ex, ey - 15, halfEye))
        targets.push(...sampleLine(ex, ey - 15, ex + 15, ey, eyeBots - halfEye))
        let upperMouth = Math.floor(mouthBots * 0.3)
        targets.push(...sampleLine(-35, 30, 35, 30, upperMouth))
        targets.push(...sampleArc(0, 30, 35, 0, Math.PI, mouthBots - upperMouth))
      } else if (expression === 3) {
        targets.push(...sampleArc(-ex, ey, 20, 0, Math.PI * 2, eyeBots))
        targets.push(...sampleArc(ex, ey, 20, 0, Math.PI * 2, eyeBots))
        targets.push(...sampleArc(0, 45, 15, 0, Math.PI * 2, mouthBots))
      } else if (expression === 4) {
        targets.push(...sampleLine(-ex - 15, ey - 10, -ex + 15, ey + 10, eyeBots))
        targets.push(...sampleLine(ex - 15, ey + 10, ex + 15, ey - 10, eyeBots))
        targets.push(...sampleLine(-30, 45, 30, 45, mouthBots))
      }

      while (targets.length < numBots) targets.push({ x: 0, y: 0 })
      return targets
    }

    function generatePlane(numBots) {
      let targets = []
      targets.push(...sampleLine(0, -40, 0, 40, 36))
      targets.push(...sampleLine(-5, -30, -5, 30, 18))
      targets.push(...sampleLine(5, -30, 5, 30, 18))
      targets.push(...sampleLine(0, -10, -60, 20, 20))
      targets.push(...sampleLine(-60, 20, 0, 10, 15))
      targets.push(...sampleLine(0, -10, 60, 20, 20))
      targets.push(...sampleLine(60, 20, 0, 10, 15))
      targets.push(...sampleLine(0, 30, -20, 45, 14))
      targets.push(...sampleLine(0, 30, 20, 45, 14))
      while (targets.length < numBots) targets.push({ x: 0, y: 0 })
      return targets.slice(0, numBots)
    }

    function generateHelicopter(numBots) {
      let targets = []
      targets.push(...sampleLine(0, -30, 0, 30, 28))
      targets.push(...sampleLine(-10, -20, -10, 10, 9))
      targets.push(...sampleLine(10, -20, 10, 10, 9))
      targets.push(...sampleLine(0, 30, 0, 60, 18))
      targets.push(...sampleLine(-15, 60, 15, 60, 9))
      targets.push(...sampleLine(0, 50, 0, 70, 9))
      targets.push(...sampleLine(-20, -10, -20, 40, 18))
      targets.push(...sampleLine(20, -10, 20, 40, 18))
      targets.push(...sampleLine(-400, 0, 400, 0, 26, 'rotor'))
      targets.push(...sampleLine(0, -400, 0, 400, 26, 'rotor'))
      while (targets.length < numBots) targets.push({ x: 0, y: 0 })
      return targets.slice(0, numBots)
    }

    function generateTank(numBots) {
      let targets = []
      targets.push(...sampleLine(-20, -25, 20, -25, 12))
      targets.push(...sampleLine(-20, 35, 20, 35, 12))
      targets.push(...sampleLine(-20, -25, -20, 35, 16))
      targets.push(...sampleLine(20, -25, 20, 35, 16))
      targets.push(...sampleLine(-10, -5, 10, -5, 8))
      targets.push(...sampleLine(-10, 15, 10, 15, 8))
      targets.push(...sampleLine(-10, -5, -10, 15, 8))
      targets.push(...sampleLine(10, -5, 10, 15, 8))
      targets.push(...sampleLine(-2, -5, -2, -50, 12))
      targets.push(...sampleLine(2, -5, 2, -50, 12))
      targets.push(...sampleLine(-30, -35, -30, 45, 29))
      targets.push(...sampleLine(30, -35, 30, 45, 29))
      while (targets.length < numBots) targets.push({ x: 0, y: 0 })
      return targets.slice(0, numBots)
    }

    class Microbot {
      constructor(targetOffsets, index, totalBots) {
        this.x = ((width || window.innerWidth) / 2) + (Math.random() - 0.5) * 200
        this.y = ((height || window.innerHeight) / 2) + (Math.random() - 0.5) * 200
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.targetOffsets = targetOffsets
        this.isAmber = false
        this.color = '#F59E0B'
        this.size = 2.0
        this.isEye = index < Math.floor(totalBots * 0.4)
      }

      update() {
        if (mouse.isActive || isAutonomous) {
          let anchor = autoAnchor
          let baseScale = window.innerWidth <= 768 ? 0.45 : 1
          let targetXOffset = this.targetOffsets[activeState].x * baseScale
          let targetYOffset = this.targetOffsets[activeState].y * baseScale

          if (activeState < 5) {
            let angleToMouse = Math.atan2(mouse.y - anchor.y, mouse.x - anchor.x)
            let distToMouse = Math.hypot(mouse.x - anchor.x, mouse.y - anchor.y)
            let lookOffset = window.innerWidth <= 768 ? 0 : Math.min(distToMouse * 0.05, 12)
            targetXOffset += Math.cos(angleToMouse) * lookOffset
            targetYOffset += Math.sin(angleToMouse) * lookOffset
          }

          if (activeState >= 5) {
            let part = this.targetOffsets[activeState].part
            if (activeState === 6 && part === 'rotor') {
              let rx = targetXOffset * Math.cos(rotorAngle) - targetYOffset * Math.sin(rotorAngle)
              let ry = targetXOffset * Math.sin(rotorAngle) + targetYOffset * Math.cos(rotorAngle)
              targetXOffset = rx
              targetYOffset = ry
            }
            if (activeState === 5) {
              let bankAngle = (autoAnchor.turnRate || 0) * 20
              let brCos = Math.cos(bankAngle + barrelRollOffset)
              targetXOffset *= brCos
            }
            if (activeState <= 7) {
              let angle = Math.atan2(autoAnchor.vy, autoAnchor.vx) + Math.PI / 2
              let cosA = Math.cos(angle), sinA = Math.sin(angle)
              let rx = targetXOffset * cosA - targetYOffset * sinA
              let ry = targetXOffset * sinA + targetYOffset * cosA
              targetXOffset = rx
              targetYOffset = ry
            }
          }

          let tx = anchor.x + targetXOffset
          let ty = anchor.y + targetYOffset

          if (isBlinking && this.isEye && activeState < 5) ty = anchor.y - 25

          let moodDanceScale = window.innerWidth <= 768 ? 0.3 : 1
          if (activeState === 0) ty += Math.sin(time * 0.06) * 8 * moodDanceScale
          else if (activeState === 1) { tx += Math.sin(time * 0.03) * 20 * moodDanceScale; ty += Math.sin(time * 0.05) * 5 * moodDanceScale }
          else if (activeState === 2) { ty += Math.sin(time * 0.4) * 12 * moodDanceScale; tx += Math.sin(time * 0.2) * 4 * moodDanceScale }
          else if (activeState === 4) { tx += (Math.random() - 0.5) * 6 * moodDanceScale; ty += (Math.random() - 0.5) * 6 * moodDanceScale }

          let dx = tx - this.x, dy = ty - this.y
          let tension = activeState === 3 ? 0.12 : 0.06
          let friction = activeState === 3 ? 0.65 : 0.8

          if (transitionTimer > 0) {
            let botLag = (this.x % 100) / 100
            tension = 0.003 + (botLag * 0.008)
            friction = 0.90
          }

          this.vx += dx * tension
          this.vy += dy * tension
          this.vx *= friction
          this.vy *= friction
        } else {
          if (this.x < 0 || this.x > width) this.vx *= -1
          if (this.y < 0 || this.y > height) this.vy *= -1
          if (Math.random() < 0.05) { this.vx += (Math.random() - 0.5) * 0.5; this.vy += (Math.random() - 0.5) * 0.5 }
          let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
          if (speed > 1.5) { this.vx = (this.vx / speed) * 1.5; this.vy = (this.vy / speed) * 1.5 }
        }
        this.x += this.vx
        this.y += this.vy
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.shadowBlur = (mouse.isActive || isAutonomous) ? (activeState === 3 ? 20 : 12) : 0
        ctx.shadowColor = this.color
        ctx.fill()
      }
    }

    function initSwarm() {
      bots = []
      let numBots = 170
      let faces = [generateFace(0, numBots), generateFace(1, numBots), generateFace(2, numBots), generateFace(3, numBots), generateFace(4, numBots)]
      let plane = generatePlane(numBots)
      let helicopter = generateHelicopter(numBots)
      let tank = generateTank(numBots)
      for (let i = 0; i < numBots; i++) {
        bots.push(new Microbot([faces[0][i], faces[1][i], faces[2][i], faces[3][i], faces[4][i], plane[i], helicopter[i], tank[i]], i, numBots))
      }
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      time++

      blinkCountdown--
      if (blinkCountdown <= 0) {
        isBlinking = true
        if (blinkCountdown < -8) { isBlinking = false; blinkCountdown = Math.random() * 200 + 100 }
      }

      let dx = mouse.x - prevMouse.x, dy = mouse.y - prevMouse.y
      let currentVel = Math.sqrt(dx * dx + dy * dy)
      mouse.velocity = mouse.velocity * 0.8 + currentVel * 0.2

      if (currentVel > 5 && !isAutonomous) {
        let currentDir = Math.sign(dx)
        if (currentDir !== 0 && currentDir !== lastDirection) { directionChanges++; lastDirection = currentDir; shakeTimer = 60 }
      } else {
        directionChanges = Math.max(0, directionChanges - 0.1)
      }
      if (shakeTimer > 0) shakeTimer--

      if (currentVel < 1 && !mouse.isClicked) {
        idleTimer++
      } else {
        idleTimer = 0; isAutonomous = false; activeState = 0
      }

      prevMouse.x = mouse.x; prevMouse.y = mouse.y

      if (idleTimer > 300 && window.innerWidth > 768) {
        if (!isAutonomous) {
          isAutonomous = true; activeState = 5; autoShapeTimer = 0
          autoShapeSwitchTime = 900 + Math.random() * 600
        } else {
          autoShapeTimer++
          if (autoShapeTimer > autoShapeSwitchTime) {
            autoShapeTimer = 0; autoShapeSwitchTime = 900 + Math.random() * 600
            transitionTimer = 180
            activeState++
            if (activeState > 7) activeState = 5
            bots.forEach(bot => { bot.target = null; bot.vx += (Math.random() - 0.5) * 15; bot.vy += (Math.random() - 0.5) * 15 })
          }
        }

        if (transitionTimer > 0) { transitionTimer--; rotorAngle += 0.05 } else { rotorAngle += 0.6 }

        if (Math.random() < 0.001 && barrelRollTimer <= 0) barrelRollTimer = 200
        if (barrelRollTimer > 0) { barrelRollTimer--; barrelRollOffset += (Math.PI * 2) / 200 } else {
          if (barrelRollOffset > Math.PI) barrelRollOffset -= Math.PI * 2
          barrelRollOffset *= 0.95
        }

        if (Math.random() < 0.005 && laserTimer <= 0) laserTimer = 25

        autoAnchor.targetAngle += (Math.random() - 0.5) * 0.4
        let margin = 300
        if (autoAnchor.x < margin) autoAnchor.targetAngle = 0
        if (autoAnchor.x > width - margin) autoAnchor.targetAngle = Math.PI
        if (autoAnchor.y < margin) autoAnchor.targetAngle = Math.PI / 2
        if (autoAnchor.y > height - margin) autoAnchor.targetAngle = -Math.PI / 2

        let angleDiff = autoAnchor.targetAngle - autoAnchor.angle
        angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff))
        autoAnchor.turnRate = angleDiff * 0.02
        autoAnchor.angle += autoAnchor.turnRate

        let baseSpeed = 2.0 + Math.sin(time * 0.005) * 1.5
        let speedMultiplier = activeState === 7 ? 0.35 : 1.0
        autoAnchor.speed = baseSpeed * speedMultiplier
        walkPhase += autoAnchor.speed * 0.15

        autoAnchor.vx = Math.cos(autoAnchor.angle) * autoAnchor.speed
        autoAnchor.vy = Math.sin(autoAnchor.angle) * autoAnchor.speed
        autoAnchor.x += autoAnchor.vx
        autoAnchor.y += autoAnchor.vy
      } else {
        let tx = 140, ty = 160
        if (window.innerWidth <= 768) {
          tx = window.innerWidth / 2; ty = 30
          if (idleTimer > 300 && idleTimer % 300 === 0) activeState = Math.floor(Math.random() * 3)
        }
        autoAnchor.x += (tx - autoAnchor.x) * 0.05
        autoAnchor.y += (ty - autoAnchor.y) * 0.05

        if (mouse.isActive) {
          if (currentVel > 2 && Math.random() < 0.005 && aweTimer <= 0) aweTimer = 90
          if (aweTimer > 0) aweTimer--

          if (mouse.isClicked || aweTimer > 0 || isHoveringButton) activeState = 3
          else if (directionChanges > 5 || shakeTimer > 0) activeState = 4
          else if (mouse.velocity > 25) activeState = 2
          else if (idleTimer > 180) activeState = 1
          else activeState = 0
        }
      }

      for (let bot of bots) bot.update()

      if (!mouse.isActive && !isAutonomous) {
        ctx.lineWidth = 0.5
        for (let i = 0; i < bots.length; i++) {
          for (let j = i + 1; j < bots.length; j++) {
            let bdx = bots[i].x - bots[j].x, bdy = bots[i].y - bots[j].y
            let distSq = bdx * bdx + bdy * bdy
            if (distSq < 4900) {
              let dist = Math.sqrt(distSq)
              let opacity = 1 - (dist / 70)
              ctx.beginPath()
              ctx.moveTo(bots[i].x, bots[i].y)
              ctx.lineTo(bots[j].x, bots[j].y)
              ctx.strokeStyle = (bots[i].isAmber || bots[j].isAmber)
                ? `rgba(245, 158, 11, ${opacity * 0.8})`
                : `rgba(245, 158, 11, ${opacity * 0.4})`
              ctx.stroke()
            }
          }
        }
      }

      for (let bot of bots) bot.draw()

      if (isAutonomous && activeState >= 5) {
        if (laserTimer > 0) {
          laserTimer--
          let velAngle = Math.atan2(autoAnchor.vy, autoAnchor.vx)
          if (activeState === 7) {
            if (laserTimer === 24) {
              let noseX = autoAnchor.x + Math.cos(velAngle) * 50
              let noseY = autoAnchor.y + Math.sin(velAngle) * 50
              bullets.push({ x: noseX, y: noseY, vx: Math.cos(velAngle) * 12, vy: Math.sin(velAngle) * 12, life: 180, type: 'cannon' })
            }
          } else {
            if (laserTimer % 4 === 0) {
              let noseX = autoAnchor.x + Math.cos(velAngle) * 50
              let noseY = autoAnchor.y + Math.sin(velAngle) * 50
              bullets.push({ x: noseX, y: noseY, vx: Math.cos(velAngle) * 22, vy: Math.sin(velAngle) * 22, life: 150, type: 'laser' })
            }
          }
        }
      }

      for (let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i]
        b.x += b.vx; b.y += b.vy; b.life--
        if (b.type === 'cannon') {
          ctx.beginPath(); ctx.arc(b.x, b.y, 8, 0, Math.PI * 2)
          ctx.fillStyle = '#F59E0B'; ctx.shadowBlur = 20; ctx.shadowColor = '#F59E0B'; ctx.fill()
          ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * 3, b.y - b.vy * 3)
          ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)'; ctx.stroke()
        } else {
          ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * 1.5, b.y - b.vy * 1.5)
          ctx.lineWidth = 4; ctx.strokeStyle = '#F59E0B'; ctx.shadowBlur = 15; ctx.shadowColor = '#F59E0B'; ctx.stroke()
        }
        if (b.x < 0 || b.x > width || b.y < 0 || b.y > height) {
          ctx.beginPath(); ctx.arc(b.x, b.y, Math.random() * 15 + 10, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(245, 158, 11, 0.8)'; ctx.shadowColor = '#F59E0B'; ctx.fill()
          bullets.splice(i, 1)
        } else if (b.life <= 0) {
          bullets.splice(i, 1)
        }
        ctx.shadowBlur = 0
      }

      animFrameId = requestAnimationFrame(draw)
    }

    const handleResize = () => resize()
    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.isActive = true }
    const handleMouseDown = () => (mouse.isClicked = true)
    const handleMouseUp = () => (mouse.isClicked = false)
    const handleMouseLeave = () => (mouse.isClicked = false)

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)

    resize()
    initSwarm()
    draw()

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
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

  return (
    <>
      <canvas id="circuit-canvas" ref={canvasRef}></canvas>
      <header className="hero section fade-in" id="hero">
        <div className="container text-center hero-content" style={{ position: 'relative', zIndex: 10 }}>
          <img src="/photo/robotics-club-logo.png" alt="Robotics Club Logo" id="hero-main-logo" style={{ width: '130px', height: 'auto', marginBottom: '25px' }} />
          <h1 className="hero-title">Robotics Club</h1>
          <h2 className="hero-subtitle">University of Asia Pacific</h2>
          <p className="hero-mission">We are dedicated to fostering innovation in robotics, providing students with hands-on experience, and building competitive autonomous systems.</p>
          <div className="hero-buttons">
            <a href="#committee" className="btn btn-outline">Meet the Team</a>
            <a href="#" onClick={(e) => { e.preventDefault(); revealEmail(e); }} className="btn btn-amber">Partner With Us</a>
          </div>
        </div>
      </header>
    </>
  )
}
