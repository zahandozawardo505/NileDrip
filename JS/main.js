// main.js
// FIX: Original code read DB.cart at module parse time (a stale snapshot).
// Now reads fresh from localStorage on every call.

function updateCartBadge() {
    const badge = document.getElementById('cartNavBadge');
    if (!badge) return;
    try {
        const cart  = JSON.parse(localStorage.getItem('niledrip_cart') || '[]');
        const total = cart.reduce((s, i) => s + (i.quantity || 1), 0);
        badge.textContent = total;
        badge.style.display = total ? 'flex' : 'none';
    } catch {
        badge.style.display = 'none';
    }
}

updateCartBadge();
