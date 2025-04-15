document.addEventListener('DOMContentLoaded', () => {
    // Control de videos de fondo
    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');
    let currentVideo = video1;

    function initVideos() {
        // Configuración inicial de videos
        [video1, video2].forEach(video => {
            video.style.position = 'fixed';
            video.style.top = '0';
            video.style.left = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.zIndex = '-1';
            video.play().catch(e => console.log(`Autoplay bloqueado: ${e}`));
        });

        // Mostrar solo el primer video inicialmente
        video1.style.opacity = '1';
        video2.style.opacity = '0';

        // Rotación cada 30 segundos
        setInterval(() => {
            if (currentVideo === video1) {
                video1.style.opacity = '0';
                video2.style.opacity = '1';
                currentVideo = video2;
            } else {
                video1.style.opacity = '1';
                video2.style.opacity = '0';
                currentVideo = video1;
            }
        }, 30000);
    }

    // Navegación
    const navLinks = document.querySelectorAll('#navbar a');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveMenu() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    function setupSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Inicialización
    initVideos();
    setupSmoothScroll();
    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu(); // Actualizar al cargar
});