// product-page.js
// FIX: Original had no null-check — if product wasn't found, accessing
// product.id inside the click listener threw a TypeError crash.

(function () {
    const WISHLIST_KEY = 'niledrip_wishlist';
    const params    = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const products  = Store.get('niledrip_products', []);
    const product   = products.find(p => p.id === productId);

    if (!product) {
        document.querySelector('.product-section')?.insertAdjacentHTML(
            'afterbegin',
            '<p style="padding:2rem;color:red;">Product not found. <a href="shop.html">Back to shop</a></p>'
        );
        return;
    }

    // Populate page
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('productName',        product.name);
    set('productPrice',       product.price);
    set('productDescription', product.description || '');
    set('productCategory',    product.category   || '');
    set('stockStatus',        `In Stock (${product.stock || '?'} available)`);

    const mainImg = document.getElementById('mainImage');
    if (mainImg) mainImg.src = product.image;

    // Wishlist
    const wishlistBtn = document.getElementById('wishlistBtn');
    const getWishlist = () => Store.get(WISHLIST_KEY, []);
    const saveWishlist = items => Store.set(WISHLIST_KEY, items);
    const isWishlisted = () => getWishlist().some(item => item.id === product.id);

    function updateWishlistButton() {
        if (!wishlistBtn) return;
        if (isWishlisted()) {
            wishlistBtn.textContent = 'Wishlisted ❤️';
            wishlistBtn.classList.remove('btn-secondary');
            wishlistBtn.classList.add('btn-primary');
        } else {
            wishlistBtn.textContent = 'Wishlist ❤️';
            wishlistBtn.classList.remove('btn-primary');
            wishlistBtn.classList.add('btn-secondary');
        }
    }

    if (wishlistBtn) {
        updateWishlistButton();
        wishlistBtn.addEventListener('click', () => {
            const wishlist = getWishlist();
            const exists = wishlist.some(item => item.id === product.id);

            if (exists) {
                const next = wishlist.filter(item => item.id !== product.id);
                saveWishlist(next);
                alert('Removed from wishlist');
            } else {
                wishlist.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category || '',
                    addedAt: new Date().toISOString()
                });
                saveWishlist(wishlist);
                alert('Added to wishlist');
            }

            updateWishlistButton();
        });
    }

    // Size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Quantity controls
    const qtyInput   = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');

    if (decreaseBtn && qtyInput) {
        decreaseBtn.addEventListener('click', () => {
            qtyInput.value = Math.max(1, +qtyInput.value - 1);
        });
    }
    if (increaseBtn && qtyInput) {
        increaseBtn.addEventListener('click', () => {
            qtyInput.value = Math.min(10, +qtyInput.value + 1);
        });
    }

    // Add to cart
    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const activeSize = document.querySelector('.size-btn.active');
            if (!activeSize) {
                alert('Please select a size');
                return;
            }
            addToCart({
                id:       product.id,
                name:     product.name,
                price:    product.price,
                image:    product.image,
                size:     activeSize.dataset.size,
                quantity: +(qtyInput?.value || 1)
            });
            alert('Added to cart! 🛒');
        });
    }

    // Thumbnail swap
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            if (mainImg) mainImg.src = thumb.src;
        });
    });
})();
