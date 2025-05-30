// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    const contactForm = document.querySelector('.contact-form');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillItems = document.querySelectorAll('.skills-list span');
    const fadeElements = document.querySelectorAll('.fade-in');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update header on scroll
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Add active class to nav items on scroll
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Set up Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a skill category, also animate its children
                if (entry.target.classList.contains('skill-category')) {
                    const skillSpans = entry.target.querySelectorAll('.skills-list span');
                    skillSpans.forEach((span, index) => {
                        setTimeout(() => {
                            span.classList.add('visible');
                        }, index * 50);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Explicitly observe skill categories for better control
    skillCategories.forEach(category => {
        observer.observe(category);
    });

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Netlify handle form submission
            // e.preventDefault();
            
            // Update button state on submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // We'll still show a success message,
            // but Netlify will handle the actual form submission
            
            // Additional form analytics or tracking could go here
        });
        
        // Listen for form submission result
        // This will run when the user returns from the Netlify submission page
        // or if using AJAX submission mode
        if (window.location.search.includes('submission=success') || 
            window.location.hash === '#success') {
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message show';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
            
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 5000);
        }
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    
    function startCounters(container) {
        const countersInView = container ? container.querySelectorAll('.counter') : counters;
        
        countersInView.forEach(counter => {
            // Reset counter text to 0 before starting animation
            counter.textContent = '0';
            
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1500; // animation duration in ms
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            
            let current = start;
            const updateCount = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCount();
        });
    }

    // Intersection Observer to trigger counter animation when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start counters for this specific section that came into view
                startCounters(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe both stats sections
    const statsSection = document.querySelector('.stats-section');
    const aboutStats = document.querySelector('.about-stats');
    
    if (statsSection) statsObserver.observe(statsSection);
    if (aboutStats) statsObserver.observe(aboutStats);

    // Initialize
    function init() {
        updateHeader();
        highlightNavOnScroll();
    }

    // Call on initial load
    init();

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateHeader();
        highlightNavOnScroll();
    });

    // Add resize event listener
    window.addEventListener('resize', () => {
        highlightNavOnScroll();
    });
}); 