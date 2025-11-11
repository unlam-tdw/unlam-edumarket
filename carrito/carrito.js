import { CartService } from "../scripts/cart-service.js";
import { CoursesService } from "../scripts/courses-service.js";
import { ModalService } from "../scripts/modal-service.js";
import { PaymentService } from "../scripts/payment-service.js";

export class Carrito {
    static #renderCartItems() {
        const modalService = new ModalService("modal-parent");
        const cartService = new CartService();
        const coursesService = new CoursesService();
        const cart = cartService.getCart();
        const coursesInCart = cart.map(id => coursesService.getCourseById(id));

        const element = document.getElementById('cart-items');

        if (!element) {
            modalService.buildModal(
                "Error",
                "No se encontró el elemento con id 'cart-items'.",
                "error",
                () => {}
            );
            modalService.openModal();
            return;
        }

        if (coursesInCart.length === 0) {
            element.innerHTML = `
            <div class="cart__item">
                <p>No hay cursos en el carrito.</p>
            </div>
            `;
            return;
        }
        
        element.innerHTML = `
        ${coursesInCart.map(course => `
        <div class="cart__item">
                        <div class="cart__item__image">
                            <img class="cart__item__img" 
                                 src="${course.image}" 
                                 alt="${course.name}">
                        </div>
                        <div class="cart__item__details">
                            <h3 class="cart__item__title">${course.name}</h3>
                            <p class="cart__item__duration">${course.duration} horas de contenido</p>
                            <a class="cart__item__link" href="/detalle/?courseId=${course.id}">Ver detalle</a>
                        </div>
                        <div class="cart__item__price">
                            <span class="cart__item__amount">${course.price}.-</span>
                        </div>
                        <div class="cart__item__actions">
                            <button class="cart__item__remove" id="remove-from-cart-btn" type="button" data-course-id="${course.id}">🗑️</button>
                        </div>
                    </div>
        `).join('')}
        `;

        const removeFromCartBtns = element.querySelectorAll('#remove-from-cart-btn');
        removeFromCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                const cartServiceInstance = new CartService();
                cartServiceInstance.removeFromCart(courseId);
                modalService.buildModal(
                    "Curso eliminado del carrito",
                    "El curso ha sido eliminado del carrito correctamente.",
                    "success",
                    () => {}
                );
                modalService.openModal();
            });
        });
    }

    static #renderCartSummary() {
        const modalService = new ModalService("modal-parent");
        const cartService = new CartService();
        const coursesService = new CoursesService();
        const cart = cartService.getCart();
        const total = cart.reduce((acc, id) => {
            const course = coursesService.getCourseById(id);
            return acc + (course ? course.price : 0);
        }, 0);
        const element = document.getElementById('cart-summary');

        if (!element) {
            modalService.buildModal(
                "Error",
                "No se encontró el elemento con id 'cart-summary'.",
                "error",
                () => {}
            );
            modalService.openModal();
            return;
        }

        const subtotal = total.toFixed(2);
        const discount = cart.length >= 3 ? 10.00 : 0.00;
        const finalTotal = (subtotal - discount).toFixed(2);
        const courseCount = cart.length;
        
        element.innerHTML = cart.length > 0 ? `
                    <div class="cart__summary__content">
                        <h2 class="cart__summary__title">Resumen del pedido</h2>
                        
                        <div class="cart__summary__details">
                            <div class="cart__summary__line">
                                <span class="cart__summary__label">Subtotal (${courseCount} ${courseCount === 1 ? 'curso' : 'cursos'}):</span>
                                <span class="cart__summary__value">$${subtotal}.-</span>
                            </div>
                            ${discount > 0 ? `
                            <div class="cart__summary__line">
                                <span class="cart__summary__label">Descuento:</span>
                                <span class="cart__summary__value cart__summary__value--discount">-$${discount}.-</span>
                            </div>
                            ` : ''}
                            <div class="cart__summary__line cart__summary__line--total">
                                <span class="cart__summary__label">Total:</span>
                                <span class="cart__summary__value cart__summary__value--total">$${finalTotal}.-</span>
                            </div>
                        </div>
                                
                        <div class="cart__summary__actions">
                            <a class="cart__summary__btn cart__summary__btn--primary" href="/pagar" id="buy-btn" data-total-amount="${finalTotal}">
                                Proceder al pago
                            </a>
                            <a class="cart__summary__btn cart__summary__btn--secondary" href="/">
                                Seguir comprando
                            </a>
                        </div>
                        
                        <div class="cart__summary__payment">
                            <h3 class="cart__summary__payment__title">Métodos de pago aceptados</h3>
                            <div class="cart__summary__payment__methods">
                                <img class="cart__summary__payment__icon" 
                                     src="https://www.svgrepo.com/show/449177/payment-visa.svg" 
                                     alt="Visa">
                                <img class="cart__summary__payment__icon" 
                                     src="https://www.svgrepo.com/show/449174/payment-mastercard.svg" 
                                     alt="Mastercard">
                                <img class="cart__summary__payment__icon" 
                                     src="https://www.svgrepo.com/show/449173/payment-paypal.svg" 
                                     alt="PayPal">
                                <img class="cart__summary__payment__icon" 
                                     src="https://www.svgrepo.com/show/449171/payment-google-wallet.svg" 
                                     alt="Google Wallet">
                            </div>
                        </div>
                    </div>
        ` : '';

        const buyBtn = element.querySelector('#buy-btn');
        buyBtn.addEventListener('click', () => {
            const totalAmount = parseFloat(buyBtn.getAttribute('data-total-amount'));
            if (isNaN(totalAmount)) {
                return;
            }
            const paymentService = PaymentService.getOrCreateInstance();
            paymentService.setPayment(totalAmount);
            window.location.href = "/pagar";   
        });
    }

    static #renderCartRecommendations() {
        const modalService = new ModalService("modal-parent");
        const coursesService = new CoursesService();
        const coursesInCart = coursesService.getRandomCourses(3);
        const element = document.getElementById('cart-recommendations');

        if (!element) {
            modalService.buildModal(
                "Error",
                "No se encontró el elemento con id 'cart-recommendations'.",
                "error",
                () => {}
            );
            modalService.openModal();
            return;
        }

        element.innerHTML = `
        ${coursesInCart.map(course => `
                    <li class="cart__recommendations__item">
                        <article class="cart__recommendations__card">
                            <div class="cart__recommendations__card__top">
                                <img class="cart__recommendations__card__img" 
                                     src="${course.image}" 
                                     alt="${course.name}">
                                <div class="cart__recommendations__card__tag">
                                    <span class="cart__recommendations__card__price">${course.price}.-</span>
                                </div>
                            </div>
                            <div class="cart__recommendations__card__content">
                                <div class="cart__recommendations__card__info">
                                    <div class="cart__recommendations__card__duration">
                                        <span class="cart__recommendations__card__duration__number">${course.duration}</span>
                                        <span class="cart__recommendations__card__duration__text">hs</span>
                                    </div>
                                    <div class="cart__recommendations__card__details">
                                        <h3 class="cart__recommendations__card__title">${course.name}</h3>
                                        <a class="cart__recommendations__card__link" href="/detalle/?courseId=${course.id}">Ver detalle</a>
                                    </div>
                                </div>
                                <div class="cart__recommendations__card__actions">
                                    <div class="cart__recommendations__card__btn" id="add-to-cart-btn" data-course-id="${course.id}">Agregar al carrito</div>
                                </div>
                            </div>
                        </article>
                    </li>
        `).join('')}
        `;

        const addToCartBtns = element.querySelectorAll('#add-to-cart-btn');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                const cartServiceInstance = new CartService();
                cartServiceInstance.addToCart(courseId);
                modalService.buildModal(
                    "Curso agregado al carrito",
                    "El curso ha sido agregado al carrito correctamente.",
                    "success",
                    () => {}
                );
                modalService.openModal();
            });
        });
    }

    static paintAndUpdate() {
        this.#renderCartItems();
        this.#renderCartSummary();

        document.addEventListener(CartService.cartAddedEventKey, () => {
            this.paintAndUpdate();
        });

        document.addEventListener(CartService.cartRemovedEventKey, () => {
            this.paintAndUpdate();
        });
    }

    static render() {
        this.paintAndUpdate();
        this.#renderCartRecommendations();
    }
}
Carrito.render();