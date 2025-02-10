// Optimize scroll performance with throttling
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth scrolling for navigation links using requestAnimationFrame
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, 500);
                window.scrollTo(0, run);
                if (timeElapsed < 500) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Optimize header scroll effect with throttling and transform
const header = document.querySelector('header');
let lastScroll = 0;

const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    // Use opacity instead of rgba for better performance
    if (currentScroll > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
}, 100);

window.addEventListener('scroll', handleScroll);

// Implement lazy loading for images
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('.product-card img').forEach(img => {
        if (img.src !== img.dataset.src) {
            imageObserver.observe(img);
        }
        img.addEventListener('load', function() {
            this.classList.add('fade-in');
        });
    });
};

// Optimize add to cart animation using transform
const createNotification = (() => {
    const notifications = new Set();
    
    return (message) => {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = message;
        
        // Use transform instead of top/right for better performance
        notification.style.transform = 'translate3d(0, -20px, 0)';
        document.body.appendChild(notification);
        notifications.add(notification);
        
        // Force reflow to ensure animation works
        notification.offsetHeight;
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                notifications.delete(notification);
            }, 300);
        }, 2000);
    };
})();

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.add('clicked');
        createNotification('<i class="fas fa-check"></i> Added to cart!');
        setTimeout(() => this.classList.remove('clicked'), 150);
    });
});

// Optimize fade-in animations using IntersectionObserver
const fadeInElements = () => {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });
};

// Initialize optimizations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    fadeInElements();
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input');
        const button = this.querySelector('button');
        const email = input.value;
        
        if (email) {
            // Disable form
            input.disabled = true;
            button.disabled = true;
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing!';
            successMessage.style.color = 'var(--dark-pink)';
            successMessage.style.marginTop = '1rem';
            successMessage.style.display = 'flex';
            successMessage.style.alignItems = 'center';
            successMessage.style.justifyContent = 'center';
            successMessage.style.gap = '0.5rem';
            
            this.appendChild(successMessage);
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.querySelectorAll('.product-card, .benefit-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add class for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});