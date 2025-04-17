// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
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
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav items on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;

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

    window.addEventListener('scroll', highlightNavOnScroll);

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(this);
            console.log('Form data:', Object.fromEntries(formData));
            
            // Show a success message (in a real implementation)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Add animation to timeline items
    const animateOnScroll = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const triggerBottom = window.innerHeight * 0.8;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add('show');
            }
        });
    };

    // Initial check for animations
    animateOnScroll();
    
    // Listen for scroll events to trigger animations
    window.addEventListener('scroll', animateOnScroll);
});

// Add a simple typing effect to the hero title (optional)
function typeEffect(element, text, speed = 50) {
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

// Uncomment the following code if you want to use the typing effect
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-content h1 span');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeEffect(heroTitle, originalText);
//     }
// }); 