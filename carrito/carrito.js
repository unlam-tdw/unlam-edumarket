import { CartService } from "../scripts/cart-service.js";
import { CoursesService } from "../scripts/courses-service.js";
import { GiftCardService } from "../scripts/gift-card-service.js";
import { PaymentService } from "../scripts/payment-service.js";
import { SubscriptionService } from "../scripts/subscription-service.js";

export class Carrito {
  static #renderCartItems() {
    const giftCardService = new GiftCardService();
    const cartService = new CartService();
    const coursesService = new CoursesService();

    const cart = cartService.getCart();
    const coursesInCart = cart.map((id) => coursesService.getCourseById(id));
    const giftCardsInCart = giftCardService.getGiftCards();

    const element = document.getElementById("cart-items");

    if (!element) {
      return;
    }

    if (coursesInCart.length === 0 && giftCardsInCart.length === 0) {
      element.innerHTML = `
            <div class="cart__item">
                <p>No hay cursos en el carrito.</p>
            </div>
            `;
      return;
    }

    element.innerHTML = `
        ${coursesInCart
          .map(
            (course) => {
                const kindLabel = course.kind === 'in-person' ? 'PRESENCIAL' : 'ONLINE';
                return `
                    <div class="cart__item">
                        <div class="cart__item__image">
                            <img class="cart__item__img" 
                                 src="${course.image}" 
                                 alt="${course.name}">
                            <div class="cart__item__kind-tag">
                                <span class="cart__item__kind">${kindLabel}</span>
                            </div>
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
        `;
            }
          )
          .join("")}
        ${giftCardsInCart
          .map(
            (giftCard) => `
        <div class="cart__item">
            <div class="cart__item__image">
                <div class="cart__item__giftcard-preview" style="background-color: ${giftCard.backgroundColor || 'var(--light-gray)'}">
                    <h3 class="cart__item__giftcard-preview__label">GIFT CARD para</h3>
                    <h1 class="cart__item__giftcard-preview__name" style="color: ${giftCard.fontColor || 'var(--black)'}; font-size: ${giftCard.fontSize || '1em'}">${giftCard.recipientName || 'DESTINATARIO'}</h1>
                    <span class="cart__item__giftcard-preview__price ${giftCard.priceLocation || ''}" style="background-color: var(--black); color: var(--whitesmoke); padding: 0.3em 0.6em;">
                        $${Number(giftCard.price).toFixed(2)}.-
                    </span>
                </div>
            </div>
            <div class="cart__item__details">
                <h3 class="cart__item__title">Gift Card</h3>
                <p class="cart__item__duration">Para: ${giftCard.recipientName || 'DESTINATARIO'}</p>
            </div>
            <div class="cart__item__price">
                <span class="cart__item__amount">$${Number(giftCard.price).toFixed(2)}.-</span>
            </div>
            <div class="cart__item__actions">
                <button class="cart__item__remove" id="remove-giftcard-btn" type="button" data-giftcard-id="${giftCard.id}">🗑️</button>
            </div>
        </div>
        `
          )
          .join("")}
        `;

    const removeFromCartBtns = element.querySelectorAll(
      "#remove-from-cart-btn"
    );
    removeFromCartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const courseId = parseInt(btn.getAttribute("data-course-id"));
        const cartServiceInstance = new CartService();
        cartServiceInstance.removeFromCart(courseId);
      });
    });

    const removeGiftCardBtns = element.querySelectorAll(
      "#remove-giftcard-btn"
    );
    removeGiftCardBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const giftCardId = parseInt(btn.getAttribute("data-giftcard-id"));
        const giftCardServiceInstance = new GiftCardService();
        const giftCards = giftCardServiceInstance.getGiftCards();
        const giftCardToRemove = giftCards.find(gc => gc.id === giftCardId);
        if (giftCardToRemove) {
          giftCardServiceInstance.removeGiftCard(giftCardToRemove);
        }
      });
    });
  }

  static #renderCartSummary() {
    const giftCardService = new GiftCardService();
    const cartService = new CartService();
    const coursesService = new CoursesService();

    const cart = cartService.getCart();
    const coursesTotal = cart.reduce((acc, id) => {
      const course = coursesService.getCourseById(id);
      return acc + (course ? Number(course.price) || 0 : 0);
    }, 0);
    const giftCards = giftCardService.getGiftCards();
    const giftCardsTotal = giftCards.reduce((acc, giftCard) => {
      return acc + (giftCard ? Number(giftCard.price) || 0 : 0);
    }, 0);
    const total = Number(coursesTotal) + Number(giftCardsTotal);
    const element = document.getElementById("cart-summary");

    if (!element) {
      return;
    }

    const subtotal = total.toFixed(2);
    const discount = cart.length >= 3 ? 10.0 : 0.0;
    const finalTotal = (Number(total) - discount).toFixed(2);
    const courseCount = cart.length;
    const totalItems = cart.length + giftCards.length;

    element.innerHTML =
      totalItems > 0
        ? `
                    <div class="cart__summary__content">
                        <h2 class="cart__summary__title">Resumen del pedido</h2>
                        
                        <div class="cart__summary__details">
                            <div class="cart__summary__line">
                                <span class="cart__summary__label">Subtotal${courseCount > 0 ? ` (${courseCount} ${courseCount === 1 ? "curso" : "cursos"})` : ""}${giftCards.length > 0 ? `${courseCount > 0 ? " + " : ""}${giftCards.length} ${giftCards.length === 1 ? "gift card" : "gift cards"}` : ""}:</span>
                                <span class="cart__summary__value">$${subtotal}.-</span>
                            </div>
                            ${
                              discount > 0
                                ? `
                            <div class="cart__summary__line">
                                <span class="cart__summary__label">Descuento:</span>
                                <span class="cart__summary__value cart__summary__value--discount">-$${discount}.-</span>
                            </div>
                            `
                                : ""
                            }
                            <div class="cart__summary__line cart__summary__line--total">
                                <span class="cart__summary__label">Total:</span>
                                <span class="cart__summary__value cart__summary__value--total">$${finalTotal}.-</span>
                            </div>
                        </div>
                                
                        <div class="cart__summary__actions">
                            <div class="cart__summary__btn cart__summary__btn--primary" id="buy-btn">
                                Proceder al pago
                            </div>
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
        `
        : "";

    const buyBtn = element.querySelector("#buy-btn");
    if (buyBtn) {
      buyBtn.addEventListener("click", () => {
        const paymentService = PaymentService.getOrCreateInstance();
        const cartService = new CartService();
        const giftCardService = new GiftCardService();
        const subscriptionService = new SubscriptionService();
        const coursesService = new CoursesService();
        const cart = cartService.getCart();
        const giftCards = giftCardService.getGiftCards();
        
        if (cart.length === 0 && giftCards.length === 0) {
          return;
        }
        
        // Verificar si hay cursos presenciales en el carrito que también están en suscripciones
        const subscriptions = subscriptionService.getSubscriptions();
        const presentialCoursesInCart = cart
          .map((id) => coursesService.getCourseById(id))
          .filter((course) => course && course.kind === 'in-person' && subscriptions.includes(course.id));
        
        // Si hay cursos presenciales en el carrito, redirigir a la vista de suscripciones
        if (presentialCoursesInCart.length > 0) {
          window.location.href = "/suscripciones/";
          return;
        }
        
        if (cart.length > 0) {
          paymentService.setPayment(cart, true);
        } else {
          paymentService.setPayment([], true);
        }

        window.location.href = "/pagar";
      });
    }
  }

  static #renderCartRecommendations() {
    const coursesService = new CoursesService();
    const coursesInCart = coursesService.getRandomCourses(3);
    const element = document.getElementById("cart-recommendations");

    if (!element) {
      return;
    }

    element.innerHTML = `
        ${coursesInCart
          .map(
            (course) => {
                const kindLabel = course.kind === 'in-person' ? 'PRESENCIAL' : 'ONLINE';
                const ctaButton = course.kind === 'in-person' ? 'INSCRIBIRSE' : 'COMPRAR';
                const ctaButtonLink = course.kind === 'in-person' ? `/inscripcion/?courseId=${course.id}` : '/pagar';
                return `
                    <li class="cart__recommendations__item">
                        <article class="cart__recommendations__card">
                            <div class="cart__recommendations__card__top">
                                <img class="cart__recommendations__card__img" 
                                     src="${course.image}" 
                                     alt="${course.name}">
                                <div class="cart__recommendations__card__kind-tag">
                                    <span class="cart__recommendations__card__kind">${kindLabel}</span>
                                </div>
                                <div class="cart__recommendations__card__tag">
                                    <span class="cart__recommendations__card__price">${course.price}.-</span>
                                </div>
                            </div>
                            <div class="cart__recommendations__card__content">
                                <h3 class="cart__recommendations__card__title">${course.name}</h3>
                                <div class="cart__recommendations__card__info">
                                    <a class="cart__recommendations__card__btn cart__recommendations__card__btn--cart" 
                                       href="/carrito/" 
                                       data-course-id="${course.id}"
                                       aria-label="Agregar al carrito">🛒</a>
                                    <a class="cart__recommendations__card__link" 
                                       href="/detalle/?courseId=${course.id}">Ver detalle</a>
                                </div>
                                <div class="cart__recommendations__card__actions">
                                    <a class="cart__recommendations__card__btn cart__recommendations__card__btn--subscribe" 
                                       href="${ctaButtonLink}" 
                                       data-course-kind="${course.kind}"
                                       data-course-id="${course.id}">${ctaButton}</a>
                                </div>
                            </div>
                        </article>
                    </li>
        `;
            }
          )
          .join("")}
        `;

    const addToCartBtns = element.querySelectorAll(".cart__recommendations__card__btn--cart");
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const courseId = parseInt(btn.getAttribute("data-course-id"));
        const cartServiceInstance = new CartService();
        cartServiceInstance.addToCart(courseId);
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

    document.addEventListener(CartService.cartClearedEventKey, () => {
      this.paintAndUpdate();
    });

    document.addEventListener(GiftCardService.giftCardAddedEventKey, () => {
      this.paintAndUpdate();
    });

    document.addEventListener(GiftCardService.giftCardRemovedEventKey, () => {
      this.paintAndUpdate();
    });
  }

  static render() {
    this.paintAndUpdate();
    this.#renderCartRecommendations();
  }
}
Carrito.render();
