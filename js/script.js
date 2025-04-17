// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.querySelector('.contact-form');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const skillItems = document.querySelectorAll('.skills-list span');
    const fadeElements = document.querySelectorAll('.fade-in');

    // Mobile Navigation Toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking on a nav link
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

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

    // Animate elements on scroll
    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        // Timeline items
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add('show');
            }
        });

        // Fade in elements
        fadeElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('show');
            }
        });

        // Project cards
        projectCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 100);
            }
        });

        // Skill items
        skillItems.forEach((skill, index) => {
            const skillTop = skill.getBoundingClientRect().top;
            if (skillTop < triggerBottom) {
                setTimeout(() => {
                    skill.classList.add('show');
                }, index * 50);
            }
        });
    }

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // For demonstration purposes - in a real implementation, you would send data to a server
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            console.log('Form data:', formValues);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    successMessage.classList.remove('show');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }

    // Count up animation for numbers
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const countTo = target;
            const duration = 2000; // Animation duration in ms
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentValue = Math.floor(easedProgress * countTo);
                
                counter.textContent = currentValue.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    }

    // Initialize animations
    function init() {
        updateHeader();
        highlightNavOnScroll();
        animateOnScroll();
        
        // Initial call for animations
        setTimeout(animateOnScroll, 100);
    }

    // Call on initial load
    init();

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateHeader();
        highlightNavOnScroll();
        animateOnScroll();
        parallaxEffect();
    });

    // Add resize event listener
    window.addEventListener('resize', () => {
        highlightNavOnScroll();
    });

    // Add CSS class for project cards to enable animations
    projectCards.forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Add CSS class for skill items to enable animations
    skillItems.forEach(skill => {
        skill.classList.add('fade-in');
    });

    // Type effect for hero title
    function typeEffect(element, text, speed = 50) {
        if (!element) return;
        
        let i = 0;
        element.innerHTML = '';
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }

    // Uncomment to enable typing effect
    // const heroTitle = document.querySelector('.hero-content h1 span');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeEffect(heroTitle, originalText);
    // }

    // Project filter functionality (if you add it later)
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('show');
                        }, 100);
                    } else {
                        card.classList.remove('show');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}); 