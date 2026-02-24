/**
 * Portfolio Interaction Script
 * Handlign scroll animations and micro-interactions
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Intersection Observer for scroll animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 2. Select all elements that need fading
    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    
    // Start observing
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // 3. Optional: Smooth scrolling for nav links (Safari fallback, though CSS scroll-behavior usually handles this)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
