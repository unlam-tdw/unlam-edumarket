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

    getPaymentTotal() {
        const storageService = StorageService.getOrCreateInstance();
        const courseIds = storageService.getItem(this.paymentStorageKey);
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