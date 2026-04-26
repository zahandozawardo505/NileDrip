// db.js
// FIX: Use getters so DB always reads fresh data from localStorage,
// not a stale snapshot taken at parse time.
const DB = {
    get products() { return Store.get('niledrip_products', []); },
    get cart()     { return Store.get('niledrip_cart', []); },
    get wishlist() { return Store.get('niledrip_wishlist', []); },
    get users()    { return Store.get('niledrip_users', []); },
    get sellers()  { return Store.get('niledrip_sellers', []); },

    saveProducts() { Store.set('niledrip_products', this.products); },
    saveCart()     { Store.set('niledrip_cart', this.cart); },
    saveWishlist() { Store.set('niledrip_wishlist', this.wishlist); },
    saveUsers()    { Store.set('niledrip_users', this.users); },
    saveSellers()  { Store.set('niledrip_sellers', this.sellers); },

    // Helper: push an item and immediately persist
    pushProduct(item)  { const a = this.products; a.push(item); Store.set('niledrip_products', a); },
    pushCartItem(item) { const a = this.cart;     a.push(item); Store.set('niledrip_cart', a); },
    pushWishlistItem(item) { const a = this.wishlist; a.push(item); Store.set('niledrip_wishlist', a); },
    pushUser(item)     { const a = this.users;    a.push(item); Store.set('niledrip_users', a); },
    pushSeller(item)   { const a = this.sellers;  a.push(item); Store.set('niledrip_sellers', a); },
};
