/* ============================
   LEADZIO PORTFOLIO - SCRIPTS
   Premium Client Experience
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
    // Premium Effects (Client Wow)
    initPageLoader();
    initScrollProgress();
    initParticleCanvas();

    // Core functionality
    initNavbar();
    initTypingEffect();
    initCounterAnimation();
    initScrollReveal();
    initPortfolioFilter();
    initMobileMenu();

    // Surprise Elements
    initCustomCursor();
    initMagneticButtons();
    init3DTiltCards();
    initTextScramble();
    initClickRipples();
    initEasterEggs();
    initParallaxElements();
    initGlitchEffect();
    initConfettiOnAchievements();
    initSecretLogoClick();
    initSurpriseTooltips();
    initSmoothProjectHover();
});

/* ============================
   PAGE LOADER (First Impression)
   ============================ */
function initPageLoader() {
    const loader = document.getElementById('pageLoader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2200); // Sync with CSS animation
    });
}

/* ============================
   SCROLL PROGRESS BAR
   ============================ */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

/* ============================
   PARTICLE CANVAS (Premium Effect)
   ============================ */
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            if (mouse.x) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }

            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    // Draw connections
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

/* ============================
   SMOOTH PROJECT HOVER
   ============================ */
function initSmoothProjectHover() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}


/* ============================
   🎯 CUSTOM CURSOR
   ============================ */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor effects on hover
    document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('dot-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('dot-hover');
        });
    });
}

/* ============================
   🧲 MAGNETIC BUTTONS
   ============================ */
function initMagneticButtons() {
    document.querySelectorAll('.btn, .filter-btn, .nav-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================
   🎴 3D TILT CARDS
   ============================ */
function init3DTiltCards() {
    document.querySelectorAll('.project-card, .about-card, .service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(99, 102, 241, 0.3)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
        });
    });
}

/* ============================
   🔤 TEXT SCRAMBLE EFFECT
   ============================ */
function initTextScramble() {
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    document.querySelectorAll('.section-title, .project-content h3').forEach(el => {
        const originalText = el.textContent;

        el.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                el.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);
        });
    });
}

/* ============================
   💫 CLICK RIPPLES
   ============================ */
function initClickRipples() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        // Random color
        const colors = ['#6366f1', '#f472b6', '#22d3ee', '#10b981', '#f59e0b'];
        ripple.style.borderColor = colors[Math.floor(Math.random() * colors.length)];

        setTimeout(() => ripple.remove(), 1000);
    });
}

/* ============================
   🎮 EASTER EGGS
   ============================ */
function initEasterEggs() {
    // Konami Code: ↑↑↓↓←→←→BA
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activatePartyMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Triple click anywhere = emoji explosion
    let clickCount = 0;
    let clickTimer;

    document.addEventListener('click', (e) => {
        clickCount++;
        clearTimeout(clickTimer);

        if (clickCount === 3) {
            emojiExplosion(e.clientX, e.clientY);
            clickCount = 0;
        }

        clickTimer = setTimeout(() => clickCount = 0, 500);
    });
}

function activatePartyMode() {
    document.body.classList.add('party-mode');
    launchConfetti();
    showSecretMessage('🎉 PARTY MODE ACTIVATED! 🎉');

    setTimeout(() => {
        document.body.classList.remove('party-mode');
    }, 5000);
}

function emojiExplosion(x, y) {
    const emojis = ['🚀', '⚡', '💫', '✨', '🔥', '💎', '🌟', '🎯', '💡', '🎨'];

    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = x + 'px';
        emoji.style.top = y + 'px';
        emoji.style.setProperty('--tx', (Math.random() - 0.5) * 300 + 'px');
        emoji.style.setProperty('--ty', (Math.random() - 0.5) * 300 + 'px');
        emoji.style.setProperty('--r', Math.random() * 720 - 360 + 'deg');
        document.body.appendChild(emoji);

        setTimeout(() => emoji.remove(), 2000);
    }
}

/* ============================
   🎊 CONFETTI
   ============================ */
function launchConfetti() {
    const colors = ['#6366f1', '#f472b6', '#22d3ee', '#10b981', '#f59e0b', '#ef4444'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }
}

/* ============================
   🏆 CONFETTI ON ACHIEVEMENTS
   ============================ */
function initConfettiOnAchievements() {
    const liveBadges = document.querySelectorAll('.live-badge');

    liveBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            launchConfetti();
            showSecretMessage('🚀 This project is LIVE!');
        });
    });
}

/* ============================
   🎭 SECRET LOGO CLICK
   ============================ */
let logoClicks = 0;
function initSecretLogoClick() {
    const logo = document.querySelector('.logo');

    logo.addEventListener('click', (e) => {
        e.preventDefault();
        logoClicks++;

        if (logoClicks === 5) {
            document.body.classList.toggle('rainbow-mode');
            showSecretMessage('🌈 Rainbow mode ' + (document.body.classList.contains('rainbow-mode') ? 'ON' : 'OFF'));
            logoClicks = 0;
        } else if (logoClicks === 1) {
            logo.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => logo.style.transform = '', 200);
        }
    });
}

/* ============================
   💬 SECRET MESSAGE
   ============================ */
function showSecretMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'secret-message';
    msg.textContent = text;
    document.body.appendChild(msg);

    setTimeout(() => msg.classList.add('show'), 10);
    setTimeout(() => {
        msg.classList.remove('show');
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}

/* ============================
   🎪 SURPRISE TOOLTIPS
   ============================ */
function initSurpriseTooltips() {
    const tips = [
        'Triple-click anywhere for a surprise! 👀',
        'Try the Konami code... ↑↑↓↓←→←→BA',
        'Click the logo 5 times! 🌈',
        'Hover over cards for 3D magic! ✨',
        'Click on LIVE badges! 🎊'
    ];

    let tipIndex = 0;

    setInterval(() => {
        if (Math.random() > 0.7) {
            const tooltip = document.createElement('div');
            tooltip.className = 'surprise-tooltip';
            tooltip.textContent = tips[tipIndex];
            tooltip.style.left = Math.random() * 80 + 10 + '%';
            document.body.appendChild(tooltip);

            setTimeout(() => tooltip.classList.add('show'), 10);
            setTimeout(() => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            }, 4000);

            tipIndex = (tipIndex + 1) % tips.length;
        }
    }, 15000);
}

/* ============================
   🌊 PARALLAX ELEMENTS
   ============================ */
function initParallaxElements() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        document.querySelectorAll('.gradient-orb').forEach((orb, i) => {
            const speed = 0.1 + (i * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ============================
   📺 GLITCH EFFECT
   ============================ */
function initGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title');

    setInterval(() => {
        if (Math.random() > 0.95) {
            heroTitle.classList.add('glitch');
            setTimeout(() => heroTitle.classList.remove('glitch'), 200);
        }
    }, 3000);
}

/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });
}

/* ============================
   TYPING EFFECT
   ============================ */
function initTypingEffect() {
    const words = ['Experiences', 'Solutions', 'Products', 'Innovations', 'Excellence', 'Magic ✨'];
    const typingText = document.getElementById('typingText');
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const word = words[wordIndex];
        typingText.textContent = word.substring(0, isDeleting ? --charIndex : ++charIndex);

        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === word.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }

        setTimeout(type, speed);
    }
    type();
}

/* ============================
   COUNTER ANIMATION
   ============================ */
function initCounterAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.count;
                let current = 0;
                const increment = target / 100;

                const update = () => {
                    current += increment;
                    counter.textContent = current < target ? Math.ceil(current) : target + '+';
                    if (current < target) requestAnimationFrame(update);
                };
                update();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(c => observer.observe(c));
}

/* ============================
   SCROLL REVEAL
   ============================ */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('reveal', 'active'), i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-card, .service-card, .project-card, .section-header').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ============================
   PORTFOLIO FILTER
   ============================ */
function initPortfolioFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    // Initialize - show only business projects on load (default active filter)
    projects.forEach(p => {
        const isBusiness = p.dataset.category === 'business';
        p.classList.toggle('hidden', !isBusiness);
    });

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projects.forEach((p, i) => {
                const match = filter === 'all' || p.dataset.category === filter;
                p.classList.toggle('hidden', !match);
                if (match) {
                    p.style.animation = 'none';
                    setTimeout(() => p.style.animation = `popIn 0.5s ease ${i * 0.1}s forwards`, 10);
                }
            });
        });
    });
}

/* ============================
   MOBILE MENU
   ============================ */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    });
}

/* ============================
   PARTICLES EFFECT (Optional enhancement)
   ============================ */
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: floatUp ${5 + Math.random() * 10}s linear forwards;
    `;
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 15000);
}

// Add floating particles animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 3000);

/* ============================
   PROJECT CARD HOVER EFFECTS
   ============================ */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ============================
   FAQ TOGGLE FUNCTION
   ============================ */
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

console.log('🚀 Leadszio Portfolio Loaded Successfully!');



