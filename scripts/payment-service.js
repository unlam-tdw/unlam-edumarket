import { StorageService } from "./storage-service.js";
import { CoursesService } from "./courses-service.js";
import { CartService } from "./cart-service.js";
import { GiftCardService } from "./gift-card-service.js";
import { SubscriptionService } from "./subscription-service.js";

export class PaymentService {
    paymentStorageKey = 'payment';
    paymentFromCartKey = 'payment-from-cart';

    constructor() {}

    static getOrCreateInstance() {
        if (!PaymentService.instance) {
            PaymentService.instance = new PaymentService();
        }
        return PaymentService.instance;
    }

    setPayment(courseIds, fromCart = false) {
        const storageService = StorageService.getOrCreateInstance();
        storageService.setItem(this.paymentStorageKey, courseIds);
        storageService.setItem(this.paymentFromCartKey, fromCart);
    }

    getPayment() {
        const storageService = StorageService.getOrCreateInstance();
        return storageService.getItem(this.paymentStorageKey) || [];
    }

    getInscriptionTotal() {
        const storageService = StorageService.getOrCreateInstance();
        const inscriptionTotal = storageService.getItem("inscription-total");
        return inscriptionTotal ? parseFloat(inscriptionTotal) : null;
    }

    getPaymentTotal() {
        let total = 0;

        const storageService = StorageService.getOrCreateInstance();
        const courses = new CoursesService();
        const giftCardService = new GiftCardService();
        const cartService = new CartService();

        const inscriptionAmount = this.getInscriptionTotal();
        const courseIds = storageService.getItem(this.paymentStorageKey) || [];
        const cart = cartService.getCart();

        // Obtener gift cards total
        const giftCardsTotal = giftCardService.getGiftCards().reduce((acc, giftCard) => {
            return acc + (giftCard ? Number(giftCard.price) || 0 : 0);
        }, 0);

        if (inscriptionAmount !== null) {
            // Si hay inscription-total, sumar inscripciones + cursos online + gift cards
            
            // Obtener cursos online del carrito (los presenciales ya están en inscription-total)
            const onlineCoursesTotal = cart.reduce((acc, courseId) => {
                const course = courses.getCourseById(courseId);
                // Solo sumar cursos online (los presenciales ya están en inscription-total)
                if (course && course.kind === 'online') {
                    return acc + (course ? Number(course.price) || 0 : 0);
                }
                return acc;
            }, 0);

            // Calcular descuento basado en el total de cursos en el carrito
            let discount = 0;
            if (cart.length >= 3) {
                discount = 10;
            }

            total = inscriptionAmount + onlineCoursesTotal + giftCardsTotal - discount;
        } else {
            // Si no hay inscription-total, calcular normalmente
            const coursesTotal = courseIds.reduce((acc, courseId) => {
                const course = courses.getCourseById(courseId);
                return acc + (course ? Number(course.price) || 0 : 0);
            }, 0);

            let discount = 0;
            if (courseIds.length >= 3) {
                discount = 10;
            }

            total = coursesTotal + giftCardsTotal - discount;
        }

        return total;
    }

    clearPayment() {
        const storageService = StorageService.getOrCreateInstance();
        const cartService = new CartService();
        const subscriptionService = new SubscriptionService();
        const giftCardService = new GiftCardService();
        const paymentFromCart = storageService.getItem(this.paymentFromCartKey);
        
        storageService.removeItem(this.paymentStorageKey);
        storageService.removeItem("inscription-total");
        storageService.removeItem(this.paymentFromCartKey);
        
        // Solo limpiar el carrito si la compra se realizó desde el carrito
        if (paymentFromCart === true) {
            cartService.clearCart();
        }
        
        subscriptionService.clearSubscriptions();
        giftCardService.clearGiftCards();
    }
}