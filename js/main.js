// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    // Add transition class for smooth color changes
    document.documentElement.classList.add('theme-transition');
    
    // Set theme
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', isDark);
    
    // Store the preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300);
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'dark';
    setTheme(isDark);
});

// Initialize theme based on saved preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDarkScheme.matches);
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
    }
});

// Custom Cursor
const cursor = document.querySelector('#cursor');
const cursorBlur = document.querySelector('#cursor-blur');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorBlur.style.left = e.clientX + 'px';
    cursorBlur.style.top = e.clientY + 'px';
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#2563eb'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#2563eb',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Scroll Reveal Animations
ScrollReveal().reveal('.hero-content', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

ScrollReveal().reveal('.about-content', {
    delay: 200,
    distance: '50px',
    origin: 'left',
    duration: 1000
});

ScrollReveal().reveal('.project-card', {
    delay: 200,
    interval: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000
});

ScrollReveal().reveal('.skill-category', {
    delay: 200,
    interval: 200,
    distance: '50px',
    origin: 'right',
    duration: 1000
});

ScrollReveal().reveal('.contact-container', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000
});

// Profile Image Animation
const profileImages = [
    'assets/images/IMG_1431.jpeg',
    'assets/images/profile2.jpg',
    'assets/images/profile3.jpg'
];

let currentImageIndex = 0;
const profileImg = document.querySelector('.profile-img');

function changeProfileImage() {
    const nextIndex = (currentImageIndex + 1) % profileImages.length;
    
    // Create a new image element
    const nextImage = new Image();
    nextImage.src = profileImages[nextIndex];
    
    // Only change the image once it's loaded
    nextImage.onload = () => {
        profileImg.style.opacity = '0';
        
        setTimeout(() => {
            profileImg.src = profileImages[nextIndex];
            profileImg.style.opacity = '1';
            currentImageIndex = nextIndex;
        }, 500);
    };
}

setInterval(changeProfileImage, 3000);

// 3D Tilt Effect for Project Cards
VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.2
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    submitBtn.style.backgroundColor = '#10B981';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
    }, 3000);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Typewriter Effect
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        new TypeWriter(typewriter, [
            'Senior Flutter Developer',
            'Mobile App Expert',
            'UI/UX Enthusiast',
            'Problem Solver'
        ], 2000);
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .skill-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// Skill level animation
document.querySelectorAll('.skill-level').forEach(level => {
    level.style.width = '0%';
    const targetWidth = level.style.getPropertyValue('--target-width') || '0%';
    
    setTimeout(() => {
        level.style.transition = 'width 1s ease-in-out';
        level.style.width = targetWidth;
    }, 200);
});

// Parallax Effect
const hero = document.getElementById('hero');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            ticking = false;
        });
        ticking = true;
    }
});
