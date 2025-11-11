import { CoursesService } from "../scripts/courses-service.js";
import { CartService } from "../scripts/cart-service.js";
import { PaymentService } from "../scripts/payment-service.js";

export class Detalle {
    static course;

    static #renderHero() {
        return `
            <div class="course-detail__hero">
                <div class="course-detail__hero__image">
                    <img class="course-detail__hero__img" 
                         src="${this.course.image}" 
                         alt="${this.course.name}">
                </div>
                <div class="course-detail__hero__content">
                    <h1 class="course-detail__hero__title">${this.course.name}</h1>
                    <div class="course-detail__hero__info">
                        <div class="course-detail__hero__item">
                            <span class="course-detail__hero__label">Valor:</span>
                            <span class="course-detail__hero__value">${this.course.price}</span>
                        </div>
                        <div class="course-detail__hero__item">
                            <span class="course-detail__hero__label">Tiempo de dedicación necesario:</span>
                            <span class="course-detail__hero__value">${this.course.duration} horas</span>
                        </div>
                        <div class="course-detail__hero__item">
                            <span class="course-detail__hero__label">Descripción del curso:</span>
                            <span class="course-detail__hero__value">${this.course.description}</span>
                        </div>
                        <div class="course-detail__hero__item">
                            <span class="course-detail__hero__label">Requisitos Previos:</span>
                            <span class="course-detail__hero__value">${this.course.prerequisites}</span>
                        </div>
                    </div>
                    <div class="course-detail__hero__actions">
                        <a class="course-detail__hero__btn course-detail__hero__btn--primary" href="/inscripcion">INSCRIBIRSE</a>
                        <a class="course-detail__hero__btn course-detail__hero__btn--secondary" href="/carrito" id="add-to-cart-btn" data-course-id="${this.course.id}">AGREGAR AL CARRITO</a>
                        <a class="course-detail__hero__btn course-detail__hero__btn--tertiary" href="/pagar" id="buy-btn" data-course-id="${this.course.id}">COMPRAR</a>
                    </div>
                </div>
            </div>
        `;
    }

    static #renderContent() {
        return `
<div class="course-detail__content">
                <div class="course-detail__main">
                    <section class="course-detail__curriculum">
                        <h2 class="course-detail__section-title">CONTENIDOS POR CLASE</h2>
                        <div class="course-detail__curriculum__content">
                            <div class="course-detail__curriculum__intro">
                                <span class="course-detail__curriculum__intro-text">${this.course.name.toUpperCase()}</span>
                            </div>
                            
                            <div class="course-detail__curriculum__modules">
                                ${this.course.modules.map((module, index) => `
                                                                    <details class="course-detail__curriculum__module" ${index === 0 ? 'open' : ''}>
                                    <summary class="course-detail__curriculum__module__header">
                                        <span class="course-detail__curriculum__module__title">${module.title}</span>
                                        <span class="course-detail__curriculum__module__toggle">▼</span>
                                    </summary>
                                    <div class="course-detail__curriculum__module__content">
                                        ${module.lessons.map(lesson => `
                                        <div class="course-detail__curriculum__lesson">
                                            <div class="course-detail__curriculum__lesson__icon">▶</div>
                                            <div class="course-detail__curriculum__lesson__content">
                                                <span class="course-detail__curriculum__lesson__title">${lesson.title}</span>
                                                <span class="course-detail__curriculum__lesson__duration">${lesson.duration}</span>
                                            </div>
                                        </div>
                                        `).join('')}
                                    </div>
                                </details>`).join('')}
                            </div>
                        </div>
                    </section>
                </div>

                <div class="course-detail__sidebar">
                    <section class="course-detail__instructor">
                        <h2 class="course-detail__section-title">DOCENTE</h2>
                        <div class="course-detail__instructor__content">
                            <div class="course-detail__instructor__avatar">
                                <img class="course-detail__instructor__img" 
                                     src="${this.course.author.image}" 
                                     alt="Foto del instructor">
                            </div>
                            <div class="course-detail__instructor__info">
                                <h3 class="course-detail__instructor__name">${this.course.author.name}</h3>
                                <div class="course-detail__instructor__rating">
                                    <div class="course-detail__instructor__stars">
                                        ${Array(this.course.author.stars).fill('<span class="course-detail__instructor__star course-detail__instructor__star--filled">★</span>').join('')}
                                        ${Array(5 - this.course.author.stars).fill('<span class="course-detail__instructor__star">★</span>').join('')}
                                    </div>
                                    <span class="course-detail__instructor__rating-text">${this.course.author.stars} de 5 estrellas</span>
                                </div>
                                <p class="course-detail__instructor__bio">
                                    ${this.course.author.description}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    static #renderRelated() {
        return `
<section class="course-detail__related">
                <h2 class="course-detail__section-title">Cursos Relacionados</h2>
                <ul class="course-detail__related__list">
                    ${this.course.relatedCourses.map(relatedCourse => `
                    <li class="course-detail__related__item">
                        <article class="course-detail__related__card">
                            <div class="course-detail__related__card__top">
                                <img class="course-detail__related__card__img" 
                                     src="${relatedCourse.image}" 
                                     alt="Curso relacionado">
                                <div class="course-detail__related__card__tag">
                                    <span class="course-detail__related__card__price">${relatedCourse.price}.-</span>
                                </div>
                            </div>
                            <div class="course-detail__related__card__content">
                                <div class="course-detail__related__card__info">
                                    <div class="course-detail__related__card__duration">
                                        <span class="course-detail__related__card__duration__number">${relatedCourse.duration}</span>
                                        <span class="course-detail__related__card__duration__text">hs</span>
                                    </div>
                                    <div class="course-detail__related__card__details">
                                        <h3 class="course-detail__related__card__title">${relatedCourse.name}</h3>
                                        <a class="course-detail__related__card__link" href="/detalle/?courseId=${relatedCourse.id}">Ver detalle</a>
                                    </div>
                                </div>
                                <div class="course-detail__related__card__actions">
                                    <a class="course-detail__related__card__btn" href="/pagar/">Comprar</a>
                                </div>
                            </div>
                        </article>
                    </li>
                    `).join('')}
                </ul>
            </section>
        `;
    }

    static render() {
        const courseId = new URLSearchParams(window.location.search).get("courseId");
        const main = document.getElementById("course-detail");

        if (!main) {
            return;
        }

        const courses = new CoursesService();
        this.course = courses.getCourseById(Number(courseId));

        if (!this.course) {
            main.innerHTML = `
                    <section class="course-detail">
                        <div style="text-align: center; padding: 2rem;">
                            <h2>Curso no encontrado</h2>
                            <p>El curso con ID ${courseId} no existe.</p>
                            <a href="../index.html">Volver al inicio</a>
                        </div>
                    </section>
                `;
            return;
        }

        main.innerHTML = `
        <section class="course-detail">
            ${this.#renderHero()}
            ${this.#renderContent()}
            ${this.#renderRelated()}
        </section>
        `;

        const addToCartBtn = main.querySelector('#add-to-cart-btn');
            addToCartBtn.addEventListener('click', () => {
                const courseId = parseInt(addToCartBtn.getAttribute('data-course-id'));
                const cartService = new CartService();
                cartService.addToCart(courseId);
            });

        const buyBtn = main.querySelector('#buy-btn');
        buyBtn.addEventListener('click', () => {
            const courseId = parseInt(buyBtn.getAttribute('data-course-id'));
            const paymentService = PaymentService.getOrCreateInstance();
            paymentService.setPayment([courseId]);
            window.location.href = "/pagar";
        });
    }
}

Detalle.render();