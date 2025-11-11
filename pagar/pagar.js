import { ModalService } from "../scripts/modal-service.js";
import { SessionService } from "../scripts/session-service.js";
import { PaymentService } from "../scripts/payment-service.js";

export class Pagar {
    constructor() {}

    static render() {
        const sessionService = SessionService.getOrCreateInstance();

        if (!sessionService.isAuthenticated()) {
            window.location.href = "/sign-in";
            return;
        }

        const paymentService = PaymentService.getOrCreateInstance();
        const paymentAmount = paymentService.getPaymentAmount();

        const paymentAmountElement = document.getElementById('payment-amount');
        if (paymentAmountElement) {
            paymentAmountElement.textContent = paymentAmount.toFixed(2);
        }

        if (paymentAmount === 0) {
            window.location.href = "/";
            return;
        }

        const modalService = new ModalService("modal-parent");
        const form = document.getElementById('pagar-form');

        if (!form) {
            return;
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            modalService.buildConfirmationModal(
                "Confirmación de pago",
                "¿Estás seguro de que deseas procesar el pago?",
                () => {
                    modalService.buildModal(
                        "Pago procesado",
                        "El pago ha sido procesado correctamente.",
                        "success",
                        () => {
                            window.location.href = "/";
                            paymentService.clearPayment();
                        }
                    );
                    modalService.openModal();
                },
            );
            modalService.openModal();
        });
    }
}

Pagar.render();
