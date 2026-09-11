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
    // Robotics Mode Dual-Theme Toggle Logic
    // ==========================================
    const roboticsToggleBtn = document.getElementById('roboticsModeToggle');
    const storedMode = localStorage.getItem('roboticsMode');

    function applyRoboticsMode(isON) {
        if (isON) {
            document.body.classList.add('robotics-mode');
            if (roboticsToggleBtn) {
                roboticsToggleBtn.setAttribute('title', 'Robotics Mode: ON');
                roboticsToggleBtn.innerHTML = '<span class="mode-icon">⚡</span> <span class="mode-text">ROBOTICS MODE: ON</span>';
            }
            initAudio();
            audioEnabled = true;
            playPowerUpSound();
        } else {
            document.body.classList.remove('robotics-mode');
            if (roboticsToggleBtn) {
                roboticsToggleBtn.setAttribute('title', 'Robotics Mode: OFF');
                roboticsToggleBtn.innerHTML = '<span class="mode-icon">🤖</span> <span class="mode-text">ROBOTICS MODE: OFF</span>';
            }
            audioEnabled = false;
        }
    }

    if (storedMode === 'true') {
        applyRoboticsMode(true);
    } else {
        applyRoboticsMode(false);
    }

    if (roboticsToggleBtn) {
        roboticsToggleBtn.addEventListener('click', () => {
            const currentlyActive = document.body.classList.contains('robotics-mode');
            const newState = !currentlyActive;
            localStorage.setItem('roboticsMode', newState ? 'true' : 'false');
            applyRoboticsMode(newState);
        });
    }

    document.querySelectorAll('.btn, .nav-links a, .card, .hud-card, .robotics-mode-toggle, .filter-btn, .step-nav-btn, .config-step-tab').forEach(el => {
        el.addEventListener('mouseenter', () => playCyberBeep(650, 0.025));
        el.addEventListener('click', () => playCyberClick());
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
        const welcomeMessage = "WELCOME TO AGENTSPACE";
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
    // Sound FX Toggle Control
    // ==========================================
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const storedSound = localStorage.getItem('audioSoundEnabled');

    function applySoundSetting(enabled) {
        audioEnabled = enabled;
        if (soundToggleBtn) {
            soundToggleBtn.innerHTML = enabled ? '🔊 AUDIO FX: ON' : '🔇 AUDIO FX: OFF';
        }
    }

    if (storedSound === 'true') {
        applySoundSetting(true);
    } else {
        applySoundSetting(false);
    }

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            initAudio();
            audioEnabled = !audioEnabled;
            localStorage.setItem('audioSoundEnabled', audioEnabled ? 'true' : 'false');
            applySoundSetting(audioEnabled);
            if (audioEnabled) playPowerUpSound();
        });
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
                line.innerHTML = `<span class="timestamp">[${log.time}]</span> <span class="${log.tag}">> ${log.text}</span>`;
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
        // Initial run
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

});

