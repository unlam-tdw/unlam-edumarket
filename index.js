import { CoursesService } from "./scripts/courses-service.js";
import { CartService } from "./scripts/cart-service.js";
import { PaymentService } from "./scripts/payment-service.js";
import { StorageService } from "./scripts/storage-service.js";

export class Index {
    constructor() {}

    static renderCourses() {
        const courses = new CoursesService();
        const randomCourses = courses.getRandomCourses(9);

        const mainCoursesList = document.getElementById('main-curses-list');
        if (!mainCoursesList) {
            return;
        }

        mainCoursesList.innerHTML = randomCourses.map(course => {
            const kindLabel = course.kind === 'in-person' ? 'PRESENCIAL' : 'ONLINE';
            const ctaButton = course.kind === 'in-person' ? 'INSCRIBIRSE' : 'COMPRAR';
            const ctaButtonLink = course.kind === 'in-person' ? `/inscripcion/?courseId=${course.id}` : '/pagar';
            return `
                            <li class="main__cursos__list__item">
                    <article class="main__cursos__list__item__card">
                        <div class="main__cursos__list__item__card__top">
                            <img class="main__cursos__list__item__card__top__img"
                                src="${course.image}" alt="preview curso">
                            <div class="main__cursos__list__item__card__top__kind-tag">
                                <span class="main__cursos__list__item__card__top__kind-tag__kind">${kindLabel}</span>
                            </div>
                            <div class="main__cursos__list__item__card__top__tag">
                                <span class="main__cursos__list__item__card__top__tag__price">${course.price}.-</span>
                            </div>
                        </div>
                        <div class="main__cursos__list__item__card__bottom">
                            <div class="main__cursos__list__item__card__bottom__info">
                                <div class="main__cursos__list__item__card__bottom__info__duration">
                                    <span
                                        class="main__cursos__list__item__card__bottom__info__duration__number">${course.duration}</span><span
                                        class="main__cursos__list__item__card__bottom__info__duration__text">hs</span>
                                </div>
                                <div class="main__cursos__list__item__card__bottom__info__name">
                                    <h3 class="main__cursos__list__item__card__bottom__info__name__title">${course.name}</h3>
                                    <a class="main__cursos__list__item__card__bottom__info__name__detail"
                                        href="/detalle/?courseId=${course.id}">Ver
                                        detalle</a>
                                </div>
                            </div>
                            <div class="main__cursos__list__item__card__bottom__buy">
                                <a class="main__cursos__list__item__card__bottom__subscribe__btn"
                                    href="${ctaButtonLink}" id="subscribe-btn" data-course-kind="${course.kind}" data-course-id="${course.id}">${ctaButton}</a>
                                <a class="main__cursos__list__item__card__bottom__cart__btn"
                                    href="/carrito/" id="add-to-cart-btn" data-course-id="${course.id}">🛒</a>    
                            </div>
                        </div>
                    </article>
                </li>
            `;
        }).join('');

        const addToCartBtns = mainCoursesList.querySelectorAll('.main__cursos__list__item__card__bottom__cart__btn');
        const ctaBtns = mainCoursesList.querySelectorAll('.main__cursos__list__item__card__bottom__subscribe__btn');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                const cartService = new CartService();
                cartService.addToCart(courseId);
            });
        });
        
        ctaBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                const courseKind = btn.getAttribute('data-course-kind');
                
                if (courseKind === 'in-person') {
                    window.location.href = `/inscripcion/?courseId=${courseId}`;
                    return;
                }
                
                const paymentService = PaymentService.getOrCreateInstance();
                const storageService = StorageService.getOrCreateInstance();
                
                storageService.removeItem("inscription-total");
                
                paymentService.setPayment([courseId]);
                
                window.location.href = '/pagar';
            });
        });
    }
}
let slides = document.querySelectorAll(".slide");

let actual = 0;

slides[actual].style.display = "block";

function siguiente() {
  slides[actual].style.display = "none";
  actual = actual + 1;
  if (actual >= slides.length) actual = 0;
  slides[actual].style.display = "block";
}

function anterior() {
  slides[actual].style.display = "none";
  actual = actual - 1;
  if (actual < 0) actual = slides.length - 1;
  slides[actual].style.display = "block";
}

document.querySelector(".main__carousel__btn.right").onclick = siguiente;
document.querySelector(".main__carousel__btn:not(.right)").onclick = anterior;

setInterval(siguiente, 7000);

Index.renderCourses();
