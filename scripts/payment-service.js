import { StorageService } from "./storage-service.js";

export class PaymentService {
    paymentStorageKey = 'payment';

    constructor() {}

    static getOrCreateInstance() {
        if (!PaymentService.instance) {
            PaymentService.instance = new PaymentService();
        }
        return PaymentService.instance;
    }

    setPayment(paymentAmount) {
        const storageService = StorageService.getOrCreateInstance();
        storageService.setItem(this.paymentStorageKey, paymentAmount);
    }

    getPaymentAmount() {
        const storageService = StorageService.getOrCreateInstance();
        const paymentAmount = storageService.getItem(this.paymentStorageKey);
        return paymentAmount ? parseFloat(paymentAmount) : 0;
    }

    clearPayment() {
        const storageService = StorageService.getOrCreateInstance();
        storageService.removeItem(this.paymentStorageKey);
    }
}