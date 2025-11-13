import { StorageService } from "./storage-service.js";
import { ModalService } from "./modal-service.js";

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
        const modalService = new ModalService("modal-parent");
        modalService.buildModal(
            "Gift Card eliminada del carrito",
            "La gift card ha sido eliminada del carrito correctamente.",
            "success",
            () => {}
        );
        modalService.openModal();
    }
}