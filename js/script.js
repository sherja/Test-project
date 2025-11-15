// Simple JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back to top functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Menu tab functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // Hero slider dots functionality
    const slideContainer = document.querySelector('.hero-slides');
    const dotsContainer = document.querySelector('.hero-slider');
    const prevBtn = document.querySelector('.hero-nav.prev');
    const nextBtn = document.querySelector('.hero-nav.next');

    const preferredBases = ['coffee-day-delights','free-coffee-vlog','great-cup-of-coffee'];
    const fallbackBases = ['main-bannar','main-bannar2','main-bannar3'];
    const exts = ['png','jpg','jpeg','webp'];

    let slides = [];
    let sliderDots = [];
    let currentSlide = 0;
    let autoPlayId = null;

    function addImageWithFallback(base) {
        const img = document.createElement('img');
        img.alt = base.replace(/-/g, ' ');
        let i = 0;
        function setNext() {
            if (i >= exts.length) { img.dataset.failed = '1'; return; }
            img.src = 'image/' + base + '.' + exts[i++];
        }
        img.addEventListener('error', setNext);
        setNext();
        slideContainer.appendChild(img);
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        dotsContainer.appendChild(dot);
    }

    preferredBases.forEach(addImageWithFallback);

    setTimeout(function() {
        slides = Array.from(slideContainer.querySelectorAll('img'));
        const loaded = slides.filter(s => !s.dataset.failed);
        if (loaded.length === 0) {
            slideContainer.innerHTML = '';
            dotsContainer.innerHTML = '';
            fallbackBases.forEach(addImageWithFallback);
            slides = Array.from(slideContainer.querySelectorAll('img'));
        }
        sliderDots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));
        initializeSlider();
    }, 200);

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        sliderDots.forEach(d => d.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        sliderDots[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function initializeSlider() {
        if (slides.length === 0) return;
        showSlide(0);
        sliderDots.forEach((dot, index) => { dot.addEventListener('click', function() { showSlide(index); }); });
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        startAutoPlay();
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', stopAutoPlay);
            hero.addEventListener('mouseleave', startAutoPlay);
        }
    }

    function startAutoPlay() { autoPlayId = setInterval(nextSlide, 5000); }
    function stopAutoPlay() { if (autoPlayId) clearInterval(autoPlayId); }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(17, 17, 17, 0.95)';
        } else {
            header.style.background = 'var(--dark-bg)';
        }
    });
});