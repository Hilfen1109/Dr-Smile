// Inicializar todas las funcionalidades avanzadas
window.addEventListener('load', () => {
    initAdvancedFeatures();
});

// Función principal para inicializar todas las funcionalidades
function initAdvancedFeatures() {
    initAnimatedStats();
    initGalleryFilter();
    initBeforeAfterSlider();
    init3DEffects();
    initRippleEffect();
    initDarkMode();
}

// Estadísticas Animadas
function initAnimatedStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                animateNumber(target, 0, count, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Galería Interactiva con Filtro
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length || !galleryItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar elementos
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// Slider Antes/Después Interactivo
function initBeforeAfterSlider() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const divider = item.querySelector('.image-divider');
        const beforeImage = item.querySelector('.gallery-image.before');
        const afterImage = item.querySelector('.gallery-image.after');
        
        if (!divider || !beforeImage || !afterImage) return;
        
        let isDragging = false;
        let currentX = 50; // Posición inicial (50%)
        
        function updateSliderPosition(x) {
            const rect = item.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
            currentX = percentage;
            
            beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
            afterImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
            divider.style.left = percentage + '%';
        }
        
        // Eventos de mouse
        divider.addEventListener('mousedown', () => isDragging = true);
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', (e) => {
            if (isDragging) updateSliderPosition(e.clientX);
        });
        
        // Eventos de touch
        divider.addEventListener('touchstart', () => isDragging = true);
        document.addEventListener('touchend', () => isDragging = false);
        document.addEventListener('touchmove', (e) => {
            if (isDragging) updateSliderPosition(e.touches[0].clientX);
        });
    });
}

// Efectos 3D en Hero
function init3DEffects() {
    const heroImage3D = document.querySelector('.hero-image-3d');
    if (!heroImage3D) return;
    
    heroImage3D.addEventListener('mousemove', (e) => {
        const rect = heroImage3D.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateY = (x - 0.5) * 10;
        const rotateX = (y - 0.5) * -10;
        
        heroImage3D.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    heroImage3D.addEventListener('mouseleave', () => {
        heroImage3D.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
}

// Efecto Ripple en Botones
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple');
            if (!ripple) return;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
        });
    });
}

// Navegación móvil
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle del menú móvil
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Cambiar estilo de la barra de navegación al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.scrollY > 50) {
        if (navbar) navbar.classList.add('scrolled');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
    }
    
    // Cerrar menú móvil al hacer scroll
    if (window.scrollY > 100 && navMenu && navMenu.classList.contains('active')) {
        if (hamburger) hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Formulario de contacto con validación
const contactForm = document.getElementById('appointment-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!validateForm()) {
            return;
        }
        
        // Mostrar loader
        const submitBtn = this.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        
        // Simular envío
        setTimeout(() => {
            // Mostrar mensaje de éxito
            const successMessage = this.querySelector('.form-success');
            successMessage.style.display = 'flex';
            
            // Resetear formulario
            this.reset();
            
            // Ocultar loader y mostrar botón normal
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, 2000);
    });
}

// Validación de formulario
function validateForm() {
    const form = document.getElementById('appointment-form');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        // Limpiar errores anteriores
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        // Validar campo
        if (!input.value.trim()) {
            formGroup.classList.add('error');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            formGroup.classList.add('error');
            isValid = false;
        } else if (input.type === 'tel' && !isValidPhone(input.value)) {
            formGroup.classList.add('error');
            isValid = false;
        }
    });
    
    // Validar checkbox de términos
    const privacyCheckbox = form.querySelector('#privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        privacyCheckbox.closest('.form-group').classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar teléfono
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 7;
}

// Animaciones de scroll con Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .service-card, .team-member, .testimonial, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Botón Scroll to Top
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Ir arriba');
    document.body.appendChild(scrollToTopBtn);
    
    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll suave al hacer clic
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navegación activa según sección visible
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Efectos parallax
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Inicializar todo cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initScrollToTop();
    initActiveNavigation();
    initParallaxEffects();
    
    // Efectos hover adicionales
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animación de título hero
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroStats = document.querySelector('.hero-stats');
    
    if (heroTitle) heroTitle.classList.add('hero-title');
    if (heroDescription) heroDescription.classList.add('hero-description');
    if (heroButtons) heroButtons.classList.add('hero-buttons');
    if (heroStats) heroStats.classList.add('hero-stats');
});

// Prevenir comportamientos no deseados
document.addEventListener('contextmenu', (e) => {
    // Permitir click derecho en inputs y textarea
    if (!e.target.matches('input, textarea')) {
        e.preventDefault();
    }
});

// Prevenir selección de texto en elementos interactivos
document.addEventListener('selectstart', (e) => {
    if (e.target.matches('.btn, .nav-link, .service-link, .testimonial-nav')) {
        e.preventDefault();
    }
});

// Optimización de rendimiento
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    ticking = false;
    // Aquí irían las animaciones que requieren optimización
}

// Escuchar eventos de scroll con optimización
window.addEventListener('scroll', requestTick);

// Dark Mode Implementation
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    if (!darkModeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    
    // Update toggle button title and icon based on current theme
    updateToggleTitle(currentTheme);
    updateToggleIcon(currentTheme);
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme switching
        html.classList.add('theme-transitioning');
        
        // Update theme
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleTitle(newTheme);
        updateToggleIcon(newTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            html.classList.remove('theme-transitioning');
        }, 300);
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // Use addEventListener instead of deprecated addListener
        darkModeQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'dark' : 'light';
                html.setAttribute('data-theme', systemTheme);
                updateToggleTitle(systemTheme);
                updateToggleIcon(systemTheme);
            }
        });
    }
}

function updateToggleTitle(theme) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    if (theme === 'dark') {
        darkModeToggle.title = 'Cambiar a modo día';
    } else {
        darkModeToggle.title = 'Cambiar a modo noche';
    }
}

function updateToggleIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (!themeIcon) return;
    
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Add smooth transition for theme switching
const style = document.createElement('style');
style.textContent = `
    .theme-transitioning *,
    .theme-transitioning *::before,
    .theme-transitioning *::after {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    }
`;
document.head.appendChild(style);
