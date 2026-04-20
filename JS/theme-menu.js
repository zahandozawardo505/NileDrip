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
