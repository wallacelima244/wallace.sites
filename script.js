document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. SCROLL REVEAL (Animação Fluida VIP)
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    // Se for celular (tela menor que 768px), a animação dispara mais cedo (50px)
    // Se for PC, dispara com 100px. Isso deixa perfeito nas duas telas!
    const elementVisible = window.innerWidth < 768 ? 40 : 100; 

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Dispara logo ao carregar a página

  // ==========================================
  // 2. ANIMAÇÃO DOS NÚMEROS (À prova de falhas no Mobile)
  // ==========================================
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-section");
  let hasCounted = false;

  const startCounting = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // 2 segundos
      const increment = target / (duration / 16); 
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          setTimeout(updateCounter, 16);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  // Observador de tela: Dispara assim que a seção aparece
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        startCounting();
        hasCounted = true; // Conta só 1 vez
      }
    }, { threshold: 0.3 }); // Dispara quando 30% da seção estiver na tela
    
    observer.observe(statsSection);
  }

  // ==========================================
  // 3. NAVBAR INTELIGENTE (ESCONDE AO DESCER)
  // ==========================================
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }
    lastScrollTop = scrollTop;
  });

  // ==========================================
  // 4. MENU GAVETA MOBILE (COM TRAVA DE SCROLL)
  // ==========================================
  const menuToggleBtn = document.getElementById("menuToggle");
  const mobileMenuDiv = document.getElementById("mobileMenu");
  const body = document.body;

  const toggleMenu = () => {
    const isActive = mobileMenuDiv.classList.toggle("active");
    // Altera o ícone de Barras para X
    menuToggleBtn.innerHTML = isActive ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars-staggered"></i>';
    
    // Trava ou destrava o fundo da tela no celular
    if (isActive) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  };

  if (menuToggleBtn && mobileMenuDiv) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Fecha clicando num link
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenuDiv.classList.contains("active")) toggleMenu();
    });
  });

  // ==========================================
  // 5. ROLAGEM SUAVE DOS LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === "#") return; // Ignora links vazios

      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, 
          behavior: 'smooth'
        });
      }
    });
  });

});