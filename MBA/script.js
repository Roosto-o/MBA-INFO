// Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows smoothly
    gsap.to(cursorOutline, {
        left: posX,
        top: posY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Magnetic Buttons Effect
const magneticElements = document.querySelectorAll('.btn');

magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;

        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.5,
            ease: "power3.out"
        });
        
        gsap.to(cursorOutline, {
            scale: 1.5,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.5)",
            duration: 0.3
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
        
        gsap.to(cursorOutline, {
            scale: 1,
            backgroundColor: "transparent",
            borderColor: "var(--primary)",
            duration: 0.3
        });
    });
});

// Interactive Elements Hover
const interactives = document.querySelectorAll("a:not(.btn), .program-card, .floating-card");

interactives.forEach(el => {
    el.addEventListener("mouseenter", () => {
        gsap.to(cursorOutline, { scale: 1.5, backgroundColor: "rgba(255, 255, 255, 0.1)", duration: 0.3 });
    });
    
    el.addEventListener("mouseleave", () => {
        gsap.to(cursorOutline, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
    });
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// --- HERO ANIMATIONS ---
const heroTl = gsap.timeline();

// Setup initial states for reveal
gsap.set(".hero-shape", { scaleX: 0, transformOrigin: "right" });
gsap.set(".tech-abacus", { scale: 0.8, opacity: 0 });

heroTl.to(".hero-shape", {
    scaleX: 1,
    duration: 1.2,
    ease: "power4.inOut"
})
.to(".tech-abacus", {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: "power4.out"
}, "-=0.8")
.from(".hero-title", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.6")
.from(".hero-title .text-highlight", {
    color: "#666666", // Animate color from gray to white
    duration: 0.8,
    ease: "power2.inOut"
}, "-=0.5")
.from(".hero-subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from(".hero-buttons .btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(1.5)"
}, "-=0.5");

// Subtle mouse parallax for hero tech abacus
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to('.abacus-frame', { x: x * 1.5, y: y * 1.5, duration: 1, ease: "power2.out" });
});

// --- SCROLL ANIMATIONS ---

// Partners Reveal
gsap.from(".partner-logo", {
    scrollTrigger: {
        trigger: ".partners",
        start: "top 85%"
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.2)"
});

// About Section Reveal
const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about",
        start: "top 75%"
    }
});

// Circular wipe for image
gsap.set(".about-img", { clipPath: "circle(0% at 50% 50%)" });

aboutTl.from(".about-content .section-badge", { x: -30, opacity: 0, duration: 0.6 })
       .from(".about-content .section-title", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
       .from(".about-content .section-desc", { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.4")
       .from(".about-content .btn", { scale: 0.9, opacity: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.3")
       .to(".about-img", { clipPath: "circle(100% at 50% 50%)", duration: 1.5, ease: "power3.inOut" }, "-=1.2");

// Programs Section Reveal
const programsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".programs",
        start: "top 75%"
    }
});

programsTl.from(".programs .text-center > *", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
});

// 3D Tilt Effect for Program Cards
const cards = document.querySelectorAll('.program-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on cursor position relative to center
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: "power2.out",
            duration: 0.4
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: "elastic.out(1, 0.3)", // bouncy return
            duration: 1
        });
    });
});

// CTA Section Reveal
gsap.from(".cta-container > *", {
    scrollTrigger: {
        trigger: ".cta",
        start: "top 80%"
    },
    y: 30,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

