// Sidebar Toggle
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Atualiza o ícone do botão
            if (sidebar.classList.contains('collapsed')) {
                sidebarToggle.innerHTML = '→';
            } else {
                sidebarToggle.innerHTML = '☰';
            }
        });
    }
    
    // Animate stat bars on load
    setTimeout(() => {
        const statFills = document.querySelectorAll('.stat-fill');
        statFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }, 500);
    
    // Add floating animation delays to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Adiciona navegação smooth para os ícones do sidebar colapsado
    const addSidebarNavigation = () => {
        if (sidebar && sidebar.classList.contains('collapsed')) {
            sidebar.addEventListener('click', handleCollapsedSidebarClick);
        } else {
            sidebar.removeEventListener('click', handleCollapsedSidebarClick);
        }
    };
    
    const handleCollapsedSidebarClick = (e) => {
        // Verifica se o clique foi na área dos ícones
        const rect = sidebar.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        
        // Avatar clicável no topo
        if (clickY > 100 && clickY < 160) {
            // Clique no avatar - volta ao topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Mapeia as áreas clicáveis para as seções
        if (clickY > 200 && clickY < 240) {
            // Home icon area
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (clickY > 240 && clickY < 280) {
            // Projects icon area
            const projectsSection = document.querySelector('.projects-section');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (clickY > 280 && clickY < 320) {
            // Achievements icon area
            const achievementsSection = document.querySelector('.achievements-section');
            if (achievementsSection) {
                achievementsSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (clickY > 320 && clickY < 360) {
            // Contact icon area
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    // Observer para mudanças na classe collapsed
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                addSidebarNavigation();
            }
        });
    });
    
    if (sidebar) {
        observer.observe(sidebar, { attributes: true });
        addSidebarNavigation();
    }
});

// Smooth scrolling for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add interactive effects to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Evita o efeito ripple no botão do sidebar toggle
            if (this.classList.contains('sidebar-toggle')) return;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Adiciona funcionalidade de hover para melhor UX no sidebar colapsado
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    let hoverTimeout;
    
    if (sidebar) {
        sidebar.addEventListener('mouseenter', () => {
            if (sidebar.classList.contains('collapsed')) {
                clearTimeout(hoverTimeout);
                sidebar.style.boxShadow = '0 0 20px rgba(127, 176, 105, 0.3)';
            }
        });
        
        sidebar.addEventListener('mouseleave', () => {
            if (sidebar.classList.contains('collapsed')) {
                hoverTimeout = setTimeout(() => {
                    sidebar.style.boxShadow = '';
                }, 300);
            }
        });
    }
});