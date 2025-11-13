import { CartService } from "../cart-service.js";
import { SessionService } from "../session-service.js";
import { CoursesService } from "../courses-service.js";
import { GiftCardService } from "../gift-card-service.js";

export class Header {
  constructor() {}

  static render() {
    const header = document.getElementById("header");

    if (!header) {
      return;
    }

    const cartService = new CartService();
    const sessionService = SessionService.getOrCreateInstance();
    const coursesService = new CoursesService();
    const giftCardService = new GiftCardService();
    const isAuthenticated = sessionService.isAuthenticated();
    const cart = cartService.getCart();
    const giftCardsInCart = giftCardService.getGiftCards();
    const coursesInCart = cart.map((id) => coursesService.getCourseById(id));
    const coursesTotal = cart.reduce((acc, id) => {
      const course = coursesService.getCourseById(id);
      return acc + (course ? course.price : 0);
    }, 0);
    const giftCardsTotal = giftCardsInCart.reduce((acc, giftCard) => {
      return acc + (giftCard ? Number(giftCard.price) || 0 : 0);
    }, 0);
    const total = coursesTotal + giftCardsTotal;
    const subtotal = total.toFixed(2);
    const discount = cart.length >= 3 ? 10.0 : 0.0;
    const finalTotal = (subtotal - discount).toFixed(2);
    const cartLength = cart.length + giftCardsInCart.length;

    const href = isAuthenticated ? "/perfil" : "/sign-in";

    header.classList.add("header");
    header.innerHTML = `
        <div class="header__container">
            <a href="../index.html" class="header__logo">
                <img class="header__logo-img" src="../assets/logo.png" alt="Unlam EduMarket">
            </a>
            <form action="/busqueda/" method="GET" class="header__search">
                <input required id="search" name="query" type="text" class="header__search-input"
                    placeholder="Buscar...">
                <button type="submit" class="header__search-btn">🔍</button>
            </form>
            <div class="header__cart">
                <div class="header__cart-btn" id="boton-cart">
                    🛒
                    <span class="header__cart-count">${cartLength}</span>
                </div>
            </div>
            <div class="header__user">
                <a class="header__user-btn" href="${href}">👤</a>
            </div>
        </div>
        <nav class="header__nav">
            <div class="header__nav-container">
                <a href="../catalogo/index.html" class="header__nav-link">CATÁLOGO</a>
                ${
                  isAuthenticated
                    ? `<a href="../calendario/index.html" class="header__nav-link">CALENDARIO</a>`
                    : ""
                }
                <a href="../contacto/index.html" class="header__nav-link">CONTACTO</a>
                <a href="../gift-card/index.html" class="header__nav-link">GIFT-CARD</a>
            </div>
        </nav>
        `;

    const sidebar = document.createElement("aside");
    sidebar.id = "sidebar-carrito";
    sidebar.classList.add("sidebar-carrito");

    const closeBtn = document.createElement("button");
    closeBtn.id = "sidebar-close-btn";
    closeBtn.classList.add("sidebar-close-btn");
    closeBtn.innerHTML = "✕";
    closeBtn.setAttribute("aria-label", "Cerrar carrito");

    const cardContainer = document.createElement("ul");
    cardContainer.id = "cursos-container";
    cardContainer.classList.add("card-container");

    const cartEnd = document.createElement("div");
    cartEnd.id = "sidebar-links";
    cartEnd.classList.add("cart-end");
    cartEnd.innerHTML = `
<a href="../../carrito/index.html" class="cart-link">Ir al Carrito</a>
<span class="cart__summary__value cart__summary__value--total">$${finalTotal}</span>
    `;

    if (coursesInCart.length === 0 && giftCardsInCart.length === 0) {
      cardContainer.innerHTML = `
            <div class="cart__item">
                <p>No hay cursos en el carrito.</p>
            </div>
            `;
    } else {
      coursesInCart.map((course) => {
        const div = document.createElement("div");
        div.classList.add("cart__item");
        div.innerHTML = `
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
        `;
        cardContainer.appendChild(div);
      });

      giftCardsInCart.map((giftCard) => {
        const div = document.createElement("div");
        div.classList.add("cart__item");
        div.innerHTML = `
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
        `;
        cardContainer.appendChild(div);
      });
    }

    // Remove existing sidebar if it exists (from previous render)
    const existingSidebar = document.getElementById("sidebar-carrito");
    if (existingSidebar) {
      existingSidebar.remove();
    }
    
    header.appendChild(sidebar);
    sidebar.appendChild(closeBtn);
    sidebar.appendChild(cardContainer);
    sidebar.appendChild(cartEnd);

    const removeFromCartBtns = sidebar.querySelectorAll(
      "#remove-from-cart-btn"
    );
    removeFromCartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const courseId = parseInt(btn.getAttribute("data-course-id"));
        const cartServiceInstance = new CartService();
        cartServiceInstance.removeFromCart(courseId);
      });
    });

    const removeGiftCardBtns = sidebar.querySelectorAll(
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

    const cartBtn = document.getElementById("boton-cart");
    cartBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });

    document.addEventListener(CartService.cartAddedEventKey, () => {
      this.render();
    });

    document.addEventListener(CartService.cartRemovedEventKey, () => {
      this.render();
    });

    document.addEventListener(GiftCardService.giftCardAddedEventKey, () => {
      this.render();
    });

    document.addEventListener(GiftCardService.giftCardRemovedEventKey, () => {
      this.render();
    });
  }
}
