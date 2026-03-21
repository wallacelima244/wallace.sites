document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. SCROLL REVEAL (Animação estilo Gringa)
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100; // Distância antes de aparecer

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };

  // Roda a verificação assim que a página abre e quando rola
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Dispara para os itens que já estão na tela no topo

  // ==========================================
  // 2. NAVBAR INTELIGENTE (ESCONDE AO DESCER)
  // ==========================================
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Esconde a barra ao rolar pra baixo
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }
    lastScrollTop = scrollTop;
  });

  // ==========================================
  // 3. MENU GAVETA MOBILE BLINDADO
  // ==========================================
  const menuToggleBtn = document.getElementById("menuToggle");
  const mobileMenuDiv = document.getElementById("mobileMenu");

  if (menuToggleBtn && mobileMenuDiv) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenuDiv.classList.toggle("active");
    });
  }

  window.addEventListener("scroll", () => {
    if (mobileMenuDiv && mobileMenuDiv.classList.contains("active") && window.scrollY > 10) {
      mobileMenuDiv.classList.remove("active");
    }
  });

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenuDiv) mobileMenuDiv.classList.remove("active");
    });
  });

  // ==========================================
  // 4. ROLAGEM SUAVE DESCONTANDO A NAVBAR
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 90, 
          behavior: 'smooth'
        });
      }
    });
  });

});