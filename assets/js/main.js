document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with animations on scroll in both directions
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 50
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const footer = document.querySelector('.new-footer');

    // Updates the active navigation link based on scroll position
    function updateActiveSection() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        let currentSection = '';

        // Special handling for footer section
        const footerTop = footer.offsetTop - windowHeight/2;
        if (scrollPosition >= footerTop) {
            currentSection = 'contact';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('active');
            }
        });

        // Handle home section when at the top of page
        if (scrollPosition < sections[0].offsetTop - 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }

    // Handles initial page load and deep linking
    function handlePageLoad() {
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView();
                    updateActiveSection();
                }, 100);
            }
        } else {
            updateActiveSection();
        }
    }

    handlePageLoad();

    // Enable smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });

    // Event listeners for scroll updates
    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('resize', updateActiveSection);

    // Navbar appearance on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Interest badges hover animation
    const badges = document.querySelectorAll('.interest-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Remove loading screen after page load
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loading-animation');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
});