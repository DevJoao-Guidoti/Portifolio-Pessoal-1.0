// FUNCIONALIDADE DO MENU HAMBURGER
const floatingIcon = document.getElementById('floatingMenuIcon');
const hamburgerMenu = document.getElementById('hamburgerMenu');
let isMenuOpen = false;

// Toggle do menu
floatingIcon.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    floatingIcon.classList.toggle('active', isMenuOpen);
    hamburgerMenu.classList.toggle('active', isMenuOpen);
});

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
    if (!floatingIcon.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        if (isMenuOpen) {
            isMenuOpen = false;
            floatingIcon.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    }
});

// Fechar menu ao clicar em um link
const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        isMenuOpen = false;
        floatingIcon.classList.remove('active');
        hamburgerMenu.classList.remove('active');
    });
});

// COMPORTAMENTO NO SCROLL
let scrollTimeout;
window.addEventListener('scroll', function() {
    floatingIcon.classList.add('scrolling');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => floatingIcon.classList.remove('scrolling'), 150);
});

// SMOOTH SCROLL para os links do menu
document.querySelectorAll('.menu-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
