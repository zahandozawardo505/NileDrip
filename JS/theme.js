// theme.js  (replaces both theme.js and theme-menu.js — load only this one)
// FIX: theme.js and theme-menu.js both declared `const themeToggle` at top
// level, causing "Cannot redeclare block-scoped variable" crash when both
// were loaded. Merged into a single IIFE to avoid global name collisions.

(function () {
    // ── THEME ──────────────────────────────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ── CART BADGE ─────────────────────────────────────────────────────────
    function updateCartBadge() {
        const badge = document.getElementById('cartNavBadge');
        if (!badge) return;
        try {
            const cart = JSON.parse(localStorage.getItem('niledrip_cart') || '[]');
            const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            badge.textContent = total;
            badge.style.display = total > 0 ? 'flex' : 'none';
        } catch {
            badge.style.display = 'none';
        }
    }
    updateCartBadge();

    // ── MOBILE MENU ────────────────────────────────────────────────────────
    const hamburger   = document.getElementById('hamburger');
    const navbarMenu  = document.getElementById('navbarMenu');

    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', () => {
            const open = navbarMenu.classList.toggle('active');
            hamburger.classList.toggle('active', open);
        });
    }
})();
