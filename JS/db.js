// db.js (FINAL FIXED VERSION)

const DB = {
    get products() { return Store.get('niledrip_products', []); },
    get cart()     { return Store.get('niledrip_cart', []); },
    get wishlist() { return Store.get('niledrip_wishlist', []); },
    get users()    { return Store.get('niledrip_users', []); },
    get sellers()  { return Store.get('niledrip_sellers', []); },

    save(key, value) {
        Store.set(key, value);
    },

    // =====================
    // PRODUCTS
    // =====================
    saveProducts(data) {
        Store.set('niledrip_products', data);
    },

    // =====================
    // CART (MAIN FIX HERE)
    // =====================
    addToCart(item) {
        const cart = this.cart;

        const index = cart.findIndex(
            i =>
                i.id === item.id &&
                i.size === item.size &&
                i.color === item.color
        );

        if (index > -1) {
            cart[index].quantity += item.quantity;
        } else {
            cart.push(item);
        }

        Store.set('niledrip_cart', cart);
    },

    removeCartItem(id, size, color) {
        const cart = this.cart.filter(
            i => !(i.id === id && i.size === size && i.color === color)
        );

        Store.set('niledrip_cart', cart);
    },

    clearCart() {
        Store.set('niledrip_cart', []);
    }
};