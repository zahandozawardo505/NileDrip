// ============================================
// THEME MANAGEMENT
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// MOBILE MENU
// ============================================

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navbarMenu.style.display = navbarMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector('.hero');
    const bg = document.querySelector('.hero-bg');

    if (!hero || !bg) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        bg.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(255, 0, 110, 0.35),
                rgba(0, 217, 255, 0.25),
                transparent 60%
            )
        `;
    });
});