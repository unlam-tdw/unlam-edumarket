import { StorageService } from "./storage-service.js";

export class GiftCardService {
    giftCardStorageKey = "gift-cards";
    static giftCardAddedEventKey = 'giftcard:added';
    static giftCardRemovedEventKey = 'giftcard:removed';

    constructor() {
        this.storageService = StorageService.getOrCreateInstance();
        this.giftCards = this.storageService.getItem(this.giftCardStorageKey) || [];
    }

    addGiftCard(giftCard) {
        this.giftCards.push(giftCard);
        giftCard.id = this.giftCards.length + 1;
        this.storageService.setItem(this.giftCardStorageKey, this.giftCards);
        document.dispatchEvent(new CustomEvent(this.constructor.giftCardAddedEventKey));
    }

    getGiftCards() {
        return this.giftCards;
    }

    removeGiftCard(giftCard) {
        this.giftCards = this.giftCards.filter(g => g.id !== giftCard.id);
        this.storageService.setItem(this.giftCardStorageKey, this.giftCards);
        document.dispatchEvent(new CustomEvent(this.constructor.giftCardRemovedEventKey));
    }
}