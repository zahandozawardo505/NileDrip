// products.js
// Seeds default products if none exist yet.
// FIX: Removed local addProduct() definition — it conflicted with
// window.addProduct() in dashboard-seller.js. One authoritative
// definition lives in dashboard-seller.js.

(function seedProducts() {
    if (Store.get('niledrip_products', []).length === 0) {
        Store.set('niledrip_products', [
            {
                id: '1',
                name: 'Premium Hoodie',
                category: 'hoodies',
                brand: 'brand1',
                price: 550,
                image: '../assets/images/bmw.webp',
                description: 'Premium quality oversized hoodie made from 100% organic cotton.',
                stock: 12
            },
            {
                id: '2',
                name: 'Classic Tee',
                category: 'tees',
                brand: 'brand2',
                price: 250,
                image: '../assets/images/bmw.webp',
                description: 'Classic logo tee, lightweight and breathable.',
                stock: 24
            }
        ]);
    }
})();
