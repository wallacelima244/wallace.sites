document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. SCROLL REVEAL
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = window.innerWidth < 768 ? 40 : 100; 
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // ==========================================
  // 2. ANIMAÇÃO DOS NÚMEROS
  // ==========================================
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-section");
  let hasCounted = false;

  const startCounting = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; 
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

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        startCounting();
        hasCounted = true; 
      }
    }, { threshold: 0.3 }); 
    observer.observe(statsSection);
  }

  // ==========================================
  // 3. NAVBAR INTELIGENTE E MENU GAVETA
  // ==========================================
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");
  const menuToggleBtn = document.getElementById("menuToggle");
  const mobileMenuDiv = document.getElementById("mobileMenu");
  const body = document.body;

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }
    lastScrollTop = scrollTop;
  });

  const toggleMenu = () => {
    const isActive = mobileMenuDiv.classList.toggle("active");
    menuToggleBtn.innerHTML = isActive ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars-staggered"></i>';
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

  // ==========================================
  // 4. ROLAGEM SUAVE DOS LINKS (Com ou sem Menu)
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === "#") return; 

      if (mobileMenuDiv.classList.contains("active")) toggleMenu();

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