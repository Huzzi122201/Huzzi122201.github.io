document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Enhanced scroll spy for navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const footer = document.querySelector('.new-footer');

    function updateActiveSection() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        let currentSection = '';

        // Check if we're near the footer
        const footerTop = footer.offsetTop - windowHeight/2;
        if (scrollPosition >= footerTop) {
            currentSection = 'contact';
        } else {
            // Check other sections
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; // Offset for better detection
                const sectionBottom = sectionTop + section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = section.getAttribute('id');
                }
            });
        }

        // Update active states
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1); // Remove the #
            if (href === currentSection) {
                link.classList.add('active');
            }
        });

        // Special case for when we're at the top of the page
        if (scrollPosition < sections[0].offsetTop - 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }

    // Handle page load/refresh
    function handlePageLoad() {
        // Check if there's a hash in the URL
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                // Scroll to the section after a small delay to ensure proper positioning
                setTimeout(() => {
                    targetSection.scrollIntoView();
                    updateActiveSection();
                }, 100);
            }
        } else {
            // If no hash, just update based on scroll position
            updateActiveSection();
        }
    }

    // Initial check for active section on page load
    handlePageLoad();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);

    // Update active section on page resize
    window.addEventListener('resize', updateActiveSection);

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Interest badges hover effect
    const badges = document.querySelectorAll('.interest-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Loading animation
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