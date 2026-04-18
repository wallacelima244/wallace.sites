document.addEventListener('DOMContentLoaded', () => {

    // 1. Efeito da Navbar ao rolar (Fundo fica borrado e mais escuro)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menu Mobile Full Screen
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');
    const body = document.body;

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            body.classList.toggle('no-scroll');
            
            const icon = mobileMenu.querySelector('i');
            if(mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fecha o menu ao clicar num link
        mobileLinks.forEach(item => {
            item.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                body.classList.remove('no-scroll');
                mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // 3. Scroll Reveal Elegante
    const revealOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. EFEITO 3D Tilt nos Cards
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            if(window.innerWidth > 992) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4; 
                const rotateY = ((x - centerX) / centerX) * 4;
                
                let scale = card.classList.contains('premium-card') ? 1.05 : 1.02;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if(window.innerWidth > 992) {
                let scale = card.classList.contains('premium-card') ? 1.05 : 1;
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(${scale}, ${scale}, ${scale})`;
            }
        });
    });

    // 5. Contador Animado Suave (Estatísticas)
    const stats = document.querySelectorAll('.stat-number');
    let counted = false;
    const countObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            counted = true;
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000; 
                const increment = target / (duration / 16); 
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if(statsSection) countObserver.observe(statsSection);

    // 6. FAQ Accordion Otimizado
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const isOpen = item.classList.contains('active');
            
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});