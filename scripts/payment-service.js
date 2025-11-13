import { StorageService } from "./storage-service.js";
import { CoursesService } from "./courses-service.js";
import { CartService } from "./cart-service.js";
import { GiftCardService } from "./gift-card-service.js";

export class PaymentService {
    paymentStorageKey = 'payment';

    constructor() {}

    static getOrCreateInstance() {
        if (!PaymentService.instance) {
            PaymentService.instance = new PaymentService();
        }
        return PaymentService.instance;
    }

    setPayment(courseIds) {
        const storageService = StorageService.getOrCreateInstance();
        storageService.setItem(this.paymentStorageKey, courseIds);
    }

    getPayment() {
        const storageService = StorageService.getOrCreateInstance();
        return storageService.getItem(this.paymentStorageKey) || [];
    }

    getPaymentTotal() {
        let total = 0;

        const storageService = StorageService.getOrCreateInstance();

        const inscriptionTotal = storageService.getItem("inscription-total");

        if (inscriptionTotal) {
            total = parseFloat(inscriptionTotal);
        } else {
            const courseIds = storageService.getItem(this.paymentStorageKey) || [];
            const courses = new CoursesService();
            const giftCardService = new GiftCardService();
            const giftCardsTotal = giftCardService.getGiftCards().reduce((acc, giftCard) => {
                return acc + (giftCard ? Number(giftCard.price) || 0 : 0);
            }, 0)
            const coursesTotal = courseIds.reduce((acc, courseId) => {
                const course = courses.getCourseById(courseId);
                return acc + (course ? course.price : 0);
            }, 0)

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
        storageService.removeItem(this.paymentStorageKey);
        storageService.removeItem("inscription-total");
        cartService.clearCart();
    }
}