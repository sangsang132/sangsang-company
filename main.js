document.addEventListener('DOMContentLoaded', () => {
    // 0. Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'enabled') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('dark-mode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });
        
        // Keyboard accessibility
        darkModeToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') darkModeToggle.click();
        });
    }

    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            mobileMenu.setAttribute('aria-expanded', isActive);
        });

        // Keyboard accessibility
        mobileMenu.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') mobileMenu.click();
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    // 3. Reveal on Scroll Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();

    // 4. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });

                // Force reveal elements in target section
                setTimeout(() => {
                    targetElement.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
                    if (targetElement.classList.contains('reveal')) targetElement.classList.add('active');
                }, 600);
            }
        });
    });
});
