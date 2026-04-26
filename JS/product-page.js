// product-page.js (FIXED)

function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadProduct() {
    const id = getProductIdFromURL();
    if (!id) return;

    const product = DB.products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('mainImage').src = product.image;
    document.getElementById('productCategory').textContent = product.category;
}

document.addEventListener('DOMContentLoaded', loadProduct);

// =====================
// ADD TO CART (FIXED)
// =====================

const addToCartBtn = document.getElementById('addToCartBtn');
const quantityInput = document.getElementById('quantity');

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-btn.active');
        const selectedColor = document.querySelector('.color-btn.active');

        const sizeError = document.getElementById('sizeError');

        if (!selectedSize) {
            if (sizeError) {
                sizeError.textContent = "Please select a size";
            }
            return;
        }

        const id = getProductIdFromURL();
        const product = DB.products.find(p => p.id === id);

        if (!product) return;

        DB.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize.dataset.size,
            color: selectedColor?.dataset.color || "Default",
            quantity: parseInt(quantityInput?.value || 1)
        });
        

        alert("Added to cart!");
    });
}