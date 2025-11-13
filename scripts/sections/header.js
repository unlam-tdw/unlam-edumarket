import { CartService } from "../cart-service.js";
import { ModalService } from "../modal-service.js";
import { SessionService } from "../session-service.js";
import { CoursesService } from "../courses-service.js";

export class Header {
  constructor() {}

  static render() {
    const header = document.getElementById("header");

    if (!header) {
      return;
    }

    const modalService = new ModalService("modal-parent");
    const cartService = new CartService();
    const sessionService = SessionService.getOrCreateInstance();
    const coursesService = new CoursesService();
    const isAuthenticated = sessionService.isAuthenticated();
    const cartLength = cartService.getCartLength();
    const cart = cartService.getCart();
    const total = cart.reduce((acc, id) => {
      const course = coursesService.getCourseById(id);
      return acc + (course ? course.price : 0);
    }, 0);
    const subtotal = total.toFixed(2);
    const discount = cart.length >= 3 ? 10.0 : 0.0;
    const finalTotal = (subtotal - discount).toFixed(2);
    const coursesInCart = cart.map((id) => coursesService.getCourseById(id));

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

    if (coursesInCart.length === 0) {
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
    }

    if (!document.getElementById("sidebar-carrito")) {
      header.appendChild(sidebar);
    }
    if (!document.getElementById("cursos-container")) {
      sidebar.appendChild(cardContainer);
    }
    if (!document.getElementById("sidebar-links")) {
      sidebar.appendChild(cartEnd);
    }

    const removeFromCartBtns = sidebar.querySelectorAll(
      "#remove-from-cart-btn"
    );
    removeFromCartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const courseId = parseInt(btn.getAttribute("data-course-id"));
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

    const cartBtn = document.getElementById("boton-cart");
    cartBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    document.addEventListener(CartService.cartAddedEventKey, () => {
      this.render();
    });

    document.addEventListener(CartService.cartRemovedEventKey, () => {
      this.render();
    });
  }
}
