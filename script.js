document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for setup Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
    
    // Form submission using EmailJS
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            
            emailjs.sendForm('service_yvq4v9x', 'template_4nqkbvx', form)
                .then(() => {
                    btn.textContent = 'Message sent successfully!';
                    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                    form.reset();
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                    }, 3000);
                }, (error) => {
                    console.error('EmailJS Error:', error);
                    btn.textContent = 'Failed to send';
                    btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = '';
                    }, 3000);
                });
        });
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // CV Modal Logic
    const viewCvBtn = document.getElementById('view-cv-btn');
    const closeCvBtn = document.getElementById('close-cv-modal');
    const cvModal = document.getElementById('cv-modal');

    if (viewCvBtn && closeCvBtn && cvModal) {
        viewCvBtn.addEventListener('click', () => {
            cvModal.classList.add('active');
            document.body.classList.add('modal-open');
        });

        closeCvBtn.addEventListener('click', () => {
            cvModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        // Close on clicking outside content
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                cvModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // Certificate Modal Logic
    const certCards = document.querySelectorAll('.cert-card');
    const certModal = document.getElementById('cert-modal');
    const closeCertModal = document.getElementById('close-cert-modal');
    const certIframe = document.getElementById('cert-iframe');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certDownloadBtn = document.getElementById('cert-download-btn');

    if (certCards.length > 0 && certModal) {
        certCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const link = card.getAttribute('data-cert-link');
                const title = card.getAttribute('data-cert-title');
                
                if (certIframe && link) certIframe.src = link;
                if (certModalTitle && title) certModalTitle.textContent = title;
                if (certDownloadBtn && link) certDownloadBtn.href = link;

                certModal.classList.add('active');
                document.body.classList.add('modal-open');
            });
        });

        closeCertModal.addEventListener('click', () => {
            certModal.classList.remove('active');
            document.body.classList.remove('modal-open');
            setTimeout(() => { if (certIframe) certIframe.src = ''; }, 300);
        });

        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                certModal.classList.remove('active');
                document.body.classList.remove('modal-open');
                setTimeout(() => { if (certIframe) certIframe.src = ''; }, 300);
            }
        });
    }

    // Carousel Scrolling Logic
    const certsCarousel = document.querySelector('.certs-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (certsCarousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            certsCarousel.scrollBy({ left: -380, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            certsCarousel.scrollBy({ left: 380, behavior: 'smooth' });
        });
    }

    // --- Custom Cursor Logic ---
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);

        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            
            const target = e.target;
            if (target.closest('a') || target.closest('button') || target.closest('.glass-card')) {
                cursorGlow.classList.add('hovering');
            } else {
                cursorGlow.classList.remove('hovering');
            }
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;
            
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
        
        // --- Magnetic Logic ---
        const magnetics = document.querySelectorAll('.btn');
        magnetics.forEach(elem => {
            elem.addEventListener('mousemove', (e) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Very subtle movement ratio
                const moveX = x * 0.08;
                const moveY = y * 0.08;
                
                // 3D Tilt Calculation
                const tiltX = (y / (rect.height / 2)) * -5; 
                const tiltY = (x / (rect.width / 2)) * 5;
                
                elem.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
            
            elem.addEventListener('mouseleave', () => {
                elem.style.transform = ''; 
            });
        });
    }

    // 1. Scroll Progress
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(progressBar) progressBar.style.width = scrolled + "%";
    });

    // 2. Data Mode Toggle
    const dataModeToggle = document.getElementById('data-mode-toggle');
    if (dataModeToggle) {
        dataModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('data-mode');
            } else {
                document.body.classList.remove('data-mode');
            }
        });
    }

    // 3. Typing Animation
    const typedTagline = document.getElementById('typed-tagline');
    const taglines = ["Turning Data into Insights", "Building Intelligent Systems", "Uncovering Hidden Patterns"];
    let tagIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeTagline() {
        if (!typedTagline) return;
        const currentString = taglines[tagIndex];
        
        if (isDeleting) {
            typedTagline.textContent = `"${currentString.substring(0, charIndex - 1)}"`;
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTagline.textContent = `"${currentString.substring(0, charIndex + 1)}"`;
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            tagIndex = (tagIndex + 1) % taglines.length;
            typingSpeed = 500; 
        }
        setTimeout(typeTagline, typingSpeed);
    }
    setTimeout(typeTagline, 1000);

    // 4. Global Parallax
    const parallaxTargets = document.querySelectorAll('[data-speed]');
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            parallaxTargets.forEach(target => {
                const speed = target.getAttribute('data-speed');
                const xOffset = x * speed;
                const yOffset = y * speed;
                target.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
            });
        });
    }

    // 5. Universal Project Modal
    const projectCardsExpand = document.querySelectorAll('.project-card');
    const projectModalTarg = document.getElementById('project-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    const pmTitle = document.getElementById('pm-title');
    const pmDetails = document.getElementById('pm-details');
    const pmGithub = document.getElementById('pm-github');

    projectCardsExpand.forEach(card => {
        card.style.cursor = 'none'; // custom cursor active
        card.addEventListener('click', (e) => {
            if (e.target.closest('.view-code-btn')) return; 

            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('.project-desc').textContent;
            const listItems = card.querySelector('ul').innerHTML;
            const techStack = card.querySelector('.tech-stack').innerHTML;
            const btnLink = card.querySelector('.view-code-btn').href;

            if(pmTitle) pmTitle.textContent = title;
            if(pmDetails) pmDetails.innerHTML = `<p class="project-desc">${desc}</p><ul>${listItems}</ul><div class="tech-stack">${techStack}</div>`;
            if(pmGithub) pmGithub.href = btnLink;

            if(projectModalTarg) {
                projectModalTarg.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    if (closeProjectModalBtn) {
        closeProjectModalBtn.addEventListener('click', () => {
            projectModalTarg.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
        projectModalTarg.addEventListener('click', (e) => {
            if (e.target === projectModalTarg) {
                projectModalTarg.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // 6. Easter Egg (Logo click)
    const logoBtn = document.querySelector('.logo');
    if (logoBtn) {
        logoBtn.style.cursor = 'none';
        logoBtn.addEventListener('click', (e) => {
            if (window.triggerPetalBurst) {
                window.triggerPetalBurst(e.clientX, e.clientY);
            }
        });
    }

    // Parallax logic for heroic elements
    window.addEventListener('scroll', () => {
        const parallaxEls = document.querySelectorAll('.parallax-el');
        let scrollY = window.scrollY;
        parallaxEls.forEach(el => {
            const speed = el.getAttribute('data-speed') || 1;
            el.style.transform = `translateY(${scrollY * speed * 0.15}px)`;
        });
    });

    // Magnetic buttons effect
    const magBtns = document.querySelectorAll('.mag-btn');
    magBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Initialize Vanilla Tilt if present
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('.service-card, .project-wrapper');
        VanillaTilt.init(tiltElements, {
            max: 4,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

});
