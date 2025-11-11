import { ModalService } from "../scripts/modal-service.js";

export class Pagar {
    constructor() {}

    static render() {
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
