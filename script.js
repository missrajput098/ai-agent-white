// ==========================================
// AGENTSPACE - Interactive Website Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Futuristic Preloader Animation (Robot Left-to-Right + Typewriter)
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
        const totalDuration = 2400; // 2.4 seconds load duration
        const intervalTime = 30;
        const steps = totalDuration / intervalTime;
        const increment = 100 / steps;

        const preloaderInterval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress > 100) currentProgress = 100;

            // Move Robot image from 0% to 100% left offset across track
            preloaderRobot.style.left = `${currentProgress}%`;
            if (preloaderLaser) preloaderLaser.style.width = `${currentProgress}%`;

            // Fill Progress bar
            preloaderFill.style.width = `${currentProgress}%`;
            preloaderPercent.innerText = `${Math.floor(currentProgress)}%`;

            // Type text progressively based on progress ratio
            const charCount = Math.floor((currentProgress / 100) * welcomeMessage.length);
            preloaderTypedText.innerText = welcomeMessage.substring(0, charCount);

            if (currentProgress >= 100) {
                clearInterval(preloaderInterval);
                setTimeout(() => {
                    preloaderOverlay.classList.add('loaded');
                }, 400);
            }
        }, intervalTime);
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
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
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
            });
        });
    }

    // Active Section Navigation Link Highlight
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // ==========================================
    // Hero Sticky Scroll Image Sequence
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

        // Calculate progress from 0 (top of track) to 1 (bottom of track)
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
    // AI Solutions Sticky Scroll Feature Showcase (Alternating Vertical Patti)
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

    // Step Nav Pills Click Listener
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

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === `#${currentSectionId}`) {
                anchor.classList.add('active');
            }
        });
    });

    // Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.step-card, .action-card, .platform-badge, .agent-card, .timeline-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
    });

    // Interactive Floating Badges Hover Glow Effect
    const badges = document.querySelectorAll('.floating-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.3)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.08), 0 0 15px rgba(37, 99, 235, 0.15)';
        });
    });

    // ==========================================
    // Fullscreen Connected Points Digital Constellation Network
    // ==========================================
    const canvas = document.getElementById('constellationCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 130; // Increased for full page coverage
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
                this.radius = Math.random() * 2 + 1.2;
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
                const alpha = (Math.sin(this.pulse) + 1) / 2 * 0.5 + 0.35;
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
                ctx.shadowColor = 'rgba(37, 99, 235, 0.4)';
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

            // Connect nearby points across the screen
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
                        ctx.lineWidth = 1 - dist / maxDistance;
                        ctx.stroke();
                    }
                }

                // Connect to mouse cursor anywhere on the webpage
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.65;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
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
    // 3D Robotics Tilt & Perspective Hover Engine
    // ==========================================
    const tiltCards = document.querySelectorAll('.card-3d, .sol-card, .agent-card, .timeline-item, .cta-card-right');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // ==========================================
    // Corner Floating AI Robot Assistant Interaction
    // ==========================================
    const cornerRobotAvatar = document.getElementById('cornerRobotAvatar');
    const robotSpeechBubble = document.getElementById('robotSpeechBubble');
    const speechClose = document.getElementById('speechClose');
    const speechText = document.getElementById('speechText');

    const robotGreetings = [
        "Hello! 👋 Welcome to AGENTSPACE! How can I help build your custom AI Agent today?",
        "Hey there! 🤖 Need a custom AI agent for Instagram, WhatsApp, or Sales?",
        "Greetings human! ⚡ Let's automate your business workflows today!",
        "Hello! 🚀 Click 'Book Demo' to start creating your personalized AI agent!"
    ];

    let currentGreetingIndex = 0;

    if (cornerRobotAvatar && robotSpeechBubble) {
        cornerRobotAvatar.addEventListener('click', () => {
            robotSpeechBubble.classList.toggle('active');
            if (robotSpeechBubble.classList.contains('active')) {
                if (speechText) {
                    speechText.innerText = robotGreetings[currentGreetingIndex % robotGreetings.length];
                    currentGreetingIndex++;
                }
            }
        });

        if (speechClose) {
            speechClose.addEventListener('click', (e) => {
                e.stopPropagation();
                robotSpeechBubble.classList.remove('active');
            });
        }
    }

    // ==========================================
    // Holographic Sci-Fi Laser Crosshair & Spark Trail
    // ==========================================
    const cursorContainer = document.getElementById('sciCursorContainer');
    const cursorDot = document.getElementById('sciCursorDot');
    const cursorReticle = document.getElementById('sciCursorReticle');
    const reticleTargetText = document.getElementById('reticleTargetText');
    const sparkCanvas = document.getElementById('cursorSparkCanvas');

    if (cursorContainer && cursorDot && cursorReticle && sparkCanvas) {
        const sparkCtx = sparkCanvas.getContext('2d');
        let sparkWidth = sparkCanvas.width = window.innerWidth;
        let sparkHeight = sparkCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            sparkWidth = sparkCanvas.width = window.innerWidth;
            sparkHeight = sparkCanvas.height = window.innerHeight;
        });

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX, dotY = mouseY;
        let reticleX = mouseX, reticleY = mouseY;
        let sparks = [];

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Emit glowing particle sparks on movement
            if (Math.random() < 0.6) {
                const isLocked = cursorContainer.classList.contains('locked');
                sparks.push({
                    x: mouseX,
                    y: mouseY,
                    vx: (Math.random() - 0.5) * 2.5,
                    vy: (Math.random() - 0.5) * 2.5 - 0.5,
                    size: Math.random() * 2.5 + 1,
                    alpha: 1,
                    color: isLocked ? '#e11d48' : (Math.random() > 0.3 ? '#0284c7' : '#2563eb')
                });
            }
        });

        // Smooth Lerp Animation Loop for Cursor
        function renderCursor() {
            // Fast lerp for dot
            dotX += (mouseX - dotX) * 0.75;
            dotY += (mouseY - dotY) * 0.75;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;

            // Smooth inertia lerp for reticle ring
            reticleX += (mouseX - reticleX) * 0.2;
            reticleY += (mouseY - reticleY) * 0.2;
            cursorReticle.style.left = `${reticleX}px`;
            cursorReticle.style.top = `${reticleY}px`;

            // Render Sparks
            sparkCtx.clearRect(0, 0, sparkWidth, sparkHeight);
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.04; // mild gravity
                s.alpha -= 0.03;

                if (s.alpha <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }

                sparkCtx.save();
                sparkCtx.beginPath();
                sparkCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                sparkCtx.fillStyle = s.color;
                sparkCtx.globalAlpha = s.alpha;
                sparkCtx.shadowColor = s.color;
                sparkCtx.shadowBlur = 8;
                sparkCtx.fill();
                sparkCtx.restore();
            }

            requestAnimationFrame(renderCursor);
        }

        renderCursor();

        // Target Lock Interactive Hover Listeners
        const bindTargetLockElements = () => {
            const targetElements = document.querySelectorAll(
                'a, button, .btn, .card-3d, .sol-card, .sol-vertical-patti, .step-nav-btn, .agent-card, .platform-badge, .timeline-item, .nav-links a, .corner-robot-avatar, .step-card, .action-card, input, textarea, .agent-pod-card, .filter-btn, .config-option-card, .tech-stack-card, .config-step-tab, .case-study-card'
            );

            targetElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorContainer.classList.add('locked');
                    
                    // Customize lock text based on target element
                    if (reticleTargetText) {
                        if (el.classList.contains('btn-primary') || el.classList.contains('speech-btn')) {
                            reticleTargetText.innerText = 'EXECUTE DEMO';
                        } else if (el.classList.contains('agent-card') || el.classList.contains('agent-pod-card')) {
                            reticleTargetText.innerText = 'AI POD LOCKED';
                        } else if (el.classList.contains('sol-vertical-patti') || el.classList.contains('step-nav-btn')) {
                            reticleTargetText.innerText = 'CAPABILITY LOCK';
                        } else if (el.classList.contains('card-3d') || el.classList.contains('sol-card')) {
                            reticleTargetText.innerText = 'TARGET LOCKED';
                        } else if (el.classList.contains('corner-robot-avatar')) {
                            reticleTargetText.innerText = 'AI ASSISTANT';
                        } else if (el.classList.contains('filter-btn')) {
                            reticleTargetText.innerText = 'FILTER SPECS';
                        } else if (el.classList.contains('config-option-card')) {
                            reticleTargetText.innerText = 'SELECT MODULE';
                        } else {
                            reticleTargetText.innerText = 'SYSTEM LOCK';
                        }
                    }
                });

                el.addEventListener('mouseleave', () => {
                    cursorContainer.classList.remove('locked');
                });
            });
        };

        bindTargetLockElements();
    }

    // ==========================================
    // AI Agents Category Tab Filter (ai-agents.html)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const agentPodCards = document.querySelectorAll('.agent-pod-card');

    if (filterBtns.length > 0 && agentPodCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterCategory = btn.getAttribute('data-filter');

                agentPodCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterCategory === 'all' || cardCategory === filterCategory) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ==========================================
    // Interactive ROI Calculator (solutions.html)
    // ==========================================
    const teamSizeSlider = document.getElementById('teamSizeSlider');
    const avgSalarySlider = document.getElementById('avgSalarySlider');
    const hoursTaskSlider = document.getElementById('hoursTaskSlider');

    const teamSizeVal = document.getElementById('teamSizeVal');
    const avgSalaryVal = document.getElementById('avgSalaryVal');
    const hoursTaskVal = document.getElementById('hoursTaskVal');

    const annualSavingsVal = document.getElementById('annualSavingsVal');
    const hoursSavedVal = document.getElementById('hoursSavedVal');
    const roiSpeedVal = document.getElementById('roiSpeedVal');

    function updateROICalculations() {
        if (!teamSizeSlider || !avgSalarySlider || !hoursTaskSlider) return;

        const teamSize = parseInt(teamSizeSlider.value) || 10;
        const avgSalary = parseInt(avgSalarySlider.value) || 60000;
        const hoursTask = parseInt(hoursTaskSlider.value) || 15;

        if (teamSizeVal) teamSizeVal.innerText = `${teamSize} People`;
        if (avgSalaryVal) avgSalaryVal.innerText = `$${avgSalary.toLocaleString()}/yr`;
        if (hoursTaskVal) hoursTaskVal.innerText = `${hoursTask} hrs/wk`;

        // Estimation logic: AI automates 65% of repetitive task hours
        const hourlyRate = avgSalary / 2000; // ~2000 working hours/yr
        const weeklyHoursSaved = teamSize * hoursTask * 0.65;
        const annualHoursSaved = Math.round(weeklyHoursSaved * 52);
        const annualCostSavings = Math.round(annualHoursSaved * hourlyRate);

        if (annualSavingsVal) annualSavingsVal.innerText = `$${annualCostSavings.toLocaleString()}`;
        if (hoursSavedVal) hoursSavedVal.innerText = `${annualHoursSaved.toLocaleString()} hrs`;
        if (roiSpeedVal) roiSpeedVal.innerText = `${Math.max(1, Math.round(12 - (teamSize / 5)))} Weeks`;
    }

    if (teamSizeSlider && avgSalarySlider && hoursTaskSlider) {
        teamSizeSlider.addEventListener('input', updateROICalculations);
        avgSalarySlider.addEventListener('input', updateROICalculations);
        hoursTaskSlider.addEventListener('input', updateROICalculations);
        updateROICalculations();
    }

    // ==========================================
    // 4-Step Interactive Agent Builder Configurator (contact.html)
    // ==========================================
    const stepTabs = document.querySelectorAll('.config-step-tab');
    const stepContents = document.querySelectorAll('.config-step-content');
    const prevBtn = document.getElementById('configPrevBtn');
    const nextBtn = document.getElementById('configNextBtn');
    const submitBtn = document.getElementById('configSubmitBtn');
    let currentStep = 1;

    function goToConfigStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > 4) return;
        currentStep = stepNumber;

        stepTabs.forEach((tab, index) => {
            if (index + 1 === stepNumber) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        stepContents.forEach((content, index) => {
            if (index + 1 === stepNumber) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        if (prevBtn) prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
        if (nextBtn) nextBtn.style.display = currentStep === 4 ? 'none' : 'inline-flex';
        if (submitBtn) submitBtn.style.display = currentStep === 4 ? 'inline-flex' : 'none';
    }

    stepTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = parseInt(tab.getAttribute('data-step'));
            if (step) goToConfigStep(step);
        });
    });

    if (nextBtn) nextBtn.addEventListener('click', () => goToConfigStep(currentStep + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goToConfigStep(currentStep - 1));

    // Option cards selection in configurator
    const optionCards = document.querySelectorAll('.config-option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const parentGrid = card.closest('.option-cards-grid');
            if (parentGrid) {
                parentGrid.querySelectorAll('.config-option-card').forEach(c => c.classList.remove('selected'));
            }
            card.classList.add('selected');
        });
    });

    console.log('AGENTSPACE AI Agency Website initialized successfully across all subpages!');
});


