// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Fade In for Hero
    gsap.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4
    });

    // Fade up for sections
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%', // Slightly more conservative start for mobile
                toggleActions: 'play none none none'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Glassmorphism card reveal
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        // Only animate if it doesn't already have fade-up to avoid double animation
        if (!card.classList.contains('fade-up')) {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 95%',
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        }
    });

    // Force refresh triggers after layout is settled
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Fallback: If elements are still invisible after 3 seconds, show them
    setTimeout(() => {
        gsap.to('.fade-up, .glass-card', { opacity: 1, y: 0, duration: 0.5, overwrite: 'auto' });
    }, 3000);
});
