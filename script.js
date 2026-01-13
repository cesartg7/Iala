document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling with offset for sticky nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Enhanced Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 3. Active Navigation Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sticky-nav a');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // 4. Advanced Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Stagger animation for child elements
                if (entry.target.classList.contains('grid-features')) {
                    const cards = entry.target.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Apply reveal classes to elements
    document.querySelectorAll('.content-section').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    document.querySelectorAll('.split-content .text').forEach(el => {
        el.classList.add('reveal-left');
        revealObserver.observe(el);
    });

    document.querySelectorAll('.split-content .visual').forEach(el => {
        el.classList.add('reveal-right');
        revealObserver.observe(el);
    });

    document.querySelectorAll('.feature-card').forEach(el => {
        el.classList.add('reveal-scale');
        revealObserver.observe(el);
    });

    document.querySelectorAll('.grid-features').forEach(el => {
        revealObserver.observe(el);
    });

    document.querySelectorAll('.concept-box, .detail-item').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 5. Parallax Effect on Images
    const parallaxImages = document.querySelectorAll('.visual img');

    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrollPercent = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
            const translateY = scrollPercent * 30;
            img.style.transform = `translateY(${translateY}px)`;
        });
    });

    // 6. Video Control Logic - Removed (now using YouTube embed)

    // 7. Enhanced Lightbox with zoom animation
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Make all images in visual divs clickable for lightbox
    document.querySelectorAll('.visual img, .gallery-grid img, .image-pair img').forEach(img => {
        img.classList.add('lightbox-trigger');
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', () => {
            if (lightbox) {
                lightbox.setAttribute('aria-hidden', 'false');
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
                lightbox.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    // 8. Custom Cursor Follower
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });

    // Smooth cursor animation
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX - 20 + 'px';
        cursor.style.top = cursorY - 20 + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .feature-card, .lightbox-trigger, .gallery-grid img');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }

    // 9. Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }

    // 10. Navbar hide/show on scroll
    let lastScroll = 0;
    const nav = document.querySelector('.sticky-nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Add transition to nav for smooth hide/show
    nav.style.transition = 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)';

    // 11. Image tilt effect on hover
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    console.log('🏠 Casa Domínguez - Interactive Experience Loaded');
});
