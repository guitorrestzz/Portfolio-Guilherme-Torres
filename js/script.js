// Esperar que o DOM seja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Referências aos elementos
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");
  const header = document.querySelector("header");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const statNumbers = document.querySelectorAll(".stat-number");
  const skillLevels = document.querySelectorAll(".skill-level");
  const contactForm = document.getElementById("contactForm");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll("nav ul li a");

  // Toggle menu para dispositivos móveis
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      this.querySelector("i").classList.toggle("fa-bars");
      this.querySelector("i").classList.toggle("fa-times");
    });
  }

  // Navegação suave para links de âncora com efeito mais elaborado
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Fechar menu móvel se estiver aberto
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.querySelector("i").classList.add("fa-bars");
        menuToggle.querySelector("i").classList.remove("fa-times");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Adicionar efeito de destaque ao clicar no link
        this.classList.add("pulse");
        setTimeout(() => {
          this.classList.remove("pulse");
        }, 500);

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Efeito de header ao rolar com transição mais suave
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Destacar item de navegação ativo com base na seção visível
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    // Animar elementos quando entrarem na viewport
    animateOnScroll();
  });

  // Tabs para habilidades com animação melhorada
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Adicionar efeito de clique
      this.classList.add("pulse");
      setTimeout(() => {
        this.classList.remove("pulse");
      }, 500);

      // Remover classe active de todos os botões
      tabBtns.forEach((b) => b.classList.remove("active"));

      // Adicionar classe active ao botão clicado
      this.classList.add("active");

      // Mostrar conteúdo da tab correspondente com animação
      const tabId = this.getAttribute("data-tab");

      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.style.display = "none";
      });

      const activeContent = document.getElementById(tabId + "-skills");
      activeContent.style.display = "block";

      setTimeout(() => {
        activeContent.classList.add("active");
      }, 50);
    });
  });

  // Filtro de projetos com animações mais elaboradas
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Adicionar efeito de clique
      this.classList.add("pulse");
      setTimeout(() => {
        this.classList.remove("pulse");
      }, 500);

      // Remover classe active de todos os botões
      filterBtns.forEach((b) => b.classList.remove("active"));

      // Adicionar classe active ao botão clicado
      this.classList.add("active");

      // Filtrar projetos com animação mais suave
      const filter = this.getAttribute("data-filter");

      projectCards.forEach((card, index) => {
        // Adicionar atraso baseado no índice para efeito cascata
        const delay = index * 100;

        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.transform = "scale(0.8) translateY(20px)";
          card.style.opacity = "0";

          setTimeout(() => {
            card.style.display = "block";
            setTimeout(() => {
              card.style.transform = "scale(1) translateY(0)";
              card.style.opacity = "1";
            }, 50);
          }, delay);
        } else {
          card.style.transform = "scale(0.8) translateY(0)";
          card.style.opacity = "0";

          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Contador para estatísticas com animação mais suave
  function startCounting() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      let count = 0;
      const duration = 2500; // 2.5 segundos
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const increment = target / totalFrames;

      // Adicionar classe para iniciar animação
      stat.classList.add("counting");

      const counter = setInterval(() => {
        count += increment;

        if (count >= target) {
          stat.textContent = target;
          stat.classList.add("counted");
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(count);
        }
      }, frameDuration);
    });
  }

  // Animar elementos quando entrarem na viewport com efeitos melhorados
  function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    // Animar barras de habilidades com efeito cascata
    skillLevels.forEach((skill, index) => {
      const skillTop = skill.getBoundingClientRect().top;

      if (skillTop < triggerBottom) {
        // Adicionar atraso baseado no índice
        setTimeout(() => {
          skill.style.width = skill.style.width;
          skill.classList.add("animated");
        }, index * 100);
      }
    });

    // Animar seções quando entrarem na viewport
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.classList.add("in-view");
      }
    });

    // Iniciar contagem quando a seção estiver visível
    const statsSection = document.querySelector(".about-stats");
    if (
      statsSection &&
      statsSection.getBoundingClientRect().top < triggerBottom &&
      !statsSection.classList.contains("counted")
    ) {
      statsSection.classList.add("counted");
      startCounting();
    }

    // Animar cards com efeito cascata
    const animatableElements = document.querySelectorAll(
      ".skill-category, .methodology-item, .objective-item, .certificate-item, .soft-skill-item, .project-card"
    );

    animatableElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        // Adicionar atraso baseado no índice
        setTimeout(() => {
          element.classList.add("in-view");
        }, (index % 3) * 150);
      }
    });
  }

  // Efeito de digitação para o título principal
  function typeWriterEffect() {
    const heroTitle = document.querySelector(".hero-content h2");
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";
    heroTitle.style.borderRight = "0.15em solid var(--accent-color)";

    let i = 0;
    const speed = 50; // velocidade da digitação

    function type() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Remover cursor após completar
        setTimeout(() => {
          heroTitle.style.borderRight = "none";
        }, 1000);
      }
    }

    setTimeout(type, 500);
  }

  // Validação do formulário de contato com feedback visual aprimorado
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Adicionar classe de loading ao botão
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.classList.add("loading");

      // Simular atraso de envio
      setTimeout(() => {
        // Adicionar efeito de sucesso
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("success");

        // Exibir mensagem de sucesso com animação
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entrarei em contato em breve.';
        successMessage.style.transform = "translateY(20px)";
        successMessage.style.opacity = "0";

        contactForm.appendChild(successMessage);

        // Animar entrada da mensagem
        setTimeout(() => {
          successMessage.style.transform = "translateY(0)";
          successMessage.style.opacity = "1";
        }, 100);

        // Resetar formulário
        contactForm.reset();

        // Restaurar botão após alguns segundos
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove("success");

          // Animar saída da mensagem
          successMessage.style.transform = "translateY(-20px)";
          successMessage.style.opacity = "0";

          setTimeout(() => {
            contactForm.removeChild(successMessage);
          }, 500);
        }, 3000);
      }, 1500);
    });

    // Adicionar efeito de foco nos campos do formulário
    const formInputs = contactForm.querySelectorAll("input, textarea");

    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        if (this.value === "") {
          this.parentElement.classList.remove("focused");
        }
      });
    });
  }

  // Efeito de paralaxe para seções
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    // Paralaxe para o hero
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }

    // Paralaxe para outras seções
    document.querySelectorAll(".bg-alt").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition > sectionTop - window.innerHeight &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const yPos = (scrollPosition - sectionTop) * 0.1;
        section.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  });

  // Efeito de hover 3D para cards
  function addTiltEffect() {
    const tiltElements = document.querySelectorAll(
      ".project-card, .skill-category, .methodology-item, .objective-item, .certificate-item, .soft-skill-item"
    );

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = x / rect.width;
        const yPercent = y / rect.height;

        const rotateX = (0.5 - yPercent) * 10;
        const rotateY = (xPercent - 0.5) * 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        this.style.boxShadow = `0 15px 35px rgba(79, 70, 229, 0.2), ${
          rotateY / 2
        }px ${rotateX / 2}px 15px rgba(0, 0, 0, 0.1)`;
      });

      element.addEventListener("mouseleave", function () {
        this.style.transform = "";
        this.style.boxShadow = "";
      });
    });
  }

  // Adicionar efeito de revelação aos elementos com atraso baseado na posição
  function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(
      ".skill-category, .methodology-item, .objective-item, .certificate-item, .soft-skill-item, .project-card"
    );

    revealElements.forEach((element, index) => {
      // Definir atraso baseado no índice e posição na grade
      const row = Math.floor(index / 3);
      const col = index % 3;
      const delay = row * 100 + col * 100;

      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`;

      // Adicionar classe para revelar com atraso
      setTimeout(() => {
        element.classList.add("reveal-ready");
      }, 100);
    });
  }

  // Adicionar efeito de destaque para links de navegação
  function setupNavHighlight() {
    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        this.classList.add("highlight");
      });

      link.addEventListener("mouseleave", function () {
        this.classList.remove("highlight");
      });
    });
  }

  // Adicionar CSS para novos efeitos
  function addDynamicStyles() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .pulse {
                animation: pulse 0.5s ease;
            }
            
            .particles-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 1;
            }
            
            .particle {
                position: absolute;
                border-radius: 50%;
                pointer-events: none;
                transition: all 0.3s ease;
            }
            
            .section {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 1s ease, transform 1s ease;
            }
            
            .section.in-view {
                opacity: 1;
                transform: translateY(0);
            }
            
            .skill-category, .methodology-item, .objective-item, .certificate-item, .soft-skill-item, .project-card {
                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                            box-shadow 0.5s ease, 
                            opacity 0.5s ease;
            }
            
            .skill-category.in-view, .methodology-item.in-view, .objective-item.in-view, 
            .certificate-item.in-view, .soft-skill-item.in-view, .project-card.in-view,
            .reveal-ready {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .skill-level {
                width: 0 !important;
                transition: width 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .skill-level.animated {
                width: 100% !important;
            }
            
            .stat-number {
                position: relative;
                display: inline-block;
            }
            
            .stat-number.counting::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                animation: loadingBar 2.5s forwards;
            }
            
            @keyframes loadingBar {
                from { width: 0; }
                to { width: 100%; }
            }
            
            .success-message {
                color: var(--accent-secondary);
                padding: 1rem;
                margin-top: 1rem;
                background-color: rgba(16, 185, 129, 0.1);
                border-radius: 8px;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .form-group.focused label {
                color: var(--primary-color);
                transform: translateY(-5px);
                transition: all 0.3s ease;
            }
            
            nav ul li a {
                position: relative;
            }
            
            nav ul li a.active::after {
                width: 100%;
            }
            
            nav ul li a.highlight::before {
                content: '';
                position: absolute;
                top: -5px;
                left: -10px;
                right: -10px;
                bottom: -5px;
                background: rgba(79, 70, 229, 0.1);
                border-radius: 20px;
                z-index: -1;
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            nav ul li a.highlight::before {
                transform: scale(1);
                opacity: 1;
            }
            
            button.loading, button.success {
                position: relative;
                overflow: hidden;
            }
            
            button.loading::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                animation: loading 1.5s infinite;
            }
            
            button.success {
                background-color: var(--accent-secondary) !important;
            }
            
            @keyframes loading {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;

    document.head.appendChild(styleElement);
  }

  // Inicializar todas as animações e efeitos
  function initializeEffects() {
    // Adicionar estilos dinâmicos
    addDynamicStyles();

    // Configurar animações iniciais
    setupRevealAnimations();
    setupNavHighlight();

    // Adicionar efeitos especiais
    createParticles();
    typeWriterEffect();
    addTiltEffect();

    // Iniciar animações baseadas em scroll
    animateOnScroll();

    // Iniciar com o primeiro tab ativo
    if (tabBtns.length > 0 && tabContents.length > 0) {
      tabBtns[0].classList.add("active");
      tabContents[0].classList.add("active");
    }

    // Iniciar com todos os projetos visíveis
    if (filterBtns.length > 0) {
      filterBtns[0].classList.add("active");
    }
  }

  // Inicializar todos os efeitos após um pequeno atraso para garantir que tudo esteja carregado
  setTimeout(initializeEffects, 100);
});

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const feedback = document.getElementById('formFeedback');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');

  // Feedback visual
  btnText.textContent = "Enviando...";
  btnIcon.className = "fas fa-spinner fa-spin";
  feedback.innerHTML = '';

  try {
      const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
              'Accept': 'application/json'
          }
      });

      if (response.ok) {
          feedback.innerHTML = `
              <div class="success-message">
                  <i class="fas fa-check-circle"></i> Mensagem enviada com sucesso!
              </div>
          `;
          form.reset();
      } else {
          throw new Error(`Erro HTTP: ${response.status}`);
      }
  } catch (error) {
      console.error("Erro no envio:", error);
      feedback.innerHTML = `
          <div class="error-message">
              <i class="fas fa-exclamation-circle"></i> Erro ao enviar. Tente novamente mais tarde.
          </div>
      `;
  } finally {
      btnText.textContent = "Enviar Mensagem";
      btnIcon.className = "fas fa-paper-plane";
      setTimeout(() => feedback.innerHTML = '', 5000);
  }
});

// Dark/Light Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Verificar preferência do usuário
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Aplicar modo inicial
if (localStorage.getItem('darkMode') === 'enabled' || 
    (localStorage.getItem('darkMode') !== 'disabled' && prefersDarkScheme.matches)) {
    enableDarkMode();
}

// Ouvinte para mudanças no toggle
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    darkModeToggle.checked = false;
    localStorage.setItem('darkMode', 'disabled');
}

// Ouvinte para mudanças na preferência do sistema
prefersDarkScheme.addListener(e => {
    if (localStorage.getItem('darkMode') === null) {
        if (e.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
});
