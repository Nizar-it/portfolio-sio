document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. BOOT SCREEN (Écran de démarrage) --- */
    const bootScreen = document.getElementById('boot-screen');
    const progressBar = document.querySelector('.progress');
    const bootText = document.getElementById('boot-text');
    
    let progress = 0;
    const bootInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10;
        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = '100%';
            clearInterval(bootInterval);
            bootText.innerText = "SYSTÈME PRÊT";
            
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                    startTypewriter(); 
                }, 500);
            }, 600);
        } else {
            progressBar.style.width = progress + '%';
        }
    }, 100);

    /* --- 2. MENU BURGER MOBILE --- */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });

        // Ferme le menu mobile automatiquement quand on clique sur un lien
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
            });
        });
    }

    /* --- 3. SCROLL SPY (Mise à jour automatique du lien actif dans la navbar) --- */
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 180) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-link');
            }
        });
    });

    /* --- 4. LE DIGIVERS (Fond Binaire Statique et Immobile) --- */
    const canvas = document.getElementById('digiverse-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function drawStaticBinary() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(2, 117, 216, 0.15)'; 
            ctx.font = '14px monospace';
            
            const columns = Math.floor(canvas.width / 14);
            const rows = Math.floor(canvas.height / 14);
            
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    if (Math.random() > 0.85) { 
                        const text = Math.random() > 0.5 ? '1' : '0';
                        ctx.fillText(text, i * 14, j * 14);
                    }
                }
            }
        }
        
        drawStaticBinary();
        window.addEventListener('resize', drawStaticBinary);
    }

    /* --- 5. MACHINE À ÉCRIRE --- */
    function startTypewriter() {
        const text = "NIZAR RABHI";
        const element = document.getElementById('typewriter');
        if (!element) return;
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        type();
    }

    /* --- 6. EFFET DE DÉCODAGE TEXTE (Optimisé pour éviter les conflits de survol) --- */
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    document.querySelectorAll('.hacker-text').forEach(el => {
        el.addEventListener('mouseover', event => {
            let iterations = 0;
            const target = event.currentTarget;
            const originalText = target.dataset.value;
            if (!originalText) return;

            // Annule l'animation précédente si la souris repasse rapidement dessus
            if (target.dataset.intervalId) {
                clearInterval(Number(target.dataset.intervalId));
            }
            
            const interval = setInterval(() => {
                target.innerText = originalText.split("")
                    .map((letter, index) => {
                        if (index < iterations) return originalText[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    target.innerText = originalText;
                }
                iterations += 1 / 3;
            }, 30);

            target.dataset.intervalId = interval;
        });
    });

    /* --- 7. APPARITION AU DÉFILEMENT --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});
