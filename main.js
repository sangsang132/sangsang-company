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
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.setItem('dark-mode', 'disabled');
            }
        });
    }

    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '90px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.textAlign = 'center';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Reveal on Scroll Animation (Enhanced)
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

    // 초기 실행 및 스크롤 시 실행
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // 로드 시 한 번 실행

    // 4. Smooth Scrolling & Force Reveal
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 모바일 메뉴 닫기
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }

                // 부드러운 스크롤
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });

                // 해당 섹션 내부의 reveal 요소들을 즉시 활성화 (이게 핵심입니다!)
                setTimeout(() => {
                    const internalReveals = targetElement.querySelectorAll('.reveal');
                    internalReveals.forEach(el => el.classList.add('active'));
                    // 섹션 자체에 reveal이 있는 경우
                    if (targetElement.classList.contains('reveal')) {
                        targetElement.classList.add('active');
                    }
                }, 500); // 스크롤 이동 중에 서서히 나타나도록
            }
        });
    });

    // 5. Contact Form (Handled by Formspree)
});
