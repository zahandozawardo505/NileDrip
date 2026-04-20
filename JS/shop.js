const mockProducts = [
    { id: 1, name: 'Premium Oversized Hoodie', category: 'hoodies', brand: 'brand1', price: 550, image: '../assets/images/product-1.jpg' },
    { id: 2, name: 'Classic Logo Tee', category: 'tees', brand: 'brand2', price: 250, image: '../assets/images/product-2.jpg' },
    { id: 3, name: 'Joggers Combo', category: 'sweatpants', brand: 'brand3', price: 450, image: '../assets/images/product-3.jpg' },
    { id: 4, name: 'Desert Cap', category: 'accessories', brand: 'brand4', price: 150, image: '../assets/images/product-4.jpg' },
    { id: 5, name: 'Oversized Windbreaker', category: 'hoodies', brand: 'brand1', price: 650, image: '../assets/images/product-5.jpg' },
    { id: 6, name: 'Minimalist Tee', category: 'tees', brand: 'brand3', price: 200, image: '../assets/images/product-6.jpg' },
    { id: 7, name: 'Track Pants', category: 'sweatpants', brand: 'brand2', price: 400, image: '../assets/images/product-7.jpg' },
    { id: 8, name: 'Cotton Socks Set', category: 'accessories', brand: 'brand1', price: 100, image: '../assets/images/product-8.jpg' },
    { id: 9, name: 'Vintage Hoodie', category: 'hoodies', brand: 'brand4', price: 500, image: '../assets/images/product-9.jpg' },
    { id: 10, name: 'Blank Canvas Tee', category: 'tees', brand: 'brand1', price: 220, image: '../assets/images/product-10.jpg' },
    { id: 11, name: 'Premium Sweatpants', category: 'sweatpants', brand: 'brand3', price: 480, image: '../assets/images/product-11.jpg' },
    { id: 12, name: 'Limited Edition Cap', category: 'accessories', brand: 'brand2', price: 180, image: '../assets/images/product-12.jpg' }
];

const productsGrid = document.getElementById('productsGrid');

if (productsGrid) {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const brandFilters = document.querySelectorAll('.brand-filter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const sortSelect = document.getElementById('sortBy');
    const productCount = document.getElementById('productCount');
    const noProducts = document.getElementById('noProducts');

    const renderProducts = (products) => {
        productsGrid.innerHTML = '';

        if (products.length === 0) {
            if(noProducts) noProducts.style.display = 'block';
            if(productCount) productCount.textContent = '0';
            return;
        }

        if(noProducts) noProducts.style.display = 'none';
        if(productCount) productCount.textContent = products.length;

        products.forEach(product => {
            const card = document.createElement('a');
            // FIXED
            card.href = 'Product.html'; 
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-rating">★★★★★ (24)</div>
                    <div class="product-price">${product.price} EGP</div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    };

    const filterProducts = () => {
        let filtered = [...mockProducts];

        const activeCategories = Array.from(categoryFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (activeCategories.length > 0) {
            filtered = filtered.filter(p => activeCategories.includes(p.category));
        }

        const activeBrands = Array.from(brandFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (activeBrands.length > 0) {
            filtered = filtered.filter(p => activeBrands.includes(p.brand));
        }

        if (priceRange) {
            const maxPrice = parseInt(priceRange.value);
            filtered = filtered.filter(p => p.price <= maxPrice);
        }

        const sortValue = sortSelect ? sortSelect.value : 'newest';
        switch (sortValue) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                filtered.sort(() => Math.random() - 0.5);
                break;
        }

        renderProducts(filtered);
    };

    // Event listeners
    categoryFilters.forEach(filter => filter.addEventListener('change', filterProducts));
    brandFilters.forEach(filter => filter.addEventListener('change', filterProducts));

    if (priceRange) {
        priceRange.addEventListener('input', () => {
            if(priceValue) priceValue.textContent = priceRange.value;
            filterProducts();
        });
    }

    if (sortSelect) sortSelect.addEventListener('change', filterProducts);

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            categoryFilters.forEach(cb => cb.checked = false);
            brandFilters.forEach(cb => cb.checked = false);
            if(priceRange) {
                priceRange.value = 1000;
                if(priceValue) priceValue.textContent = 1000;
            }
            filterProducts();
        });
    }

    renderProducts(mockProducts);
}