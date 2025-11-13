import { StorageService } from "./storage-service.js";

export class GiftCardService {
    giftCardStorageKey = "gift-cards";

    constructor() {
        this.storageService = StorageService.getOrCreateInstance();
        this.giftCards = this.storageService.getItem(this.giftCardStorageKey) || [];
    }

    addGiftCard(giftCard) {
        this.giftCards.push(giftCard);
        giftCard.id = this.giftCards.length + 1;
        this.storageService.setItem(this.giftCardStorageKey, this.giftCards);
    }

    getGiftCards() {
        return this.giftCards;
    }

    removeGiftCard(giftCard) {
        this.giftCards = this.giftCards.filter(g => g.id !== giftCard.id);
        this.storageService.setItem(this.giftCardStorageKey, this.giftCards);
    }
}