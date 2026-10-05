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
        return; // Speech synthesis disabled for natural user experience
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
    // AI Agents Catalog Category Filter Tabs & Modal Engine (ai-agents.html)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const agentPodCards = document.querySelectorAll('.agent-pod-card');

    if (filterBtns.length > 0 && agentPodCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                let visibleCount = 0;

                agentPodCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    card.classList.remove('filtering-in');

                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        const delay = visibleCount * 0.06;
                        card.style.animationDelay = `${delay}s`;
                        void card.offsetWidth;
                        card.classList.add('filtering-in');
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            });
        });
    }

    // Agent Details Modal Dataset & Interactivity
    const agentDetailsData = {
        'leadr-3000': {
            name: 'LEADR-3000',
            role: 'Sales Qualifier Agent',
            status: 'READY TO DEPLOY',
            icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`,
            desc: 'LEADR-3000 operates as an autonomous sales representative. It engages incoming inbound leads across web forms, live chat, and email within 10 seconds, conducts dynamic qualification interviews based on your ICP, overcomes common prospect objections, and automatically schedules meetings onto your sales reps calendars.',
            caps: [
                'Instant 10-second response latency for incoming inbound leads',
                'Deep CRM synchronization with HubSpot, Salesforce & Calendly',
                'Multi-channel outreach via WhatsApp & Email sequences',
                '3.4x average boost in lead-to-booked demo conversion rate'
            ],
            chips: ['HubSpot', 'Salesforce', 'Calendly', 'WhatsApp', 'Email CRM'],
            workflow: ['LEAD ARRIVES', 'AI UNDERSTANDS', 'AI QUALIFIES', 'CRM UPDATED', 'FOLLOW-UP / BOOKING'],
            deployUrl: 'contact.html?agent=LEADR-3000'
        },
        'supportr-x': {
            name: 'SUPPORTR-X',
            role: 'CX Support Agent',
            status: 'READY TO DEPLOY',
            icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
            desc: 'SUPPORTR-X handles tier 1 through tier 3 customer service requests autonomously 24/7. It connects directly with your Shopify, ERP, or warehouse databases to fetch live order updates, issue refunds, update shipping addresses, and escalate complex edge cases with full context to human agents.',
            caps: [
                '24/7 continuous resolution of customer inquiries with zero queue times',
                'Direct live integration with Zendesk, Gorgias & Shopify admin APIs',
                '92% First Contact Resolution (FCR) rate across e-commerce support',
                'Multilingual support supporting over 50+ languages natively'
            ],
            chips: ['Zendesk', 'Gorgias', 'Shopify', 'Intercom', 'REST APIs'],
            workflow: ['INQUIRY IN', 'INTENT & ORDER CHECK', 'KNOWLEDGE SEARCH', 'ACTION (REFUND/UPDATE)', 'RESOLVED 24/7'],
            deployUrl: 'contact.html?agent=SUPPORTR-X'
        },
        'instaguard': {
            name: 'INSTAGUARD',
            role: 'Social DM Agent',
            status: 'READY TO DEPLOY',
            icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
            desc: 'INSTAGUARD monitors your Instagram account for story mentions, comment keyword triggers, and incoming DMs. It immediately engages followers with personalized conversational messages, delivers discount codes, collects email/phone opt-ins, and tracks campaign ROI.',
            caps: [
                'Official Meta API compliance for Instagram DMs & comments',
                'Automated story mention & comment keyword trigger responses',
                'Human-like natural conversational pacing to prevent spam flags',
                'Direct opt-in lead collection synced to your email marketing software'
            ],
            chips: ['Meta API', 'Instagram DM', 'Shopify', 'Klaviyo'],
            workflow: ['DM / COMMENT', 'TRIGGER & SENTIMENT', 'OFFER MATCHED', 'AUTO DM SENT', 'OPT-IN SAVED'],
            deployUrl: 'contact.html?agent=INSTAGUARD'
        },
        'dispatch-bot': {
            name: 'DISPATCH-BOT',
            role: 'Workflow Ops Agent',
            status: 'READY TO DEPLOY',
            icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
            desc: 'DISPATCH-BOT handles back-office operational tasks. It parses PDFs, extracts invoice data, performs OCR document verification, syncs cross-tool databases, and alerts team members on Slack or Microsoft Teams when anomalies or bottlenecks occur.',
            caps: [
                'Seamless connection with Zapier, Make, and custom webhooks',
                'Advanced OCR parsing for multi-page invoices & receipts',
                'Autonomous Slack & Microsoft Teams anomaly notification alerts',
                'Cross-tool data sync ensuring zero manual data entry errors'
            ],
            chips: ['Zapier', 'Make', 'Slack', 'Teams', 'Webhooks'],
            workflow: ['DOC / WEBHOOK', 'OCR & PARSING', 'DATA VALIDATION', 'WORKFLOW EXECUTION', 'SLACK / CRM SYNC'],
            deployUrl: 'contact.html?agent=DISPATCH-BOT'
        },
        'voice-nexus': {
            name: 'VOICE-NEXUS',
            role: 'AI Phone Agent',
            status: 'READY TO DEPLOY',
            icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
            desc: 'VOICE-NEXUS is an ultra-low latency sub-second voice AI agent designed for phone interactions. It places outbound appointment confirmation calls, handles inbound phone dispatch, transfers calls to live agents when necessary, and logs structured transcripts directly into your CRM.',
            caps: [
                'Sub-second ultra-low latency conversational voice pipeline',
                'Twilio & Retell AI integration with ultra-realistic human voices',
                'Intelligent call transfer logic to human representatives',
                'Automatic audio transcription & summary logging to CRM'
            ],
            chips: ['Twilio', 'Retell AI', 'Phone API', 'HubSpot'],
            workflow: ['PHONE CALL', 'SPEECH-TO-TEXT', 'INTENT LOGIC', 'HUMAN VOICE SYNT', 'CALL LOGGED'],
            deployUrl: 'contact.html?agent=VOICE-NEXUS'
        },
        'dataflex': {
            name: 'DATAFLEX',
            role: 'Enterprise SQL Agent',
            status: 'READY TO DEPLOY',
            icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
            desc: 'DATAFLEX connects to your enterprise database warehouse (Postgres, Snowflake, BigQuery) and vector search store. Executive team members can ask plain English questions, and DATAFLEX safely translates intent into validated SQL queries to return instant charts and tables.',
            caps: [
                'Enterprise RAG vector search & database architecture',
                'Strict zero data leakage & read-only safety permissions',
                'Instant conversion of natural language prompts to complex SQL',
                'Automated executive reporting & chart generation'
            ],
            chips: ['Postgres', 'Snowflake', 'Vector DB', 'BigQuery'],
            workflow: ['NL QUESTION', 'SCHEMA & RAG LOOKUP', 'SECURE SQL GEN', 'QUERY RUN', 'INSIGHT REPORT'],
            deployUrl: 'contact.html?agent=DATAFLEX'
        }
    };

    const modalOverlay = document.getElementById('agentModalOverlay');
    const modalCloseBtn = document.getElementById('agentModalClose');
    const viewDetailsBtns = document.querySelectorAll('.view-agent-details-btn');

    function openAgentModal(agentKey) {
        const data = agentDetailsData[agentKey];
        if (!data || !modalOverlay) return;

        document.getElementById('modalAgentIcon').innerHTML = data.icon;
        document.getElementById('modalAgentStatus').innerHTML = `<span class="status-pulse-dot"></span> ${data.status}`;
        document.getElementById('modalAgentName').innerText = data.name;
        document.getElementById('modalAgentRole').innerText = data.role;
        document.getElementById('modalAgentDesc').innerText = data.desc;

        // Populate capabilities
        const capsList = document.getElementById('modalAgentCaps');
        capsList.innerHTML = '';
        data.caps.forEach(cap => {
            const li = document.createElement('li');
            li.className = 'modal-cap-item';
            li.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ${cap}`;
            capsList.appendChild(li);
        });

        // Populate chips
        const chipsWrapper = document.getElementById('modalAgentChips');
        chipsWrapper.innerHTML = '';
        data.chips.forEach(chip => {
            const span = document.createElement('span');
            span.className = 'integration-chip';
            span.innerText = chip;
            chipsWrapper.appendChild(span);
        });

        // Populate workflow pipeline
        const wfWrapper = document.getElementById('modalAgentWorkflow');
        wfWrapper.innerHTML = '';
        data.workflow.forEach((stepText, idx) => {
            const stepChip = document.createElement('div');
            stepChip.className = 'wf-step-chip';
            stepChip.innerHTML = `<span>${stepText}</span>`;
            wfWrapper.appendChild(stepChip);

            if (idx < data.workflow.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'wf-arrow';
                arrow.innerHTML = '↓';
                wfWrapper.appendChild(arrow);
            }
        });

        // Update CTA link
        const deployBtn = document.getElementById('modalDeployBtn');
        if (deployBtn) {
            deployBtn.setAttribute('href', data.deployUrl);
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate workflow chips sequentially
        const stepChips = wfWrapper.querySelectorAll('.wf-step-chip');
        stepChips.forEach((chip, index) => {
            setTimeout(() => {
                chip.classList.add('active-step');
            }, index * 200);
        });
    }

    function closeAgentModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const agentKey = btn.getAttribute('data-agent');
            openAgentModal(agentKey);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeAgentModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeAgentModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeAgentModal();
        }
    });

    // ==========================================
    // Dynamic Futuristic Preloader Animation (Page Navigation Contextual)
    // ==========================================
    const preloaderOverlay = document.getElementById('preloaderOverlay');
    const preloaderRobot = document.getElementById('preloaderRobot');
    const preloaderLaser = document.getElementById('preloaderLaser');
    const preloaderTypedText = document.getElementById('preloaderTypedText');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderPercent = document.getElementById('preloaderPercent');

    const getPageLoaderMessage = () => {
        const path = (window.location.pathname || '').toLowerCase();
        if (path.includes('ai-agents.html')) {
            return "INITIALIZING AI AGENTS HUB...";
        } else if (path.includes('how-it-works.html')) {
            return "MAPPING NEURAL WORKFLOW BLUEPRINT...";
        } else if (path.includes('workflow-studio.html')) {
            return "LOADING WORKFLOW STUDIO ENVIRONMENT...";
        } else if (path.includes('solutions.html')) {
            return "CONFIGURING ENTERPRISE AI SOLUTIONS...";
        } else if (path.includes('case-studies.html')) {
            return "FETCHING CASE STUDIES & METRICS...";
        } else if (path.includes('about-us.html')) {
            return "LOADING FACTONIX ENTERPRISE STORY...";
        } else if (path.includes('contact.html')) {
            return "CONNECTING TO SECURE DISPATCH CORE...";
        } else if (path.includes('portfolio.html')) {
            return "LOADING LIVE AI DEPLOYMENTS PORTFOLIO...";
        }
        return "INITIALIZING FACTONIX AI CORE...";
    };

    if (preloaderOverlay && preloaderTypedText && preloaderFill && preloaderPercent) {
        const welcomeMessage = getPageLoaderMessage();
        let currentProgress = 0;
        const totalDuration = 1400;
        const intervalTime = 25;
        const steps = totalDuration / intervalTime;
        const increment = 100 / steps;

        const preloaderInterval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress > 100) currentProgress = 100;

            if (preloaderRobot) preloaderRobot.style.left = `${currentProgress}%`;
            if (preloaderLaser) preloaderLaser.style.width = `${currentProgress}%`;

            preloaderFill.style.width = `${currentProgress}%`;
            preloaderPercent.innerText = `${Math.floor(currentProgress)}%`;

            const charCount = Math.floor((currentProgress / 100) * welcomeMessage.length);
            preloaderTypedText.innerText = welcomeMessage.substring(0, charCount);

            if (currentProgress >= 100) {
                clearInterval(preloaderInterval);
                setTimeout(() => {
                    preloaderOverlay.classList.add('loaded');
                }, 200);
            }
        }, intervalTime);

        // Fallback safety timeout
        setTimeout(() => {
            if (preloaderOverlay) preloaderOverlay.classList.add('loaded');
        }, 1800);
    } else if (preloaderOverlay) {
        preloaderOverlay.classList.add('loaded');
    }

    // Smooth Page Navigation Transition with Contextual Loader Text
    document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="javascript"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('#')) return;

            if (href.endsWith('.html') || href === 'index.html' || href === '/') {
                if (preloaderOverlay) {
                    let navMsg = "NAVIGATING TO FACTONIX CORE...";
                    if (href.includes('ai-agents.html')) navMsg = "NAVIGATING TO AI AGENTS HUB...";
                    else if (href.includes('how-it-works.html')) navMsg = "MAPPING NEURAL WORKFLOWS...";
                    else if (href.includes('workflow-studio.html')) navMsg = "LOADING WORKFLOW STUDIO...";
                    else if (href.includes('solutions.html')) navMsg = "CONFIGURING ENTERPRISE SOLUTIONS...";
                    else if (href.includes('case-studies.html')) navMsg = "FETCHING CASE STUDIES & METRICS...";
                    else if (href.includes('about-us.html')) navMsg = "LOADING FACTONIX STORY...";
                    else if (href.includes('contact.html')) navMsg = "OPENING SECURE DISPATCH CORE...";
                    else if (href.includes('portfolio.html')) navMsg = "LOADING LIVE AI PORTFOLIO...";

                    e.preventDefault();
                    preloaderOverlay.classList.remove('loaded');
                    if (preloaderTypedText) preloaderTypedText.innerText = navMsg;
                    if (preloaderFill) preloaderFill.style.width = '100%';
                    if (preloaderPercent) preloaderPercent.innerText = '100%';

                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            }
        });
    });


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
    // 3D Isometric Brand Theme Floating Boxes Automation Engine
    // ==========================================
    const heroBoxes3DData = {
        instagram: {
            boxes: [
                {
                    title: "01 // BUILD & TRIGGER",
                    badge: "AUTOMATION",
                    nodes: [
                        { icon: "⚡", label: "Trigger", dotClass: "cyan-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "pink-dot" }
                    ]
                },
                {
                    title: "02 // ACCELERATE & DRAFT",
                    badge: "CONTENT",
                    nodes: [
                        { icon: "✍️", label: "Create Content", dotClass: "green-dot" },
                        { icon: "🏷️", label: "Caption AI", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // SCALE & PUBLISH",
                    badge: "INSTAGRAM",
                    nodes: [
                        { icon: "🎨", label: "Create Image", dotClass: "pink-dot" },
                        { icon: "📸", label: "Publish", dotClass: "green-dot" }
                    ]
                }
            ]
        },
        whatsapp: {
            boxes: [
                {
                    title: "01 // INBOUND & TRIAGE",
                    badge: "SUPPORT",
                    nodes: [
                        { icon: "💬", label: "Incoming Message", dotClass: "green-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "02 // CONTEXT & REPLY",
                    badge: "LLM RAG",
                    nodes: [
                        { icon: "🔍", label: "Understand", dotClass: "pink-dot" },
                        { icon: "🤖", label: "Generate Reply", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // REVIEW & DISPATCH",
                    badge: "WHATSAPP",
                    nodes: [
                        { icon: "👤", label: "Human Review", dotClass: "green-dot" },
                        { icon: "📲", label: "Send Reply", dotClass: "pink-dot" }
                    ]
                }
            ]
        },
        leads: {
            boxes: [
                {
                    title: "01 // CAPTURE & QUALIFY",
                    badge: "LEAD GEN",
                    nodes: [
                        { icon: "🌐", label: "New Lead", dotClass: "cyan-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "pink-dot" }
                    ]
                },
                {
                    title: "02 // ENRICH & SCORE",
                    badge: "CLEARBIT",
                    nodes: [
                        { icon: "📊", label: "Qualify", dotClass: "green-dot" },
                        { icon: "⭐", label: "Score Fit", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // CRM & HANDOFF",
                    badge: "SALESFORCE",
                    nodes: [
                        { icon: "🔄", label: "CRM Sync", dotClass: "pink-dot" },
                        { icon: "🤝", label: "Follow-up", dotClass: "green-dot" }
                    ]
                }
            ]
        },
        email: {
            boxes: [
                {
                    title: "01 // INBOUND MAIL",
                    badge: "INBOX",
                    nodes: [
                        { icon: "📧", label: "Inbound Email", dotClass: "cyan-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "pink-dot" }
                    ]
                },
                {
                    title: "02 // CLASSIFY & DRAFT",
                    badge: "PARSER",
                    nodes: [
                        { icon: "✍️", label: "Draft Reply", dotClass: "green-dot" },
                        { icon: "📁", label: "Categorize", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // DISPATCH & COMPLETE",
                    badge: "SENDGRID",
                    nodes: [
                        { icon: "📤", label: "Dispatch Mail", dotClass: "pink-dot" },
                        { icon: "🎉", label: "Inbox Zero", dotClass: "green-dot" }
                    ]
                }
            ]
        },
        sales: {
            boxes: [
                {
                    title: "01 // DEMO SIGNAL",
                    badge: "ZOOM AI",
                    nodes: [
                        { icon: "🎥", label: "Demo Call", dotClass: "pink-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "02 // PROPOSAL & QUOTE",
                    badge: "DECK AI",
                    nodes: [
                        { icon: "📄", label: "Generate Quote", dotClass: "green-dot" },
                        { icon: "📨", label: "Send Follow-up", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // NUDGE & CLOSE",
                    badge: "WON DEAL",
                    nodes: [
                        { icon: "⏰", label: "Set Nudge", dotClass: "pink-dot" },
                        { icon: "🏆", label: "Deal Closed", dotClass: "green-dot" }
                    ]
                }
            ]
        },
        analytics: {
            boxes: [
                {
                    title: "01 // CRON & PIPELINE",
                    badge: "AUDIT",
                    nodes: [
                        { icon: "⏱️", label: "Scheduled Cron", dotClass: "cyan-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "pink-dot" }
                    ]
                },
                {
                    title: "02 // LOGS & INSIGHTS",
                    badge: "ROI METRICS",
                    nodes: [
                        { icon: "📈", label: "Audit Logs", dotClass: "green-dot" },
                        { icon: "✨", label: "AI Insights", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // HUD & BROADCAST",
                    badge: "REPORT",
                    nodes: [
                        { icon: "📊", label: "Build HUD", dotClass: "pink-dot" },
                        { icon: "📡", label: "Executive Push", dotClass: "green-dot" }
                    ]
                }
            ]
        },
        content: {
            boxes: [
                {
                    title: "01 // PROMPT & STRATEGY",
                    badge: "IDEATION",
                    nodes: [
                        { icon: "💡", label: "Prompt Input", dotClass: "cyan-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "pink-dot" }
                    ]
                },
                {
                    title: "02 // RESEARCH & DRAFT",
                    badge: "COPYWRITING",
                    nodes: [
                        { icon: "🔎", label: "Research", dotClass: "green-dot" },
                        { icon: "📝", label: "Draft Copy", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // VISUALS & SYNC",
                    badge: "DALL-E 3",
                    nodes: [
                        { icon: "🖼️", label: "Visual Engine", dotClass: "pink-dot" },
                        { icon: "🚀", label: "Publish & Sync", dotClass: "green-dot" }
                    ]
                }
            ]
        },
        crm: {
            boxes: [
                {
                    title: "01 // WEBHOOK & TRIAGE",
                    badge: "HUBSPOT",
                    nodes: [
                        { icon: "🔔", label: "Webhook Event", dotClass: "pink-dot" },
                        { icon: "🧠", label: "AI Agent", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "02 // ASSIGN & ENRICH",
                    badge: "CLEARBIT",
                    nodes: [
                        { icon: "🎯", label: "Assign Rep", dotClass: "green-dot" },
                        { icon: "📞", label: "Enrich Contact", dotClass: "cyan-dot" }
                    ]
                },
                {
                    title: "03 // SLACK & PIPELINE",
                    badge: "AUTOMATED",
                    nodes: [
                        { icon: "📢", label: "Slack Alert", dotClass: "pink-dot" },
                        { icon: "⚡", label: "Pipeline Sync", dotClass: "green-dot" }
                    ]
                }
            ]
        }
    };

    function initHero3DBoxesEngine() {
        const trackEl = document.getElementById('boxes3DTrack');
        const badges = document.querySelectorAll('.floating-badge');

        if (!trackEl) return;

        let activeServiceKey = 'instagram';
        let animationTimers = [];
        let boxElements = [];

        function clearTimers() {
            animationTimers.forEach(t => clearTimeout(t));
            animationTimers = [];
        }

        function updateBadgeHighlight(wfKey) {
            badges.forEach(b => {
                const bWf = b.getAttribute('data-workflow');
                if (bWf === wfKey) {
                    b.classList.add('active-wf');
                } else {
                    b.classList.remove('active-wf');
                }
            });
        }

        function switchService(newKey) {
            clearTimers();

            // Smooth exit current 3D boxes
            if (boxElements.length > 0) {
                boxElements.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform += ' translateY(40px) scale(0.85)';
                    el.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
                });

                animationTimers.push(setTimeout(() => {
                    runSequentialBoxAnimation(newKey);
                }, 350));
            } else {
                runSequentialBoxAnimation(newKey);
            }
        }

        function runSequentialBoxAnimation(serviceKey) {
            clearTimers();
            activeServiceKey = serviceKey;
            updateBadgeHighlight(serviceKey);

            trackEl.innerHTML = '';
            boxElements = [];

            const serviceData = heroBoxes3DData[serviceKey] || heroBoxes3DData.instagram;
            const boxes = serviceData.boxes;

            // Sequential timing config
            const boxInterval = 2300; // time between box entries

            boxes.forEach((boxData, boxIdx) => {
                animationTimers.push(setTimeout(() => {
                    // Step A & B: Create 3D Purple Box & Drop In from Above
                    const boxEl = document.createElement('div');
                    boxEl.className = `box-3d-item box-entering ${boxIdx === 0 ? 'active-box' : ''}`;

                    const topOffset = boxIdx * 115;
                    const scaleVal = (1 - boxIdx * 0.04).toFixed(3);
                    const zVal = -boxIdx * 30;
                    const rotXVal = 24;
                    const rotYVal = -18;

                    boxEl.style.top = `${topOffset}px`;
                    boxEl.style.transform = `translateY(0px) rotateX(${rotXVal}deg) rotateY(${rotYVal}deg) scale(${scaleVal}) translateZ(${zVal}px)`;
                    boxEl.style.zIndex = 30 - boxIdx;

                    boxEl.innerHTML = `
                        <div class="box-3d-header" id="boxHeader_${boxIdx}">
                            <span class="box-3d-title">${boxData.title}</span>
                            <span class="box-3d-badge">${boxData.badge}</span>
                        </div>
                        <div class="box-nodes-container" id="boxNodes_${boxIdx}">
                            <svg class="box-flow-svg" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path d="M 10 6 L 90 6" class="box-flow-line" id="flowLine_${boxIdx}"></path>
                            </svg>
                            <div class="mini-node-pill" id="nodeA_${boxIdx}">
                                <span class="mini-node-dot ${boxData.nodes[0].dotClass}"></span>
                                <span class="mini-node-label">${boxData.nodes[0].icon} ${boxData.nodes[0].label}</span>
                            </div>
                            <div class="mini-node-pill" id="nodeB_${boxIdx}">
                                <span class="mini-node-dot ${boxData.nodes[1].dotClass}"></span>
                                <span class="mini-node-label">${boxData.nodes[1].icon} ${boxData.nodes[1].label}</span>
                            </div>
                        </div>
                    `;

                    trackEl.appendChild(boxEl);
                    boxElements.push(boxEl);

                    if (typeof playCyberBeep === 'function') {
                        playCyberBeep(650 + boxIdx * 80, 0.03);
                    }

                    // Step C: Header Title Appears (T + 380ms)
                    animationTimers.push(setTimeout(() => {
                        const headerEl = boxEl.querySelector(`#boxHeader_${boxIdx}`);
                        if (headerEl) headerEl.classList.add('title-visible');
                    }, 380));

                    // Step D: Node 1 Appears (T + 750ms)
                    animationTimers.push(setTimeout(() => {
                        const nodeA = boxEl.querySelector(`#nodeA_${boxIdx}`);
                        if (nodeA) nodeA.classList.add('node-visible');
                    }, 750));

                    // Step D2: Connecting Line Draws (T + 1150ms)
                    animationTimers.push(setTimeout(() => {
                        const flowLine = boxEl.querySelector(`#flowLine_${boxIdx}`);
                        if (flowLine) flowLine.classList.add('line-drawn');
                    }, 1150));

                    // Step D3: Node 2 Appears (T + 1500ms)
                    animationTimers.push(setTimeout(() => {
                        const nodeB = boxEl.querySelector(`#nodeB_${boxIdx}`);
                        if (nodeB) nodeB.classList.add('node-visible');
                    }, 1500));

                }, boxIdx * boxInterval));
            });

            // Step F: Infinite Loop Reset after all boxes arrive & complete
            const totalDuration = boxes.length * boxInterval + 2600;
            animationTimers.push(setTimeout(() => {
                switchService(serviceKey);
            }, totalDuration));
        }

        // Bind Floating Pill Buttons
        badges.forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.preventDefault();
                const wfKey = badge.getAttribute('data-workflow');
                if (wfKey && heroBoxes3DData[wfKey]) {
                    if (typeof playCyberClick === 'function') playCyberClick();
                    switchService(wfKey);
                }
            });
        });

        // Start default flow (Instagram)
        runSequentialBoxAnimation('instagram');
    }

    initHero3DBoxesEngine();

    // ==========================================
    // Live Stats Section Count-Up Observer (SECTION 2)
    // ==========================================
    function initStatsCounterEngine() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetEl = entry.target;
                    const targetVal = parseFloat(targetEl.getAttribute('data-target'));
                    if (isNaN(targetVal)) return;

                    let current = 0;
                    const duration = 1400;
                    const stepTime = 25;
                    const steps = duration / stepTime;
                    const increment = targetVal / steps;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetVal) {
                            current = targetVal;
                            clearInterval(timer);
                        }
                        if (Number.isInteger(targetVal)) {
                            targetEl.innerText = Math.floor(current);
                        } else {
                            targetEl.innerText = current.toFixed(1);
                        }
                    }, stepTime);

                    obs.unobserve(targetEl);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => observer.observe(num));
    }
    initStatsCounterEngine();

    // ==========================================
    // Connected Visual Pipeline Sequential Node Activation (SECTION 3)
    // ==========================================
    function initPipelineFlowEngine() {
        const pipelineTrack = document.getElementById('visualPipelineTrack');
        if (!pipelineTrack) return;

        const nodes = pipelineTrack.querySelectorAll('.pipeline-step-node');
        let currentNodeIdx = 0;

        setInterval(() => {
            nodes.forEach((node, idx) => {
                if (idx === currentNodeIdx) {
                    node.classList.add('active');
                } else {
                    node.classList.remove('active');
                }
            });
            currentNodeIdx = (currentNodeIdx + 1) % nodes.length;
        }, 2200);
    }
    initPipelineFlowEngine();

    // ==========================================
    // AI Capability Showcase Split Workspace Engine (SECTION 5)
    // ==========================================
    const capabilityData = {
        create: {
            title: "AI Content & Multi-Format Media Generator",
            tag: "CREATION PIPELINE",
            summary: "Generates high-converting social media posts, AI graphic visuals, email newsletters, and video scripts automatically matched to your brand tone.",
            metrics: [
                { val: "< 3.2s", label: "Generation Speed" },
                { val: "Multi-Platform", label: "Auto Format" },
                { val: "100%", label: "Brand Tone Sync" }
            ],
            pipeline: [
                { icon: "💡", label: "Topic Prompt", sub: "User / Cron" },
                { icon: "🧠", label: "Factonix Copy LLM", sub: "Brand Voice" },
                { icon: "🎨", label: "Image Engine", sub: "SDXL / Midjourney" },
                { icon: "🚀", label: "Auto Publish", sub: "Social APIs" }
            ],
            features: [
                "Generates captions, hashtags, and 4K visuals in seconds",
                "Learns your exact brand voice and tone guidelines",
                "Direct auto-publish to Instagram, LinkedIn, X & Facebook"
            ],
            mockupHeader: "📸 INSTAGRAM CONTENT GENERATOR MOCKUP",
            mockupContent: `
                <div class="cap-social-mock-card">
                    <div class="social-mock-header">
                        <div class="social-mock-user">
                            <div class="user-avatar-mini">✨</div>
                            <div>
                                <strong>@factonix_ai</strong>
                                <span class="badge-mini">AI Generated • 2s ago</span>
                            </div>
                        </div>
                        <span class="status-dot green-pulse"></span>
                    </div>
                    <div class="social-mock-body">
                        <p class="mock-caption-txt">
                            "Stop losing weekend leads. ⚡ Our custom AI agents handle customer inquiries 24/7 on WhatsApp & Instagram with sub-second response times."
                        </p>
                        <div class="mock-hashtags-row">
                            <span class="mock-tag">#AIAgents</span>
                            <span class="mock-tag">#Automation</span>
                            <span class="mock-tag">#BusinessGrowth</span>
                            <span class="mock-tag">#Factonix</span>
                        </div>
                        <div class="mock-visual-box">
                            <div class="visual-placeholder">
                                <span class="visual-icon">🎨</span>
                                <div>
                                    <strong>AI Visual Generated (1080x1080)</strong>
                                    <p>Futuristic workspace with neon cyan glowing AI network</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="social-mock-footer">
                        <div class="mock-stats">❤️ 1,482 Likes • 💬 194 Comments</div>
                        <button class="mock-btn-action" onclick="if(typeof playCyberClick==='function')playCyberClick(); this.innerText='✅ Copied to Clipboard!'; setTimeout(()=>this.innerText='📋 Copy Generated Content', 2000);">
                            📋 Copy Generated Content
                        </button>
                    </div>
                </div>
            `
        },
        automate: {
            title: "Autonomous Cross-Tool Workflow Orchestrator",
            tag: "NEURAL PIPELINE ENGINE",
            summary: "Connects your software stack (Shopify, HubSpot, Slack, QuickBooks) to automatically trigger, process, and record complex operations without human delay.",
            metrics: [
                { val: "14ms", label: "API Response" },
                { val: "0.00%", label: "Data Error Rate" },
                { val: "35+ Hrs", label: "Saved / Week" }
            ],
            pipeline: [
                { icon: "⚡", label: "Webhook Trigger", sub: "New Event" },
                { icon: "🧠", label: "Context Parsing", sub: "Neural Extract" },
                { icon: "🔀", label: "Decision Branch", sub: "Rule Engine" },
                { icon: "⚙️", label: "Multi-App Action", sub: "CRM & ERP Sync" }
            ],
            features: [
                "Bi-directional instant sync across 1,000+ business tools",
                "Self-healing error recovery & automated Slack notifications",
                "Custom Python / Webhook logic execution in secure sandboxes"
            ],
            mockupHeader: "⚙️ REAL-TIME WORKFLOW EXECUTION MAP",
            mockupContent: `
                <div class="cap-wf-mock-card">
                    <div class="wf-mock-status-bar">
                        <span>STATUS: <strong class="text-glow">LIVE PIPELINE RUNNING</strong></span>
                        <span class="status-dot green-pulse"></span>
                    </div>
                    <div class="wf-node-list">
                        <div class="wf-node-item active-node">
                            <span class="wf-node-badge green">01</span>
                            <div class="wf-node-info">
                                <strong>Shopify New Order Received (#8492)</strong>
                                <span class="wf-node-sub">Payload: $420.00 • Customer: David K.</span>
                            </div>
                            <span class="wf-check">✅ 0.02s</span>
                        </div>
                        <div class="wf-node-item active-node">
                            <span class="wf-node-badge cyan">02</span>
                            <div class="wf-node-info">
                                <strong>AI Invoice Extraction & Compliance Check</strong>
                                <span class="wf-node-sub">Tax ID verified • PDF invoice generated</span>
                            </div>
                            <span class="wf-check">✅ 0.18s</span>
                        </div>
                        <div class="wf-node-item active-node">
                            <span class="wf-node-badge purple">03</span>
                            <div class="wf-node-info">
                                <strong>HubSpot CRM Deal Updated & Slack #sales Alert</strong>
                                <span class="wf-node-sub">Stage: Closed Won • Alert sent to team</span>
                            </div>
                            <span class="wf-check">✅ 0.04s</span>
                        </div>
                        <div class="wf-node-item active-node">
                            <span class="wf-node-badge orange">04</span>
                            <div class="wf-node-info">
                                <strong>QuickBooks Invoice Logged & Customer Receipt Emailed</strong>
                                <span class="wf-node-sub">Receipt #QR-9401 sent via SendGrid API</span>
                            </div>
                            <span class="wf-check">✅ 0.06s</span>
                        </div>
                    </div>
                </div>
            `
        },
        analyze: {
            title: "Predictive Enterprise Intelligence & SQL Engine",
            tag: "REVENUE & DATA BI",
            summary: "Queries your data warehouse, runs vector search analysis, and synthesizes 50,000+ customer records into actionable executive summaries and live visual charts.",
            metrics: [
                { val: "0.4s", label: "SQL Latency" },
                { val: "99.9%", label: "Query Accuracy" },
                { val: "SOC2", label: "Zero Leakage" }
            ],
            pipeline: [
                { icon: "📊", label: "Data Source", sub: "SQL / Snowflake" },
                { icon: "🔎", label: "Vector RAG", sub: "Semantic Index" },
                { icon: "🧠", label: "SQL Synthesis", sub: "Auto Query" },
                { icon: "📈", label: "Executive HUD", sub: "Live Chart" }
            ],
            features: [
                "Instant plain English to SQL query conversion",
                "Automated daily executive email & Slack summaries",
                "Detects revenue anomalies and churn risk drivers early"
            ],
            mockupHeader: "📊 EXECUTIVE BI & REVENUE DASHBOARD",
            mockupContent: `
                <div class="cap-bi-mock-card">
                    <div class="bi-header-row">
                        <div>
                            <span class="bi-badge">EXECUTIVE SUMMARY</span>
                            <h4 class="bi-card-title">Monthly Revenue Growth & AI Impact</h4>
                        </div>
                        <span class="bi-trend-pill">+42.8% MoM 🚀</span>
                    </div>
                    
                    <!-- Dynamic mini chart bars -->
                    <div class="bi-chart-container">
                        <div class="chart-bar-group">
                            <div class="chart-bar-fill" style="height: 40%;"></div>
                            <span class="chart-lbl">W1</span>
                        </div>
                        <div class="chart-bar-group">
                            <div class="chart-bar-fill" style="height: 55%;"></div>
                            <span class="chart-lbl">W2</span>
                        </div>
                        <div class="chart-bar-group">
                            <div class="chart-bar-fill" style="height: 75%;"></div>
                            <span class="chart-lbl">W3</span>
                        </div>
                        <div class="chart-bar-group active-bar">
                            <div class="chart-bar-fill" style="height: 98%;"></div>
                            <span class="chart-lbl">W4</span>
                        </div>
                    </div>

                    <div class="bi-insight-box">
                        <span class="sparkle-icon">💡</span>
                        <div>
                            <strong>AI Neural Key Finding:</strong>
                            <p>High-tier customer conversion increased by 18.4% following WhatsApp instant bot launch. Recommended budget reallocation: +15% to Meta campaigns.</p>
                        </div>
                    </div>
                </div>
            `
        },
        sell: {
            title: "Autonomous Sales Prospecting & Booking Engine",
            tag: "REVENUE CONVERSION",
            summary: "Engages inbound website leads, scores intent, answers pre-sale inquiries, and books qualified meetings directly onto your sales reps' Calendly schedules.",
            metrics: [
                { val: "< 45s", label: "Lead Qualification" },
                { val: "+3.4x", label: "Booking Conversion" },
                { val: "96/100", label: "Intent Score" }
            ],
            pipeline: [
                { icon: "🎯", label: "Inbound Lead", sub: "Form / Chat" },
                { icon: "⭐", label: "BANT Scoring", sub: "Qualification" },
                { icon: "📨", label: "Personalized Pitch", sub: "Context Reply" },
                { icon: "📅", label: "Demo Booked", sub: "Calendly API" }
            ],
            features: [
                "Calculates BANT (Budget, Authority, Need, Timeline) score",
                "Automatic CRM lead logging into HubSpot & Salesforce",
                "Instant SMS & WhatsApp calendar reminder dispatch"
            ],
            mockupHeader: "🎯 QUALIFIED LEAD CARD & BOOKING PREVIEW",
            mockupContent: `
                <div class="cap-lead-mock-card">
                    <div class="lead-header-row">
                        <div class="lead-user-avatar">SR</div>
                        <div class="lead-info">
                            <strong>Sarah M.</strong>
                            <span>VP Growth • SaaS Enterprise</span>
                        </div>
                        <div class="lead-score-pill">Score: 96 / 100 🔥</div>
                    </div>

                    <div class="lead-metrics-row">
                        <div class="lead-m-item">
                            <span>Budget</span>
                            <strong>$25,000 / mo</strong>
                        </div>
                        <div class="lead-m-item">
                            <span>Timeline</span>
                            <strong>Immediate</strong>
                        </div>
                        <div class="lead-m-item">
                            <span>Team Size</span>
                            <strong>150+ Employees</strong>
                        </div>
                    </div>

                    <div class="lead-action-box">
                        <div class="lead-status-line">
                            <span class="status-dot green-pulse"></span>
                            <span><strong>ACTION TAKEN:</strong> Calendly demo scheduled for Tomorrow at 2:00 PM</span>
                        </div>
                        <div class="crm-badge-strip">
                            <span>✅ HubSpot Deal Created ($25,000)</span>
                            <span>✅ Slack Alert Sent</span>
                        </div>
                    </div>
                </div>
            `
        },
        support: {
            title: "24/7 Sub-Second AI Customer Care Pod",
            tag: "ALWAYS-ON SUPPORT",
            summary: "Provides instant human-grade support across WhatsApp, Web Chat, and Email in 50+ languages, resolving 85%+ of inquiries autonomously.",
            metrics: [
                { val: "< 0.8s", label: "Response Latency" },
                { val: "99.8%", label: "CSAT Score" },
                { val: "< 4%", label: "Human Escalation" }
            ],
            pipeline: [
                { icon: "💬", label: "Customer Query", sub: "WhatsApp / Web" },
                { icon: "🧠", label: "Intent Engine", sub: "NLP & Sentiment" },
                { icon: "🤖", label: "KB Retrieval", sub: "Smart Lookup" },
                { icon: "✅", label: "Instant Answer", sub: "Issue Resolved" }
            ],
            features: [
                "Supports 50+ languages with native dialect understanding",
                "Integrates with Zendesk, Freshdesk, and custom DBs",
                "Smooth fallback hand-off to live agents when required"
            ],
            mockupHeader: "🎧 LIVE CUSTOMER CARE CHAT SIMULATION",
            mockupContent: `
                <div class="cap-support-mock-card">
                    <div class="support-chat-header">
                        <div class="agent-avatar-mini">🤖</div>
                        <div>
                            <strong>Factonix Support AI</strong>
                            <span class="online-tag">● Online (24/7 Support)</span>
                        </div>
                        <span class="csat-pill">⭐⭐⭐⭐⭐ CSAT 99.8%</span>
                    </div>

                    <div class="support-chat-body">
                        <!-- Customer msg -->
                        <div class="chat-bubble customer-bubble">
                            <p>Hi, where is my order #8492? I need to know if it will arrive before Friday.</p>
                            <span class="bubble-time">10:42 AM</span>
                        </div>

                        <!-- AI Response msg -->
                        <div class="chat-bubble ai-bubble">
                            <p>Hi David! 👋 Order #8492 has shipped via FedEx Express. It is currently in transit and scheduled for delivery <strong>Today by 4:00 PM</strong>.</p>
                            <div class="track-link-pill">
                                📦 Tracking #: FX-98492104 • <a href="#" onclick="return false;">Track Live Package ➔</a>
                            </div>
                            <span class="bubble-time">10:42 AM • 0.4s response</span>
                        </div>
                    </div>

                    <div class="support-chat-footer">
                        <span class="resolved-badge">✅ Issue Resolved Autonomously</span>
                    </div>
                </div>
            `
        }
    };

    function initCapShowcaseEngine() {
        const segBtns = document.querySelectorAll('.cap-seg-btn, .cap-tab-btn');
        const stageEl = document.getElementById('capWorkspaceStage');

        if (!stageEl || segBtns.length === 0) return;

        function renderCapabilityFlow(capKey) {
            const data = capabilityData[capKey] || capabilityData.create;

            // Pipeline node step markup
            const pipelineHtml = data.pipeline.map((step, idx) => `
                <div class="bento-pipe-step">
                    <div class="pipe-node-icon">${step.icon}</div>
                    <div class="pipe-node-info">
                        <strong>${step.label}</strong>
                        <span>${step.sub}</span>
                    </div>
                </div>
                ${idx < data.pipeline.length - 1 ? '<div class="pipe-node-arr">➔</div>' : ''}
            `).join('');

            // Metrics mini-grid markup
            const metricsHtml = data.metrics.map(m => `
                <div class="bento-mini-metric">
                    <div class="metric-val text-glow">${m.val}</div>
                    <div class="metric-lbl">${m.label}</div>
                </div>
            `).join('');

            // Features list markup
            const featuresHtml = data.features.map(f => `
                <div class="bento-feat-item">
                    <span class="feat-check">✅</span>
                    <span>${f}</span>
                </div>
            `).join('');

            // Complete Bento Grid Layout
            stageEl.innerHTML = `
                <div class="cap-bento-grid">
                    <!-- LEFT COLUMN: Pipeline, Metrics & Details -->
                    <div class="cap-bento-left">
                        <div class="bento-left-header">
                            <span class="cap-badge mini-badge">${data.tag}</span>
                            <h3 class="bento-title">${data.title}</h3>
                            <p class="bento-summary">${data.summary}</p>
                        </div>

                        <!-- Metrics Grid -->
                        <div class="bento-metrics-grid">
                            ${metricsHtml}
                        </div>

                        <!-- Horizontal Connected Node Pipeline -->
                        <div class="bento-pipeline-box">
                            <div class="bento-pipe-title">⚡ NEURAL PIPELINE ARCHITECTURE</div>
                            <div class="bento-pipe-track">
                                ${pipelineHtml}
                            </div>
                        </div>

                        <!-- Feature highlights -->
                        <div class="bento-features-list">
                            ${featuresHtml}
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Interactive Live Visual Mockup Preview -->
                    <div class="cap-bento-right">
                        <div class="bento-mockup-wrapper">
                            <div class="mockup-top-bar">
                                <div class="sim-dots">
                                    <span class="sim-dot red"></span>
                                    <span class="sim-dot yellow"></span>
                                    <span class="sim-dot green"></span>
                                </div>
                                <span class="mockup-header-title">${data.mockupHeader}</span>
                            </div>
                            <div class="mockup-stage-body">
                                ${data.mockupContent}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        segBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                segBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const capKey = btn.getAttribute('data-cap');
                if (typeof playCyberClick === 'function') playCyberClick();
                renderCapabilityFlow(capKey);
            });
        });

        // Render default tab (CREATE)
        renderCapabilityFlow('create');
    }

    initCapShowcaseEngine();

    // Spider web / constellation particle canvas animation removed as requested.

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

    // Solutions Page ROI Telemetry Calculator Engine (solutions.html)
    const solTeamSlider = document.getElementById('teamSizeSlider');
    const solSalarySlider = document.getElementById('avgSalarySlider');
    const solHoursSlider = document.getElementById('hoursTaskSlider');

    const solTeamVal = document.getElementById('teamSizeVal');
    const solSalaryVal = document.getElementById('avgSalaryVal');
    const solHoursVal = document.getElementById('hoursTaskVal');

    const solAnnualSavings = document.getElementById('annualSavingsVal');
    const solHoursSaved = document.getElementById('hoursSavedVal');
    const solSpeedUpVal = document.getElementById('speedUpVal');
    const solSpeedVal = document.getElementById('roiSpeedVal');

    let currentSavingsDisplay = 152100;

    function animateROINumber(element, startVal, endVal, prefix = '$', suffix = '') {
        if (!element) return;
        const duration = 200;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(startVal + (endVal - startVal) * progress);
            element.innerText = `${prefix}${current.toLocaleString()}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    function updateSolutionsROI() {
        if (!solTeamSlider || !solSalarySlider || !solHoursSlider) return;

        const team = parseInt(solTeamSlider.value);
        const salary = parseInt(solSalarySlider.value);
        const hoursPerWeek = parseInt(solHoursSlider.value);

        if (solTeamVal) solTeamVal.innerText = `${team} People`;
        if (solSalaryVal) solSalaryVal.innerText = `$${salary.toLocaleString()}/yr`;
        if (solHoursVal) solHoursVal.innerText = `${hoursPerWeek} hrs/wk`;

        const hourlyRate = salary / 2000;
        const weeklyHoursSavedTotal = team * hoursPerWeek * 0.65;
        const annualHoursSavedTotal = Math.round(weeklyHoursSavedTotal * 52);
        const annualGrossSavings = Math.round(annualHoursSavedTotal * hourlyRate);

        if (solAnnualSavings) {
            animateROINumber(solAnnualSavings, currentSavingsDisplay, annualGrossSavings, '$');
            currentSavingsDisplay = annualGrossSavings;
        }

        if (solHoursSaved) {
            solHoursSaved.innerText = `${annualHoursSavedTotal.toLocaleString()} hrs/yr`;
        }

        if (solSpeedUpVal) {
            const speedUpMult = (1 + (hoursPerWeek / 40) * 7.5).toFixed(1);
            solSpeedUpVal.innerText = `${speedUpMult}x`;
        }

        if (solSpeedVal) {
            const weeksPayback = Math.max(1, Math.round(10 / Math.sqrt(team)));
            solSpeedVal.innerText = `${weeksPayback} ${weeksPayback === 1 ? 'Week' : 'Weeks'}`;
        }
    }

    if (solTeamSlider && solSalarySlider && solHoursSlider) {
        [solTeamSlider, solSalarySlider, solHoursSlider].forEach(slider => {
            slider.addEventListener('input', updateSolutionsROI);
        });
        updateSolutionsROI();
    }

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
        const emptyStateEl = document.getElementById('portfolioEmptyState');
        let visibleCount = 0;

        portfolioCardItems.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            const cardText = card.textContent.toLowerCase();
            const cardTags = card.getAttribute('data-tags') || '';

            const matchesCategory = (filterVal === 'all' || categories.includes(filterVal));
            const matchesSearch = !searchQuery || cardText.includes(searchQuery) || cardTags.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = (card.classList.contains('featured-build-card') || card.querySelector('.featured-build-card')) ? 'block' : 'flex';
                card.style.opacity = '1';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (emptyStateEl) {
            if (visibleCount === 0) {
                emptyStateEl.style.display = 'block';
            } else {
                emptyStateEl.style.display = 'none';
            }
        }
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

    // ==========================================
    // Dynamic Reusable Case Study Detail Modal Engine
    // ==========================================
    const archModalOverlay = document.getElementById('archModalOverlay');
    const archModalBody = document.getElementById('archModalBody');

    const projectSpecsData = {
        instaguard: {
            badge: 'SOCIAL & COMMERCE',
            title: 'INSTAGUARD 360 — Instagram & Shopify Agent',
            desc: 'Automated DM & comment handling engine connected directly to Shopify API. Resolves order status queries, checks live inventory, and distributes personalized discount codes 24/7.',
            visualHtml: `
                <div class="card-micro-ui" style="width:100%; height:100%; margin:0; border:none; background:transparent;">
                    <div class="ui-mockup-header"><span>@shop_luxe_ai • Instagram DM</span><span class="ui-pill-success">LIVE API</span></div>
                    <div class="ui-chat-bubble">Hi! Is Cyber Hoodie size M in stock?</div>
                    <div class="ui-chat-reply">⚡ 14 in stock! Code INSTA15 gets 15% off: shopluxe.ai/m</div>
                </div>
            `,
            metrics: [
                { val: '40k+', lbl: 'DMs / Month' },
                { val: '12s', lbl: 'Avg Response' },
                { val: '+38%', lbl: 'Conv Rate Lift' },
                { val: '99.4%', lbl: 'Order Accuracy' }
            ],
            workflow: ['Customer DM Inquiry', 'AI Intent Engine', 'Shopify API Check', 'Instant DM Reply', 'CRM Logged'],
            chips: ['Python', 'Meta Graph API', 'Shopify REST', 'OpenAI GPT-4o', 'Redis Cache'],
            specs: [
                { label: 'Neural Engine', val: 'OpenAI GPT-4o + Custom Fine-Tuned Prompt Pipeline' },
                { label: 'Primary Webhooks', val: 'Meta Graph API v19.0 (Instagram DMs & Comments)' },
                { label: 'Commerce Integration', val: 'Shopify Admin REST API + Webhooks (Live Stock & Orders)' },
                { label: 'Database & Caching', val: 'Redis Cloud Cache (Sub-5ms Session State)' },
                { label: 'Execution Speed', val: '12 Seconds Average Resolution Cycle' },
                { label: 'Security Protocols', val: 'HMAC Signature Verification & AES-256 Encryption' }
            ],
            impact: {
                before: [
                    'Manual IG DM replies taking 6+ hours',
                    'High abandoned cart rates on social inquiries',
                    'Zero inventory cross-checking available'
                ],
                after: [
                    'Instant 12-second automated responses 24/7',
                    '+38% increase in social checkout conversion',
                    'Real-time live Shopify inventory sync'
                ]
            },
            ctaUrl: 'contact.html?project=INSTAGUARD-360'
        },
        pipelinemax: {
            badge: 'SALES & CRM',
            title: 'PIPELINE-MAX — Enterprise B2B Lead Qualification Agent',
            desc: 'Autonomous BANT lead qualification system that evaluates web form submissions, enriches company profiles via Apollo REST API, and books qualified meetings into Salesforce.',
            visualHtml: `
                <div class="card-micro-ui" style="width:100%; height:100%; margin:0; border:none; background:transparent;">
                    <div class="ui-mockup-header"><span>SALESFORCE BANT EVALUATOR</span><span class="ui-pill-success">AUTO-PILOT</span></div>
                    <div class="ui-score-badge"><span style="font-family:var(--font-mono); font-size:0.75rem; font-weight:700;">TechCorp (250 Staff)</span><span style="font-family:var(--font-hud); font-size:0.9rem; font-weight:800; color:var(--brand-action);">98 / 100</span></div>
                    <div style="font-family:var(--font-mono); font-size:0.7rem; color:#475569;">✓ Budget & Decision Maker Verified • Demo Booked</div>
                </div>
            `,
            metrics: [
                { val: '98/100', lbl: 'Lead Fit Score' },
                { val: '14ms', lbl: 'Inference Latency' },
                { val: '10x', lbl: 'Booked Demos' },
                { val: '100%', lbl: 'Salesforce Sync' }
            ],
            workflow: ['Web Form Submission', 'Apollo Profile Enrichment', 'BANT AI Scoring (0-100)', 'Calendly Meeting Booking', 'Salesforce Opportunity Logged'],
            chips: ['Salesforce CRM', 'Apollo API', 'Calendly API', 'Node.js', 'OAuth 2.0'],
            specs: [
                { label: 'Core Classifier', val: 'BANT (Budget, Authority, Need, Timeline) Neural Scoring' },
                { label: 'Enrichment API', val: 'Apollo REST API + LinkedIn Company Scraper' },
                { label: 'CRM Synchronization', val: 'Salesforce Enterprise REST & Bulk API 2.0' },
                { label: 'Scheduling Engine', val: 'Calendly API v2 Webhook Handler' },
                { label: 'Execution Speed', val: '14ms Response & Scoring Latency' },
                { label: 'Security Protocols', val: 'OAuth 2.0 Mutual TLS & Enterprise Vault' }
            ],
            impact: {
                before: [
                    'Leads sitting untouched for 24+ hours',
                    'Unqualified leads wasting sales reps demo calls',
                    'Manual CRM data entry friction'
                ],
                after: [
                    'Sub-second instant lead enrichment & scoring',
                    '10x increase in qualified meetings booked',
                    '100% automated Salesforce profile logging'
                ]
            },
            ctaUrl: 'contact.html?project=PIPELINE-MAX'
        },
        supportrx: {
            badge: 'SUPPORT & CX',
            title: 'SUPPORTR-X — Fintech Omnichannel Support Pod',
            desc: 'Secure multi-lingual customer support agent equipped with Auth0 token validation, Stripe billing management, API key rotation, and Zendesk ticket routing.',
            visualHtml: `
                <div class="card-micro-ui" style="width:100%; height:100%; margin:0; border:none; background:transparent;">
                    <div class="ui-mockup-header"><span>AUTH0 & PINECONE VECTOR</span><span class="ui-pill-success">24/7 SUPPORT</span></div>
                    <div class="ui-chat-bubble">Need to rotate API token & upgrade plan</div>
                    <div class="ui-chat-reply">✓ Auth0 Verified • Token rotated & Zendesk #8492 resolved</div>
                </div>
            `,
            metrics: [
                { val: '98.9%', lbl: 'Resolution Rate' },
                { val: '1.8s', lbl: 'Ticket Closure' },
                { val: '24/7', lbl: 'Availability' },
                { val: '5.0 CSAT', lbl: 'Customer Rating' }
            ],
            workflow: ['Customer Ticket Received', 'Auth0 Token Verification', 'Pinecone RAG Vector Lookup', 'Stripe API Execution', 'Zendesk Resolution'],
            chips: ['Auth0', 'Stripe SDK', 'Twilio API', 'Pinecone Vector', 'Zendesk REST'],
            specs: [
                { label: 'Vector Knowledge Base', val: 'Pinecone Vector DB + OpenAI Embeddings' },
                { label: 'Identity Provider', val: 'Auth0 JWT Bearer Token Validation' },
                { label: 'Billing System', val: 'Stripe API (Invoice Lookup, Refunds & Key Rotation)' },
                { label: 'Ticket Routing', val: 'Zendesk REST API & Auto-Tagging Engine' },
                { label: 'Execution Speed', val: '1.8 Seconds Ticket Closure' },
                { label: 'Security Protocols', val: 'SOC2 Type II Compliant & PCI-DSS Shielded' }
            ],
            impact: {
                before: [
                    'High customer support queue backlog',
                    'Slow response times for billing & token queries',
                    'Overwhelmed tier-1 support representatives'
                ],
                after: [
                    '98.9% First Contact Resolution (FCR)',
                    '1.8-second average ticket resolution',
                    'Zero human intervention for routine actions'
                ]
            },
            ctaUrl: 'contact.html?project=SUPPORTR-X'
        },
        logiflow: {
            badge: 'OPERATIONS',
            title: 'LOGI-FLOW — Warehouse & Inventory Sync Agent',
            desc: 'Cron inventory reconciliation agent scanning 45,000 SKUs hourly across ERP databases, alerting low-stock anomalies to Slack channels, and generating automated POs.',
            visualHtml: `
                <div class="card-micro-ui" style="width:100%; height:100%; margin:0; border:none; background:transparent;">
                    <div class="ui-mockup-header"><span>ERP & SHOPIFY RECONCILIATION</span><span class="ui-pill-success">45,000 SKUs</span></div>
                    <table class="ui-table-grid"><tr><td>SKU-8842 (Sensor)</td><td style="color:#ef4444; font-weight:700;">4 Left</td></tr><tr><td>Action Taken</td><td style="color:#10b981; font-weight:700;">PO Sent + Slack Alert</td></tr></table>
                </div>
            `,
            metrics: [
                { val: '45,000', lbl: 'SKUs Monitored' },
                { val: '100%', lbl: 'System Uptime' },
                { val: '850', lbl: 'Auto POs / Day' },
                { val: '0', lbl: 'Stockout Anomalies' }
            ],
            workflow: ['Hourly Batch Scan', 'PostgreSQL Query', 'Threshold Check', 'Slack Channel Push', 'Automated PO Dispatch'],
            chips: ['Python Celery', 'PostgreSQL', 'Slack API', 'Shopify Admin', 'Redis Queue'],
            specs: [
                { label: 'Background Worker', val: 'Python Celery + Redis Task Queue' },
                { label: 'Database Layer', val: 'PostgreSQL Relational DB (45,000 SKUs)' },
                { label: 'Alerting Channel', val: 'Slack Bot Webhooks & WhatsApp Admin Push' },
                { label: 'PO Engine', val: 'Automated ERP Purchase Order Dispatcher' },
                { label: 'Execution Speed', val: 'Hourly Batch Cron & Real-Time Stream' },
                { label: 'Security Protocols', val: 'Internal VPN Tunnel & Encrypted DB Connections' }
            ],
            impact: {
                before: [
                    'Frequent unexpected warehouse stockouts',
                    'Manual inventory counting across 4 locations',
                    'Delayed purchase order issuance'
                ],
                after: [
                    '100% real-time inventory accuracy',
                    '850 automated purchase orders daily',
                    'Instant Slack notifications for low-stock alerts'
                ]
            },
            ctaUrl: 'contact.html?project=LOGI-FLOW'
        },
        audiencegen: {
            badge: 'SOCIAL & SALES',
            title: 'AUDIENCE-GEN — Cold Outreach & Lead Scraper Agent',
            desc: 'Scrapes decision-maker prospects on LinkedIn & Apollo, validates deliverability via ZeroBounce API, and launches hyper-personalized 5-stage email sequences.',
            visualHtml: `
                <div class="card-micro-ui" style="width:100%; height:100%; margin:0; border:none; background:transparent;">
                    <div class="ui-mockup-header"><span>APOLLO & ZEROBOUNCE</span><span class="ui-pill-success">500 LEADS/DAY</span></div>
                    <table class="ui-table-grid"><tr><td>Alex V. (CTO @ ScaleAI)</td><td style="color:#10b981; font-weight:700;">Validated</td></tr><tr><td>5-Stage Email Cadence</td><td style="color:var(--brand-action); font-weight:700;">Stage 2 Sent</td></tr></table>
                </div>
            `,
            metrics: [
                { val: '500/day', lbl: 'Leads Scraped' },
                { val: '+34%', lbl: 'Reply Rate' },
                { val: '4.5x', lbl: 'Pipeline Lift' },
                { val: '99.8%', lbl: 'Deliverability' }
            ],
            workflow: ['Target Prospect Scrape', 'ZeroBounce Validation', 'LangChain Personalization', 'SendGrid Multi-SMTP Outreach', 'Meeting Booked'],
            chips: ['Apollo Scraper', 'ZeroBounce', 'SendGrid SDK', 'LangChain', 'GPT-4'],
            specs: [
                { label: 'Scraper & Data Pipeline', val: 'Apollo.io + Custom LinkedIn Prospect Extractor' },
                { label: 'Email Deliverability', val: 'ZeroBounce Real-Time API Validation' },
                { label: 'Outreach Engine', val: 'SendGrid Multi-Domain SMTP Relay' },
                { label: 'Personalization AI', val: 'LangChain + GPT-4 Contextual Synthesizer' },
                { label: 'Execution Speed', val: '500 High-Intent Leads Processed Daily' },
                { label: 'Security Protocols', val: 'DKIM, SPF, DMARC Authentication Shield' }
            ],
            impact: {
                before: [
                    'Low email open and response rates',
                    'High spam bounce rates damaging domain reputation',
                    'Hours spent manually researching prospects'
                ],
                after: [
                    '+34% response rate boost',
                    '99.8% verified deliverability rate',
                    '4.5x growth in qualified sales pipeline'
                ]
            },
            ctaUrl: 'contact.html?project=AUDIENCE-GEN'
        },
        whatsappflow: {
            badge: 'SOCIAL & COMMERCE',
            title: 'WHATSAPP-FLOW — WhatsApp Conversational Commerce Agent',
            desc: 'Interactive WhatsApp Cloud API bot performing product catalog searches, cart recovery alerts, automated payment link generation, and post-purchase updates.',
            visualHtml: `
                <div class="card-micro-ui" style="width:100%; height:100%; margin:0; border:none; background:transparent;">
                    <div class="ui-mockup-header"><span>WHATSAPP CLOUD API</span><span class="ui-pill-success">CART RECOVERY</span></div>
                    <div class="ui-chat-bubble">Can I complete order for Skincare Set?</div>
                    <div class="ui-chat-reply">💳 Order #W-4091 ready! Pay via Stripe: wa.pay/4091</div>
                </div>
            `,
            metrics: [
                { val: '15,000', lbl: 'Monthly Chats' },
                { val: '88%', lbl: 'Open Rate' },
                { val: '+25%', lbl: 'Cart Recovery' },
                { val: '< 1s', lbl: 'Message Delivery' }
            ],
            workflow: ['Customer WhatsApp Chat', 'Catalog Search', 'Cart Recovery Alert', 'Stripe Link Generation', 'Order Confirmed'],
            chips: ['WhatsApp API', 'Stripe SDK', 'MongoDB Atlas', 'FastAPI', 'Python'],
            specs: [
                { label: 'Messaging Provider', val: 'Meta WhatsApp Business Cloud API' },
                { label: 'Payment Gateway', val: 'Stripe & Razorpay Payment Link APIs' },
                { label: 'Session Storage', val: 'MongoDB Atlas NoSQL' },
                { label: 'Framework', val: 'FastAPI Python Async Server' },
                { label: 'Execution Speed', val: 'Sub-Second Message Delivery' },
                { label: 'Security Protocols', val: 'End-to-End Encrypted Message Payload' }
            ],
            impact: {
                before: [
                    'High cart abandonment on mobile web',
                    'Delayed manual response to customer inquiries',
                    'Friction in mobile checkout flows'
                ],
                after: [
                    '+25% cart recovery rate',
                    '88% message open rate on WhatsApp',
                    'Sub-second automated Stripe payment links'
                ]
            },
            ctaUrl: 'contact.html?project=WHATSAPP-FLOW'
        }
    };

    function renderCaseStudyModal(p) {
        if (!p || !archModalBody) return;

        const metricsHtml = p.metrics.map(m => `
            <div class="modal-metric-card">
                <span class="modal-metric-val">${m.val}</span>
                <span class="modal-metric-lbl">${m.lbl}</span>
            </div>
        `).join('');

        const workflowHtml = p.workflow.map((step, idx) => `
            <div class="modal-wf-node">${step}</div>
            ${idx < p.workflow.length - 1 ? '<span class="modal-wf-arrow">→</span>' : ''}
        `).join('');

        const chipsHtml = p.chips.map(chip => `
            <span class="modal-tech-pill">${chip}</span>
        `).join('');

        const specsHtml = p.specs.map(s => `
            <div class="modal-spec-card">
                <span class="modal-spec-label">${s.label}</span>
                <span class="modal-spec-val">${s.val}</span>
            </div>
        `).join('');

        const beforeList = p.impact.before.map(item => `<li>❌ ${item}</li>`).join('');
        const afterList = p.impact.after.map(item => `<li>⚡ ${item}</li>`).join('');

        archModalBody.innerHTML = `
            <!-- Header Row -->
            <div class="modal-header-row">
                <div>
                    <span class="modal-category-badge">[ ${p.badge} ]</span>
                    <h2 class="modal-main-title">${p.title}</h2>
                    <p class="modal-subtitle-text">${p.desc}</p>
                </div>
                <button class="modal-close-btn" id="closeCaseStudyModalBtn" aria-label="Close Case Study Viewer">✕</button>
            </div>

            <!-- Hero Visual Panel -->
            <div class="modal-hero-visual">
                ${p.visualHtml}
            </div>

            <!-- Key Results Metrics -->
            <div class="modal-metrics-grid">
                ${metricsHtml}
            </div>

            <!-- How The Agent Works (Workflow) -->
            <div class="modal-workflow-box">
                <div class="modal-section-title">⚡ How The Agent Works (Automation Pipeline)</div>
                <div class="modal-workflow-steps">
                    ${workflowHtml}
                </div>
            </div>

            <!-- Integrations & Technology -->
            <div class="modal-integrations-box">
                <div class="modal-section-title">🛠️ Integrations & Technology</div>
                <div class="modal-chips-flex">
                    ${chipsHtml}
                </div>
            </div>

            <!-- Telemetry Specifications -->
            <div class="modal-specs-box">
                <div class="modal-section-title">📊 System Telemetry & Architecture Specs</div>
                <div class="modal-specs-grid">
                    ${specsHtml}
                </div>
            </div>

            <!-- Business Impact Comparison -->
            <div class="modal-impact-box">
                <div class="modal-section-title">📈 Business Impact Comparison</div>
                <div class="modal-impact-grid">
                    <div class="modal-impact-card before">
                        <div class="impact-card-title">Before AI Automation</div>
                        <ul class="impact-list">${beforeList}</ul>
                    </div>
                    <div class="modal-impact-card after">
                        <div class="impact-card-title">After AI Agent Deployment</div>
                        <ul class="impact-list">${afterList}</ul>
                    </div>
                </div>
            </div>

            <!-- Bottom CTA Bar -->
            <div class="modal-cta-row">
                <div>
                    <h4 style="font-size:1rem; font-weight:800; color:var(--brand-text); margin-bottom:4px;">Want an AI Agent like this for your business?</h4>
                    <p style="font-size:0.82rem; color:#64748b;">We design and deploy custom neural workflows in days.</p>
                </div>
                <div style="display:flex; gap:12px; align-items:center;">
                    <a href="${p.ctaUrl}" class="btn btn-primary btn-glow btn-sm">
                        Build Something Similar →
                    </a>
                    <button class="btn btn-secondary btn-sm" id="closeCaseStudyModalFooterBtn">
                        Close
                    </button>
                </div>
            </div>
        `;

        const btnHeader = document.getElementById('closeCaseStudyModalBtn');
        const btnFooter = document.getElementById('closeCaseStudyModalFooterBtn');

        if (btnHeader) btnHeader.addEventListener('click', closeCaseStudyModal);
        if (btnFooter) btnFooter.addEventListener('click', closeCaseStudyModal);
    }

    function openCaseStudyModal(projKey) {
        const p = projectSpecsData[projKey] || projectSpecsData['instaguard'];
        if (p && archModalOverlay) {
            renderCaseStudyModal(p);
            archModalOverlay.classList.add('active');
            archModalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCaseStudyModal() {
        if (!archModalOverlay) return;
        archModalOverlay.classList.remove('active');
        setTimeout(() => {
            archModalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 200);
    }

    document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('.open-arch-modal');
        if (openBtn) {
            e.preventDefault();
            const projKey = openBtn.getAttribute('data-project');
            openCaseStudyModal(projKey);
        }
    });

    if (archModalOverlay) {
        archModalOverlay.addEventListener('click', (e) => {
            if (e.target === archModalOverlay) {
                closeCaseStudyModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && archModalOverlay && archModalOverlay.classList.contains('active')) {
            closeCaseStudyModal();
        }
    });

    // ==========================================
    // Case Studies Page Category Filtering
    // ==========================================
    const csFilterBtns = document.querySelectorAll('.cs-filter-btn');
    const csCards = document.querySelectorAll('.case-study-card');

    if (csFilterBtns.length > 0 && csCards.length > 0) {
        csFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                csFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (typeof playCyberClick === 'function') {
                    playCyberClick();
                }

                const filterVal = btn.getAttribute('data-filter') || 'all';

                csCards.forEach(card => {
                    const categories = (card.getAttribute('data-category') || '').toLowerCase();
                    if (filterVal === 'all' || categories.includes(filterVal)) {
                        card.style.display = 'grid';
                        card.style.opacity = '1';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
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
        email: `Dear Alex,\n\nThank you for reaching out regarding our Neural AI Agent Pod upgrade. We have reviewed your account requirements and processed your priority ticket #8842.\n\nYour API key rate limits have been upgraded to 5,000 requests/min with sub-30ms guarantee.\n\nBest regards,\nFactonix Neural Support Team`,
        meeting: `Event: 🤖 Factonix Neural Pipeline Architecture Demo\nDate: Today at 3:30 PM - 4:00 PM EST\nAttendees: Alex Mercer (alex@acmecorp.com) & Tech Lead\nVideo Link: https://meet.google.com/xyz-agt-demo\nAgenda: 1. Neural Agent Overview 2. Guardrails Scan 3. Live CRM Integration`,
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

    // ==========================================
    // REALISTIC LIVE AUTOMATION WALKTHROUGH DEMO ENGINE
    // ==========================================
    function initInteractiveWalkthroughEngine() {
        const walkthroughContainers = document.querySelectorAll('.interactive-walkthrough-section');
        if (!walkthroughContainers.length) return;

        walkthroughContainers.forEach(container => {
            const viewport = container.querySelector('.walkthrough-viewport');
            const stage = container.querySelector('.canvas-stage');
            const callout = container.querySelector('.wf-callout-tooltip');
            const calloutTag = container.querySelector('#calloutStepTag');
            const calloutText = container.querySelector('#calloutText');
            const playBtn = container.querySelector('#demoPlayBtn');
            const playBtnText = container.querySelector('#playBtnText');
            const playIcon = container.querySelector('#playIcon');
            const pauseIcon = container.querySelector('#pauseIcon');
            const prevBtn = container.querySelector('#demoPrevBtn');
            const nextBtn = container.querySelector('#demoNextBtn');
            const resetBtn = container.querySelector('#resetCameraBtn');
            const segmentsTrack = container.querySelector('#timelineSegmentsTrack');
            const stepIndicator = container.querySelector('#demoStepIndicator');

            if (!viewport || !stage) return;

            let currentTabKey = 'crm';
            let currentStep = 0; // 0 = Full Overview, 1-5 = Focused Nodes
            let isAutoPlaying = false;
            let autoPlayTimer = null;

            const nodeCenters = {
                1: { id: 'node-agent', x: 190, y: 212 },
                2: { id: 'node-router', x: 430, y: 220 },
                3: { id: 'node-slack', x: 740, y: 110 },
                4: { id: 'node-gmail', x: 740, y: 330 },
                5: { id: 'node-search', x: 470, y: 430 }
            };

            const tabBlueprints = {
                crm: {
                    title: 'CRM Automation — Inbound Lead Engine & Dispatch',
                    nodes: {
                        1: { name: 'Make AI Agent <span class="badge-mini">inbound</span>', sub: 'Run Lead Triage Agent' },
                        2: { name: 'Router <span class="badge-num">Score > 80</span>', sub: 'ICP Lead Triage' },
                        3: { name: 'Slack <span class="badge-num">hot-deals</span>', sub: 'Instant Sales Alert' },
                        4: { name: 'Gmail <span class="badge-num">welcome-seq</span>', sub: 'Send Intro Email' },
                        5: { name: 'AI Web Search <span class="badge-num">clearbit</span>', sub: 'Company RAG Intel' }
                    },
                    steps: [
                        { step: 0, tag: 'BLUEPRINT OVERVIEW // CRM AUTOMATION', text: 'Full end-to-end CRM automation blueprint. Inbound lead capture ➔ AI enrichment ➔ Triage router ➔ Instant Slack & Gmail dispatch.' },
                        { step: 1, tag: 'STEP 1 // INBOUND LEAD AGENT', text: 'Captures inbound web forms, calls, and chat inquiries in real-time, ingesting lead metadata.' },
                        { step: 2, tag: 'STEP 2 // NEURAL ICP TRIAGE ROUTER', text: 'Evaluates lead fit score against ICP metrics. Routes deals >= 80 to high-priority sales tracks.' },
                        { step: 3, tag: 'STEP 3 // REAL-TIME SLACK DISPATCH', text: 'Instantly alerts key account executives in #hot-leads with complete lead context & ICP score.' },
                        { step: 4, tag: 'STEP 4 // HYPER-PERSONALIZED EMAIL', text: 'Dispatches custom welcome email sequence and meeting booking link directly via Gmail.' },
                        { step: 5, tag: 'STEP 5 // DEEP DATA ENRICHMENT RAG', text: 'Executes web search & Clearbit lookup to enrich target company tech stack and executive roster.' }
                    ]
                },
                social: {
                    title: 'Social Media Automation — Autonomous Content Engine',
                    nodes: {
                        1: { name: 'Social AI Planner <span class="badge-mini">viral</span>', sub: 'Trend & Prompt Engine' },
                        2: { name: 'Router <span class="badge-num">Quality > 90</span>', sub: 'Brand & Safety Gate' },
                        3: { name: 'LinkedIn / X <span class="badge-num">social-post</span>', sub: 'Auto Post & Schedule' },
                        4: { name: 'Visual AI <span class="badge-num">DALL-E 3</span>', sub: 'Generate Banner Assets' },
                        5: { name: 'Social Listener <span class="badge-num">24/7</span>', sub: 'Monitor Brand Mentions' }
                    },
                    steps: [
                        { step: 0, tag: 'BLUEPRINT OVERVIEW // SOCIAL MEDIA ENGINE', text: 'Autonomous social media pipeline. Scans trends ➔ Generates copy & graphics ➔ Quality router ➔ Multi-platform scheduling.' },
                        { step: 1, tag: 'STEP 1 // SOCIAL AI PLANNER', text: 'Generates high-engagement social posts, carousel scripts, and hashtags based on tech trends.' },
                        { step: 2, tag: 'STEP 2 // BRAND & SAFETY ROUTER', text: 'Verifies post tone, compliance guardrails, and quality score before publishing.' },
                        { step: 3, tag: 'STEP 3 // MULTI-PLATFORM DISPATCH', text: 'Schedules and posts approved copy across LinkedIn, Twitter/X, and Instagram.' },
                        { step: 4, tag: 'STEP 4 // VISUAL ASSET GENERATION', text: 'Creates futuristic 3D visual banners and graphics matching post context.' },
                        { step: 5, tag: 'STEP 5 // 24/7 SOCIAL LISTENING', text: 'Monitors brand mentions, competitor posts, and industry keywords in real time.' }
                    ]
                },
                ecom: {
                    title: 'E-commerce Automation — Abandoned Cart & Recovery',
                    nodes: {
                        1: { name: 'Cart Recovery Agent <span class="badge-mini">checkout</span>', sub: 'Real-time Cart Tracker' },
                        2: { name: 'Router <span class="badge-num">CLV Filter</span>', sub: 'VIP vs Standard Recovery' },
                        3: { name: 'WhatsApp <span class="badge-num">instant-coupon</span>', sub: 'Send Dynamic Promo' },
                        4: { name: 'Email Recovery <span class="badge-num">abandoned-series</span>', sub: '3-Touch Email Sequence' },
                        5: { name: 'Price Optimizer <span class="badge-num">margin-ai</span>', sub: 'Calculate Discount %' }
                    },
                    steps: [
                        { step: 0, tag: 'BLUEPRINT OVERVIEW // E-COMMERCE RECOVERY', text: 'Cart recovery workflow. Detects cart abandonment ➔ Calculates optimal discount ➔ WhatsApp & Email omnichannel engagement.' },
                        { step: 1, tag: 'STEP 1 // CART RECOVERY AGENT', text: 'Detects abandoned checkouts on Shopify/WooCommerce within 60 seconds of inactivity.' },
                        { step: 2, tag: 'STEP 2 // VIP SEGMENT ROUTER', text: 'Evaluates customer lifetime value (CLV) to determine personalized recovery incentive.' },
                        { step: 3, tag: 'STEP 3 // WHATSAPP PROMO DISPATCH', text: 'Sends conversational WhatsApp message with one-click checkout coupon link.' },
                        { step: 4, tag: 'STEP 4 // OMNICHANNEL EMAIL SERIES', text: 'Fires automated 3-touch follow-up emails highlighting saved cart items.' },
                        { step: 5, tag: 'STEP 5 // DYNAMIC MARGIN CALCULATOR', text: 'Computes product profit margins to customize discount offer without eroding margin.' }
                    ]
                },
                b2b: {
                    title: 'B2B Sales Automation — Outbound Account Intelligence',
                    nodes: {
                        1: { name: 'SDR AI Agent <span class="badge-mini">intent</span>', sub: 'Outbound Signal Collector' },
                        2: { name: 'Router <span class="badge-num">Tier-1 Account</span>', sub: 'Enterprise Filter Gate' },
                        3: { name: 'Sales Rep Alert <span class="badge-num">Slack SDR</span>', sub: 'Handoff to Account Exec' },
                        4: { name: 'Cold Outreach <span class="badge-num">sequence-3</span>', sub: 'Personalized Email Flow' },
                        5: { name: 'Executive Intel <span class="badge-num">sec-10k</span>', sub: 'Financial & News Scraper' }
                    },
                    steps: [
                        { step: 0, tag: 'BLUEPRINT OVERVIEW // B2B OUTBOUND SALES', text: 'Enterprise B2B outreach pipeline. Detects account intent ➔ Scrapes executive news ➔ Tier-1 router ➔ Sales rep handoff.' },
                        { step: 1, tag: 'STEP 1 // OUTBOUND INTENT AGENT', text: 'Captures target account intent signals, job hirings, and tech stack additions.' },
                        { step: 2, tag: 'STEP 2 // ENTERPRISE TIER ROUTER', text: 'Filters Tier-1 enterprise target accounts for high-touch human sales handoffs.' },
                        { step: 3, tag: 'STEP 3 // ACCOUNT EXEC HANDOFF', text: 'Creates CRM deal task and notifies designated Account Executive in Slack.' },
                        { step: 4, tag: 'STEP 4 // PERSONALIZED OUTREACH', text: 'Launches multi-channel email outreach referencing recent company news and pain points.' },
                        { step: 5, tag: 'STEP 5 // DEEP EXECUTIVE RESEARCH', text: 'Scrapes 10-K filings, press releases, and earnings calls for hyper-personalized messaging.' }
                    ]
                },
                education: {
                    title: 'Education Automation — AI Tutor & Student Onboarding',
                    nodes: {
                        1: { name: 'AI Tutor Agent <span class="badge-mini">24/7 student</span>', sub: 'Inquiry & Support Handler' },
                        2: { name: 'Router <span class="badge-num">Triage Filter</span>', sub: 'AI Answer vs Mentor Escalate' },
                        3: { name: 'Mentor Channel <span class="badge-num">slack-tutor</span>', sub: 'Escalate Complex Query' },
                        4: { name: 'Student Portal <span class="badge-num">weekly-summary</span>', sub: 'Progress Report Email' },
                        5: { name: 'Curriculum RAG <span class="badge-num">vector-db</span>', sub: 'Search Course Knowledge' }
                    },
                    steps: [
                        { step: 0, tag: 'BLUEPRINT OVERVIEW // EDUCATION AUTOMATION', text: 'Smart student support pipeline. Ingests questions ➔ Queries course RAG ➔ AI tutor answers ➔ Escalates edge cases to mentors.' },
                        { step: 1, tag: 'STEP 1 // AI TUTOR AGENT', text: 'Answers student course questions 24/7 across portal chat and messaging apps.' },
                        { step: 2, tag: 'STEP 2 // SUPPORT TRIAGE ROUTER', text: 'Determines if question can be answered by RAG knowledge or requires faculty review.' },
                        { step: 3, tag: 'STEP 3 // FACULTY MENTOR ESCALATION', text: 'Alerts course TA or professor in Slack when student requires detailed human guidance.' },
                        { step: 4, tag: 'STEP 4 // WEEKLY PROGRESS EMAIL', text: 'Generates weekly learning analytics summary and study recommendations for students.' },
                        { step: 5, tag: 'STEP 5 // CURRICULUM VECTOR RAG', text: 'Searches high-dimensional course textbooks, syllabus PDFs, and lecture transcripts.' }
                    ]
                }
            };

            function updateBlueprintUI(tabKey) {
                currentTabKey = tabKey;
                const blueprint = tabBlueprints[tabKey] || tabBlueprints.crm;

                // Update Workflow Theme Accent Class
                container.classList.remove('wf-theme-crm', 'wf-theme-social', 'wf-theme-ecom', 'wf-theme-b2b', 'wf-theme-education');
                container.classList.add(`wf-theme-${tabKey}`);

                // Update Demo Title Text
                const titleText = container.querySelector('#demoTitleText');
                if (titleText) titleText.textContent = blueprint.title;

                // Update Nodes
                Object.keys(blueprint.nodes).forEach(stepNum => {
                    const nodeData = blueprint.nodes[stepNum];
                    const nodeEl = container.querySelector(`.wf-node[data-step="${stepNum}"]`);
                    if (nodeEl) {
                        const nameEl = nodeEl.querySelector('.node-name');
                        const subEl = nodeEl.querySelector('.node-sub');
                        if (nameEl && nodeData.name) nameEl.innerHTML = nodeData.name;
                        if (subEl && nodeData.sub) subEl.textContent = nodeData.sub;
                    }
                });

                renderTimelineSegments();
            }

            function renderTimelineSegments() {
                if (!segmentsTrack) return;
                segmentsTrack.innerHTML = '';

                // Overview Pill (Step 0)
                const ovPill = document.createElement('div');
                ovPill.className = `timeline-segment-pill ${currentStep === 0 ? 'active' : 'completed'}`;
                ovPill.title = 'Full Workflow Overview';
                ovPill.innerHTML = '<div class="timeline-segment-fill"></div>';
                ovPill.addEventListener('click', () => {
                    stopAutoPlay();
                    goToStep(0);
                });
                segmentsTrack.appendChild(ovPill);

                // Step Pills 1-5
                for (let i = 1; i <= 5; i++) {
                    const pill = document.createElement('div');
                    pill.className = `timeline-segment-pill ${i === currentStep ? 'active' : (i < currentStep ? 'completed' : '')}`;
                    pill.title = `Step ${i}`;
                    pill.innerHTML = '<div class="timeline-segment-fill"></div>';
                    pill.addEventListener('click', () => {
                        stopAutoPlay();
                        goToStep(i);
                    });
                    segmentsTrack.appendChild(pill);
                }
            }

            function goToStep(stepIndex) {
                currentStep = stepIndex;

                const blueprint = tabBlueprints[currentTabKey] || tabBlueprints.crm;
                const allNodes = stage.querySelectorAll('.wf-node');

                // Canvas viewport dimension bounds
                const vWidth = viewport.clientWidth || 1000;
                const vHeight = viewport.clientHeight || 520;

                if (currentStep === 0) {
                    // Full Workflow Overview
                    viewport.classList.remove('wf-canvas-dimmed');
                    allNodes.forEach(n => n.classList.remove('active-focus'));

                    // Scale stage to fit overview nicely
                    const scaleX = vWidth / 1000;
                    const scaleY = vHeight / 520;
                    const fitScale = Math.min(scaleX, scaleY) * 0.92;
                    const transX = (vWidth - 1000 * fitScale) / 2;
                    const transY = (vHeight - 520 * fitScale) / 2;

                    stage.style.transform = `translate(${transX}px, ${transY}px) scale(${fitScale})`;

                    const overviewInfo = blueprint.steps.find(s => s.step === 0);
                    if (overviewInfo && callout) {
                        if (calloutTag) calloutTag.textContent = overviewInfo.tag;
                        if (calloutText) calloutText.textContent = overviewInfo.text;
                        // Position callout at top center
                        callout.className = 'wf-callout-tooltip arrow-top';
                        callout.style.left = `${1000 / 2 - 160}px`;
                        callout.style.top = `30px`;
                        callout.classList.remove('hidden');
                    }

                    if (stepIndicator) stepIndicator.textContent = 'Full Overview';
                    renderTimelineSegments();

                    if (typeof playCyberBeep === 'function') playCyberBeep(600, 0.03);
                    return;
                }

                // Focused Node Mode
                viewport.classList.add('wf-canvas-dimmed');
                allNodes.forEach(node => {
                    const nStep = parseInt(node.getAttribute('data-step'));
                    if (nStep === currentStep) {
                        node.classList.add('active-focus');
                    } else {
                        node.classList.remove('active-focus');
                    }
                });

                const centerData = nodeCenters[currentStep];
                if (!centerData) return;

                const targetNode = container.querySelector(`.wf-node[data-step="${currentStep}"]`);
                let nodeX = centerData.x;
                let nodeY = centerData.y;

                if (targetNode) {
                    nodeX = targetNode.offsetLeft + targetNode.offsetWidth / 2;
                    nodeY = targetNode.offsetTop + targetNode.offsetHeight / 2;
                }

                const zoomLevel = 1.32;
                const transX = vWidth / 2 - nodeX * zoomLevel;
                const transY = vHeight / 2 - nodeY * zoomLevel;

                stage.style.transform = `translate(${transX}px, ${transY}px) scale(${zoomLevel})`;

                // Update Callout Tooltip
                const stepInfo = blueprint.steps.find(s => s.step === currentStep);
                if (stepInfo && callout) {
                    if (calloutTag) calloutTag.textContent = stepInfo.tag;
                    if (calloutText) calloutText.textContent = stepInfo.text;

                    positionCallout(nodeX, nodeY);
                }

                if (stepIndicator) stepIndicator.textContent = `Step ${currentStep} of 5`;
                renderTimelineSegments();

                if (typeof playCyberBeep === 'function') playCyberBeep(650 + currentStep * 70, 0.03);
            }

            function positionCallout(nodeX, nodeY) {
                if (!callout) return;
                callout.classList.remove('hidden');

                // Dynamic pointer arrow positioning around active node
                if (nodeY > 330) {
                    // Position above node (arrow pointing down)
                    callout.className = 'wf-callout-tooltip arrow-top';
                    callout.style.left = `${nodeX - 160}px`;
                    callout.style.top = `${nodeY - 145}px`;
                } else if (nodeX > 620) {
                    // Position to the left of node (arrow pointing right)
                    callout.className = 'wf-callout-tooltip arrow-left';
                    callout.style.left = `${nodeX - 350}px`;
                    callout.style.top = `${nodeY - 45}px`;
                } else if (nodeY < 150) {
                    // Position below node (arrow pointing up)
                    callout.className = 'wf-callout-tooltip arrow-bottom';
                    callout.style.left = `${nodeX - 160}px`;
                    callout.style.top = `${nodeY + 55}px`;
                } else {
                    // Position to the right of node (arrow pointing left)
                    callout.className = 'wf-callout-tooltip arrow-right';
                    callout.style.left = `${nodeX + 160}px`;
                    callout.style.top = `${nodeY - 45}px`;
                }
            }

            function nextStep() {
                let nextS = currentStep + 1;
                if (nextS > 5) nextS = 0;
                goToStep(nextS);
            }

            function prevStep() {
                let prevS = currentStep - 1;
                if (prevS < 0) prevS = 5;
                goToStep(prevS);
            }

            function startAutoPlay() {
                if (isAutoPlaying) return;
                isAutoPlaying = true;
                if (playBtnText) playBtnText.textContent = 'Pause Demo';
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'inline-block';

                autoPlayTimer = setInterval(() => {
                    nextStep();
                }, 3500);
            }

            function stopAutoPlay() {
                if (!isAutoPlaying) return;
                isAutoPlaying = false;
                if (autoPlayTimer) clearInterval(autoPlayTimer);
                autoPlayTimer = null;
                if (playBtnText) playBtnText.textContent = 'Play Demo';
                if (playIcon) playIcon.style.display = 'inline-block';
                if (pauseIcon) pauseIcon.style.display = 'none';
            }

            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    if (isAutoPlaying) stopAutoPlay();
                    else startAutoPlay();
                    if (typeof playCyberClick === 'function') playCyberClick();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    stopAutoPlay();
                    nextStep();
                    if (typeof playCyberClick === 'function') playCyberClick();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    stopAutoPlay();
                    prevStep();
                    if (typeof playCyberClick === 'function') playCyberClick();
                });
            }

            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    stopAutoPlay();
                    goToStep(0);
                    if (typeof playCyberClick === 'function') playCyberClick();
                });
            }

            // Bind Direct Node Clicks
            const allNodes = stage.querySelectorAll('.wf-node');
            allNodes.forEach(node => {
                node.addEventListener('click', () => {
                    stopAutoPlay();
                    const step = parseInt(node.getAttribute('data-step'));
                    if (step !== undefined && !isNaN(step)) goToStep(step);
                    if (typeof playCyberClick === 'function') playCyberClick();
                });
            });

            // Bind Studio Navigation Tabs (Restart animation & auto-play on tab switch)
            const tabButtons = document.querySelectorAll('.studio-tab-btn');
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabKey = btn.getAttribute('data-tab');
                    if (tabKey && tabBlueprints[tabKey]) {
                        tabButtons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');

                        // Switch Tab Pane on Studio Page if applicable
                        const panes = document.querySelectorAll('.studio-tab-pane');
                        panes.forEach(pane => {
                            if (pane.id === `pane-${tabKey}`) pane.classList.add('active');
                            else pane.classList.remove('active');
                        });

                        // Stop previous timer, update blueprint, reset overview step
                        stopAutoPlay();
                        updateBlueprintUI(tabKey);
                        goToStep(0);

                        // Restart SVG flow pulse animations
                        const motionAnims = stage.querySelectorAll('animateMotion');
                        motionAnims.forEach(anim => {
                            try {
                                if (typeof anim.beginElement === 'function') {
                                    anim.beginElement();
                                }
                            } catch (e) {}
                        });

                        if (typeof playCyberClick === 'function') playCyberClick();

                        // Automatically restart auto-play demo walkthrough for the new tab
                        setTimeout(() => {
                            startAutoPlay();
                        }, 500);
                    }
                });
            });

            // Bind Step Cards on Page to Viewport Camera
            const stepCards = document.querySelectorAll('.numbered-step-card, .how-node-card');
            stepCards.forEach((card, idx) => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    const stepNum = (idx % 5) + 1;
                    viewport.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    stopAutoPlay();
                    goToStep(stepNum);
                });
            });

            // Initial load
            updateBlueprintUI('crm');
            setTimeout(() => {
                goToStep(0);
            }, 300);
        });
    }

    initInteractiveWalkthroughEngine();

    // ==========================================
    // Solution Cards Workflow Animation Controller
    // ==========================================
    function initSolutionWorkflows() {
        const cards = document.querySelectorAll('.biz-sol-card');
        if (!cards.length) return;

        let autoCardIndex = 0;
        let autoTimer = null;
        let isHoveringAnyCard = false;
        let activeInterval = null;

        function animateSequence(card, callback) {
            if (activeInterval) {
                clearInterval(activeInterval);
                activeInterval = null;
            }
            const elements = card.querySelectorAll('.sol-wf-step, .sol-wf-arrow');
            if (!elements.length) {
                if (callback) callback();
                return;
            }

            elements.forEach(el => el.classList.remove('wf-active', 'wf-completed'));

            let idx = 0;
            activeInterval = setInterval(() => {
                if (idx < elements.length) {
                    elements[idx].classList.add('wf-active');
                    idx++;
                } else {
                    clearInterval(activeInterval);
                    activeInterval = null;
                    setTimeout(() => {
                        elements.forEach(el => el.classList.remove('wf-active', 'wf-completed'));
                        if (callback) callback();
                    }, 800);
                }
            }, 180);
        }

        function cycleAutoAnimation() {
            if (isHoveringAnyCard) return;
            const targetCard = cards[autoCardIndex];
            animateSequence(targetCard, () => {
                autoCardIndex = (autoCardIndex + 1) % cards.length;
                autoTimer = setTimeout(cycleAutoAnimation, 4000);
            });
        }

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                isHoveringAnyCard = true;
                if (autoTimer) clearTimeout(autoTimer);
                cards.forEach(c => {
                    c.querySelectorAll('.sol-wf-step, .sol-wf-arrow').forEach(el => el.classList.remove('wf-active', 'wf-completed'));
                });
                animateSequence(card);
            });

            card.addEventListener('mouseleave', () => {
                isHoveringAnyCard = false;
                card.querySelectorAll('.sol-wf-step, .sol-wf-arrow').forEach(el => el.classList.remove('wf-active', 'wf-completed'));
                if (autoTimer) clearTimeout(autoTimer);
                autoTimer = setTimeout(cycleAutoAnimation, 4000);
            });
        });

        autoTimer = setTimeout(cycleAutoAnimation, 3000);
    }

    initSolutionWorkflows();

    // ==========================================
    // REALISTIC HERO DEMO SCENARIO ENGINE
    // ==========================================
    const heroPromptChips = document.querySelectorAll('.prompt-chip');
    const heroUserText = document.getElementById('heroUserText');
    const heroAiText = document.getElementById('heroAiText');
    const heroActionTags = document.getElementById('heroActionTags');
    const heroChannelBadge = document.getElementById('heroChannelBadge');

    const heroScenarios = {
        ecommerce: {
            badge: 'WhatsApp AI',
            user: 'Hi! Do you have custom pricing for e-commerce stores? Can your AI handle WhatsApp orders automatically?',
            ai: 'Yes! 🛍️ I monitor your WhatsApp 24/7, answer product queries, send direct checkout links, and automatically log orders into Shopify & CRM.',
            tags: ['⚡ Stock Checked: 48 units', '📊 Synced to CRM', '💳 Stripe Payment Generated']
        },
        leadgen: {
            badge: 'Lead Qualification AI',
            user: 'Loved your reel on AI workflow automation! Can I get a pricing quote & qualification for my 15-person agency team?',
            ai: 'Thanks! 🎯 For a 15-person team, our Custom Lead Qualification AI Agent reduces manual intake tasks by ~60 hrs/week ($2,700 monthly savings). Would you like to schedule a 15-min live demo call for tomorrow?',
            tags: ['⚡ Lead Score: 98/100 (High Fit)', '📊 Saved to HubSpot CRM', '📅 Calendly Slot Reserved']
        },
        support: {
            badge: '24/7 Support AI',
            user: 'Where is my order #78921? It hasn\'t arrived yet.',
            ai: 'Hi Sarah! 💬 Order #78921 is out for delivery today via FedEx (Tracking #FX-99281). Expected arrival: Before 5:00 PM today!',
            tags: ['⚡ Queried FedEx API', 'STATUS: Out for Delivery', '📩 SMS Alert Sent']
        },
        booking: {
            badge: 'Sales Booking AI',
            user: 'Can I schedule a 15-minute demo with your AI engineering team for tomorrow afternoon?',
            ai: 'Awesome! 📅 I have open slots tomorrow at 2:00 PM and 4:30 PM EST. Which time works best for you?',
            tags: ['⚡ Google Calendar Synced', '📊 Lead Score: 98/100', '✉️ Invite Sent']
        }
    };

    function switchHeroScenario(key, clickedEl) {
        const scenario = heroScenarios[key];
        if (!scenario) return;

        // Update active class on chips
        if (heroPromptChips.length > 0) {
            heroPromptChips.forEach(c => c.classList.remove('active', 'chip-clicked-pulse'));
        }
        if (clickedEl) {
            clickedEl.classList.add('active', 'chip-clicked-pulse');
            setTimeout(() => clickedEl.classList.remove('chip-clicked-pulse'), 450);
        }

        // Play click audio feedback if available
        if (typeof playCyberClick === 'function') playCyberClick();

        if (heroUserText && heroAiText) {
            heroUserText.style.transition = 'opacity 0.15s ease';
            heroAiText.style.transition = 'opacity 0.15s ease';
            heroUserText.style.opacity = '0';
            heroAiText.style.opacity = '0';

            setTimeout(() => {
                if (heroChannelBadge) {
                    heroChannelBadge.textContent = scenario.badge;
                }
                heroUserText.textContent = scenario.user;
                heroAiText.innerHTML = `<em>🤖 Factonix AI Agent is thinking & executing API tools...</em>`;

                if (heroActionTags) {
                    heroActionTags.innerHTML = `<span class="action-tag">⚡ Processing scenario intent...</span>`;
                }

                heroUserText.style.opacity = '1';
                heroAiText.style.opacity = '1';

                // Display final response after simulated neural processing
                setTimeout(() => {
                    heroAiText.style.opacity = '0';
                    setTimeout(() => {
                        heroAiText.textContent = scenario.ai;
                        if (heroActionTags) {
                            heroActionTags.innerHTML = scenario.tags.map((t, i) => `<span class="action-tag" style="animation: fadeInUp 0.3s ease forwards ${i * 0.08}s">${t}</span>`).join('');
                        }
                        heroAiText.style.opacity = '1';
                    }, 150);
                }, 350);
            }, 150);
        }
    }

    if (heroPromptChips.length > 0) {
        heroPromptChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetBtn = e.target.closest('.prompt-chip');
                if (!targetBtn) return;
                const key = targetBtn.getAttribute('data-scenario');
                switchHeroScenario(key, targetBtn);
            });
        });
    }

    // Global document event listener as fallback for hero prompt chips
    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.prompt-chip');
        if (targetBtn && targetBtn.hasAttribute('data-scenario')) {
            const key = targetBtn.getAttribute('data-scenario');
            switchHeroScenario(key, targetBtn);
        }
    });

    // ==========================================
    // REALISTIC WORKSPACE SIMULATOR ENGINE
    // ==========================================
    const simBtns = document.querySelectorAll('.realistic-sim-wrapper .sim-tab-btn');
    const simContainer = document.getElementById('simRealisticContainer');

    const simProfiles = {
        whatsapp: {
            title: '💬 WhatsApp Business Support AI',
            user: 'Hey, I placed an order yesterday but didn\'t get a tracking number. Can you help?',
            ai: 'Hi Alex! 👋 I found your order #WA-99201. Your package was dispatched this morning via DHL (Tracking: #DHL-881923). You can track it live here: dhl.com/track/881923',
            actions: [
                '⚡ Verified WhatsApp Number API',
                '📦 Fetched Shopify Logistics Data',
                '📩 Sent Tracking SMS'
            ]
        },
        instagram: {
            title: '📸 Instagram DM Lead Qualification AI',
            user: 'Hey! Saw your post on social media automation. How much does a custom AI agent cost for real estate leads?',
            ai: 'Hey there! 🏡 Our Real Estate AI Agent captures IG DMs, qualifies buyer budgets, collects phone numbers, and auto-assigns hot leads to your agents in 3 seconds!',
            actions: [
                '📸 Meta Instagram Graph API Active',
                '🎯 Lead Qualified: Real Estate Buyer',
                '📲 Pushed Alert to Salesforce'
            ]
        },
        voice: {
            title: '🎙️ Inbound Voice AI Telephony Assistant',
            user: '[Inbound Phone Call] "Hello, I\'d like to schedule a consultation for legal advice regarding property law."',
            ai: 'Voice AI: "Certainly! I can schedule you with our senior property lawyer. Are you free this Thursday at 10:00 AM or Friday at 2:30 PM?"',
            actions: [
                '🎙️ Real-Time Audio Transcription (12ms)',
                '📅 Synced Outlook Calendar',
                '📞 Call Summary Logged'
            ]
        },
        email: {
            title: '✉️ Email & CRM Co-Pilot',
            user: 'Subject: RFP Inquiry for Enterprise License - 250 Seats',
            ai: 'AI Draft: "Thank you for reaching out! Attached is our Enterprise Proposal PDF. Based on 250 seats, your estimated annual ROI is 420%. I have CC\'d our VP of Sales."',
            actions: [
                '✉️ Gmail API Triggered',
                '📊 Salesforce Opportunity Created ($45k)',
                '📄 PDF Brochure Generated'
            ]
        }
    };

    function renderRealisticSim(key) {
        if (!simContainer) return;
        const profile = simProfiles[key] || simProfiles.whatsapp;

        simContainer.innerHTML = `
            <div class="sim-chat-view">
                <div class="sim-channel-header">
                    <div class="sim-channel-title">
                        <span class="status-dot green-pulse"></span>
                        <span>${profile.title}</span>
                    </div>
                    <span class="action-tag">Autonomous Mode</span>
                </div>

                <div class="sim-messages-list" id="simMsgList">
                    <div class="sim-user-bubble">
                        <div class="msg-sender">Visitor / Prospect</div>
                        <div>${profile.user}</div>
                    </div>

                    <div class="sim-ai-bubble">
                        <div class="msg-sender">🤖 Factonix AI Agent</div>
                        <div>${profile.ai}</div>

                        <div class="sim-actions-grid">
                            ${profile.actions.map(a => `<div class="sim-action-card">${a}</div>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="sim-input-row">
                    <input type="text" class="sim-text-input" id="simUserPrompt" placeholder="Type a sample customer question (e.g. 'What are your working hours?')..." />
                    <button class="sim-send-btn" id="simSendBtn">Send ➔</button>
                </div>
            </div>
        `;

        const simInput = document.getElementById('simUserPrompt');
        const simSend = document.getElementById('simSendBtn');
        const msgList = document.getElementById('simMsgList');

        function handleCustomMsg() {
            if (!simInput || !simInput.value.trim() || !msgList) return;
            const text = simInput.value.trim();
            simInput.value = '';

            const userDiv = document.createElement('div');
            userDiv.className = 'sim-user-bubble';
            userDiv.innerHTML = `<div class="msg-sender">You</div><div>${text}</div>`;
            msgList.appendChild(userDiv);
            msgList.scrollTop = msgList.scrollHeight;

            const typingDiv = document.createElement('div');
            typingDiv.className = 'sim-ai-bubble';
            typingDiv.innerHTML = `<div class="msg-sender">🤖 Factonix AI Agent</div><div><em>AI Agent is thinking & executing API tools...</em></div>`;
            
            setTimeout(() => {
                msgList.appendChild(typingDiv);
                msgList.scrollTop = msgList.scrollHeight;
            }, 300);

            setTimeout(() => {
                typingDiv.innerHTML = `
                    <div class="msg-sender">🤖 Factonix AI Agent</div>
                    <div>Thanks for asking! Our custom AI agents adapt to your exact business rules, connect to your existing database, and reply instantly 24/7!</div>
                    <div class="sim-actions-grid">
                        <div class="sim-action-card">⚡ Custom Query Processed</div>
                        <div class="sim-action-card">📊 Synced to CRM</div>
                    </div>
                `;
                msgList.scrollTop = msgList.scrollHeight;
            }, 1200);
        }

        if (simSend && simInput) {
            simSend.addEventListener('click', handleCustomMsg);
            simInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleCustomMsg();
            });
        }
    }

    if (simBtns.length > 0) {
        simBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                simBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const key = btn.getAttribute('data-sim');
                renderRealisticSim(key);
            });
        });

        renderRealisticSim('whatsapp');
    }

    const sidePresetBtns = document.querySelectorAll('.side-preset-btn');
    if (sidePresetBtns.length > 0) {
        sidePresetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.getAttribute('data-preset');
                if (preset === 'tracking') {
                    const waBtn = document.querySelector('.sim-tab-btn[data-sim="whatsapp"]');
                    if (waBtn) waBtn.click();
                } else if (preset === 'lead') {
                    const instaBtn = document.querySelector('.sim-tab-btn[data-sim="instagram"]');
                    if (instaBtn) instaBtn.click();
                } else if (preset === 'call') {
                    const voiceBtn = document.querySelector('.sim-tab-btn[data-sim="voice"]');
                    if (voiceBtn) voiceBtn.click();
                }
            });
        });
    }
});


