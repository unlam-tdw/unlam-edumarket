import { StorageService } from "./storage-service.js";
import { CoursesService } from "./courses-service.js";

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
        const giftCardTotal = storageService.getItem("gift-card-total");

        if (inscriptionTotal) {
            total = parseFloat(inscriptionTotal);
        } else if (giftCardTotal) {
            total = parseFloat(giftCardTotal);
        } else {
            const courseIds = storageService.getItem(this.paymentStorageKey);
            if (!courseIds || courseIds.length === 0) {
                return 0;
            }
            const courses = new CoursesService();
            total = courseIds.reduce((acc, courseId) => {
                const course = courses.getCourseById(courseId);
                return acc + (course ? course.price : 0);
            }, 0);
        }

        return total;
    }

    clearPayment() {
        const storageService = StorageService.getOrCreateInstance();
        storageService.removeItem(this.paymentStorageKey);
    }
}