gsap.registerPlugin(ScrollTrigger);

// Initialize particles animation
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Countdown timer
function initCountdown() {
  const targetDate = new Date('2026-05-26T00:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.querySelector('.countdown-timer').innerHTML = '<div class="timer-complete">Game Released!</div>';
    }
  }
  
  const countdownTimer = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Initialize particles and countdown
createParticles();
initCountdown();

// Enhanced loading animation
gsap.from(".hero-main-container", {
  scale: 1.45,
  duration: 3,
  ease: "power3.out",
});

gsap.to(".overlay", {
  opacity: 0,
  duration: 3,
  ease: "power3.out",
  onComplete: () => {
    document.body.style.overflow = "visible";
    document.body.style.overflowX = "hidden";
  },
});

// Enhanced scroll indicator animation
const scrollIndicator = document.querySelector(".scroll-indicator");
const bounceTimeline = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

bounceTimeline
  .to(scrollIndicator, {
    y: 15,
    opacity: 0.7,
    duration: 1,
    ease: "power2.inOut",
  })
  .to(scrollIndicator, {
    scale: 1.1,
    duration: 0.3,
    ease: "power2.out",
  }, "<");

// Main scroll timeline with enhanced animations
const mainTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    scrub: 2,
    pin: true,
    start: "top top",
    end: "+=8000", // Extended for more sections
    ease: "none",
    onUpdate: (self) => {
      // Dynamic particle opacity based on scroll
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        particle.style.opacity = 0.3 + (self.progress * 0.4);
      });
    }
  },
});

// Section 1: Hero intro with enhanced effects
mainTimeline.set(".hero-main-container", {
  scale: 1.25,
});

mainTimeline.to(".hero-main-container", {
  scale: 1,
  duration: 1,
});

mainTimeline.to(
  ".hero-main-logo",
  {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
  },
  "<"
);

mainTimeline.to(
  ".hero-main-image",
  {
    opacity: 0,
    scale: 1.1,
    duration: 1.2,
  },
  "<+=0.5"
);

mainTimeline.to(
  ".hero-main-container",
  {
    backgroundSize: "28vh",
    duration: 1.5,
  },
  "<+=0.3"
);

// Enhanced text reveal with stagger effect
mainTimeline.fromTo(
  ".hero-text",
  {
    backgroundImage: `radial-gradient(
      circle at 50% 200vh,
      rgba(255, 214, 135, 0) 0,
      rgba(157, 47, 106, 0.5) 90vh,
      rgba(157, 47, 106, 0.8) 120vh,
      rgba(32, 31, 66, 0) 150vh
    )`,
    y: 50,
    opacity: 0,
  },
  {
    backgroundImage: `radial-gradient(
      circle at 50% 3.9575vh,
      rgb(255, 213, 133) 0vh,
      rgb(247, 77, 82) 50.011vh,
      rgb(145, 42, 105) 90.0183vh,
      rgba(32, 31, 66, 0) 140.599vh
    )`,
    y: 0,
    opacity: 1,
    duration: 3,
  },
  "<1.2"
);

// Countdown timer entrance
mainTimeline.fromTo(
  ".countdown-timer",
  {
    y: 30,
    opacity: 0,
    scale: 0.8,
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: "back.out(1.7)",
  },
  "<1"
);

// Logo reveal with mask animation
mainTimeline.fromTo(
  ".hero-text-logo",
  {
    opacity: 0,
    maskImage: `radial-gradient(
      circle at 50% 145.835%,
      rgb(0, 0, 0) 36.11%,
      rgba(0, 0, 0, 0) 68.055%
    )`,
    scale: 0.8,
  },
  {
    opacity: 1,
    maskImage: `radial-gradient(
      circle at 50% 105.594%,
      rgb(0, 0, 0) 62.9372%,
      rgba(0, 0, 0, 0) 81.4686%
    )`,
    scale: 1,
    duration: 3,
  },
  "<0.3"
);

// Hide scroll indicator
mainTimeline.to(".scroll-indicator", {
  opacity: 0,
  y: -20,
  duration: 1,
}, "<1.5");

// Transition to section 2
mainTimeline.set(".hero-main-container", { opacity: 0 });
mainTimeline.to(".hero-1-container", { 
  scale: 0.85, 
  opacity: 0.8,
  duration: 2 
}, "<-=2");

mainTimeline.set(
  ".hero-1-container",
  {
    maskImage: `radial-gradient(
      circle at 50% 16.1137vh,
      rgb(0, 0, 0) 96.1949vh,
      rgba(0, 0, 0, 0) 112.065vh
    )`,
  },
  "<+=1.5"
);

mainTimeline.to(
  ".hero-1-container",
  {
    maskImage: `radial-gradient(
      circle at 50% -40vh,
      rgb(0, 0, 0) 0vh,
      rgba(0, 0, 0, 0) 80vh
    )`,
    duration: 2,
  },
  "<+=0.3"
);

mainTimeline.to(
  ".hero-text-logo",
  {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
  },
  "<1"
);

mainTimeline.set(".hero-1-container", { opacity: 0 });
mainTimeline.set(".hero-2-container", { visibility: "visible" });

// Section 2: Story section with enhanced animations
mainTimeline.to(".hero-2-container", { 
  opacity: 1, 
  duration: 2 
}, "<+=0.5");

mainTimeline.fromTo(
  ".location-badge",
  {
    x: -50,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "back.out(1.7)",
  },
  "<0.5"
);

mainTimeline.fromTo(
  ".hero-2-container .section-title",
  {
    y: 30,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
  },
  "<0.3"
);

mainTimeline.fromTo(
  ".story-text",
  {
    y: 30,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
  },
  "<0.3"
);

// Stagger animation for feature cards
mainTimeline.fromTo(
  ".feature-card",
  {
    y: 40,
    opacity: 0,
    scale: 0.8,
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1.5,
    stagger: 0.3,
    ease: "back.out(1.7)",
  },
  "<0.5"
);

mainTimeline.fromTo(
  ".hero-2-container",
  {
    backgroundImage: `radial-gradient(
      circle at 50% 200vh,
      rgba(255, 214, 135, 0) 0,
      rgba(157, 47, 106, 0.5) 90vh,
      rgba(157, 47, 106, 0.8) 120vh,
      rgba(32, 31, 66, 0) 150vh
    )`,
  },
  {
    backgroundImage: `radial-gradient(
      circle at 50% 3.9575vh,
      rgb(255, 213, 133) 0vh,
      rgb(247, 77, 82) 50.011vh,
      rgb(145, 42, 105) 90.0183vh,
      rgba(32, 31, 66, 0) 140.599vh
    )`,
    duration: 3,
  },
  "<1"
);

// Transition to section 3
mainTimeline.to(".hero-2-container", {
  opacity: 0,
  scale: 0.9,
  duration: 2,
}, "+=1");

mainTimeline.set(".hero-2-container", { visibility: "hidden" });
mainTimeline.set(".hero-3-container", { visibility: "visible" });

// Section 3: Characters section
mainTimeline.to(".hero-3-container", {
  opacity: 1,
  duration: 2,
}, "<+=0.5");

mainTimeline.fromTo(
  ".hero-3-container .section-title",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
  },
  "<0.5"
);

mainTimeline.fromTo(
  ".character-card",
  {
    y: 60,
    opacity: 0,
    rotationY: 30,
  },
  {
    y: 0,
    opacity: 1,
    rotationY: 0,
    duration: 2,
    stagger: 0.4,
    ease: "back.out(1.7)",
  },
  "<0.8"
);

// Animate character stats
mainTimeline.fromTo(
  ".stat-fill",
  {
    width: "0%",
  },
  {
    width: (index, target) => target.style.width,
    duration: 2,
    stagger: 0.2,
    ease: "power2.out",
  },
  "<1"
);

// Transition to section 4
mainTimeline.to(".hero-3-container", {
  opacity: 0,
  scale: 0.9,
  duration: 2,
}, "+=1.5");

mainTimeline.set(".hero-3-container", { visibility: "hidden" });
mainTimeline.set(".hero-4-container", { visibility: "visible" });

// Section 4: Features section
mainTimeline.to(".hero-4-container", {
  opacity: 1,
  duration: 2,
}, "<+=0.5");

mainTimeline.fromTo(
  ".hero-4-container .section-title",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
  },
  "<0.5"
);

mainTimeline.fromTo(
  ".feature-item",
  {
    y: 50,
    opacity: 0,
    scale: 0.8,
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1.8,
    stagger: 0.3,
    ease: "back.out(1.7)",
  },
  "<0.8"
);

// Animate feature numbers
mainTimeline.fromTo(
  ".feature-number",
  {
    scale: 0,
    rotation: 180,
  },
  {
    scale: 1,
    rotation: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "back.out(2)",
  },
  "<1"
);

// Transition to section 5
mainTimeline.to(".hero-4-container", {
  opacity: 0,
  scale: 0.9,
  duration: 2,
}, "+=1.5");

mainTimeline.set(".hero-4-container", { visibility: "hidden" });
mainTimeline.set(".hero-5-container", { visibility: "visible" });

// Section 5: Pre-order section
mainTimeline.to(".hero-5-container", {
  opacity: 1,
  duration: 2,
}, "<+=0.5");

mainTimeline.fromTo(
  ".hero-5-container .section-title",
  {
    y: 40,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
  },
  "<0.5"
);

mainTimeline.fromTo(
  ".pre-order-desc",
  {
    y: 20,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
  },
  "<0.3"
);

mainTimeline.fromTo(
  ".edition-card",
  {
    y: 60,
    opacity: 0,
    scale: 0.8,
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 2,
    stagger: 0.3,
    ease: "back.out(1.7)",
  },
  "<0.8"
);

// Add hover effects for interactive elements
document.querySelectorAll('.pre-order-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

// Add click handlers for pre-order buttons
document.querySelectorAll('.pre-order-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = e.offsetX - 10 + 'px';
    ripple.style.top = e.offsetY - 10 + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    
    btn.style.position = 'relative';
    btn.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Show alert for demo
    alert('Pre-order functionality would be implemented here!');
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add parallax effect to background elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.holographic-overlay');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add random glitch effect
function addRandomGlitch() {
  const glitchElements = document.querySelectorAll('.glitch-text');
  
  setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every interval
      glitchElements.forEach(element => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'glitch-1 0.3s ease-in-out';
      });
    }
  }, 3000);
}

addRandomGlitch();

console.log('🎮 GTA VI Enhanced Website Loaded! 🎮');