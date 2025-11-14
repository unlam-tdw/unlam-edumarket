import { CoursesService } from "../scripts/courses-service.js";
import { CartService } from "../scripts/cart-service.js";

export class Busqueda {
    static #getQuery() {
        return new URLSearchParams(window.location.search).get("query") || "";
    }

    static #searchResults() {
        const query = this.#getQuery();
        if (!query) {
            return [];
        }
        const courses = new CoursesService();
        const results = courses.getByQuery(query);

        return results;
    }

    static #renderResultItem(item) {
        const kindLabel = item.kind === 'in-person' ? 'PRESENCIAL' : 'ONLINE';
        const ctaButton = item.kind === 'in-person' ? 'INSCRIBIRSE' : 'COMPRAR';
        const ctaButtonLink = item.kind === 'in-person' ? `/inscripcion/?courseId=${item.id}` : '/pagar';
        return `
                        <article class="search__results__card">
                            <div class="search__results__card__top">
                                <img class="search__results__card__img" 
                                     src="${item.image}" 
                                     alt="${item.name}">
                                <div class="search__results__card__kind-tag">
                                    <span class="search__results__card__kind">${kindLabel}</span>
                                </div>
                                <div class="search__results__card__tag">
                                    <span class="search__results__card__price">${item.price}.-</span>
                                </div>
                            </div>
                            <div class="search__results__card__content">
                                <div class="search__results__card__info">
                                    <div class="search__results__card__duration">
                                        <span class="search__results__card__duration__number">${item.duration}</span>
                                        <span class="search__results__card__duration__text">hs</span>
                                    </div>
                                    <div class="search__results__card__details">
                                        <h3 class="search__results__card__title">${item.name}</h3>
                                        <a class="search__results__card__link" href="/detalle/?courseId=${item.id}">Ver detalle</a>
                                    </div>
                                </div>
                                <div class="search__results__card__actions">
                                    <a class="search__results__card__btn search__results__card__btn--subscribe" 
                                        href="${ctaButtonLink}"
                                        data-course-kind="${item.kind}"
                                       data-course-id="${item.id}">${ctaButton}</a>
                                    <a class="search__results__card__btn search__results__card__btn--cart" 
                                       href="/carrito/" 
                                       data-course-id="${item.id}">🛒</a>
                                </div>
                            </div>
                        </article>
        `;
    }

    static render() {
        const results = this.#searchResults();
        const searchResults = document.getElementById("search-results");

        if (!searchResults) {
            return;
        }

        if (results.length === 0) {
            searchResults.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        searchResults.innerHTML = `<ul class="search__results__list">
            ${results.map(result => this.#renderResultItem(result)).join("")}
        </ul>`;

        const addToCartBtns = searchResults.querySelectorAll('.search__results__card__btn--cart');
        const subscribeBtns = searchResults.querySelectorAll('.search__results__card__btn--subscribe');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                const cartService = new CartService();
                cartService.addToCart(courseId);
            });
        });
        
        subscribeBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                const courseKind = btn.getAttribute('data-course-kind');
                const courseLink = courseKind === 'in-person' ? `/inscripcion/?courseId=${courseId}` : '/pagar';
                window.location.href = courseLink;
            });
        });
    }
}

Busqueda.render();