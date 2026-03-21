document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. MOTOR DE ANIMAÇÃO (REVEAL) - VERSÃO ULTRA FLUIDA
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal");
  
  const observerOptions = {
    threshold: 0.15, // Dispara quando 15% do elemento entra na tela
    rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes de chegar para evitar "atrasos"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Para de processar o elemento após animar (ganha performance)
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 2. ANIMAÇÃO DOS NÚMEROS (CONTADOR)
  // ==========================================
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-section");
  let hasCounted = false;

  const startCounting = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // 2 segundos de animação
      const increment = target / (duration / 16); 
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  // Observador específico para os números
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        startCounting();
        hasCounted = true;
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 3. NAVBAR INTELIGENTE (ESCONDE AO DESCER / APARECE AO SUBIR)
  // ==========================================
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Se rolou mais que 100px para baixo, esconde a barra
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add("nav-hidden");
    } else {
      // Se subiu, mostra a barra novamente
      navbar.classList.remove("nav-hidden");
    }
    lastScrollTop = scrollTop;
  }, { passive: true });

  // ==========================================
  // 4. MENU GAVETA MOBILE (ABRIR / FECHAR)
  // ==========================================
  const menuToggleBtn = document.getElementById("menuToggle");
  const mobileMenuDiv = document.getElementById("mobileMenu");
  const body = document.body;

  const toggleMenu = () => {
    const isActive = mobileMenuDiv.classList.toggle("active");
    // Altera o ícone de Barras para X ao abrir
    menuToggleBtn.innerHTML = isActive ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars-staggered"></i>';
    
    // Trava o scroll do fundo para o menu não bugar no celular
    if (isActive) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  };

  if (menuToggleBtn && mobileMenuDiv) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Fecha o menu automaticamente ao clicar em qualquer link interno
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenuDiv.classList.contains("active")) toggleMenu();
    });
  });

  // ==========================================
  // 5. ROLAGEM SUAVE (SMOOTH SCROLL)
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Desconto da altura da navbar
          behavior: 'smooth'
        });
      }
    });
  });

});