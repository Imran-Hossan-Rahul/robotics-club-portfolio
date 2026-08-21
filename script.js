document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    const heroMainLogo = document.getElementById('hero-main-logo');
    const navAnimatedLogoWrapper = document.getElementById('nav-animated-logo-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled-logo');
        } else {
            navbar.classList.remove('scrolled-logo');
        }
        
        // Handle logo animation based on hero logo visibility
        if (heroMainLogo && navAnimatedLogoWrapper) {
            const heroLogoRect = heroMainLogo.getBoundingClientRect();
            // If the hero logo goes above the screen or is close to it
            if (heroLogoRect.bottom < 60) {
                navAnimatedLogoWrapper.style.opacity = '1';
                navAnimatedLogoWrapper.style.maxHeight = '50px';
            } else {
                navAnimatedLogoWrapper.style.opacity = '0';
                navAnimatedLogoWrapper.style.maxHeight = '0px';
            }
        }
    });

    // Scroll-triggered animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 50px 0px',
        threshold: 0.02
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Timeline scroll animation
    const timelineContainer = document.getElementById('events-timeline');
    const timelineProgress = document.getElementById('timeline-progress');
    const eventNodes = document.querySelectorAll('.event-node');

    if (timelineContainer && timelineProgress) {
        window.addEventListener('scroll', () => {
            const containerRect = timelineContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how far we've scrolled through the timeline
            // Start the line when the top of the timeline is in the middle of the screen
            const startScroll = containerRect.top - windowHeight / 2;
            const totalHeight = containerRect.height;
            
            let progress = 0;
            
            if (startScroll < 0) {
                progress = Math.min(100, Math.max(0, (Math.abs(startScroll) / totalHeight) * 100));
            }
            
            timelineProgress.style.height = `${progress}%`;

            // Light up nodes based on progress
            eventNodes.forEach(node => {
                const nodeRect = node.getBoundingClientRect();
                // If the progress line has reached the node
                if (nodeRect.top < windowHeight / 2 + 20) {
                    node.classList.add('active');
                } else {
                    node.classList.remove('active');
                }
            });
        });
    }

    // Initialize Swiper for each event gallery
    const swiperInstances = document.querySelectorAll('.event-gallery-window.swiper');
    swiperInstances.forEach((swiperEl) => {
        new Swiper(swiperEl, {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 12, // matches ~2vw gap
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: swiperEl.querySelector('.swiper-button-next'),
                prevEl: swiperEl.querySelector('.swiper-button-prev'),
            },
            grabCursor: true,
            speed: 800, // Smooth transition speed
        });
    });

    // Autonomous Digital Pet Robot Face Swarm
    const canvas = document.getElementById('circuit-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let bots = [];
        
        let mouse = { x: window.innerWidth/2, y: window.innerHeight/2, isActive: true, isClicked: false, velocity: 0 };
        let prevMouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
        let autoAnchor = { x: window.innerWidth/2, y: window.innerHeight/2, vx: 2, vy: 1.5, angle: 0, targetAngle: 0, speed: 2.0 };
        let steerAngle = 0;
        
        let time = 0;
        let idleTimer = 0;
        let autoShapeTimer = 0;
        let autoShapeSwitchTime = 400; // Variable switch time
        let transitionTimer = 0;
        let shakeTimer = 0;
        let walkPhase = 0;
        let rotorAngle = 0;
        let directionChanges = 0;
        let lastDirection = 0;
        
        let activeState = 0; // 0=Happy, 1=Sad, 2=Laugh, 3=Surprised, 4=Angry, 5=Plane
        let isAutonomous = false;
        let isHoveringButton = false;

        // Setup hover detection for interactive elements
        document.querySelectorAll('.btn, button, a').forEach(el => {
            el.addEventListener('mouseenter', () => isHoveringButton = true);
            el.addEventListener('mouseleave', () => isHoveringButton = false);
        });
        
        // AI State Engine vars
        let isBlinking = false;
        let blinkCountdown = Math.random() * 150 + 100;
        let aweTimer = 0;
        let barrelRollTimer = 0;
        let barrelRollOffset = 0;
        let laserTimer = 0;
        let bullets = [];

        // Helper to sample points along a line
        function sampleLine(x1, y1, x2, y2, count, part = null) {
            let pts = [];
            for(let i=0; i<count; i++) {
                let t = count <= 1 ? 0.5 : i / (count-1);
                pts.push({ x: x1 + (x2-x1)*t, y: y1 + (y2-y1)*t, part: part });
            }
            return pts;
        }

        // Helper to sample points along an arc
        function sampleArc(cx, cy, r, startAngle, endAngle, count) {
            let pts = [];
            for(let i=0; i<count; i++) {
                let t = count <= 1 ? 0.5 : i / (count-1);
                let angle = startAngle + (endAngle - startAngle)*t;
                pts.push({ x: cx + r*Math.cos(angle), y: cy + r*Math.sin(angle) });
            }
            return pts;
        }

        function generateFace(expression, numBots) {
            let targets = [];
            let eyeBots = Math.floor(numBots * 0.2); // 20% per eye
            let mouthBots = numBots - (eyeBots * 2); // 60% for mouth
            
            let ex = 45; // eye x offset
            let ey = -25; // eye y offset

            if (expression === 0) { // 0 = Happy
                targets.push(...sampleLine(-ex - 15, ey, -ex + 15, ey, eyeBots));
                targets.push(...sampleLine(ex - 15, ey, ex + 15, ey, eyeBots));
                targets.push(...sampleArc(0, 10, 40, Math.PI*0.1, Math.PI*0.9, mouthBots));
            } 
            else if (expression === 1) { // 1 = Sad
                targets.push(...sampleLine(-ex - 15, ey - 5, -ex + 15, ey + 10, eyeBots));
                targets.push(...sampleLine(ex - 15, ey + 10, ex + 15, ey - 5, eyeBots));
                targets.push(...sampleArc(0, 60, 30, Math.PI*1.2, Math.PI*1.8, mouthBots));
            }
            else if (expression === 2) { // 2 = Laugh
                let halfEye = Math.floor(eyeBots/2);
                targets.push(...sampleLine(-ex - 15, ey, -ex, ey - 15, halfEye));
                targets.push(...sampleLine(-ex, ey - 15, -ex + 15, ey, eyeBots - halfEye));
                targets.push(...sampleLine(ex - 15, ey, ex, ey - 15, halfEye));
                targets.push(...sampleLine(ex, ey - 15, ex + 15, ey, eyeBots - halfEye));
                let upperMouth = Math.floor(mouthBots * 0.3);
                targets.push(...sampleLine(-35, 30, 35, 30, upperMouth));
                targets.push(...sampleArc(0, 30, 35, 0, Math.PI, mouthBots - upperMouth));
            }
            else if (expression === 3) { // 3 = Surprised
                targets.push(...sampleArc(-ex, ey, 20, 0, Math.PI*2, eyeBots));
                targets.push(...sampleArc(ex, ey, 20, 0, Math.PI*2, eyeBots));
                targets.push(...sampleArc(0, 45, 15, 0, Math.PI*2, mouthBots));
            }
            else if (expression === 4) { // 4 = Angry
                targets.push(...sampleLine(-ex - 15, ey - 10, -ex + 15, ey + 10, eyeBots));
                targets.push(...sampleLine(ex - 15, ey + 10, ex + 15, ey - 10, eyeBots));
                targets.push(...sampleLine(-30, 45, 30, 45, mouthBots));
            }
            
            while(targets.length < numBots) targets.push({x:0, y:0});
            return targets;
        }

        function generatePlane(numBots) {
            let targets = [];
            // Fuselage (body pointing up)
            targets.push(...sampleLine(0, -40, 0, 40, 36)); 
            targets.push(...sampleLine(-5, -30, -5, 30, 18));
            targets.push(...sampleLine(5, -30, 5, 30, 18));
            
            // Wings (swept back)
            targets.push(...sampleLine(0, -10, -60, 20, 20)); // Left wing leading edge
            targets.push(...sampleLine(-60, 20, 0, 10, 15));  // Left wing trailing edge
            
            targets.push(...sampleLine(0, -10, 60, 20, 20));  // Right wing leading edge
            targets.push(...sampleLine(60, 20, 0, 10, 15));   // Right wing trailing edge
            
            // Tail
            targets.push(...sampleLine(0, 30, -20, 45, 14));
            targets.push(...sampleLine(0, 30, 20, 45, 14));
            
            while(targets.length < numBots) targets.push({x:0, y:0});
            return targets.slice(0, numBots);
        }

        function generateHelicopter(numBots) {
            let targets = [];
            // Body
            targets.push(...sampleLine(0, -30, 0, 30, 28)); 
            targets.push(...sampleLine(-10, -20, -10, 10, 9));
            targets.push(...sampleLine(10, -20, 10, 10, 9));
            // Tail boom
            targets.push(...sampleLine(0, 30, 0, 60, 18));
            // Tail rotor
            targets.push(...sampleLine(-15, 60, 15, 60, 9));
            targets.push(...sampleLine(0, 50, 0, 70, 9));
            // Skids
            targets.push(...sampleLine(-20, -10, -20, 40, 18));
            targets.push(...sampleLine(20, -10, 20, 40, 18));
            
            // Main Rotor (X shape) - massive scale
            targets.push(...sampleLine(-400, 0, 400, 0, 26, 'rotor'));
            targets.push(...sampleLine(0, -400, 0, 400, 26, 'rotor'));
            
            while(targets.length < numBots) targets.push({x:0, y:0});
            return targets.slice(0, numBots);
        }

        function generateTank(numBots) {
            let targets = [];
            // Hull
            targets.push(...sampleLine(-20, -25, 20, -25, 12));
            targets.push(...sampleLine(-20, 35, 20, 35, 12));
            targets.push(...sampleLine(-20, -25, -20, 35, 16));
            targets.push(...sampleLine(20, -25, 20, 35, 16));
            // Turret
            targets.push(...sampleLine(-10, -5, 10, -5, 8));
            targets.push(...sampleLine(-10, 15, 10, 15, 8));
            targets.push(...sampleLine(-10, -5, -10, 15, 8));
            targets.push(...sampleLine(10, -5, 10, 15, 8));
            // Barrel (long, pointing up/forward)
            targets.push(...sampleLine(-2, -5, -2, -50, 12));
            targets.push(...sampleLine(2, -5, 2, -50, 12));
            // Left Track
            targets.push(...sampleLine(-30, -35, -30, 45, 29));
            // Right Track
            targets.push(...sampleLine(30, -35, 30, 45, 29));
            
            while(targets.length < numBots) targets.push({x:0, y:0});
            return targets.slice(0, numBots);
        }

        class Microbot {
            constructor(targetOffsets, index, totalBots) {
                this.x = Math.random() * (width || window.innerWidth);
                this.y = Math.random() * (height || window.innerHeight);
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.targetOffsets = targetOffsets; 
                this.isAmber = false;
                this.color = '#F59E0B'; // Premium Amber (Matches Button)
                this.size = 2.0;
                // First 40% are eyes (or top parts)
                this.isEye = index < Math.floor(totalBots * 0.4);
            }

            update() {
                if (mouse.isActive || isAutonomous) {
                    let anchor = autoAnchor; // ALWAYS use autoAnchor
                    
                    let baseScale = window.innerWidth <= 768 ? 0.45 : 1;
                    let targetXOffset = this.targetOffsets[activeState].x * baseScale;
                    let targetYOffset = this.targetOffsets[activeState].y * baseScale;
                    
                    // Face follow mouse logic
                    if (activeState < 5) {
                        let angleToMouse = Math.atan2(mouse.y - anchor.y, mouse.x - anchor.x);
                        let distToMouse = Math.hypot(mouse.x - anchor.x, mouse.y - anchor.y);
                        let lookOffset = window.innerWidth <= 768 ? 0 : Math.min(distToMouse * 0.05, 12); // Shift up to 12px towards mouse (disabled on mobile)
                        targetXOffset += Math.cos(angleToMouse) * lookOffset;
                        targetYOffset += Math.sin(angleToMouse) * lookOffset;
                    }
                    
                    // Vehicle Physics (States 5 to 7)
                    if (activeState >= 5) {
                        let part = this.targetOffsets[activeState].part;
                        
                        // Helicopter Rotor Animation (State 6)
                        if (activeState === 6 && part === 'rotor') {
                            let rx = targetXOffset * Math.cos(rotorAngle) - targetYOffset * Math.sin(rotorAngle);
                            let ry = targetXOffset * Math.sin(rotorAngle) + targetYOffset * Math.cos(rotorAngle);
                            targetXOffset = rx;
                            targetYOffset = ry;
                        }

                        if (activeState === 5) {
                            // Plane banks/tilts based on turn rate, plus barrel rolls
                            let bankAngle = (autoAnchor.turnRate || 0) * 20; 
                            let brCos = Math.cos(bankAngle + barrelRollOffset);
                            targetXOffset *= brCos;
                        } 
                        
                        // Z-axis rotation to face velocity
                        if (activeState <= 7) {
                            let angle = Math.atan2(autoAnchor.vy, autoAnchor.vx) + Math.PI/2; 
                            let cosA = Math.cos(angle);
                            let sinA = Math.sin(angle);
                            let rx = targetXOffset * cosA - targetYOffset * sinA;
                            let ry = targetXOffset * sinA + targetYOffset * cosA;
                            targetXOffset = rx;
                            targetYOffset = ry;
                        }
                    }
                    
                    // Base target from shape
                    let tx = anchor.x + targetXOffset;
                    let ty = anchor.y + targetYOffset;
                    
                    // Apply blink squish to eyes (only if it's a face)
                    if (isBlinking && this.isEye && activeState < 5) {
                        ty = anchor.y - 25; 
                    }
                    
                    // Mood Dancing Offsets
                    let moodDanceScale = window.innerWidth <= 768 ? 0.3 : 1; // Reduce dancing on mobile to stay in navbar
                    if (activeState === 0) { // Happy bob
                        ty += Math.sin(time * 0.06) * 8 * moodDanceScale;
                    } else if (activeState === 1) { // Sad sway
                        tx += Math.sin(time * 0.03) * 20 * moodDanceScale;
                        ty += Math.sin(time * 0.05) * 5 * moodDanceScale;
                    } else if (activeState === 2) { // Laugh shake
                        ty += Math.sin(time * 0.4) * 12 * moodDanceScale;
                        tx += Math.sin(time * 0.2) * 4 * moodDanceScale;
                    } else if (activeState === 4) { // Angry jitter
                        tx += (Math.random() - 0.5) * 6 * moodDanceScale;
                        ty += (Math.random() - 0.5) * 6 * moodDanceScale;
                    } 
                    // activeState 5 (Plane) has no bobbing so it flies completely smoothly

                    let dx = tx - this.x;
                    let dy = ty - this.y;
                    
                    let tension = activeState === 3 ? 0.12 : 0.06; 
                    let friction = activeState === 3 ? 0.65 : 0.8;
                    
                    // Swarm Transition Physics: When switching states, drift slowly and unevenly
                    if (transitionTimer > 0) {
                        // Pseudo-random lag based on the bot's current X position
                        let botLag = (this.x % 100) / 100; 
                        tension = 0.003 + (botLag * 0.008); // Very low tension so they float lazily
                        friction = 0.90; // High friction so they glide smoothly
                    }

                    this.vx += dx * tension;
                    this.vy += dy * tension;
                    this.vx *= friction;
                    this.vy *= friction;
                } else {
                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                    
                    if (Math.random() < 0.05) {
                        this.vx += (Math.random() - 0.5) * 0.5;
                        this.vy += (Math.random() - 0.5) * 0.5;
                    }
                    
                    let speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
                    if (speed > 1.5) {
                        this.vx = (this.vx/speed) * 1.5;
                        this.vy = (this.vy/speed) * 1.5;
                    }
                }
                
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                
                if (mouse.isActive || isAutonomous) {
                    ctx.shadowBlur = activeState === 3 ? 20 : 12; 
                    ctx.shadowColor = this.color;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            }
        }

        function initSwarm() {
            bots = [];
            let numBots = 170;
            let faces = [
                generateFace(0, numBots),  // Happy
                generateFace(1, numBots),  // Sad
                generateFace(2, numBots),  // Laugh
                generateFace(3, numBots),  // Surprised
                generateFace(4, numBots)   // Angry
            ];
            
            let plane = generatePlane(numBots);
            let helicopter = generateHelicopter(numBots);
            let tank = generateTank(numBots);

            for (let i = 0; i < numBots; i++) {
                bots.push(new Microbot([
                    faces[0][i], faces[1][i], faces[2][i], faces[3][i], faces[4][i], 
                    plane[i], helicopter[i], tank[i]
                ], i, numBots));
            }
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            time++;

            // Blink logic
            blinkCountdown--;
            if (blinkCountdown <= 0) {
                isBlinking = true;
                if (blinkCountdown < -8) { // 8 frames of blink
                    isBlinking = false;
                    blinkCountdown = Math.random() * 200 + 100;
                }
            }

            // Behavioral Triggers Tracking
            let dx = mouse.x - prevMouse.x;
            let dy = mouse.y - prevMouse.y;
            let currentVel = Math.sqrt(dx*dx + dy*dy);
            mouse.velocity = mouse.velocity * 0.8 + currentVel * 0.2;
            
            // Detect Shaking
            if (currentVel > 5 && !isAutonomous) {
                let currentDir = Math.sign(dx);
                if (currentDir !== 0 && currentDir !== lastDirection) {
                    directionChanges++;
                    lastDirection = currentDir;
                    shakeTimer = 60; 
                }
            } else {
                directionChanges = Math.max(0, directionChanges - 0.1); 
            }
            if (shakeTimer > 0) shakeTimer--;

            // Idle timer tracking
            if (currentVel < 1 && !mouse.isClicked) {
                idleTimer++;
            } else {
                idleTimer = 0;
                isAutonomous = false;
                activeState = 0; // Reset to face when mouse comes back
                // Do not sync auto anchor to mouse, it will animate to top-left
            }

            prevMouse.x = mouse.x;
            prevMouse.y = mouse.y;

            // Deep Idle / Autonomous wandering
            if (idleTimer > 300 && window.innerWidth > 768) { // 5 seconds of idle (desktop only)
                if (!isAutonomous) {
                    isAutonomous = true;
                    activeState = 5; // Start with Plane Shape
                    autoShapeTimer = 0;
                    autoShapeSwitchTime = 900 + Math.random() * 600; // Between 15 to 25 seconds
                } else {
                    autoShapeTimer++;
                    if (autoShapeTimer > autoShapeSwitchTime) { 
                        autoShapeTimer = 0;
                        autoShapeSwitchTime = 900 + Math.random() * 600; // Vary the switch time
                        transitionTimer = 180; // 3 seconds of slow, swarm-like reassembly
                        
                        activeState++;
                        if (activeState > 7) activeState = 5;
                        
                        // Break and rebuild explosion!
                        bots.forEach(bot => {
                            bot.target = null;
                            bot.vx += (Math.random() - 0.5) * 15;
                            bot.vy += (Math.random() - 0.5) * 15;
                        });
                    }
                }
                
                if (transitionTimer > 0) {
                    transitionTimer--;
                    rotorAngle += 0.05; // Slow spin during rebuild
                } else {
                    rotorAngle += 0.6; // Fast spin when rebuilt
                }
                
                // Barrel Roll Trigger (Reduced frequency)
                if (Math.random() < 0.001 && barrelRollTimer <= 0) {
                    barrelRollTimer = 200; // Longer rotation time for cinematic 3D feel
                }
                if (barrelRollTimer > 0) {
                    barrelRollTimer--;
                    barrelRollOffset += (Math.PI * 2) / 200; // Slow, dramatic 360 degree spin
                } else {
                    // Smoothly settle back to flat if offset is off-center
                    if (barrelRollOffset > Math.PI) {
                        barrelRollOffset -= Math.PI * 2; 
                    }
                    barrelRollOffset *= 0.95; // Softer reset to flat
                }
                
                // Laser Firing Trigger (Reduced frequency)
                if (Math.random() < 0.005 && laserTimer <= 0) {
                    laserTimer = 25; // Burst duration
                }
                
                // Wander physics (Smooth Arc Steering)
                autoAnchor.targetAngle += (Math.random() - 0.5) * 0.4; // Randomly shift desired direction
                
                // Avoid edges smoothly (overwrite target angle to point away)
                let margin = 300;
                if (autoAnchor.x < margin) autoAnchor.targetAngle = 0; // Point Right
                if (autoAnchor.x > width - margin) autoAnchor.targetAngle = Math.PI; // Point Left
                if (autoAnchor.y < margin) autoAnchor.targetAngle = Math.PI/2; // Point Down
                if (autoAnchor.y > height - margin) autoAnchor.targetAngle = -Math.PI/2; // Point Up
                
                // Smoothly interpolate current angle towards targetAngle
                let angleDiff = autoAnchor.targetAngle - autoAnchor.angle;
                // Normalize angle diff to -PI to PI
                angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
                
                autoAnchor.turnRate = angleDiff * 0.02; // Store turn rate for 3D banking
                autoAnchor.angle += autoAnchor.turnRate; // Very slow, smooth turning rate
                
                // Dynamic speed variation for 3D flying feel
                let baseSpeed = 2.0 + Math.sin(time * 0.005) * 1.5; // Modulates between 0.5 and 3.5
                let speedMultiplier = 1.0;
                if (activeState === 7) speedMultiplier = 0.35; // Tank is slow
                
                autoAnchor.speed = baseSpeed * speedMultiplier;
                walkPhase += autoAnchor.speed * 0.15;
                
                autoAnchor.vx = Math.cos(autoAnchor.angle) * autoAnchor.speed;
                autoAnchor.vy = Math.sin(autoAnchor.angle) * autoAnchor.speed;
                
                autoAnchor.x += autoAnchor.vx;
                autoAnchor.y += autoAnchor.vy;
                
            } else {
                // Not idle, so it's a Face. Slide autoAnchor to top-left fixed position
                let tx = 140; // Default X position
                let ty = 160; // Default Y position
                
                if (window.innerWidth <= 768) {
                    tx = window.innerWidth / 2; // Exact center of screen width
                    ty = 30; // Vertically center in mobile navbar
                    
                    // On mobile, occasionally change expressions if idle
                    if (idleTimer > 300 && idleTimer % 300 === 0) {
                        activeState = Math.floor(Math.random() * 3); // Happy, Sad, Laugh
                    }
                }
                autoAnchor.x += (tx - autoAnchor.x) * 0.05;
                autoAnchor.y += (ty - autoAnchor.y) * 0.05;
                
                if (mouse.isActive) {
                    // Random Surprised face while moving normally
                    if (currentVel > 2 && Math.random() < 0.005 && aweTimer <= 0) {
                        aweTimer = 90; // Stay surprised for 1.5 seconds
                    }
                    if (aweTimer > 0) aweTimer--;
                    
                    // Interactive State Resolution
                    if (mouse.isClicked || aweTimer > 0 || isHoveringButton) {
                        activeState = 3; // Surprised
                    } else if (directionChanges > 5 || shakeTimer > 0) {
                        activeState = 4; // Angry / Dizzy
                    } else if (mouse.velocity > 25) {
                        activeState = 2; // Laugh
                    } else if (idleTimer > 180) { // 3 seconds idle
                        activeState = 1; // Sad / Bored
                    } else {
                        activeState = 0; // Happy Default
                    }
                }
            }

            // Update & Draw Logic
            for (let bot of bots) bot.update();

            // Only draw the connecting web/mesh when idle to save massive performance
            // When in face mode, the dots are too dense and lines cause extreme lag
            if (!mouse.isActive && !isAutonomous) {
                ctx.lineWidth = 0.5;
                for (let i = 0; i < bots.length; i++) {
                    for (let j = i + 1; j < bots.length; j++) {
                        let bdx = bots[i].x - bots[j].x;
                        let bdy = bots[i].y - bots[j].y;
                        let distSq = bdx * bdx + bdy * bdy;
                        
                        let connectDist = 4900; // 70px when floating
                        if (distSq < connectDist) {
                            let dist = Math.sqrt(distSq);
                            let opacity = 1 - (dist / 70);
                            
                            ctx.beginPath();
                            ctx.moveTo(bots[i].x, bots[i].y);
                            ctx.lineTo(bots[j].x, bots[j].y);
                            
                            if (bots[i].isAmber || bots[j].isAmber) {
                                ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * 0.8})`;
                            } else {
                                ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * 0.4})`;
                            }
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw bots on top of lines
            for (let bot of bots) bot.draw();
            
            // Laser Firing Trigger
            if (isAutonomous && activeState >= 5) {
                if (laserTimer > 0) {
                    laserTimer--;
                    
                    let velAngle = Math.atan2(autoAnchor.vy, autoAnchor.vx);
                    
                    if (activeState === 7) {
                        // TANK: Shoot a single massive cannonball on the first frame of the burst
                        if (laserTimer === 24) {
                            let noseX = autoAnchor.x + Math.cos(velAngle) * 50; 
                            let noseY = autoAnchor.y + Math.sin(velAngle) * 50;
                            bullets.push({
                                x: noseX,
                                y: noseY,
                                vx: Math.cos(velAngle) * 12, // Slower heavy projectile
                                vy: Math.sin(velAngle) * 12,
                                life: 180,
                                type: 'cannon'
                            });
                        }
                    } else {
                        // OTHER VEHICLES: Rapid fire lasers
                        // Fire a bullet every 4 frames during the burst
                        if (laserTimer % 4 === 0) {
                            let noseX, noseY;
                            
                            // Standard forward firing position for other vehicles
                            noseX = autoAnchor.x + Math.cos(velAngle) * 50; 
                            noseY = autoAnchor.y + Math.sin(velAngle) * 50;

                            bullets.push({
                                x: noseX,
                                y: noseY,
                                vx: Math.cos(velAngle) * 22, // High speed projectile
                                vy: Math.sin(velAngle) * 22,
                                life: 150,
                                type: 'laser'
                            });
                        }
                    }
                }
            }
            
            // Draw and update real bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                let b = bullets[i];
                b.x += b.vx;
                b.y += b.vy;
                b.life--;
                
                // Draw Bullet based on type
                if (b.type === 'cannon') {
                    // Draw heavy cannonball
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, 8, 0, Math.PI * 2); 
                    ctx.fillStyle = '#F59E0B';
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#F59E0B';
                    ctx.fill();
                    // Cannonball trail
                    ctx.beginPath();
                    ctx.moveTo(b.x, b.y);
                    ctx.lineTo(b.x - b.vx * 3, b.y - b.vy * 3);
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
                    ctx.stroke();
                } else {
                    // Draw Tracer Laser Bullet
                    ctx.beginPath();
                    ctx.moveTo(b.x, b.y);
                    ctx.lineTo(b.x - b.vx * 1.5, b.y - b.vy * 1.5); // Tracer tail
                    ctx.lineWidth = 4; 
                    ctx.strokeStyle = '#F59E0B';
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#F59E0B';
                    ctx.stroke();
                }
                
                // Check edge collision
                if (b.x < 0 || b.x > width || b.y < 0 || b.y > height) {
                    // Explosion
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, Math.random() * 15 + 10, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(245, 158, 11, 0.8)`; // Amber explosion
                    ctx.shadowColor = '#F59E0B';
                    ctx.fill();
                    
                    // Spark debris
                    for(let j=0; j<6; j++) {
                        let velAngle = Math.atan2(b.vy, b.vx);
                        let sparkAngle = velAngle + Math.PI + (Math.random() - 0.5) * Math.PI; // bounce backwards
                        let sx = b.x + Math.cos(sparkAngle) * (Math.random() * 40 + 10);
                        let sy = b.y + Math.sin(sparkAngle) * (Math.random() * 40 + 10);
                        ctx.beginPath();
                        ctx.moveTo(b.x, b.y);
                        ctx.lineTo(sx, sy);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#F59E0B';
                        ctx.stroke();
                    }
                    bullets.splice(i, 1); // Delete bullet after hitting edge
                } else if (b.life <= 0) {
                    bullets.splice(i, 1);
                }
                ctx.shadowBlur = 0; // reset
            }

            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.isActive = true;
        });
        
        window.addEventListener('mousedown', () => mouse.isClicked = true);
        window.addEventListener('mouseup', () => mouse.isClicked = false);
        
        window.addEventListener('mouseleave', () => {
            mouse.isClicked = false;
        });

        resize();
        initSwarm();
        draw();
    }
});

// Email Reveal and Copy Functionality
window.revealEmail = function(btn) {
    if (btn.classList.contains('email-revealed')) return;
    
    const email = 'roboticsclub@uap-bd.edu';
    btn.innerHTML = `<span style="text-transform: none; letter-spacing: normal;">${email}</span>`;
    
    // Create copy button outside
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-outline copy-email-btn';
    copyBtn.style.padding = '0 15px';
    copyBtn.style.display = 'inline-flex';
    copyBtn.style.alignItems = 'center';
    copyBtn.style.justifyContent = 'center';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>`;
        
    copyBtn.onclick = function(e) {
        window.copyEmail(e, email, this);
    };
    
    // Ensure parent aligns them
    if (window.getComputedStyle(btn.parentNode).display !== 'flex') {
        btn.parentNode.style.display = 'flex';
        btn.parentNode.style.gap = '10px';
        btn.parentNode.style.alignItems = 'center';
        btn.parentNode.style.justifyContent = 'center';
    } else if (!btn.parentNode.style.gap) {
        btn.parentNode.style.gap = '15px';
    }
    
    btn.parentNode.insertBefore(copyBtn, btn.nextSibling);
    
    btn.classList.add('email-revealed');
    btn.style.cursor = 'text';
    btn.onclick = null;
};

window.copyEmail = function(e, email, copyBtn) {
    e.stopPropagation();
    e.preventDefault();
    
    navigator.clipboard.writeText(email).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg> <span style="font-size: 0.9rem; margin-left: 6px; font-weight: 500;">Copied</span>`;
        copyBtn.classList.remove('btn-outline');
        copyBtn.classList.add('btn-amber');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('btn-amber');
            copyBtn.classList.add('btn-outline');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

// Teaser Countdown
const countdownDate = new Date("Dec 14, 2026 00:00:00").getTime();
const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById("cd-days");
    if(elDays) {
        elDays.innerText = String(days).padStart(2, '0');
        document.getElementById("cd-hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("cd-minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("cd-seconds").innerText = String(seconds).padStart(2, '0');
    }
}, 1000);
