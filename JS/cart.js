const DEMO_ITEMS = [
    { id: 1, name: 'Premium Oversized Hoodie', brand: 'Raak Brand',    price: 550, quantity: 1, emoji: '🧥' },
    { id: 2, name: 'Classic Logo Tee',         brand: 'Kreative Co',   price: 250, quantity: 2, emoji: '👕' },
    { id: 4, name: 'Desert Cap',               brand: 'Desert Threads',price: 150, quantity: 1, emoji: '🧢' }
];

const SHIPPING_COST = 50;
const PROMO_CODE    = 'DEMO10';
const PROMO_RATE    = 0.10; // 10 % off

// --- State ---
let cart      = loadCart();
let promoApplied = false;

// --- Persistence ---
function loadCart() {
    try {
        const stored = localStorage.getItem('niledrip_cart');
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed.length > 0 ? parsed : [...DEMO_ITEMS];
        }
        return [...DEMO_ITEMS];
    } catch {
        return [...DEMO_ITEMS];
    }
}

function saveCart() {
    localStorage.setItem('niledrip_cart', JSON.stringify(cart));
}

// --- Rendering ---
function renderCart() {
    const cartItems     = document.getElementById('cartItems');
    const cartEmpty     = document.getElementById('cartEmpty');
    const cartLayout    = document.getElementById('cartLayout');
    const cartBadge     = document.getElementById('cartCountBadge');

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) cartBadge.textContent = totalQty;

    if (cart.length === 0) {
        if (cartEmpty)  cartEmpty.style.display  = 'block';
        if (cartLayout) cartLayout.style.display = 'none';
        return;
    }

    if (cartEmpty)  cartEmpty.style.display  = 'none';
    if (cartLayout) cartLayout.style.display = 'grid';

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.dataset.id = item.id;
        el.innerHTML = `
            <div class="cart-item-image">
                <div class="img-placeholder">${item.emoji || '👔'}</div>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-brand">${item.brand}</div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price * item.quantity} EGP</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="qty-btn" data-action="dec" data-id="${item.id}">&#8722;</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" data-action="inc" data-id="${item.id}">&#43;</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItems.appendChild(el);
    });

    updateSummary();
}

function updateSummary() {
    const subtotal   = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalQty   = cart.reduce((sum, item) => sum + item.quantity, 0);
    const discount   = promoApplied ? Math.round(subtotal * PROMO_RATE) : 0;
    const total      = subtotal - discount + SHIPPING_COST;

    document.getElementById('summaryItemCount').textContent  = totalQty;
    document.getElementById('summarySubtotal').textContent   = `${subtotal} EGP`;
    document.getElementById('summaryShipping').textContent   = `${SHIPPING_COST} EGP`;
    document.getElementById('summaryTotal').textContent      = `${total} EGP`;

    const promoRow = document.getElementById('promoApplied');
    if (promoApplied && promoRow) {
        promoRow.style.display = 'flex';
        document.getElementById('promoDiscount').textContent = `-${discount} EGP`;
    } else if (promoRow) {
        promoRow.style.display = 'none';
    }
}

// --- Event Delegation for item controls ---
document.getElementById('cartItems').addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('remove-btn')) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
        return;
    }

    if (e.target.classList.contains('qty-btn')) {
        const action = e.target.dataset.action;
        const item   = cart.find(i => i.id === id);
        if (!item) return;

        if (action === 'inc') {
            item.quantity += 1;
        } else if (action === 'dec') {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
        }
        saveCart();
        renderCart();
    }
});

// --- Promo code ---
document.getElementById('applyPromo').addEventListener('click', () => {
    const input = document.getElementById('promoInput');
    const code  = input.value.trim().toUpperCase();

    if (code === PROMO_CODE) {
        promoApplied = true;
        input.classList.remove('error');
        input.classList.add('success');
        input.disabled = true;
        document.getElementById('applyPromo').disabled  = true;
        document.getElementById('applyPromo').textContent = 'Applied!';
        updateSummary();
    } else {
        input.classList.add('error');
        input.classList.remove('success');
        input.value = '';
        input.placeholder = 'Invalid code';
        setTimeout(() => {
            input.classList.remove('error');
            input.placeholder = 'Promo code';
        }, 2000);
    }
});

// --- Checkout button ---
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    const orderId = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('modalOrderId').textContent = orderId;
    document.getElementById('checkoutModal').style.display = 'flex';
});

// --- Modal close ---
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('checkoutModal').style.display = 'none';
});

document.getElementById('checkoutModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('checkoutModal')) {
        document.getElementById('checkoutModal').style.display = 'none';
    }
});

// --- Clear cart after demo checkout ---
document.getElementById('clearCartBtn').addEventListener('click', () => {
    cart = [];
    saveCart();
    promoApplied = false;
    document.getElementById('checkoutModal').style.display = 'none';
    renderCart();
});

// --- Init ---
renderCart();
