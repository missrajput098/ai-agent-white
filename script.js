// ==========================================
// AGENTSPACE - Dual Theme & Interactive Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Professional Web Audio API Synthesizer
    // ==========================================
    let audioEnabled = false;
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // Soft Hover Blip
    function playCyberBeep(freq = 600, duration = 0.025) {
        if (!audioEnabled || !audioCtx) return;
        try {
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);
            gain.gain.setValueAtTime(0.025, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {}
    }

    // Tactile Click
    function playCyberClick() {
        if (!audioEnabled || !audioCtx) return;
        try {
            const now = audioCtx.currentTime;
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(800, now);
            osc1.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1600, now);
            osc2.frequency.exponentialRampToValueAtTime(800, now + 0.04);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(audioCtx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.04);
            osc2.stop(now + 0.04);
        } catch (e) {}
    }

    // Futuristic Power-Up Boot Chime
    function playPowerUpSound() {
        if (!audioCtx) return;
        try {
            const now = audioCtx.currentTime;
            
            const sub = audioCtx.createOscillator();
            const subGain = audioCtx.createGain();
            sub.type = 'sine';
            sub.frequency.setValueAtTime(150, now);
            sub.frequency.exponentialRampToValueAtTime(300, now + 0.25);
            subGain.gain.setValueAtTime(0.06, now);
            subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
            sub.connect(subGain);
            subGain.connect(audioCtx.destination);
            sub.start(now);
            sub.stop(now + 0.25);

            const osc1 = audioCtx.createOscillator();
            const gain1 = audioCtx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(523.25, now + 0.05);
            osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);
            gain1.gain.setValueAtTime(0.05, now + 0.05);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
            osc1.connect(gain1);
            gain1.connect(audioCtx.destination);
            osc1.start(now + 0.05);
            osc1.stop(now + 0.3);

            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(1046.5, now + 0.12);
            osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.35);
            gain2.gain.setValueAtTime(0.04, now + 0.12);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.start(now + 0.12);
            osc2.stop(now + 0.4);
        } catch (e) {}
    }

    // ==========================================
    // Speech Synthesis Engine for Audio Navigation
    // ==========================================
    function speakText(text) {
        if (!audioEnabled || !('speechSynthesis' in window)) return;
        try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } catch (e) {}
    }

    function getNavSpeechText(el) {
        if (!el) return 'NAVIGATE TO PAGE';
        const target = el.closest('a, button, [role="button"]') || el;
        const href = target.getAttribute('href') || '';
        const rawText = (target.innerText || target.textContent || target.getAttribute('aria-label') || target.title || '').trim();
        const text = rawText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

        const lowerText = text.toLowerCase();
        const lowerHref = href.toLowerCase();

        if (target.classList.contains('logo') || lowerHref === 'index.html' || lowerHref === '#' || lowerHref === './' || lowerText === 'home') {
            return 'NAVIGATE TO HOME PAGE';
        }
        if (lowerHref.includes('ai-agents.html') || lowerText.includes('ai agent')) {
            return 'NAVIGATE TO AI AGENTS PAGE';
        }
        if (lowerHref.includes('#workflow-studio') || lowerText.includes('workflow studio')) {
            return 'NAVIGATE TO WORKFLOW STUDIO PAGE';
        }
        if (lowerHref.includes('solutions.html') || lowerText.includes('solution')) {
            return 'NAVIGATE TO SOLUTIONS PAGE';
        }
        if (lowerHref.includes('portfolio.html') || lowerText.includes('portfolio')) {
            return 'NAVIGATE TO PORTFOLIO PAGE';
        }
        if (lowerHref.includes('how-it-works.html') || lowerText.includes('how it works')) {
            return 'NAVIGATE TO HOW IT WORKS PAGE';
        }
        if (lowerHref.includes('case-studies.html') || lowerText.includes('case stud')) {
            return 'NAVIGATE TO CASE STUDIES PAGE';
        }
        if (lowerHref.includes('about-us.html') || lowerText.includes('about us') || lowerText.includes('about')) {
            return 'NAVIGATE TO ABOUT US PAGE';
        }
        if (lowerHref.includes('contact.html') || lowerText.includes('book a demo') || lowerText.includes('contact')) {
            return 'NAVIGATE TO BOOK A DEMO PAGE';
        }

        if (text) {
            let clean = text.toUpperCase();
            if (clean.startsWith('NAVIGATE TO')) return clean;
            if (clean.endsWith('PAGE')) return `NAVIGATE TO ${clean}`;
            return `NAVIGATE TO ${clean} PAGE`;
        }

        return 'NAVIGATE TO PAGE';
    }

    // ==========================================
    // Floating Dock Control Logic (Sound & Mode)
    // ==========================================
    const roboticsToggleBtn = document.getElementById('roboticsModeToggle');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const storedMode = localStorage.getItem('roboticsMode');
    const storedAudio = localStorage.getItem('audioEnabled');

    function updateSoundUI(isON) {
        audioEnabled = isON;
        if (soundToggleBtn) {
            const iconOff = soundToggleBtn.querySelector('.icon-sound-off');
            const iconOn = soundToggleBtn.querySelector('.icon-sound-on');
            const tooltip = soundToggleBtn.querySelector('.dock-tooltip');

            if (isON) {
                soundToggleBtn.classList.add('active');
                if (iconOff) iconOff.style.display = 'none';
                if (iconOn) iconOn.style.display = 'block';
                if (tooltip) tooltip.textContent = 'Sound On';
                soundToggleBtn.setAttribute('data-tooltip', 'Sound On');
                soundToggleBtn.setAttribute('aria-label', 'Sound On');
            } else {
                soundToggleBtn.classList.remove('active');
                if (iconOff) iconOff.style.display = 'block';
                if (iconOn) iconOn.style.display = 'none';
                if (tooltip) tooltip.textContent = 'Sound Off';
                soundToggleBtn.setAttribute('data-tooltip', 'Sound Off');
                soundToggleBtn.setAttribute('aria-label', 'Sound Off');
            }
        }
    }

    function applyRoboticsMode(isON) {
        if (roboticsToggleBtn) {
            const iconOff = roboticsToggleBtn.querySelector('.icon-mode-off');
            const iconOn = roboticsToggleBtn.querySelector('.icon-mode-on');
            const tooltip = roboticsToggleBtn.querySelector('.dock-tooltip');

            if (isON) {
                document.body.classList.add('robotics-mode');
                roboticsToggleBtn.classList.add('active');
                if (iconOff) iconOff.style.display = 'none';
                if (iconOn) iconOn.style.display = 'block';
                if (tooltip) tooltip.textContent = 'Robotics Mode On';
                roboticsToggleBtn.setAttribute('data-tooltip', 'Robotics Mode On');
                roboticsToggleBtn.setAttribute('aria-label', 'Robotics Mode On');
                initAudio();
                updateSoundUI(true);
                playPowerUpSound();
            } else {
                document.body.classList.remove('robotics-mode');
                roboticsToggleBtn.classList.remove('active');
                if (iconOff) iconOff.style.display = 'block';
                if (iconOn) iconOn.style.display = 'none';
                if (tooltip) tooltip.textContent = 'Robotics Mode Off';
                roboticsToggleBtn.setAttribute('data-tooltip', 'Robotics Mode Off');
                roboticsToggleBtn.setAttribute('aria-label', 'Robotics Mode Off');
            }
        } else {
            if (isON) {
                document.body.classList.add('robotics-mode');
            } else {
                document.body.classList.remove('robotics-mode');
            }
        }
    }

    if (storedMode === 'true') {
        applyRoboticsMode(true);
    } else {
        applyRoboticsMode(false);
    }

    if (storedAudio === 'true') {
        initAudio();
        updateSoundUI(true);
    } else if (storedMode !== 'true') {
        updateSoundUI(false);
    }

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            initAudio();
            const newState = !audioEnabled;
            localStorage.setItem('audioEnabled', newState ? 'true' : 'false');
            updateSoundUI(newState);
            if (newState) {
                playPowerUpSound();
            }
        });
    }

    if (roboticsToggleBtn) {
        roboticsToggleBtn.addEventListener('click', () => {
            const currentlyActive = document.body.classList.contains('robotics-mode');
            const newState = !currentlyActive;
            localStorage.setItem('roboticsMode', newState ? 'true' : 'false');
            applyRoboticsMode(newState);
        });
    }

    document.querySelectorAll('.btn, .nav-links a, .card, .hud-card, .robotics-mode-toggle, .filter-btn, .step-nav-btn, .config-step-tab, .logo, .footer-links a').forEach(el => {
        el.addEventListener('mouseenter', () => playCyberBeep(650, 0.025));
        el.addEventListener('click', () => {
            playCyberClick();
            if (audioEnabled && !el.classList.contains('sound-toggle-btn') && !el.classList.contains('robotics-mode-toggle')) {
                const navText = getNavSpeechText(el);
                speakText(navText);
                const targetAnchor = el.closest('a');
                const href = targetAnchor ? targetAnchor.getAttribute('href') : el.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                    sessionStorage.setItem('pendingNavSpeech', navText);
                }
            }
        });
    });

    // Global Fallback Click Listener for all Navigation Links & Buttons
    document.addEventListener('click', (e) => {
        if (!audioEnabled) return;
        const clickable = e.target.closest('a, button, .filter-btn, .step-nav-btn, .config-step-tab, .sim-tab-btn, .wf-preset-chip');
        if (!clickable) return;
        if (clickable.classList.contains('sound-toggle-btn') || clickable.classList.contains('robotics-mode-toggle')) return;

        const navText = getNavSpeechText(clickable);
        speakText(navText);

        const href = clickable.getAttribute('href') || (clickable.closest('a') ? clickable.closest('a').getAttribute('href') : '');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
            sessionStorage.setItem('pendingNavSpeech', navText);
        }
    });

    // ==========================================
    // 4-Step AI Agent Configurator Wizard (contact.html)
    // ==========================================
    const configTabs = document.querySelectorAll('.config-step-tab');
    const configContents = document.querySelectorAll('.config-step-content');
    const nextBtn = document.getElementById('configNextBtn');
    const prevBtn = document.getElementById('configPrevBtn');
    const optionCards = document.querySelectorAll('.config-option-card');
    let currentConfigStep = 1;

    function goToConfigStep(step) {
        if (step < 1 || step > 4) return;
        currentConfigStep = step;

        configTabs.forEach(tab => {
            const tStep = parseInt(tab.getAttribute('data-step'));
            if (tStep === currentConfigStep) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        configContents.forEach(content => {
            const cStep = parseInt(content.id.replace('stepContent', ''));
            if (cStep === currentConfigStep) {
                content.classList.add('active');
                content.style.display = 'block';
            } else {
                content.classList.remove('active');
                content.style.display = 'none';
            }
        });

        if (prevBtn) {
            prevBtn.style.visibility = currentConfigStep > 1 ? 'visible' : 'hidden';
        }

        if (nextBtn) {
            if (currentConfigStep === 4) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-flex';
                nextBtn.innerText = `Continue to Step ${currentConfigStep + 1} →`;
            }
        }
    }

    configTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetStep = parseInt(tab.getAttribute('data-step'));
            goToConfigStep(targetStep);
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToConfigStep(currentConfigStep + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToConfigStep(currentConfigStep - 1);
        });
    }

    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const siblings = card.parentElement.querySelectorAll('.config-option-card');
            siblings.forEach(s => s.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    // ==========================================
    // AI Agents Catalog Category Filter Tabs (ai-agents.html)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const agentPodCards = document.querySelectorAll('.agent-pod-card');

    if (filterBtns.length > 0 && agentPodCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                agentPodCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            });
        });
    }

    // ==========================================
    // Futuristic Preloader Animation
    // ==========================================
    const preloaderOverlay = document.getElementById('preloaderOverlay');
    const preloaderRobot = document.getElementById('preloaderRobot');
    const preloaderLaser = document.getElementById('preloaderLaser');
    const preloaderTypedText = document.getElementById('preloaderTypedText');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderPercent = document.getElementById('preloaderPercent');

    if (preloaderOverlay && preloaderRobot && preloaderTypedText && preloaderFill && preloaderPercent) {
        const welcomeMessage = "WELCOME TO AGENT FACTONIX";
        let currentProgress = 0;
        const totalDuration = 1800;
        const intervalTime = 30;
        const steps = totalDuration / intervalTime;
        const increment = 100 / steps;

        const preloaderInterval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress > 100) currentProgress = 100;

            preloaderRobot.style.left = `${currentProgress}%`;
            if (preloaderLaser) preloaderLaser.style.width = `${currentProgress}%`;

            preloaderFill.style.width = `${currentProgress}%`;
            preloaderPercent.innerText = `${Math.floor(currentProgress)}%`;

            const charCount = Math.floor((currentProgress / 100) * welcomeMessage.length);
            preloaderTypedText.innerText = welcomeMessage.substring(0, charCount);

            if (currentProgress >= 100) {
                clearInterval(preloaderInterval);
                setTimeout(() => {
                    preloaderOverlay.classList.add('loaded');
                }, 300);
            }
        }, intervalTime);

        // Fallback safety timeout
        setTimeout(() => {
            if (preloaderOverlay) preloaderOverlay.classList.add('loaded');
        }, 2200);
    } else if (preloaderOverlay) {
        preloaderOverlay.classList.add('loaded');
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ==========================================
    // Hero Scroll Image Sequence
    // ==========================================
    const scrollTrack = document.querySelector('.hero-scroll-track');
    const img1 = document.getElementById('heroImg1');
    const img2 = document.getElementById('heroImg2');
    const img3 = document.getElementById('heroImg3');

    function handleHeroScrollSequence() {
        if (!scrollTrack || !img1 || !img2 || !img3) return;

        const rect = scrollTrack.getBoundingClientRect();
        const trackHeight = scrollTrack.offsetHeight - window.innerHeight;
        if (trackHeight <= 0) return;

        const progress = Math.min(Math.max(-rect.top / trackHeight, 0), 1);

        if (progress < 0.33) {
            img1.classList.add('active');
            img2.classList.remove('active');
            img3.classList.remove('active');
        } else if (progress >= 0.33 && progress < 0.66) {
            img1.classList.remove('active');
            img2.classList.add('active');
            img3.classList.remove('active');
        } else {
            img1.classList.remove('active');
            img2.classList.remove('active');
            img3.classList.add('active');
        }
    }

    // ==========================================
    // AI Solutions Sticky Scroll Feature Showcase
    // ==========================================
    const solTrack = document.querySelector('.solutions-scroll-track');
    const solStages = document.querySelectorAll('.sol-step-stage');
    const stepNavBtns = document.querySelectorAll('.step-nav-btn');

    function handleSolutionsScrollSequence() {
        if (!solTrack || solStages.length === 0) return;

        const rect = solTrack.getBoundingClientRect();
        const trackHeight = solTrack.offsetHeight - window.innerHeight;
        if (trackHeight <= 0) return;

        const progress = Math.min(Math.max(-rect.top / trackHeight, 0), 0.999);
        const stepIndex = Math.floor(progress * solStages.length);

        solStages.forEach((stage, idx) => {
            if (idx === stepIndex) {
                stage.classList.add('active');
            } else {
                stage.classList.remove('active');
            }
        });

        stepNavBtns.forEach((btn, idx) => {
            if (idx === stepIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    stepNavBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            if (!solTrack) return;
            const trackTop = solTrack.offsetTop;
            const trackHeight = solTrack.offsetHeight - window.innerHeight;
            const targetScroll = trackTop + (trackHeight * (idx / solStages.length)) + 10;
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        handleHeroScrollSequence();
        handleSolutionsScrollSequence();
    });

    // ==========================================
    // Fullscreen Constellation Particle Canvas
    // ==========================================
    const canvas = document.getElementById('constellationCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 130;
        const maxDistance = 130;
        let mouse = { x: null, y: null, radius: 180 };

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 2 + 1;
                this.pulseSpeed = Math.random() * 0.04 + 0.015;
                this.pulse = Math.random() * Math.PI;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.pulse += this.pulseSpeed;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                const isRobotics = document.body.classList.contains('robotics-mode');
                const alpha = (Math.sin(this.pulse) + 1) / 2 * 0.5 + 0.3;
                const particleColor = isRobotics ? `rgba(0, 240, 255, ${alpha})` : `rgba(37, 99, 235, ${alpha})`;
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.shadowColor = isRobotics ? '#00f0ff' : 'rgba(37, 99, 235, 0.4)';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateConstellation() {
            ctx.clearRect(0, 0, width, height);

            const isRobotics = document.body.classList.contains('robotics-mode');
            const strokeColor = isRobotics ? 'rgba(0, 240, 255, ' : 'rgba(2, 132, 199, ';

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `${strokeColor}${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.65;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `${strokeColor}${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateConstellation);
        }

        animateConstellation();
    }

    // ==========================================
    // 3D Magnetic Perspective Hover Engine
    // ==========================================
    const tiltCards = document.querySelectorAll('.card, .hud-card, .sol-card, .agent-card, .timeline-item, .case-card, .team-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.transition = 'transform 0.4s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // ==========================================
    // Sound FX Toggle Control & Voice Nav Execution
    // ==========================================
    const soundToggleBtns = document.querySelectorAll('.sound-toggle-btn');
    const storedSound = localStorage.getItem('audioSoundEnabled');

    function applySoundSetting(enabled) {
        audioEnabled = enabled;
        soundToggleBtns.forEach(btn => {
            btn.innerHTML = enabled ? '🔊 AUDIO FX: ON' : '🔇 AUDIO FX: OFF';
        });
    }

    if (storedSound === 'true') {
        applySoundSetting(true);
    } else {
        applySoundSetting(false);
    }

    soundToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            initAudio();
            audioEnabled = !audioEnabled;
            localStorage.setItem('audioSoundEnabled', audioEnabled ? 'true' : 'false');
            applySoundSetting(audioEnabled);
            if (audioEnabled) {
                playPowerUpSound();
                speakText('AUDIO ENABLED');
            } else {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }
            }
        });
    });

    // Check for pending speech navigation from previous page click
    const pendingNavSpeech = sessionStorage.getItem('pendingNavSpeech');
    if (pendingNavSpeech && (storedSound === 'true' || storedMode === 'true')) {
        sessionStorage.removeItem('pendingNavSpeech');
        setTimeout(() => {
            if (audioEnabled) speakText(pendingNavSpeech);
        }, 300);
    }

    // ==========================================
    // Interactive Live AI Agent Execution Simulator Engine
    // ==========================================
    const simTabBtns = document.querySelectorAll('.sim-tab-btn');
    const simConsoleLogs = document.getElementById('simConsoleLogs');
    const simMetricTokens = document.getElementById('simMetricTokens');
    const simMetricLatency = document.getElementById('simMetricLatency');
    const simMetricAccuracy = document.getElementById('simMetricAccuracy');
    const simMetricTasks = document.getElementById('simMetricTasks');
    const simProgressFill = document.getElementById('simProgressFill');

    const agentSimData = {
        sales: {
            logs: [
                { time: '10:04:12', tag: 'tag-blue', text: 'Incoming lead inbound: "Need 50 enterprise licenses"' },
                { time: '10:04:13', tag: 'tag-cyan', text: 'Parsing query against Salesforce CRM schema...' },
                { time: '10:04:13', tag: 'tag-yellow', text: 'Executing BANT Lead Qualification algorithm...' },
                { time: '10:04:14', tag: 'tag-green', text: 'Lead Qualified! Score: 98/100 (Enterprise Tier)' },
                { time: '10:04:15', tag: 'tag-blue', text: 'Generating personalized pitch & booking Calendly slot...' },
                { time: '10:04:15', tag: 'tag-green', text: 'STATUS: Meeting Booked & CRM Synced ⚡' }
            ],
            tokens: '14,820',
            latency: '14ms',
            accuracy: '99.8%',
            tasks: '1,420',
            progress: '95%'
        },
        support: {
            logs: [
                { time: '10:04:12', tag: 'tag-blue', text: 'Customer Ticket #8492: "Reset API Key and update billing"' },
                { time: '10:04:13', tag: 'tag-cyan', text: 'Authenticating user token via Stripe & Auth0 API...' },
                { time: '10:04:14', tag: 'tag-yellow', text: 'Executing secure key rotation workflow...' },
                { time: '10:04:14', tag: 'tag-green', text: 'API Key rotated. Confirmation email dispatched via SendGrid.' },
                { time: '10:04:15', tag: 'tag-green', text: 'STATUS: Ticket Closed in 1.8 seconds (Satisfaction: 5/5) ⚡' }
            ],
            tokens: '8,450',
            latency: '9ms',
            accuracy: '99.9%',
            tasks: '3,890',
            progress: '98%'
        },
        ops: {
            logs: [
                { time: '10:04:12', tag: 'tag-blue', text: 'Cron Triggered: Daily E-commerce Inventory Sync' },
                { time: '10:04:13', tag: 'tag-cyan', text: 'Fetching 45,000 SKUs from Shopify API...' },
                { time: '10:04:14', tag: 'tag-yellow', text: 'Cross-referencing ERP database & WhatsApp alerts...' },
                { time: '10:04:15', tag: 'tag-green', text: 'Inventory reconciled. Low-stock alerts sent to Slack channel.' },
                { time: '10:04:15', tag: 'tag-green', text: 'STATUS: Batch Job Execution Complete ⚡' }
            ],
            tokens: '24,190',
            latency: '18ms',
            accuracy: '100%',
            tasks: '850',
            progress: '92%'
        },
        leadgen: {
            logs: [
                { time: '10:04:12', tag: 'tag-blue', text: 'Scraping LinkedIn & Apollo for targeted CTO prospects...' },
                { time: '10:04:13', tag: 'tag-cyan', text: 'Validating 500 decision-maker work emails via ZeroBounce...' },
                { time: '10:04:14', tag: 'tag-yellow', text: 'Synthesizing hyper-personalized email cold sequences...' },
                { time: '10:04:15', tag: 'tag-green', text: 'Sequences launched across 5 custom email domains.' },
                { time: '10:04:15', tag: 'tag-green', text: 'STATUS: Outbound Sequence Active (Response Rate: +34%) ⚡' }
            ],
            tokens: '31,500',
            latency: '12ms',
            accuracy: '99.4%',
            tasks: '2,100',
            progress: '96%'
        }
    };

    // Live Current Clock Engine for "Test Drive an AI Agent Live" Section
    function getFormattedCurrentTime(offsetSec = 0) {
        const now = new Date(Date.now() + offsetSec * 1000);
        const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    function updateLiveSimClock() {
        const clockEl = document.getElementById('simLiveTime');
        if (clockEl) {
            clockEl.innerText = `[ ${getFormattedCurrentTime(0)} ]`;
        }
    }

    updateLiveSimClock();
    setInterval(updateLiveSimClock, 1000);

    function runAgentSimulation(agentType) {
        if (!simConsoleLogs || !agentSimData[agentType]) return;
        const data = agentSimData[agentType];

        simConsoleLogs.innerHTML = '';
        if (simMetricTokens) simMetricTokens.innerText = data.tokens;
        if (simMetricLatency) simMetricLatency.innerText = data.latency;
        if (simMetricAccuracy) simMetricAccuracy.innerText = data.accuracy;
        if (simMetricTasks) simMetricTasks.innerText = data.tasks;
        if (simProgressFill) simProgressFill.style.width = data.progress;

        data.logs.forEach((log, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'sim-log-line';
                const liveTimeStamp = getFormattedCurrentTime(index);
                line.innerHTML = `<span class="timestamp">[${liveTimeStamp}]</span> <span class="${log.tag}">> ${log.text}</span>`;
                simConsoleLogs.appendChild(line);
                simConsoleLogs.scrollTop = simConsoleLogs.scrollHeight;
            }, index * 250);
        });
    }

    if (simTabBtns.length > 0) {
        simTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                simTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const agent = btn.getAttribute('data-agent');
                runAgentSimulation(agent);
            });
        });
        // Initial run when code loads
        runAgentSimulation('sales');
    }

    // ==========================================
    // Interactive AI Automation Savings & ROI Calculator Engine
    // ==========================================
    const teamSizeSlider = document.getElementById('teamSizeSlider');
    const hourlyRateSlider = document.getElementById('hourlyRateSlider');
    const hoursPerWeekSlider = document.getElementById('hoursPerWeekSlider');

    const teamSizeVal = document.getElementById('teamSizeVal');
    const hourlyRateVal = document.getElementById('hourlyRateVal');
    const hoursPerWeekVal = document.getElementById('hoursPerWeekVal');

    const roiMonthlySavings = document.getElementById('roiMonthlySavings');
    const roiAnnualHours = document.getElementById('roiAnnualHours');
    const roiEfficiency = document.getElementById('roiEfficiency');

    function calculateROISavings() {
        if (!teamSizeSlider || !hourlyRateSlider || !hoursPerWeekSlider) return;

        const team = parseInt(teamSizeSlider.value);
        const rate = parseInt(hourlyRateSlider.value);
        const hours = parseInt(hoursPerWeekSlider.value);

        if (teamSizeVal) teamSizeVal.innerText = `${team} Members`;
        if (hourlyRateVal) hourlyRateVal.innerText = `$${rate}/hr`;
        if (hoursPerWeekVal) hoursPerWeekVal.innerText = `${hours} hrs/wk`;

        // 75% automation efficiency rate
        const weeklyHoursSaved = team * hours * 0.75;
        const monthlySavings = Math.round(weeklyHoursSaved * rate * 4.33);
        const annualHours = Math.round(weeklyHoursSaved * 52);
        const efficiencyMult = (1 + (hours / 40) * 2.2).toFixed(1);

        if (roiMonthlySavings) {
            roiMonthlySavings.innerText = `$${monthlySavings.toLocaleString()}`;
        }
        if (roiAnnualHours) {
            roiAnnualHours.innerText = `${annualHours.toLocaleString()} hrs`;
        }
        if (roiEfficiency) {
            roiEfficiency.innerText = `${efficiencyMult}x`;
        }
    }

    [teamSizeSlider, hourlyRateSlider, hoursPerWeekSlider].forEach(slider => {
        if (slider) {
            slider.addEventListener('input', calculateROISavings);
        }
    });

    calculateROISavings();

    // ==========================================
    // Portfolio Category Filtering & Live Search Engine
    // ==========================================
    const portfolioFilterBtns = document.querySelectorAll('#portfolioFilterBar .filter-btn');
    const portfolioCardItems = document.querySelectorAll('.portfolio-card-item');
    const portfolioSearchInput = document.getElementById('portfolioSearchInput');

    function filterPortfolioCards() {
        const activeBtn = document.querySelector('#portfolioFilterBar .filter-btn.active');
        const filterVal = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        const searchQuery = portfolioSearchInput ? portfolioSearchInput.value.toLowerCase().trim() : '';

        portfolioCardItems.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            const cardText = card.textContent.toLowerCase();
            const cardTags = card.getAttribute('data-tags') || '';

            const matchesCategory = (filterVal === 'all' || categories.includes(filterVal));
            const matchesSearch = !searchQuery || cardText.includes(searchQuery) || cardTags.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (portfolioFilterBtns.length > 0 && portfolioCardItems.length > 0) {
        portfolioFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                portfolioFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                playCyberClick();
                filterPortfolioCards();
            });
        });
    }

    if (portfolioSearchInput) {
        portfolioSearchInput.addEventListener('input', () => {
            filterPortfolioCards();
        });
    }

    // Architecture Specifications Modal Logic
    const archModalOverlay = document.getElementById('archModalOverlay');
    const archModalBody = document.getElementById('archModalBody');
    const closeArchModal = document.getElementById('closeArchModal');
    const openArchBtns = document.querySelectorAll('.open-arch-modal');

    const projectSpecsData = {
        instaguard: {
            title: 'INSTAGUARD 360 — Architecture & Workflow Specs',
            badge: 'INSTAGRAM & SHOPIFY BOT',
            specs: [
                { label: 'Neural Engine', val: 'OpenAI GPT-4o + Custom Fine-Tuned Prompt Pipeline' },
                { label: 'Primary Webhooks', val: 'Meta Graph API v19.0 (Instagram DMs & Comments)' },
                { label: 'Commerce Integration', val: 'Shopify Admin REST API + Webhooks (Live Inventory & Orders)' },
                { label: 'Database & Caching', val: 'Redis Cloud Cache (Sub-5ms Session State)' },
                { label: 'Execution Speed', val: '12 Seconds Average Full-Resolution Cycle' },
                { label: 'Security Protocols', val: 'HMAC Signature Verification & AES-256 Token Encryption' }
            ],
            desc: 'This build monitors incoming Instagram Direct Messages and comment threads. Upon receiving a product or order status inquiry, the agent extracts order IDs or product keywords, verifies user authorization, calls Shopify APIs for live stock or shipping tracking, and constructs a human-like response with tracking links and promo codes.'
        },
        pipelinemax: {
            title: 'PIPELINE-MAX — Architecture & Workflow Specs',
            badge: 'SALES QUALIFICATION BOT',
            specs: [
                { label: 'Core Classifier', val: 'BANT (Budget, Authority, Need, Timeline) Neural Scoring' },
                { label: 'Enrichment API', val: 'Apollo REST API + LinkedIn Company Scraper' },
                { label: 'CRM Synchronization', val: 'Salesforce Enterprise REST & Bulk API 2.0' },
                { label: 'Scheduling Engine', val: 'Calendly API v2 Webhook Handler' },
                { label: 'Execution Speed', val: '14ms Response & Scoring Latency' },
                { label: 'Security Protocols', val: 'OAuth 2.0 Mutual TLS & Enterprise Encrypted Vault' }
            ],
            desc: 'PIPELINE-MAX processes inbound web demo requests instantly. It enriches the lead profile against Apollo.io to retrieve company revenue, headcount, and tech stack. The neural classifier assigns a BANT score (0-100). Leads scoring > 80 automatically receive a calendar booking link and are logged into Salesforce with full transcript telemetry.'
        },
        supportrx: {
            title: 'SUPPORTR-X — Architecture & Workflow Specs',
            badge: 'OMNICHANNEL SUPPORT POD',
            specs: [
                { label: 'Vector Knowledge Base', val: 'Pinecone Vector DB + OpenAI Embeddings' },
                { label: 'Identity Provider', val: 'Auth0 JWT Bearer Token Validation' },
                { label: 'Billing System', val: 'Stripe API (Invoice Lookup, Refunds & Key Rotation)' },
                { label: 'Ticket Routing', val: 'Zendesk REST API & Auto-Tagging Engine' },
                { label: 'Execution Speed', val: '1.8 Seconds Ticket Closure' },
                { label: 'Security Protocols', val: 'SOC2 Type II Compliant & PCI-DSS Shielded' }
            ],
            desc: 'Designed for high-security fintech platforms, SUPPORTR-X handles customer billing queries, subscription plan changes, and API key rotations. It authenticates users via Auth0 JWT, executes requested changes directly in Stripe SDK, updates Zendesk ticket history, and notifies users over Twilio WhatsApp.'
        },
        logiflow: {
            title: 'LOGI-FLOW — Architecture & Workflow Specs',
            badge: 'LOGISTICS & INVENTORY BOT',
            specs: [
                { label: 'Background Worker', val: 'Python Celery + Redis Task Queue' },
                { label: 'Database Layer', val: 'PostgreSQL Relational DB (45,000 SKUs)' },
                { label: 'Alerting Channel', val: 'Slack Bot Webhooks & WhatsApp Admin Push' },
                { label: 'PO Engine', val: 'Automated ERP Purchase Order Dispatcher' },
                { label: 'Execution Speed', val: 'Hourly Batch Cron & Real-Time Stream' },
                { label: 'Security Protocols', val: 'Internal VPN Tunnel & Encrypted Database Connections' }
            ],
            desc: 'LOGI-FLOW runs continuous inventory checks across 45,000 SKUs across 4 warehouse locations. It cross-references current stock levels against historical velocity. When stock drops below re-order thresholds, it posts structured alerts to Slack and generates draft Purchase Orders for manager approval.'
        },
        audiencegen: {
            title: 'AUDIENCE-GEN — Architecture & Workflow Specs',
            badge: 'COLD OUTREACH PIPELINE',
            specs: [
                { label: 'Scraper & Data Pipeline', val: 'Apollo.io + Custom LinkedIn Prospect Extractor' },
                { label: 'Email Deliverability', val: 'ZeroBounce Real-Time API Validation' },
                { label: 'Outreach Engine', val: 'SendGrid Multi-Domain SMTP Relay' },
                { label: 'Personalization AI', val: 'LangChain + GPT-4 Contextual Synthesizer' },
                { label: 'Execution Speed', val: '500 High-Intent Leads Processed Daily' },
                { label: 'Security Protocols', val: 'DKIM, SPF, DMARC Authentication Shield' }
            ],
            desc: 'AUDIENCE-GEN automates cold lead generation by identifying target executive titles (CTOs, VP of Eng), validating deliverability via ZeroBounce to maintain sender reputation, and personalizing email sequences based on recent company news and tech stack signals.'
        },
        whatsappflow: {
            title: 'WHATSAPP-FLOW — Architecture & Workflow Specs',
            badge: 'WHATSAPP COMMERCE AGENT',
            specs: [
                { label: 'Messaging Provider', val: 'Meta WhatsApp Business Cloud API' },
                { label: 'Payment Gateway', val: 'Stripe & Razorpay Payment Link APIs' },
                { label: 'Session Storage', val: 'MongoDB Atlas NoSQL' },
                { label: 'Framework', val: 'FastAPI Python Async Server' },
                { label: 'Execution Speed', val: 'Sub-Second Message Delivery' },
                { label: 'Security Protocols', val: 'End-to-End Encrypted Message Payload' }
            ],
            desc: 'WHATSAPP-FLOW turns WhatsApp into a 24/7 automated sales counter. Customers can browse visual product catalogs inside WhatsApp chat, trigger instant payment links, receive automated order updates, and recover abandoned carts with targeted incentives.'
        }
    };

    if (openArchBtns.length > 0 && archModalOverlay && archModalBody) {
        openArchBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projKey = btn.getAttribute('data-project');
                const p = projectSpecsData[projKey];
                if (p) {
                    let specsHtml = p.specs.map(s => `
                        <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(203,213,225,0.4); padding: 8px 0; font-size: 0.85rem;">
                            <strong style="color:var(--primary-blue); font-family:var(--font-mono);">${s.label}:</strong>
                            <span style="color:var(--text-muted); text-align:right;">${s.val}</span>
                        </div>
                    `).join('');

                    archModalBody.innerHTML = `
                        <div style="display:inline-block; font-size:0.72rem; padding:4px 10px; background:rgba(37,99,235,0.1); border:1px solid var(--primary-blue); border-radius:12px; color:var(--primary-blue); margin-bottom:12px; font-weight:700;">${p.badge}</div>
                        <h3 style="font-size:1.35rem; font-weight:800; margin-bottom:14px; color:#0f172a;" class="section-title">${p.title}</h3>
                        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:20px;">${p.desc}</p>
                        <div style="background:rgba(241,245,249,0.8); border:1px solid #cbd5e1; border-radius:10px; padding:16px; margin-bottom:16px;" class="mock-card">
                            <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:10px; color:#0f172a; text-transform:uppercase; letter-spacing:0.5px;">SYSTEM TELEMETRY SPECS</h4>
                            ${specsHtml}
                        </div>
                    `;
                    archModalOverlay.style.display = 'flex';
                }
            });
        });

        if (closeArchModal) {
            closeArchModal.addEventListener('click', () => {
                archModalOverlay.style.display = 'none';
            });
        }

        archModalOverlay.addEventListener('click', (e) => {
            if (e.target === archModalOverlay) {
                archModalOverlay.style.display = 'none';
            }
        });
    }

    // ==========================================
    // Scroll-Driven Sequential Roadmap Reveal Engine
    // ==========================================
    const roadmapSteps = document.querySelectorAll('.roadmap-step-item');
    const roadmapLaserFill = document.getElementById('roadmapLaserFill');
    const roadmapWrapper = document.querySelector('.roadmap-timeline-wrapper');

    function checkRoadmapScroll() {
        if (roadmapSteps.length === 0) return;

        const triggerBottom = window.innerHeight * 0.85;

        roadmapSteps.forEach((step, idx) => {
            const stepTop = step.getBoundingClientRect().top;

            if (stepTop < triggerBottom) {
                if (!step.classList.contains('revealed')) {
                    step.classList.add('revealed');
                    playCyberBeep(520 + idx * 80, 0.03);
                }
            }
        });

        // Update Laser Beam Height based on scroll progress
        if (roadmapWrapper && roadmapLaserFill) {
            const rect = roadmapWrapper.getBoundingClientRect();
            const wrapperHeight = rect.height;
            const scrolled = Math.max(0, triggerBottom - rect.top);
            const progress = Math.min(100, Math.max(0, (scrolled / wrapperHeight) * 100));
            roadmapLaserFill.style.height = `${progress}%`;
        }
    }

    window.addEventListener('scroll', checkRoadmapScroll);
    checkRoadmapScroll();

    // ==========================================
    // Interactive Visual AI Workflow Generator Engine & Redesigned 5-Tab Studio
    // ==========================================
    const studioNavTabs = document.getElementById('studioNavTabs');
    if (studioNavTabs) {
        const tabBtns = studioNavTabs.querySelectorAll('.studio-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                if (!targetTab) return;

                // Update active button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update active pane with smooth fade-slide transition
                const panes = document.querySelectorAll('.studio-tab-pane');
                panes.forEach(pane => {
                    pane.classList.remove('active');
                });

                const targetPane = document.getElementById(`pane-${targetTab}`);
                if (targetPane) {
                    // Trigger reflow for keyframe animation re-trigger
                    void targetPane.offsetWidth;
                    targetPane.classList.add('active');
                }

                if (typeof playCyberClick === 'function') {
                    playCyberClick();
                }
            });
        });
    }

    const wfPresetChips = document.querySelectorAll('.preset-chip');
    const wfTriggerSelect = document.getElementById('wfTriggerSelect');
    const wfAgentSelect = document.getElementById('wfAgentSelect');
    const wfGuardrails = document.getElementById('wfGuardrails');
    const wfHumanLoop = document.getElementById('wfHumanLoop');
    const wfActionSelect = document.getElementById('wfActionSelect');
    const wfCustomPrompt = document.getElementById('wfCustomPrompt');
    const btnGenerateWf = document.getElementById('btnGenerateWf');

    const wfCanvasTitle = document.getElementById('wfCanvasTitle');
    const wfNodesList = document.getElementById('wfNodesList');
    const wfMetricLatency = document.getElementById('wfMetricLatency');
    const wfMetricAccuracy = document.getElementById('wfMetricAccuracy');
    const wfMetricSavings = document.getElementById('wfMetricSavings');
    const wfMetricAgents = document.getElementById('wfMetricAgents');

    const btnSimulateWf = document.getElementById('btnSimulateWf');
    const btnCopyWf = document.getElementById('btnCopyWf');
    const wfSimulationLog = document.getElementById('wfSimulationLog');
    const simLogContent = document.getElementById('simLogContent');
    const btnCloseLog = document.getElementById('btnCloseLog');

    const wfStageTabsNav = document.getElementById('wfStageTabsNav');
    const wfStageDisplayPanel = document.getElementById('wfStageDisplayPanel');

    // Icon SVG definitions for workflow step categories
    const wfStepIcons = {
        trigger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-6l-2 3h-4l-2-3H2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8z"/><path d="M5.45 5.11 2 12v0h20v0l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
        ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>`,
        shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        human: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
        action: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
    };

    // State Tracking
    let activePresetKey = 'social';
    let currentStage = 1;
    let currentSocialPlatform = 'linkedin';

    let approvalStatusMap = {
        social: true,
        crm: true,
        email: true,
        meeting: true,
        ecom: true
    };

    let draftTextMap = {
        social: `🤖 Autonomous AI Agents are no longer the future — they are here today in 2026.\n\nWe deployed our new Neural AI Pod to automate 80% of repetitive workflows across CRM, email, and social publishing.\n\nKey Takeaways:\n1️⃣ Sub-50ms execution speed\n2️⃣ Enterprise PII guardrail protection\n3️⃣ Seamless Human-in-the-Loop sign-off\n\nWhat workflow are you automating first? 👇\n\n#AI #Automation #TechTrends #FutureOfWork`,
        crm: `Qualified Lead Object: Acme Corp\nContact: Alex Mercer (VP of Engineering)\nCompany Revenue: $12M/yr | Tech Stack: React, Node, AWS\nCalculated ICP Fit Score: 96/100 (Enterprise Tier)\nAction: Created HubSpot Deal #4401 valued at $45,000 ARR with automated follow-up sequence.`,
        email: `Dear Alex,\n\nThank you for reaching out regarding our Neural AI Agent Pod upgrade. We have reviewed your account requirements and processed your priority ticket #8842.\n\nYour API key rate limits have been upgraded to 5,000 requests/min with sub-30ms guarantee.\n\nBest regards,\nAGENTSPACE Neural Support Team`,
        meeting: `Event: 🤖 AGENTSPACE Neural Pipeline Architecture Demo\nDate: Today at 3:30 PM - 4:00 PM EST\nAttendees: Alex Mercer (alex@acmecorp.com) & Tech Lead\nVideo Link: https://meet.google.com/xyz-agt-demo\nAgenda: 1. Neural Agent Overview 2. Guardrails Scan 3. Live CRM Integration`,
        ecom: `Support Ticket #8842 Approved for Instant Refund.\nCustomer: Sarah Jenkins | Order ID: #8842\nRefund Amount: $120.00 | Gateway: Stripe charge ch_3N8x\nConfirmation Email Dispatched with tracking payload.`
    };

    // Preset Data Definitions with Flowchart Nodes & Stage Content
    const workflowPresets = {
        social: {
            title: "📲 Social Posts & Multi-Platform Publishing Flow",
            latency: "32 ms",
            accuracy: "99.7%",
            savings: "28 hrs/week",
            agents: "3 Agents",
            triggerVal: "social",
            agentVal: "gpt4o",
            actionVal: "social_pub",
            guardrails: true,
            humanLoop: true,
            prompt: "Generate viral tech posts on today's AI trends for LinkedIn & Twitter/X, request human sign-off, then publish",
            ideas: [
                { id: 1, title: "🚀 5 Ways Autonomous AI Agents Are Eliminating Repetitive Workflows", summary: "Carousel breakdown comparing SaaS tools vs neural agent pods.", score: "98% Viral Potential", selected: true },
                { id: 2, title: "💡 Behind the Scenes: Building Human-in-the-Loop Safety Guardrails", summary: "Deep dive into real-time sentiment checks and supervisor sign-offs.", score: "94% Viral Potential", selected: false },
                { id: 3, title: "📊 2026 Social Media Automation Benchmark Report", summary: "Data-driven post analyzing speed, engagement, and post consistency.", score: "91% Viral Potential", selected: false }
            ],
            nodes: [
                { step: 1, title: "Social Prompt & Trend Trigger", desc: "Monitors daily tech news, trending hashtags, and user prompt inputs", tag: "TRIGGER", tagClass: "tag-trigger", nodeType: "node-type-trigger", iconKey: "trigger", payloadIn: "Prompt: 'AI Trends 2026'", payloadOut: "18,400 Social Data Vectors" },
                { step: 2, title: "GPT-4o Multi-Platform Content Creator", desc: "Crafts optimized copy for LinkedIn, Twitter/X, and Instagram with platform tone", tag: "AI ENGINE", tagClass: "tag-ai", nodeType: "node-type-ai", iconKey: "ai", payloadIn: "Social Trend Vectors", payloadOut: "3 Post Draft Variations Generated" },
                { step: 3, title: "Brand Tone & PII Safety Guardrail", desc: "Filters sensitive credentials, enforces brand guidelines, and verifies hashtags", tag: "GUARDRAIL", tagClass: "tag-shield", nodeType: "node-type-shield", iconKey: "shield", payloadIn: "Raw Post Variations", payloadOut: "Sanitized & Policy Approved" },
                { step: 4, title: "Human Content Approval Gate", desc: "Displays editable draft in operator dashboard for manual sign-off before publishing", tag: "HUMAN LOOP", tagClass: "tag-human", nodeType: "node-type-human", iconKey: "human", payloadIn: "Draft Post Preview", payloadOut: "Approved by @content-lead" },
                { step: 5, title: "Multi-Platform API Auto-Publisher", desc: "Dispatches posts instantly to LinkedIn, Twitter/X, and Instagram Graph APIs", tag: "EXECUTION", tagClass: "tag-action", nodeType: "node-type-action", iconKey: "action", payloadIn: "Approved Post Object", payloadOut: "Broadcast Live to 3 Platforms" }
            ]
        },
        crm: {
            title: "🎯 B2B Sales Lead Qualification & CRM Sync Flow",
            latency: "45 ms",
            accuracy: "98.9%",
            savings: "32 hrs/week",
            agents: "3 Agents",
            triggerVal: "crm",
            agentVal: "claude",
            actionVal: "slack_crm",
            guardrails: true,
            humanLoop: true,
            prompt: "Enrich inbound webform leads, calculate ICP score, request rep sign-off & sync HubSpot CRM",
            ideas: [
                { id: 1, title: "🏢 Enterprise Lead: Acme Corp ($12M Revenue)", summary: "Matched ICP profile: Tech stack React/AWS, 250+ employees.", score: "96/100 ICP Fit", selected: true },
                { id: 2, title: "💼 Mid-Market Prospect: DevScale Inc ($4M Revenue)", summary: "High intent signal: Downloaded AI Whitepaper twice.", score: "88/100 ICP Fit", selected: false },
                { id: 3, title: "🌱 Startup Prospect: NexaCloud ($800k Funding)", summary: "Fast-growing startup seeking workflow automation.", score: "82/100 ICP Fit", selected: false }
            ],
            nodes: [
                { step: 1, title: "Inbound Webform Lead Submission", desc: "Captures prospect submissions from landing page forms and chat widgets", tag: "TRIGGER", tagClass: "tag-trigger", nodeType: "node-type-trigger", iconKey: "trigger", payloadIn: "Form POST Payload", payloadOut: "Email: alex@acmecorp.com" },
                { step: 2, title: "Claude 3.5 ICP Lead Enrichment Agent", desc: "Enriches company size, annual revenue, tech stack, and calculates Lead Fit Score", tag: "AI ENGINE", tagClass: "tag-ai", nodeType: "node-type-ai", iconKey: "ai", payloadIn: "Domain acmecorp.com", payloadOut: "Fit Score: 96/100 | Tech: AWS, React" },
                { step: 3, title: "Disposable Domain & Anti-Spam Shield", desc: "Filters fake temp emails, disposable domains, and verifies company records", tag: "GUARDRAIL", tagClass: "tag-shield", nodeType: "node-type-shield", iconKey: "shield", payloadIn: "Domain Verification Request", payloadOut: "Verified Corporate Domain" },
                { step: 4, title: "Sales Rep Approval & Outreach Review", desc: "Pauses deal creation for SDR manager review of deal size & outreach email", tag: "HUMAN LOOP", tagClass: "tag-human", nodeType: "node-type-human", iconKey: "human", payloadIn: "Enriched Prospect Alert", payloadOut: "Approved by @sales-rep" },
                { step: 5, title: "HubSpot CRM Deal & Slack Notification", desc: "Creates qualified deal in HubSpot CRM and posts instant alert in #sales-hot-leads", tag: "EXECUTION", tagClass: "tag-action", nodeType: "node-type-action", iconKey: "action", payloadIn: "Qualified Lead Object", payloadOut: "HubSpot Deal #4401 & Slack Alert Sent" }
            ]
        },
        email: {
            title: "✉️ Support Email Triage & AI Auto-Reply Flow",
            latency: "28 ms",
            accuracy: "99.5%",
            savings: "35 hrs/week",
            agents: "2 Agents",
            triggerVal: "email",
            agentVal: "gpt4o",
            actionVal: "refund_email",
            guardrails: true,
            humanLoop: true,
            prompt: "Classify incoming support emails, draft AI responses with PII sanitization, request support sign-off",
            ideas: [
                { id: 1, title: "Priority 1 Support: API Rate Limit Increase", summary: "Customer requesting enterprise rate limit boost to 5,000 req/min.", score: "99.5% Intent Match", selected: true },
                { id: 2, title: "Billing Inquiry: Invoice Receipt Request", summary: "Automated billing receipt request for fiscal Q3.", score: "97.2% Intent Match", selected: false },
                { id: 3, title: "Technical Setup: Webhook Integration", summary: "Query regarding secret HMAC signature verification.", score: "95.8% Intent Match", selected: false }
            ],
            nodes: [
                { step: 1, title: "Inbound Email / Ticket Webhook", desc: "Monitors Zendesk and Gmail API streams for new support tickets", tag: "TRIGGER", tagClass: "tag-trigger", nodeType: "node-type-trigger", iconKey: "trigger", payloadIn: "Inbound Email Payload", payloadOut: "Ticket #8842 Received" },
                { step: 2, title: "GPT-4o Intent & Sentiment Classifier", desc: "Determines urgency, categorizes issue type, and drafts context-aware reply", tag: "AI ENGINE", tagClass: "tag-ai", nodeType: "node-type-ai", iconKey: "ai", payloadIn: "Email Body Text", payloadOut: "Intent: Rate Limit Upgrade (P1)" },
                { step: 3, title: "PII Masking & Compliance Guardrail", desc: "Redacts API secrets, passwords, and sensitive customer credentials", tag: "GUARDRAIL", tagClass: "tag-shield", nodeType: "node-type-shield", iconKey: "shield", payloadIn: "Raw Response Draft", payloadOut: "PII Sanitized & Verified" },
                { step: 4, title: "Support Lead Quality Approval", desc: "Routes high-priority draft to human support agent for quick sign-off", tag: "HUMAN LOOP", tagClass: "tag-human", nodeType: "node-type-human", iconKey: "human", payloadIn: "Draft Response Object", payloadOut: "Approved by @support-lead" },
                { step: 5, title: "Gmail API & Ticket Dispatcher", desc: "Sends finalized response and marks ticket resolved in Zendesk CRM", tag: "EXECUTION", tagClass: "tag-action", nodeType: "node-type-action", iconKey: "action", payloadIn: "Approved Email Body", payloadOut: "Email Sent & Ticket #8842 Closed" }
            ]
        },
        meeting: {
            title: "📅 Smart Meeting Scheduling & Calendar Assistant Flow",
            latency: "38 ms",
            accuracy: "99.4%",
            savings: "20 hrs/week",
            agents: "2 Agents",
            triggerVal: "meeting",
            agentVal: "claude",
            actionVal: "calendar_sync",
            guardrails: true,
            humanLoop: true,
            prompt: "Find mutual team availability, generate meeting agenda, request host approval & send Google Meet invite",
            ideas: [
                { id: 1, title: "Option A: Today at 3:30 PM - 4:00 PM EST", summary: "Optimal slot: Zero calendar conflict for all 3 attendees.", score: "100% Availability", selected: true },
                { id: 2, title: "Option B: Tomorrow at 11:00 AM - 11:30 AM EST", summary: "Secondary slot: Fits host morning schedule.", score: "95% Availability", selected: false },
                { id: 3, title: "Option C: Tomorrow at 2:00 PM - 2:30 PM EST", summary: "Alternative slot: Afternoon availability.", score: "90% Availability", selected: false }
            ],
            nodes: [
                { step: 1, title: "Calendar Booking Request Webhook", desc: "Captures demo request form or Calendly API booking payload", tag: "TRIGGER", tagClass: "tag-trigger", nodeType: "node-type-trigger", iconKey: "trigger", payloadIn: "Booking Request Form", payloadOut: "Attendees: Alex & Team" },
                { step: 2, title: "Claude Availability & Timezone Finder", desc: "Scans team Google / Outlook calendars across timezones to find open slots", tag: "AI ENGINE", tagClass: "tag-ai", nodeType: "node-type-ai", iconKey: "ai", payloadIn: "Calendar Free/Busy API", payloadOut: "Optimal Slot: Today 3:30 PM EST" },
                { step: 3, title: "Conflict Resolution & Reminder Guardrail", desc: "Prevents double-booking and configures 15-min pre-meeting SMS reminders", tag: "GUARDRAIL", tagClass: "tag-shield", nodeType: "node-type-shield", iconKey: "shield", payloadIn: "Slot Candidates", payloadOut: "Verified Open Slot" },
                { step: 4, title: "Meeting Organizer Host Approval", desc: "Sends quick 1-click confirmation alert to host's mobile dashboard", tag: "HUMAN LOOP", tagClass: "tag-human", nodeType: "node-type-human", iconKey: "human", payloadIn: "Slot Confirmation Alert", payloadOut: "Approved by @meeting-host" },
                { step: 5, title: "Google Calendar & Zoom Link Dispatch", desc: "Creates Google Calendar event, attaches Google Meet video link and agenda", tag: "EXECUTION", tagClass: "tag-action", nodeType: "node-type-action", iconKey: "action", payloadIn: "Approved Event Data", payloadOut: "Calendar Invite & Meet Link Sent" }
            ]
        },
        ecom: {
            title: "🛒 E-Commerce Support & Auto-Refund Flow",
            latency: "38 ms",
            accuracy: "99.6%",
            savings: "24 hrs/week",
            agents: "2 Agents",
            triggerVal: "email",
            agentVal: "gpt4o",
            actionVal: "refund_email",
            guardrails: true,
            humanLoop: false,
            prompt: "Process incoming support ticket refunds with PII guardrails and Stripe API execution",
            ideas: [
                { id: 1, title: "Refund Request: Order #8842 ($120.00)", summary: "Product returned in pristine condition within 14-day policy window.", score: "99.6% Eligible", selected: true }
            ],
            nodes: [
                { step: 1, title: "Inbound Support Ticket Webhook", desc: "Monitors Zendesk / Email API for incoming customer refund requests", tag: "TRIGGER", tagClass: "tag-trigger", nodeType: "node-type-trigger", iconKey: "trigger", payloadIn: "Raw Email / Ticket Payload", payloadOut: "Order ID #8842 & Customer Details" },
                { step: 2, title: "GPT-4o Intent & Sentiment Agent", desc: "Analyzes message tone, extracts order items, and verifies return policy eligibility", tag: "AI ENGINE", tagClass: "tag-ai", nodeType: "node-type-ai", iconKey: "ai", payloadIn: "Customer Message Text", payloadOut: "Intent: Refund | Confidence: 99.4%" },
                { step: 3, title: "PII & Refund Amount Compliance Guardrail", desc: "Sanitizes customer credit card info and enforces strict $500 max auto-refund cap", tag: "GUARDRAIL", tagClass: "tag-shield", nodeType: "node-type-shield", iconKey: "shield", payloadIn: "Raw Refund Amount $120.00", payloadOut: "Sanitized & Policy Approved" },
                { step: 4, title: "Stripe Refund Webhook & Email Dispatch", desc: "Triggers Stripe API refund webhook and dispatches automated email confirmation", tag: "EXECUTION", tagClass: "tag-action", nodeType: "node-type-action", iconKey: "action", payloadIn: "Approved Refund Object", payloadOut: "Stripe Charge ID ch_3N8x & Email Sent" }
            ]
        }
    };

    let currentWorkflowData = workflowPresets.social;

    // Render Stage Navigator Content
    function renderWorkflowStage(presetKey, stageIdx) {
        if (!wfStageDisplayPanel) return;

        const preset = workflowPresets[presetKey] || workflowPresets.social;
        currentStage = stageIdx;

        // Sync active class on Stage Nav Tabs
        if (wfStageTabsNav) {
            const tabs = wfStageTabsNav.querySelectorAll('.wf-stage-tab');
            tabs.forEach(t => {
                const sNum = parseInt(t.getAttribute('data-stage'));
                if (sNum === stageIdx) {
                    t.classList.add('active');
                } else {
                    t.classList.remove('active');
                }
            });
        }

        let stageHtml = '';

        if (stageIdx === 1) {
            // STEP 1: PROMPT & START AUTOMATION
            stageHtml = `
                <div class="wf-stage-card">
                    <div class="wf-stage-card-header">
                        <span class="wf-stage-header-title">🚀 Step 1: Select AI Prompt & Start Automation</span>
                        <span class="wf-stage-badge-tag">STAGE 1 / 4</span>
                    </div>

                    <div class="studio-group">
                        <label class="studio-label">Selected AI Automation Prompt:</label>
                        <div class="studio-input-wrapper">
                            <input type="text" class="studio-input" id="stage1PromptInput" value="${preset.prompt}">
                        </div>
                        <div class="prompt-preset-tags">
                            <button class="prompt-tag-btn" data-prompt="Generate viral LinkedIn & Twitter posts on today's AI trends">📲 Social AI Automation</button>
                            <button class="prompt-tag-btn" data-prompt="Enrich B2B sales leads, calculate fit score & sync HubSpot CRM">🎯 CRM Pipeline Automation</button>
                            <button class="prompt-tag-btn" data-prompt="Triage high-priority support emails and craft AI replies">✉️ Email Triage Automation</button>
                            <button class="prompt-tag-btn" data-prompt="Find mutual team availability & schedule Google Meet demo">📅 Meeting Scheduling</button>
                        </div>
                    </div>

                    <div class="stage-param-pills">
                        <span class="param-pill">🧠 Model Core: <strong>${preset.agentVal === 'gpt4o' ? 'GPT-4o' : 'Claude 3.5'}</strong></span>
                        <span class="param-pill">⚡ Latency: <strong>${preset.latency}</strong></span>
                        <span class="param-pill">🛡️ Guardrails: <strong>Enabled</strong></span>
                        <span class="param-pill">👤 Human Approval: <strong>Active Gate</strong></span>
                    </div>

                    <div style="display: flex; justify-content: flex-end;">
                        <button class="btn btn-primary btn-simulate-pulse" id="btnStartStageAutomation">▶ Start Searching & Automating ➔</button>
                    </div>
                </div>
            `;
        } else if (stageIdx === 2) {
            // STEP 2: SEARCHING IDEAS & TRENDS
            const ideas = preset.ideas || [];
            stageHtml = `
                <div class="wf-stage-card">
                    <div class="wf-stage-card-header">
                        <span class="wf-stage-header-title">🔎 Step 2: Searching Ideas & Trend Intelligence</span>
                        <span class="wf-stage-badge-tag text-green">LIVE SEARCHING ACTIVE</span>
                    </div>

                    <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
                        Scanning live social channels, today's trending tech themes, and data sources in real time...
                    </p>

                    <div class="ideas-grid">
                        ${ideas.map(idea => `
                            <div class="idea-card ${idea.selected ? 'selected' : ''}" data-idea-id="${idea.id}">
                                <div class="idea-card-header">
                                    <span class="idea-score-badge">${idea.score}</span>
                                    ${idea.selected ? '<span style="font-size: 0.75rem; color: #10b981; font-weight: bold;">✓ SELECTED</span>' : ''}
                                </div>
                                <div class="idea-card-title">${idea.title}</div>
                                <div class="idea-card-desc">${idea.summary}</div>
                                <button class="btn-select-idea">${idea.selected ? '✓ Idea Selected' : 'Select This Idea'}</button>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <button class="btn btn-secondary btn-sm" id="btnBackToStage1">⬅ Back to Prompt</button>
                        <button class="btn btn-primary" id="btnGoToStage3">Proceed to Human Approval ➔</button>
                    </div>
                </div>
            `;
        } else if (stageIdx === 3) {
            // STEP 3: HUMAN APPROVAL & EDITABLE REVIEW
            const isApproved = approvalStatusMap[presetKey];
            const currentDraftText = draftTextMap[presetKey];

            stageHtml = `
                <div class="wf-stage-card">
                    <div class="wf-stage-card-header">
                        <span class="wf-stage-header-title">👤 Step 3: Human-in-the-Loop Review Gate</span>
                        <span class="approval-status-pill ${isApproved ? 'approved' : 'pending'}" id="stage3ApprovalBadge">
                            ${isApproved ? '✅ Approved by Supervisor' : '⏳ Awaiting Operator Sign-Off'}
                        </span>
                    </div>

                    <div class="approval-editor-box">
                        <div class="approval-editor-header">
                            <span style="font-family: var(--font-tech); font-weight: 700; font-size: 0.88rem; color: var(--text-main);">Review & Edit AI Draft Output:</span>
                            <span style="font-size: 0.78rem; color: var(--text-muted);">Editable Content Area</span>
                        </div>
                        <textarea class="approval-textarea" id="stage3DraftTextarea">${currentDraftText}</textarea>
                    </div>

                    <div class="approval-actions-bar">
                        <div style="display: flex; gap: 10px;">
                            <button class="btn btn-sm ${isApproved ? 'btn-success' : 'btn-primary'}" id="btnToggleApproval">
                                ${isApproved ? '✓ Approved & Locked' : '✅ Click to Approve Draft'}
                            </button>
                            <button class="btn btn-secondary btn-sm" id="btnRegenDraft">🔄 Regenerate Draft</button>
                        </div>
                        <button class="btn btn-primary" id="btnGoToStage4">Proceed to Draft & Publish UI ➔</button>
                    </div>
                </div>
            `;
        } else if (stageIdx === 4) {
            // STEP 4: DRAFT AUTOMATION & PLATFORM PUBLISHING UI PREVIEW
            const isApproved = approvalStatusMap[presetKey];
            const currentDraftText = draftTextMap[presetKey];

            if (presetKey === 'social') {
                stageHtml = `
                    <div class="wf-stage-card">
                        <div class="wf-stage-card-header">
                            <span class="wf-stage-header-title">📱 Step 4: Social Platform UI & Publishing Preview</span>
                            <span class="wf-stage-badge-tag text-cyan">LIVE BROADCAST PREVIEW</span>
                        </div>

                        <div class="platform-switcher-bar">
                            <button class="platform-btn ${currentSocialPlatform === 'linkedin' ? 'active' : ''}" data-platform="linkedin">💼 LinkedIn</button>
                            <button class="platform-btn ${currentSocialPlatform === 'twitter' ? 'active' : ''}" data-platform="twitter">🐦 Twitter / X</button>
                            <button class="platform-btn ${currentSocialPlatform === 'instagram' ? 'active' : ''}" data-platform="instagram">📸 Instagram</button>
                        </div>

                        <div class="social-post-mockup">
                            <div class="social-post-header">
                                <img src="assets/images/agent.png" alt="AGENTSPECS Avatar" class="social-avatar">
                                <div class="social-author-info">
                                    <span class="social-author-name">AGENTSPECS AI Studio <span class="social-verified">✓</span></span>
                                    <span class="social-handle">${currentSocialPlatform === 'linkedin' ? 'Company Page • 45.2k followers' : currentSocialPlatform === 'twitter' ? '@agentspecs_ai' : 'agentspecs.ai'}</span>
                                </div>
                            </div>
                            <div class="social-post-body" id="socialMockupBody">${currentDraftText}</div>
                            <div class="social-post-media-box">
                                🖼️ AI Media Graphic Banner Preview (1080x1080) — "Autonomous AI Workflow Studio 2026"
                            </div>
                            <div class="social-post-footer">
                                <span class="social-metric">👍 1,420 Likes</span>
                                <span class="social-metric">💬 84 Comments</span>
                                <span class="social-metric">🔁 112 Reposts</span>
                                <span class="social-metric">🚀 Status: ${isApproved ? 'Ready to Auto-Publish' : 'Pending Approval'}</span>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <button class="btn btn-secondary btn-sm" id="btnBackToStage3">⬅ Edit in Approval Gate</button>
                            <button class="btn btn-primary btn-simulate-pulse" id="btnPublishNow">🚀 Publish Now to Connected Social Platforms</button>
                        </div>
                    </div>
                `;
            } else {
                // Non-social platform preview (CRM / Email / Meeting / ECom)
                stageHtml = `
                    <div class="wf-stage-card">
                        <div class="wf-stage-card-header">
                            <span class="wf-stage-header-title">📱 Step 4: ${preset.title} Execution UI</span>
                            <span class="wf-stage-badge-tag text-green">AUTOMATION LIVE</span>
                        </div>

                        <div class="social-post-mockup" style="background: #090d16; border-color: rgba(37, 99, 235, 0.3);">
                            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #38bdf8; margin-bottom: 10px;">
                                [PAYLOAD EXECUTION OUTPUT]
                            </div>
                            <div class="social-post-body" style="font-family: var(--font-mono); font-size: 0.85rem; color: #f1f5f9;">${currentDraftText}</div>
                            <div class="social-post-footer" style="margin-top: 14px;">
                                <span>🟢 API Status: 200 OK</span>
                                <span>⏱ Latency: ${preset.latency}</span>
                                <span>👤 Operator Approved: ${isApproved ? 'YES' : 'NO'}</span>
                            </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <button class="btn btn-secondary btn-sm" id="btnBackToStage3">⬅ Back to Approval Gate</button>
                            <button class="btn btn-primary btn-simulate-pulse" id="btnPublishNow">⚡ Execute Automation Webhook</button>
                        </div>
                    </div>
                `;
            }
        }

        wfStageDisplayPanel.innerHTML = stageHtml;
        attachStageEventListeners(presetKey);
    }

    // Attach Event Listeners inside Stage Panel
    function attachStageEventListeners(presetKey) {
        // Stage 1 Listeners
        const btnStartStageAutomation = document.getElementById('btnStartStageAutomation');
        if (btnStartStageAutomation) {
            btnStartStageAutomation.addEventListener('click', () => {
                const pInput = document.getElementById('stage1PromptInput');
                if (pInput && pInput.value.trim()) {
                    workflowPresets[presetKey].prompt = pInput.value.trim();
                }
                playPowerUpSound();
                renderWorkflowStage(presetKey, 2);
            });
        }

        const promptTags = document.querySelectorAll('.prompt-tag-btn');
        if (promptTags.length > 0) {
            promptTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    const pText = tag.getAttribute('data-prompt');
                    const pInput = document.getElementById('stage1PromptInput');
                    if (pInput) pInput.value = pText;
                    if (wfCustomPrompt) wfCustomPrompt.value = pText;
                });
            });
        }

        // Stage 2 Listeners
        const ideaCards = document.querySelectorAll('.idea-card');
        if (ideaCards.length > 0) {
            ideaCards.forEach(card => {
                card.addEventListener('click', () => {
                    const iId = parseInt(card.getAttribute('data-idea-id'));
                    if (workflowPresets[presetKey] && workflowPresets[presetKey].ideas) {
                        workflowPresets[presetKey].ideas.forEach(item => {
                            item.selected = (item.id === iId);
                        });
                        playCyberClick();
                        renderWorkflowStage(presetKey, 2);
                    }
                });
            });
        }

        const btnBackToStage1 = document.getElementById('btnBackToStage1');
        if (btnBackToStage1) {
            btnBackToStage1.addEventListener('click', () => renderWorkflowStage(presetKey, 1));
        }

        const btnGoToStage3 = document.getElementById('btnGoToStage3');
        if (btnGoToStage3) {
            btnGoToStage3.addEventListener('click', () => {
                playCyberClick();
                renderWorkflowStage(presetKey, 3);
            });
        }

        // Stage 3 Listeners
        const stage3Textarea = document.getElementById('stage3DraftTextarea');
        if (stage3Textarea) {
            stage3Textarea.addEventListener('input', (e) => {
                draftTextMap[presetKey] = e.target.value;
            });
        }

        const btnToggleApproval = document.getElementById('btnToggleApproval');
        if (btnToggleApproval) {
            btnToggleApproval.addEventListener('click', () => {
                approvalStatusMap[presetKey] = !approvalStatusMap[presetKey];
                playPowerUpSound();
                renderWorkflowStage(presetKey, 3);
            });
        }

        const btnRegenDraft = document.getElementById('btnRegenDraft');
        if (btnRegenDraft) {
            btnRegenDraft.addEventListener('click', () => {
                draftTextMap[presetKey] += `\n\n[Updated AI Insight]: Engineered with sub-30ms neural latency & verified PII guardrails.`;
                playCyberClick();
                renderWorkflowStage(presetKey, 3);
            });
        }

        const btnGoToStage4 = document.getElementById('btnGoToStage4');
        if (btnGoToStage4) {
            btnGoToStage4.addEventListener('click', () => {
                playCyberClick();
                renderWorkflowStage(presetKey, 4);
            });
        }

        // Stage 4 Listeners
        const platformBtns = document.querySelectorAll('.platform-btn');
        if (platformBtns.length > 0) {
            platformBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    currentSocialPlatform = btn.getAttribute('data-platform');
                    playCyberClick();
                    renderWorkflowStage(presetKey, 4);
                });
            });
        }

        const btnBackToStage3 = document.getElementById('btnBackToStage3');
        if (btnBackToStage3) {
            btnBackToStage3.addEventListener('click', () => renderWorkflowStage(presetKey, 3));
        }

        const btnPublishNow = document.getElementById('btnPublishNow');
        if (btnPublishNow) {
            btnPublishNow.addEventListener('click', () => {
                playPowerUpSound();
                alert(`🚀 SUCCESS! Workflow automation executed & broadcasted live!`);
            });
        }
    }

    // Helper: Render Nodes & Flowchart to UI
    function renderWorkflowNodes(data) {
        if (!wfNodesList) return;

        currentWorkflowData = data;

        // Update Header & Metrics
        if (wfCanvasTitle) wfCanvasTitle.textContent = data.title;
        if (wfMetricLatency) wfMetricLatency.textContent = data.latency;
        if (wfMetricAccuracy) wfMetricAccuracy.textContent = data.accuracy;
        if (wfMetricSavings) wfMetricSavings.textContent = data.savings;
        if (wfMetricAgents) wfMetricAgents.textContent = data.agents;

        // Render Flowchart Cards HTML
        wfNodesList.innerHTML = data.nodes.map((node, idx) => {
            const isLast = idx === data.nodes.length - 1;
            const iconSvg = wfStepIcons[node.iconKey] || wfStepIcons.ai;
            const nodeClass = node.nodeType || (
                node.tag === 'TRIGGER' ? 'node-type-trigger' :
                node.tag === 'AI ENGINE' ? 'node-type-ai' :
                node.tag === 'GUARDRAIL' ? 'node-type-shield' :
                node.tag === 'HUMAN LOOP' ? 'node-type-human' : 'node-type-action'
            );

            return `
                <div class="wf-node-card-wrapper">
                    <div class="wf-node-card ${nodeClass}" data-step="${node.step}">
                        <div class="wf-node-header">
                            <div class="wf-node-left">
                                <div class="wf-node-icon-box">
                                    ${iconSvg}
                                </div>
                                <div class="wf-node-info">
                                    <h4><span class="wf-node-step-badge">${node.step}</span>${node.title}</h4>
                                    <p>${node.desc}</p>
                                </div>
                            </div>
                            <div class="wf-node-right">
                                <span class="wf-node-tag ${node.tagClass}">${node.tag}</span>
                            </div>
                        </div>
                        ${node.payloadIn || node.payloadOut ? `
                            <div class="wf-node-payload-box">
                                ${node.payloadIn ? `
                                    <div class="payload-item">
                                        <span class="payload-pill in">INPUT</span>
                                        <span class="payload-val">${node.payloadIn}</span>
                                    </div>
                                ` : ''}
                                ${node.payloadOut ? `
                                    <div class="payload-item">
                                        <span class="payload-pill out">OUTPUT</span>
                                        <span class="payload-val">${node.payloadOut}</span>
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                    ${!isLast ? `
                        <div class="wf-node-connector">
                            <div class="wf-connector-pulse"></div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        // Hide simulation log if open
        if (wfSimulationLog) wfSimulationLog.style.display = 'none';
    }

    // Initialize with default preset (Social Posts) & Auto-Start 4-Step Flow
    if (wfNodesList) {
        renderWorkflowNodes(workflowPresets.social);
        setTimeout(() => {
            if (typeof startAutoPlayWorkflow === 'function') {
                startAutoPlayWorkflow();
            }
        }, 600);
    }

    // Stage Nav Tabs Click Handler
    if (wfStageTabsNav) {
        const tabs = wfStageTabsNav.querySelectorAll('.wf-stage-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (isAutoPlaying) stopAutoPlayWorkflow();
                const stageNum = parseInt(tab.getAttribute('data-stage'));
                playCyberClick();
                renderWorkflowStage(activePresetKey, stageNum);
            });
        });
    }

    // Preset Chip Click Handler (Triggers Auto-Step Flow Immediately)
    if (wfPresetChips.length > 0) {
        wfPresetChips.forEach(chip => {
            chip.addEventListener('click', () => {
                wfPresetChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const presetKey = chip.getAttribute('data-preset');
                activePresetKey = presetKey;
                const selectedData = workflowPresets[presetKey] || workflowPresets.social;

                // Sync form selects with preset
                if (wfTriggerSelect) wfTriggerSelect.value = selectedData.triggerVal;
                if (wfAgentSelect) wfAgentSelect.value = selectedData.agentVal;
                if (wfActionSelect) wfActionSelect.value = selectedData.actionVal;
                if (wfGuardrails) wfGuardrails.checked = selectedData.guardrails;
                if (wfHumanLoop) wfHumanLoop.checked = selectedData.humanLoop;
                if (wfCustomPrompt) wfCustomPrompt.value = selectedData.prompt || '';

                playCyberClick();
                renderWorkflowNodes(selectedData);
                startAutoPlayWorkflow();
            });
        });
    }

    // Custom Workflow Generator Handler
    function generateCustomWorkflow() {
        const triggerText = wfTriggerSelect ? wfTriggerSelect.options[wfTriggerSelect.selectedIndex].text : "Trigger Event";
        const agentText = wfAgentSelect ? wfAgentSelect.options[wfAgentSelect.selectedIndex].text : "AI Neural Model";
        const actionText = wfActionSelect ? wfActionSelect.options[wfActionSelect.selectedIndex].text : "Execution Action";
        const hasGuardrails = wfGuardrails ? wfGuardrails.checked : true;
        const hasHumanLoop = wfHumanLoop ? wfHumanLoop.checked : false;
        const customPromptVal = wfCustomPrompt ? wfCustomPrompt.value.trim() : "";

        let nodes = [];
        let stepCount = 1;

        // Step 1: Trigger
        nodes.push({
            step: stepCount++,
            title: triggerText.replace(/^[^a-zA-Z0-9]+/, ''),
            desc: "Captures and parses incoming event payload from connected data source",
            tag: "TRIGGER",
            tagClass: "tag-trigger",
            nodeType: "node-type-trigger",
            iconKey: "trigger",
            payloadIn: "Incoming Webhook / Event Stream",
            payloadOut: "Parsed Event Data Object"
        });

        // Step 2: AI Core
        nodes.push({
            step: stepCount++,
            title: customPromptVal ? `Custom AI Prompt Agent` : agentText.replace(/^[^a-zA-Z0-9]+/, ''),
            desc: customPromptVal ? `Executes logic: "${customPromptVal}"` : "Processes raw input with deep contextual understanding & decision logic",
            tag: "AI ENGINE",
            tagClass: "tag-ai",
            nodeType: "node-type-ai",
            iconKey: "ai",
            payloadIn: "Parsed Event Data Object",
            payloadOut: customPromptVal ? `Custom Reasoning Output` : "Structured JSON Decision Matrix"
        });

        // Step 3: Guardrails (if enabled)
        if (hasGuardrails) {
            nodes.push({
                step: stepCount++,
                title: "Shield Security & PII Filter Guardrail",
                desc: "Filters sensitive credentials, sanitizes input, and enforces safety boundaries",
                tag: "GUARDRAIL",
                tagClass: "tag-shield",
                nodeType: "node-type-shield",
                iconKey: "shield",
                payloadIn: "Raw AI Reasoning Output",
                payloadOut: "Sanitized & Policy Verified"
            });
        }

        // Step 4: Human-in-the-Loop (if enabled)
        if (hasHumanLoop) {
            nodes.push({
                step: stepCount++,
                title: "Human Supervisor Verification Step",
                desc: "Dispatches review prompt to team manager for manual approval before execution",
                tag: "HUMAN LOOP",
                tagClass: "tag-human",
                nodeType: "node-type-human",
                iconKey: "human",
                payloadIn: "Approval Prompt Alert",
                payloadOut: "Operator Sign-Off Approved"
            });
        }

        // Step 5: Action
        nodes.push({
            step: stepCount++,
            title: actionText.replace(/^[^a-zA-Z0-9]+/, ''),
            desc: "Executes final API webhook call, updates database, and dispatches status response",
            tag: "EXECUTION",
            tagClass: "tag-action",
            nodeType: "node-type-action",
            iconKey: "action",
            payloadIn: "Verified Task Action",
            payloadOut: "Target API Success 200 OK"
        });

        const customData = {
            title: customPromptVal ? `⚙️ Custom Pipeline: ${customPromptVal.substring(0, 35)}...` : `⚙️ Custom Dynamic AI Pipeline`,
            latency: `${Math.floor(Math.random() * 30 + 25)} ms`,
            accuracy: "99.5%",
            savings: `${Math.floor(Math.random() * 20 + 15)} hrs/week`,
            agents: `${hasHumanLoop ? '3' : '2'} Agents`,
            prompt: customPromptVal || "Custom workflow prompt execution",
            nodes: nodes,
            ideas: [
                { id: 1, title: `Custom Analysis: ${customPromptVal ? customPromptVal.substring(0, 40) : 'Custom Pipeline Execution'}`, summary: "Custom generated workflow task payload.", score: "99% Fit Score", selected: true }
            ]
        };

        workflowPresets.custom = customData;
        draftTextMap.custom = `Custom AI Execution Output for prompt: "${customPromptVal}"\n\nTask status: Verified by PII guardrail shield.\nExecution latency: 32ms.`;
        approvalStatusMap.custom = true;
        activePresetKey = 'custom';

        // Remove active class from presets since this is custom
        wfPresetChips.forEach(c => c.classList.remove('active'));

        playPowerUpSound();
        renderWorkflowNodes(customData);
        renderWorkflowStage('custom', 1);
    }

    if (btnGenerateWf) {
        btnGenerateWf.addEventListener('click', (e) => {
            e.preventDefault();
            generateCustomWorkflow();
        });
    }

    // Select change listeners for instant preview
    [wfTriggerSelect, wfAgentSelect, wfActionSelect, wfGuardrails, wfHumanLoop].forEach(el => {
        if (el) {
            el.addEventListener('change', () => {
                playCyberBeep(650, 0.02);
                generateCustomWorkflow();
            });
        }
    });

    // Live Payload Simulation Handler
    if (btnSimulateWf) {
        btnSimulateWf.addEventListener('click', () => {
            if (!wfSimulationLog || !simLogContent) return;

            playCyberClick();
            wfSimulationLog.style.display = 'block';
            simLogContent.innerHTML = '';

            const getTime = () => new Date().toISOString().split('T')[1].slice(0, 12);
            const nodeCards = wfNodesList.querySelectorAll('.wf-node-card');

            let delay = 200;
            
            // Log Initialization
            setTimeout(() => {
                simLogContent.innerHTML += `<div class="log-line"><span class="timestamp">[${getTime()}]</span> <span class="highlight">INITIALIZING SIMULATION...</span> Sending payload to Step 1...</div>`;
            }, delay);

            nodeCards.forEach((card, index) => {
                delay += 700;
                const nodeTitle = card.querySelector('h4') ? card.querySelector('h4').textContent : `Step ${index + 1}`;

                setTimeout(() => {
                    // Highlight node
                    nodeCards.forEach(c => c.classList.remove('active-sim'));
                    card.classList.add('active-sim');
                    playCyberBeep(500 + index * 100, 0.04);

                    simLogContent.innerHTML += `
                        <div class="log-line">
                            <span class="timestamp">[${getTime()}]</span>
                            <span style="color:#10b981;">✔ [STEP ${index + 1} EXECUTED]</span> ${nodeTitle} processed payload successfully.
                        </div>
                    `;
                    simLogContent.scrollTop = simLogContent.scrollHeight;
                }, delay);
            });

            // Finish Log
            delay += 600;
            setTimeout(() => {
                nodeCards.forEach(c => c.classList.remove('active-sim'));
                simLogContent.innerHTML += `
                    <div class="log-line" style="margin-top: 6px; border-top: 1px dashed rgba(16,185,129,0.3); padding-top: 6px;">
                        <span class="timestamp">[${getTime()}]</span>
                        <span class="highlight" style="color:#00f0ff;">🟢 WORKFLOW SIMULATION SUCCESSFUL</span> (Latency: ${currentWorkflowData.latency || '38ms'})
                    </div>
                `;
                simLogContent.scrollTop = simLogContent.scrollHeight;
                playPowerUpSound();
            }, delay);
        });
    }

    if (btnCloseLog && wfSimulationLog) {
        btnCloseLog.addEventListener('click', () => {
            wfSimulationLog.style.display = 'none';
        });
    }

    // Copy Blueprint Handler
    if (btnCopyWf) {
        btnCopyWf.addEventListener('click', () => {
            const blueprintJson = JSON.stringify(currentWorkflowData, null, 2);
            navigator.clipboard.writeText(blueprintJson).then(() => {
                playPowerUpSound();
                
                // Show cyber toast notification
                let toast = document.createElement('div');
                toast.style.position = 'fixed';
                toast.style.bottom = '30px';
                toast.style.right = '30px';
                toast.style.background = '#090d16';
                toast.style.border = '1px solid #00f0ff';
                toast.style.color = '#00f0ff';
                toast.style.padding = '12px 20px';
                toast.style.borderRadius = '8px';
                toast.style.fontFamily = 'var(--font-mono)';
                toast.style.fontSize = '0.85rem';
                toast.style.zIndex = '9999';
                toast.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.4)';
                toast.innerHTML = `📋 WORKFLOW BLUEPRINT COPIED TO CLIPBOARD!`;
                
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2500);
            });
        });
    }

    // Auto-Play Workflow Engine Implementation
    const btnAutoPlayWf = document.getElementById('btnAutoPlayWf');
    const autoPlayHudBanner = document.getElementById('autoPlayHudBanner');
    const autoPlayStatusText = document.getElementById('autoPlayStatusText');
    const autoPlayProgressBar = document.getElementById('autoPlayProgressBar');
    const btnStopAutoPlay = document.getElementById('btnStopAutoPlay');

    let autoPlayTimers = [];
    let isAutoPlaying = false;

    function stopAutoPlayWorkflow() {
        isAutoPlaying = false;
        autoPlayTimers.forEach(t => clearTimeout(t));
        autoPlayTimers = [];

        if (autoPlayStatusText) autoPlayStatusText.textContent = '⚡ WORKFLOW STEPS COMPLETE — Select any preset tab to auto-run!';
        if (autoPlayProgressBar) autoPlayProgressBar.style.width = '100%';
    }

    function startAutoPlayWorkflow() {
        if (isAutoPlaying) {
            stopAutoPlayWorkflow();
            return;
        }

        isAutoPlaying = true;
        autoPlayTimers.forEach(t => clearTimeout(t));
        autoPlayTimers = [];

        if (btnAutoPlayWf) {
            btnAutoPlayWf.innerHTML = '⏸ Pause Auto-Play';
            btnAutoPlayWf.classList.add('btn-autoplay-active');
        }

        if (autoPlayHudBanner) autoPlayHudBanner.style.display = 'flex';
        if (wfSimulationLog) wfSimulationLog.style.display = 'block';
        if (simLogContent) simLogContent.innerHTML = '';

        const getTime = () => new Date().toISOString().split('T')[1].slice(0, 12);
        const presetData = workflowPresets[activePresetKey] || workflowPresets.social;

        // Step 1: Prompt Input (T = 0s)
        renderWorkflowStage(activePresetKey, 1);
        if (autoPlayStatusText) autoPlayStatusText.textContent = `▶ STEP 1/4: Analyzing Prompt & Target Parameters...`;
        if (autoPlayProgressBar) autoPlayProgressBar.style.width = '25%';
        if (simLogContent) {
            simLogContent.innerHTML += `<div class="log-line"><span class="timestamp">[${getTime()}]</span> <span class="highlight" style="color:#00f0ff;">🚀 AUTO-PLAY STEP 1 STARTED</span> Prompt Target: "${presetData.prompt}"</div>`;
        }
        playPowerUpSound();

        // Step 2: Theme Search (T = 2.8s)
        autoPlayTimers.push(setTimeout(() => {
            if (!isAutoPlaying) return;
            renderWorkflowStage(activePresetKey, 2);
            if (autoPlayStatusText) autoPlayStatusText.textContent = `▶ STEP 2/4: Scanning Today's Trending Ideas & Social Themes...`;
            if (autoPlayProgressBar) autoPlayProgressBar.style.width = '50%';
            if (simLogContent) {
                simLogContent.innerHTML += `<div class="log-line"><span class="timestamp">[${getTime()}]</span> <span style="color:#10b981;">✔ STEP 2 EXECUTED</span> AI Theme Search Complete. Found 3 Trending Candidates.</div>`;
                simLogContent.scrollTop = simLogContent.scrollHeight;
            }
            playCyberBeep(600, 0.04);
        }, 2800));

        // Step 3: Human Approval Gate (T = 5.6s)
        autoPlayTimers.push(setTimeout(() => {
            if (!isAutoPlaying) return;
            approvalStatusMap[activePresetKey] = true;
            renderWorkflowStage(activePresetKey, 3);
            if (autoPlayStatusText) autoPlayStatusText.textContent = `▶ STEP 3/4: Verifying Human Approval Gate & PII Guardrails...`;
            if (autoPlayProgressBar) autoPlayProgressBar.style.width = '75%';
            if (simLogContent) {
                simLogContent.innerHTML += `<div class="log-line"><span class="timestamp">[${getTime()}]</span> <span style="color:#38bdf8;">✔ STEP 3 EXECUTED</span> Human Supervisor Sign-off Locked & PII Guardrails Active.</div>`;
                simLogContent.scrollTop = simLogContent.scrollHeight;
            }
            playCyberBeep(700, 0.04);
        }, 5600));

        // Step 4: Draft & Social Publish UI (T = 8.4s)
        autoPlayTimers.push(setTimeout(() => {
            if (!isAutoPlaying) return;
            renderWorkflowStage(activePresetKey, 4);
            if (autoPlayStatusText) autoPlayStatusText.textContent = `▶ STEP 4/4: Multi-Platform Broadcast & Social UI Preview...`;
            if (autoPlayProgressBar) autoPlayProgressBar.style.width = '100%';
            if (simLogContent) {
                simLogContent.innerHTML += `<div class="log-line"><span class="timestamp">[${getTime()}]</span> <span style="color:#a855f7;">✔ STEP 4 EXECUTED</span> Multi-Platform Broadcast API Ready.</div>`;
                simLogContent.scrollTop = simLogContent.scrollHeight;
            }

            // Cycle social platform mockups: LinkedIn -> Twitter -> Instagram
            const platforms = ['linkedin', 'twitter', 'instagram'];
            platforms.forEach((p, pIdx) => {
                autoPlayTimers.push(setTimeout(() => {
                    if (!isAutoPlaying) return;
                    currentSocialPlatform = p;
                    const platformBtns = document.querySelectorAll('.platform-btn');
                    platformBtns.forEach(btn => {
                        if (btn.getAttribute('data-platform') === p) btn.classList.add('active');
                        else btn.classList.remove('active');
                    });
                    const bodyEl = document.getElementById('socialMockupBody');
                    if (bodyEl) bodyEl.innerHTML = draftTextMap[activePresetKey];
                    playCyberBeep(800 + pIdx * 100, 0.03);
                }, pIdx * 900));
            });
        }, 8400));

        // Finish Auto-Play (T = 11.8s)
        autoPlayTimers.push(setTimeout(() => {
            if (!isAutoPlaying) return;
            if (autoPlayStatusText) autoPlayStatusText.textContent = `✅ WORKFLOW AUTOMATION COMPLETE! Broadcasted Live.`;
            if (simLogContent) {
                simLogContent.innerHTML += `
                    <div class="log-line" style="margin-top: 6px; border-top: 1px dashed rgba(16,185,129,0.3); padding-top: 6px;">
                        <span class="timestamp">[${getTime()}]</span>
                        <span class="highlight" style="color:#00f0ff;">🟢 WORKFLOW AUTOMATION DEMO COMPLETE</span> (Latency: ${presetData.latency})
                    </div>
                `;
                simLogContent.scrollTop = simLogContent.scrollHeight;
            }
            playPowerUpSound();

            let toast = document.createElement('div');
            toast.style.position = 'fixed';
            toast.style.bottom = '30px';
            toast.style.right = '30px';
            toast.style.background = '#090d16';
            toast.style.border = '1px solid #10b981';
            toast.style.color = '#10b981';
            toast.style.padding = '14px 22px';
            toast.style.borderRadius = '8px';
            toast.style.fontFamily = 'var(--font-mono)';
            toast.style.fontSize = '0.88rem';
            toast.style.zIndex = '9999';
            toast.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.4)';
            toast.innerHTML = `🚀 WORKFLOW AUTOMATION COMPLETE! Successfully auto-published.`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3500);

            setTimeout(() => stopAutoPlayWorkflow(), 2000);
        }, 11800));
    }

    if (btnAutoPlayWf) {
        btnAutoPlayWf.addEventListener('click', startAutoPlayWorkflow);
    }
    if (btnStopAutoPlay) {
        btnStopAutoPlay.addEventListener('click', stopAutoPlayWorkflow);
    }

});

