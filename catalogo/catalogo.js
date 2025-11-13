import { CoursesService } from "../scripts/courses-service.js";
import { CartService } from "../scripts/cart-service.js";

export class Catalogo {
  constructor() {}

  static renderCourses() {
    const courses = new CoursesService();
    const allCourses = courses.getCourses();

    const coursesList = document.getElementById("catalogo-completo-cursos");
    if (!coursesList) {
      return;
    }

    coursesList.innerHTML = allCourses
      .map(
        (course) => `
                            <li class="main__cursos__list__item">
                    <article class="main__cursos__list__item__card">
                        <div class="main__cursos__list__item__card__top">
                            <img class="main__cursos__list__item__card__top__img"
                                src="${course.image}" alt="preview curso">
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
                                    href="/inscripcion/" id="subscribe-btn" data-course-id="${course.id}">Inscribirse</a>
                                <a class="main__cursos__list__item__card__bottom__cart__btn"
                                    href="/carrito/" id="add-to-cart-btn" data-course-id="${course.id}">🛒</a>
                            </div>
                        </div>
                    </article>
                </li>
            `
      )
      .join("");

    const addToCartBtns = coursesList.querySelectorAll('.main__cursos__list__item__card__bottom__cart__btn');
    const subscribeBtns = coursesList.querySelectorAll('.main__cursos__list__item__card__bottom__subscribe__btn');
    
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
        window.location.href = `/inscripcion/?courseId=${courseId}`;
      });
    });
    }
}

Catalogo.renderCourses();
