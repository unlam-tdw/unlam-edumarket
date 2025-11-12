import { CoursesService } from "../scripts/courses-service.js";
import { CartService } from "../scripts/cart-service.js";
import { PaymentService } from "../scripts/payment-service.js";

export class Detalle {
    static course;

    static #renderHero() {
        return `
            <div class="course-detail__hero">
                <div class="course-detail_hero_image">
                    <img class="course-detail_hero_img" 
                         src="${this.course.image}" 
                         alt="${this.course.name}">
                </div>
                <div class="course-detail_hero_content">
                    <h1 class="course-detail_hero_title">${this.course.name}</h1>
                    <div class="course-detail_hero_info">
                        <div class="course-detail_hero_item">
                            <span class="course-detail_hero_label">Valor:</span>
                            <span class="course-detail_hero_value">${this.course.price}</span>
                        </div>
                        <div class="course-detail_hero_item">
                            <span class="course-detail_hero_label">Tiempo de dedicación necesario:</span>
                            <span class="course-detail_hero_value">${this.course.duration} horas</span>
                        </div>
                        <div class="course-detail_hero_item">
                            <span class="course-detail_hero_label">Descripción del curso:</span>
                            <span class="course-detail_hero_value">${this.course.description}</span>
                        </div>
                        <div class="course-detail_hero_item">
                            <span class="course-detail_hero_label">Requisitos Previos:</span>
                            <span class="course-detail_hero_value">${this.course.prerequisites}</span>
                        </div>
                    </div>
                    <div class="course-detail_hero_actions">
                        <a class="course-detail_herobtn course-detailhero_btn--primary" href="/inscripcion/?courseId=${this.course.id}" id="subscribe-btn" data-course-id="${this.course.id}">INSCRIBIRSE</a>
                        <a class="course-detail_herobtn course-detailhero_btn--secondary" href="/carrito" id="add-to-cart-btn" data-course-id="${this.course.id}">AGREGAR AL CARRITO</a>
                        <a class="course-detail_herobtn course-detailhero_btn--tertiary" href="/pagar" id="buy-btn" data-course-id="${this.course.id}">COMPRAR</a>
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
                        <div class="course-detail_curriculum_content">
                            <div class="course-detail_curriculum_intro">
                                <span class="course-detail_curriculum_intro-text">${this.course.name.toUpperCase()}</span>
                            </div>
                            
                            <div class="course-detail_curriculum_modules">
                                ${this.course.modules.map((module, index) => `
                                                                    <details class="course-detail_curriculum_module" ${index === 0 ? 'open' : ''}>
                                    <summary class="course-detail_curriculummodule_header">
                                        <span class="course-detail_curriculummodule_title">${module.title}</span>
                                        <span class="course-detail_curriculummodule_toggle">▼</span>
                                    </summary>
                                    <div class="course-detail_curriculummodule_content">
                                        ${module.lessons.map(lesson => `
                                        <div class="course-detail_curriculum_lesson">
                                            <div class="course-detail_curriculumlesson_icon">▶</div>
                                            <div class="course-detail_curriculumlesson_content">
                                                <span class="course-detail_curriculumlesson_title">${lesson.title}</span>
                                                <span class="course-detail_curriculumlesson_duration">${lesson.duration}</span>
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
                        <div class="course-detail_instructor_content">
                            <div class="course-detail_instructor_avatar">
                                <img class="course-detail_instructor_img" 
                                     src="${this.course.author.image}" 
                                     alt="Foto del instructor">
                            </div>
                            <div class="course-detail_instructor_info">
                                <h3 class="course-detail_instructor_name">${this.course.author.name}</h3>
                                <div class="course-detail_instructor_rating">
                                    <div class="course-detail_instructor_stars">
                                        ${Array(this.course.author.stars).fill('<span class="course-detail_instructorstar course-detailinstructor_star--filled">★</span>').join('')}
                                        ${Array(5 - this.course.author.stars).fill('<span class="course-detail_instructor_star">★</span>').join('')}
                                    </div>
                                    <span class="course-detail_instructor_rating-text">${this.course.author.stars} de 5 estrellas</span>
                                </div>
                                <p class="course-detail_instructor_bio">
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
                <ul class="course-detail_related_list">
                    ${this.course.relatedCourses.map(relatedCourse => `
                    <li class="course-detail_related_item">
                        <article class="course-detail_related_card">
                            <div class="course-detail_relatedcard_top">
                                <img class="course-detail_relatedcard_img" 
                                     src="${relatedCourse.image}" 
                                     alt="Curso relacionado">
                                <div class="course-detail_relatedcard_tag">
                                    <span class="course-detail_relatedcard_price">${relatedCourse.price}.-</span>
                                </div>
                            </div>
                            <div class="course-detail_relatedcard_content">
                                <div class="course-detail_relatedcard_info">
                                    <div class="course-detail_relatedcard_duration">
                                        <span class="course-detail_relatedcardduration_number">${relatedCourse.duration}</span>
                                        <span class="course-detail_relatedcardduration_text">hs</span>
                                    </div>
                                    <div class="course-detail_relatedcard_details">
                                        <h3 class="course-detail_relatedcard_title">${relatedCourse.name}</h3>
                                        <a class="course-detail_relatedcard_link" href="/detalle/?courseId=${relatedCourse.id}">Ver detalle</a>
                                    </div>
                                </div>
                                <div class="course-detail_relatedcard_actions">
                                    <a class="course-detail_relatedcard_btn" href="/pagar/">Comprar</a>
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