export class ModalService {
    #modal = null;
    #modalParent = null;

    constructor(modalParentId) {
        this.#modalParent = document.getElementById(modalParentId);

        if (!this.#modalParent) {
            throw new Error(`Modal parent with id ${modalParentId} not found`);
        }
    }

    buildModal(title, content, kind, callback) {
        if (this.#modal) {
            this.#modal.remove();
        }

        const mixedCallback = () => {
            callback();
            this.closeModal();
        }

        this.#modal = document.createElement('dialog');
        this.#modal.classList.add('modal');
        this.#modal.classList.add(kind);
        this.#modal.addEventListener('click', mixedCallback);
        this.#modal.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
        <button>Cerrar</button>
        `;

        this.#modalParent.appendChild(this.#modal);
    }

    openModal() {
        if (!this.#modal) {
            throw new Error('Modal has not been built yet. Call buildModal() first.');
        }
        if (this.#modal.hasAttribute('open')) {
            this.#modal.removeAttribute('open');
        }
        this.#modal.showModal();
    }

    closeModal() {
        this.#modal.close();
    }

    buildConfirmationModal(title, message, onConfirm, onCancel) {
        if (this.#modal) {
            this.#modal.remove();
        }

        this.#modal = document.createElement('dialog');
        this.#modal.classList.add('modal');
        this.#modal.classList.add('confirmation');
        this.#modal.innerHTML = `
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="modal__buttons">
                <button class="modal__button modal__button--confirm" id="confirm-btn">Confirmar</button>
                <button class="modal__button modal__button--cancel" id="cancel-btn">Cancelar</button>
            </div>
        `;

        this.#modalParent.appendChild(this.#modal);

        this.#modal.querySelector('#cancel-btn').addEventListener('click', () => {
            this.closeModal();
            onCancel?.();
        });

        this.#modal.querySelector('#confirm-btn').addEventListener('click', () => {
            this.closeModal();
            onConfirm?.();
        });
    }
}