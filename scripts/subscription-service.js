import { StorageService } from "./storage-service.js";
import { SessionService } from "./session-service.js";

export class SubscriptionService {
    subscriptionStorageKeyPrefix = 'subscriptions';
    static subscriptionAddedEventKey = 'subscription:added';
    static subscriptionRemovedEventKey = 'subscription:removed';
    
    constructor() {}

    #getUserId() {
        const sessionService = SessionService.getOrCreateInstance();
        const userId = sessionService.getSession();
        return userId !== null ? userId : 0;
    }

    #getSubscriptionKey(userId = null) {
        const id = userId !== null ? userId : this.#getUserId();
        return `${this.subscriptionStorageKeyPrefix}:${id}`;
    }

    getSubscriptions(userId = null) {
        const storageService = StorageService.getOrCreateInstance();
        const currentUserId = this.#getUserId();
        const targetUserId = userId !== null ? userId : currentUserId;
        const subscriptionKey = this.#getSubscriptionKey(targetUserId);
        let subscriptions = storageService.getItem(subscriptionKey);
        
        if (!Array.isArray(subscriptions) && targetUserId === 0) {
            const oldSubscriptions = storageService.getItem('subscriptions');
            if (Array.isArray(oldSubscriptions) && oldSubscriptions.length > 0) {
                storageService.setItem(subscriptionKey, oldSubscriptions);
                storageService.removeItem('subscriptions');
                subscriptions = oldSubscriptions;
            }
        }
        
        if (userId === null && currentUserId !== 0) {
            const userSubscriptions = Array.isArray(subscriptions) ? subscriptions : [];
            if (userSubscriptions.length === 0) {
                const guestSubscriptionKey = this.#getSubscriptionKey(0);
                const guestSubscriptions = storageService.getItem(guestSubscriptionKey);
                return Array.isArray(guestSubscriptions) ? guestSubscriptions : [];
            }
        }
        
        return Array.isArray(subscriptions) ? subscriptions : [];
    }

    addSubscription(courseId) {
        const storageService = StorageService.getOrCreateInstance();
        const currentUserId = this.#getUserId();
        
        if (currentUserId !== 0) {
            const userSubscriptionKey = this.#getSubscriptionKey(currentUserId);
            const userSubscriptions = storageService.getItem(userSubscriptionKey);
            if (!Array.isArray(userSubscriptions) || userSubscriptions.length === 0) {
                const guestSubscriptions = this.getSubscriptions(0);
                if (guestSubscriptions.length > 0) {
                    this.migrateSubscriptions(0, currentUserId);
                }
            }
        }
        
        const subscriptions = this.getSubscriptions();
        
        if (!subscriptions.includes(courseId)) {
            subscriptions.push(courseId);
            const subscriptionKey = this.#getSubscriptionKey();
            storageService.setItem(subscriptionKey, subscriptions);
            document.dispatchEvent(new CustomEvent(this.constructor.subscriptionAddedEventKey, {
                detail: { courseId }
            }));
        }
    }

    removeSubscription(courseId) {
        const storageService = StorageService.getOrCreateInstance();
        const subscriptions = this.getSubscriptions();
        const filteredSubscriptions = subscriptions.filter(id => id !== courseId);
        const subscriptionKey = this.#getSubscriptionKey();
        storageService.setItem(subscriptionKey, filteredSubscriptions);
        document.dispatchEvent(new CustomEvent(this.constructor.subscriptionRemovedEventKey, {
            detail: { courseId }
        }));
    }

    migrateSubscriptions(fromUserId, toUserId) {
        const storageService = StorageService.getOrCreateInstance();
        const fromSubscriptions = this.getSubscriptions(fromUserId);
        const toSubscriptions = this.getSubscriptions(toUserId);
        
        if (fromSubscriptions.length === 0) {
            return;
        }

        const mergedSubscriptions = [...toSubscriptions];
        fromSubscriptions.forEach(courseId => {
            if (!mergedSubscriptions.includes(courseId)) {
                mergedSubscriptions.push(courseId);
            }
        });

        const toSubscriptionKey = this.#getSubscriptionKey(toUserId);
        storageService.setItem(toSubscriptionKey, mergedSubscriptions);

        const fromSubscriptionKey = this.#getSubscriptionKey(fromUserId);
        storageService.setItem(fromSubscriptionKey, []);

        if (toUserId === this.#getUserId()) {
            document.dispatchEvent(new CustomEvent(this.constructor.subscriptionAddedEventKey));
        }
    }

    hasSubscription(courseId) {
        const subscriptions = this.getSubscriptions();
        return subscriptions.includes(courseId);
    }

    clearSubscriptions() {
        const storageService = StorageService.getOrCreateInstance();
        const subscriptionKey = this.#getSubscriptionKey();
        storageService.setItem(subscriptionKey, []);
        document.dispatchEvent(new CustomEvent(this.constructor.subscriptionRemovedEventKey));
    }
}

