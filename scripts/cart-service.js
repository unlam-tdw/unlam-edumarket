import { StorageService } from "./storage-service.js";

export class CartService {
    cartStorageKey = 'cart';
    static cartRemovedEventKey = 'cart:removed';
    static cartAddedEventKey = 'cart:added';
    
    constructor() {}

    getCart() {
        const storageService = StorageService.getOrCreateInstance();
        const cart = storageService.getItem(this.cartStorageKey);
        return Array.isArray(cart) ? cart : [];
    }

    getCartLength() {
        return this.getCart().length;
    }

    addToCart(courseId) {
        const storageService = StorageService.getOrCreateInstance();
        const cart = this.getCart();
        
        if (!cart.includes(courseId)) {
            cart.push(courseId);
            storageService.setItem(this.cartStorageKey, cart);
            document.dispatchEvent(new CustomEvent(this.constructor.cartAddedEventKey));
        }
    }

    removeFromCart(courseId) {
        const storageService = StorageService.getOrCreateInstance();
        const cart = this.getCart();
        const filteredCart = cart.filter(id => id !== courseId);
        storageService.setItem(this.cartStorageKey, filteredCart);
        document.dispatchEvent(new CustomEvent(this.constructor.cartRemovedEventKey));
    }
}