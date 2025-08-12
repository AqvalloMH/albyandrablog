document.addEventListener('DOMContentLoaded', function () {
    // ========================== CUSTOM CURSOR ==========================
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    // Hover effect pada cursor
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .stat-card, .icon, .tech-icon');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // ========================== PARTICLE BACKGROUND ==========================
    createParticles();
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = opacity;
            particlesContainer.appendChild(particle);
        }
    }

    // ========================== MOBILE MENU ==========================
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // ========================== SMOOTH SCROLL ==========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    });

    // ========================== SCROLL ANIMATION & SKILL/STAT ANIM ==========================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Skill bars
                if (entry.target.id === 'skills') {
                    const skillBars = document.querySelectorAll('.skill-level');
                    skillBars.forEach((bar, index) => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = level + '%';
                        bar.style.transitionDelay = `${index * 0.1}s`;
                    });
                }

                // Stats counters
                if (entry.target.id === 'about') {
                    const counters = document.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-count');
                        const duration = 2000;
                        const startTime = performance.now();
                        const updateCount = (currentTime) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const value = Math.floor(progress * target);
                            counter.textContent = value;
                            if (progress < 1) requestAnimationFrame(updateCount);
                        };
                        requestAnimationFrame(updateCount);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // ========================== FORM SUBMISSION ==========================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--danger)';
                    setTimeout(() => input.style.borderColor = 'var(--glass)', 2000);
                }
            });
            if (isValid) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // ========================== TECH ICON ANIMATION ==========================
    const techIcons = document.querySelectorAll('.tech-icon');
    if (techIcons.length > 0) {
        techIcons.forEach((icon, index) => {
            const angle = (index * (360 / techIcons.length)) * (Math.PI / 180);
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            icon.style.transform = `translate(${x}px, ${y}px)`;
            icon.addEventListener('mouseenter', () => icon.style.transform = `translate(${x * 1.2}px, ${y * 1.2}px) scale(1.2)`);
            icon.addEventListener('mouseleave', () => icon.style.transform = `translate(${x}px, ${y}px) scale(1)`);
        });
    }

    // ========================== RIPPLE BUTTON ==========================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // ========================== TOOLTIP SOCIAL ICON ==========================
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        const tooltip = icon.getAttribute('data-tooltip');
        if (tooltip) {
            const tooltipElement = document.createElement('div');
            tooltipElement.classList.add('tooltip');
            tooltipElement.textContent = tooltip;
            icon.appendChild(tooltipElement);
        }
    });

    // ========================== PARALLAX HERO ==========================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // ========================== HERO TYPING ANIMATION ==========================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }

    // ========================== EXTRA ANIMATIONS ==========================
    // Scroll reveal custom classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .zoom-in');
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => animObserver.observe(el));

    // Background gradient animation hhhh
    let gradientAngle = 0;
    setInterval(() => {
        gradientAngle += 0.3;
        document.body.style.background = `linear-gradient(${gradientAngle}deg, #1e1e2f, #282845, #1e1e2f)`;
    }, 50);

    // Tilt effect untuk card
    document.querySelectorAll('.project-card, .skill-card, .stat-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Glow effect tombol
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.classList.add('glow'));
        btn.addEventListener('mouseleave', () => btn.classList.remove('glow'));
    });

    // Floating icon
    icons.forEach((icon, i) => {
        icon.style.animation = `floatUpDown 3s ease-in-out infinite`;
        icon.style.animationDelay = `${i * 0.3}s`;
    });
});
