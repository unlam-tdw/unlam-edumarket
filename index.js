import { CoursesService } from "./scripts/courses-service.js";

export class Index {
    constructor() {}

    static renderCourses() {
        const courses = new CoursesService();
        const randomCourses = courses.getRandomCourses(9);

        const mainCoursesList = document.getElementById('main-curses-list');
        if (!mainCoursesList) {
            console.warn("No se encontró el elemento con id 'main-curses-list'.");
            return;
        }

        mainCoursesList.innerHTML = randomCourses.map(course => `
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
                                <a class="main__cursos__list__item__card__bottom__buy__btn"
                                    href="/pagar/">Comprar</a>
                            </div>
                        </div>
                    </article>
                </li>
            `).join('');
        return;
    }
}

Index.renderCourses();