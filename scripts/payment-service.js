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
        const storageService = StorageService.getOrCreateInstance();
        const courseIds = storageService.getItem(this.paymentStorageKey);
        if (!courseIds || courseIds.length === 0) {
            return 0;
        }
        const courses = new CoursesService();
        const total = courseIds.reduce((acc, courseId) => {
            const course = courses.getCourseById(courseId);
            return acc + (course ? course.price : 0);
        }, 0);
        return total;
    }

    clearPayment() {
        const storageService = StorageService.getOrCreateInstance();
        storageService.removeItem(this.paymentStorageKey);
    }
}