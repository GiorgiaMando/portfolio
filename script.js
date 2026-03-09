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

    // 4. Interactive Canvas (Digital Grid system)
    initInteractiveCanvas();
});

/**
 * Initializes the Interactive Canvas for the Hero section
 */
function initInteractiveCanvas() {
    const canvas = document.getElementById('interactive-canvas');
    if (!canvas) return; // Exit if not on the homepage

    const ctx = canvas.getContext('2d');
    let width, height;

    // Configurazione particelle
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100; // Leggermente più fitte
    const maxConnectionDistance = 150; // Raggio di connessione maggiore
    const mouseRadius = 200; // Raggio reazione mouse maggiore
    const baseColor = 'rgba(70, 70, 70, 0.8)'; // Grigio molto più scuro e opaco
    const accentColor = '#0057FF'; // Digital Blue

    // Stato del mouse
    let mouse = {
        x: null,
        y: null
    };

    // Resize del canvas per mantenerlo nitido e responsivo
    function resizeCanvas() {
        const parent = canvas.parentElement;
        width = parent.clientWidth;
        height = parent.clientHeight;

        // Gestione schermi ad alta densità di pixel (Retina)
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Riavvia particelle se lo schermo cambia drasticamente
        initParticles();
    }

    // Struttura della singola particella
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Movimento leggermente più veloce rispetto a prima
            this.vx = (Math.random() - 0.5) * 1.0;
            this.vy = (Math.random() - 0.5) * 1.0;
            // Punti due volte più grandi
            this.radius = Math.random() * 2.5 + 1.5;
            this.baseX = this.x;
            this.baseY = this.y;
        }

        update() {
            // Movimento naturale autonomo
            this.x += this.vx;
            this.y += this.vy;

            // Rimbalzo morbido sui bordi del canvas
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Interazione col mouse
            if (mouse.x !== null) {
                // Calcola distanza tra particella e mouse
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Se la particella è nel raggio d'azione del mouse
                if (distance < mouseRadius) {
                    // Crea un effetto "repulsione/attrazione" magnetico leggero
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;

                    // Forza di fuga notevolmente maggiore e più rapida
                    const force = (mouseRadius - distance) / mouseRadius;
                    this.x -= forceDirectionX * force * 4.0;
                    this.y -= forceDirectionY * force * 4.0;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = baseColor;

            // Seleziona colore in base alla distanza dal mouse
            if (mouse.x !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseRadius * 0.8) {
                    ctx.fillStyle = accentColor;
                }
            }

            ctx.fill();
        }
    }

    // Inizializza array particelle
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Loop di animazione
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Aggiorna e disegna particelle
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Disegna linee di connessione tra particelle vicine
        connectParticles();

        requestAnimationFrame(animate);
    }

    // Disegna rete geometrica
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxConnectionDistance) {
                    // Opacità basata sulla distanza
                    let opacity = 1 - (distance / maxConnectionDistance);
                    // Linee base opacità molto più alta (0.6 invede di 0.2)
                    opacity = opacity * 0.6;

                    ctx.strokeStyle = `rgba(70, 70, 70, ${opacity})`; // Dark Slate
                    ctx.lineWidth = 1.5; // Linee considerevolmente più esposte rispetto prima

                    // Se le particelle collegate sono vicine al mouse, la linea diventa blu digitale
                    if (mouse.x !== null) {
                        let p1MouseDist = Math.sqrt(Math.pow(mouse.x - particles[a].x, 2) + Math.pow(mouse.y - particles[a].y, 2));
                        let p2MouseDist = Math.sqrt(Math.pow(mouse.x - particles[b].x, 2) + Math.pow(mouse.y - particles[b].y, 2));
                        if (p1MouseDist < mouseRadius * 0.9 && p2MouseDist < mouseRadius * 0.9) {
                            ctx.strokeStyle = `rgba(0, 87, 255, ${opacity * 1.5})`; // Digital Blue accent
                            ctx.lineWidth = 3; // Linea di hover triplicata di spessore
                        }
                    }

                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);

    // Ascolta il mouse solo quando è sopra o vicino al canvas
    canvas.addEventListener('mousemove', (e) => {
        // Calcola la posizione precisa del mouse rispetto all'elemento canvas
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Quando il mouse esce dal canvas
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Avvio
    resizeCanvas();
    animate();
}

// ========================================== //
//     LANGUAGE SELECTION LOGIC (IT / EN)         //
// ========================================== //

document.addEventListener('DOMContentLoaded', () => {
    const btnIt = document.getElementById('lang-it');
    const btnEn = document.getElementById('lang-en');

    // Se i pulsanti non esistono (es. su cartelle vecchie o pagine non aggiornate), ferma l'esecuzione per questa parte.
    if (!btnIt || !btnEn) return;

    // 1. Controlla lingua salvata in precedenza, o default a 'it'
    let currentLang = localStorage.getItem('portfolio_lang') || 'it';

    // 2. Funzione per applicare la lingua
    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('portfolio_lang', lang);

        // Aggiorna stile bottoni
        if (lang === 'it') {
            btnIt.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnIt.classList.remove('active');
        }

        // Recupera le traduzioni (deve esistere la variabile i18nTranslations caricata dal file lang.js)
        if (typeof window.i18nTranslations === 'undefined') {
            console.error("lang.js non è stato caricato correttamente.");
            return;
        }

        // Sostituisci i testi su tutti gli elementi con l'attributo data-i18n
        const translatableElements = document.querySelectorAll('[data-i18n]');
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.i18nTranslations[key] && window.i18nTranslations[key][lang]) {
                el.innerHTML = window.i18nTranslations[key][lang];
            }
        });
    };

    // 3. Esegui subito al caricamento
    setLanguage(currentLang);

    // 4. Aggiungi gli eventi click ai pulsanti
    btnIt.addEventListener('click', () => setLanguage('it'));
    btnEn.addEventListener('click', () => setLanguage('en'));
});
