document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const animationDuration = 2000;
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const startTime = performance.now();
        function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            const currentVal = Math.floor(progress * target);
            counter.textContent = currentVal.toLocaleString('hu-HU') + suffix;
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
});