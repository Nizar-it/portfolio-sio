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
    }, 120);

    /* --- 2. LE DIGIVERS (Fond Binaire Statique et Immobile) --- */
    const canvas = document.getElementById('digiverse-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function drawStaticBinary() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Couleur des chiffres (Bleu Tech léger pour ne pas gêner la lecture)
            ctx.fillStyle = 'rgba(2, 117, 216, 0.15)'; 
            ctx.font = '14px monospace';
            
            const columns = Math.floor(canvas.width / 14);
            const rows = Math.floor(canvas.height / 14);
            
            // Dessine une grille immobile de 0 et de 1
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    // On ne remplit que 15% de l'écran aléatoirement pour un fond aéré et propre
                    if (Math.random() > 0.85) { 
                        const text = Math.random() > 0.5 ? '1' : '0';
                        ctx.fillText(text, i * 14, j * 14);
                    }
                }
            }
        }
        
        // On dessine le fond une seule fois au chargement
        drawStaticBinary();
        
        // On le redessine uniquement si la fenêtre change de taille
        window.addEventListener('resize', drawStaticBinary);
    }

    /* --- 3. MACHINE À ÉCRIRE --- */
    function startTypewriter() {
        const text = "NIZAR RABHI";
        const element = document.getElementById('typewriter');
        if(!element) return;
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

    /* --- 4. EFFET DE DÉCODAGE TEXTE --- */
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    document.querySelectorAll('.hacker-text').forEach(el => {
        el.addEventListener('mouseover', event => {
            let iterations = 0;
            const originalText = event.target.dataset.value;
            
            const interval = setInterval(() => {
                event.target.innerText = originalText.split("")
                    .map((letter, index) => {
                        if(index < iterations) return originalText[index];
                        return letters[Math.floor(Math.random() * 42)];
                    })
                    .join("");
                
                if(iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);
        });
    });

    /* --- 5. APPARITION AU DÉFILEMENT --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});