document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Function to toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', toggleMenu);
    
    // Close mobile menu when a nav item is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const target = e.target;
        const isNavLinks = target.closest('.nav-links');
        const isHamburger = target.closest('.hamburger');
        
        if (!isNavLinks && !isHamburger && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Adjust menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}); 