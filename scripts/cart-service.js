import { StorageService } from "./storage-service.js";
import { SessionService } from "./session-service.js";
import { ModalService } from "./modal-service.js";
import { SubscriptionService } from "./subscription-service.js";
import { CoursesService } from "./courses-service.js";

export class CartService {
    cartStorageKeyPrefix = 'cart';
    static cartRemovedEventKey = 'cart:removed';
    static cartAddedEventKey = 'cart:added';
    static cartClearedEventKey = 'cart:cleared';
    
    constructor() {}

    #getUserId() {
        const sessionService = SessionService.getOrCreateInstance();
        const userId = sessionService.getSession();
        return userId !== null ? userId : 0;
    }

    #getCartKey(userId = null) {
        const id = userId !== null ? userId : this.#getUserId();
        return `${this.cartStorageKeyPrefix}:${id}`;
    }

    getCart(userId = null) {
        const storageService = StorageService.getOrCreateInstance();
        const currentUserId = this.#getUserId();
        const targetUserId = userId !== null ? userId : currentUserId;
        const cartKey = this.#getCartKey(targetUserId);
        let cart = storageService.getItem(cartKey);
        
        if (!Array.isArray(cart) && targetUserId === 0) {
            const oldCart = storageService.getItem('cart');
            if (Array.isArray(oldCart) && oldCart.length > 0) {
                storageService.setItem(cartKey, oldCart);
                storageService.removeItem('cart');
                cart = oldCart;
            }
        }
        
        if (userId === null && currentUserId !== 0) {
            const userCart = Array.isArray(cart) ? cart : [];
            if (userCart.length === 0) {
                const guestCartKey = this.#getCartKey(0);
                const guestCart = storageService.getItem(guestCartKey);
                return Array.isArray(guestCart) ? guestCart : [];
            }
        }
        
        return Array.isArray(cart) ? cart : [];
    }

    getCartLength() {
        return this.getCart().length;
    }

    addToCart(courseId) {
        const storageService = StorageService.getOrCreateInstance();
        const currentUserId = this.#getUserId();
        
        if (currentUserId !== 0) {
            const userCartKey = this.#getCartKey(currentUserId);
            const userCart = storageService.getItem(userCartKey);
            if (!Array.isArray(userCart) || userCart.length === 0) {
                const guestCart = this.getCart(0);
                if (guestCart.length > 0) {
                    this.migrateCart(0, currentUserId);
                }
            }
        }
        
        const cart = this.getCart();
        
        if (!cart.includes(courseId)) {
            cart.push(courseId);
            const cartKey = this.#getCartKey();
            storageService.setItem(cartKey, cart);
            document.dispatchEvent(new CustomEvent(this.constructor.cartAddedEventKey));
            
            const coursesService = new CoursesService();
            const course = coursesService.getCourseById(courseId);
            if (course && course.kind === 'in-person') {
                const subscriptionService = new SubscriptionService();
                subscriptionService.addSubscription(courseId);
            }
        }

        const modalService = new ModalService("modal-parent");
        modalService.buildModal(
            "Curso agregado al carrito",
            "El curso ha sido agregado al carrito correctamente.",
            "success",
            () => {}
        );
        modalService.openModal();
    }

    removeFromCart(courseId) {
        const storageService = StorageService.getOrCreateInstance();
        const cart = this.getCart();
        const filteredCart = cart.filter(id => id !== courseId);
        const cartKey = this.#getCartKey();
        storageService.setItem(cartKey, filteredCart);
        document.dispatchEvent(new CustomEvent(this.constructor.cartRemovedEventKey));
        const modalService = new ModalService("modal-parent");
        modalService.buildModal(
            "Curso eliminado del carrito",
            "El curso ha sido eliminado del carrito correctamente.",
            "success",
            () => {}
        );
        modalService.openModal();
    }

    migrateCart(fromUserId, toUserId) {
        const storageService = StorageService.getOrCreateInstance();
        const fromCart = this.getCart(fromUserId);
        const toCart = this.getCart(toUserId);
        
        if (fromCart.length === 0) {
            return;
        }

        const mergedCart = [...toCart];
        fromCart.forEach(courseId => {
            if (!mergedCart.includes(courseId)) {
                mergedCart.push(courseId);
            }
        });

        const toCartKey = this.#getCartKey(toUserId);
        storageService.setItem(toCartKey, mergedCart);

        const fromCartKey = this.#getCartKey(fromUserId);
        storageService.setItem(fromCartKey, []);

        if (toUserId === this.#getUserId()) {
            document.dispatchEvent(new CustomEvent(this.constructor.cartAddedEventKey));
        }
    }

    clearCart() {
        const storageService = StorageService.getOrCreateInstance();
        const cartKey = this.#getCartKey();
        storageService.setItem(cartKey, []);
        document.dispatchEvent(new CustomEvent(CartService.cartClearedEventKey));
    }
}