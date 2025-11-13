import { COURSES } from "./CONSTANTS.js";
import { AuthorService } from "./author-service.js";

export class CoursesService {

    constructor() {
        this.courses = COURSES;
        this.authorService = new AuthorService();
    }

    #parseCourseName(name) {
        return name.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    getCourses() {
        return this.courses;
    }

    getCourseById(id) {
        const course = this.courses.find(course => course.id === id);

        if (!course) {
            return null;
        }

        const courseCopy = { ...course };

        const relatedCoursesIds = Array.isArray(course.relatedCourses) ? course.relatedCourses : [];
        const relatedCourses = this.courses
            .filter(relatedCourse => 
                relatedCoursesIds.includes(relatedCourse.id) && relatedCourse.id !== course.id
            )
            .map(relatedCourse => {
                return { ...relatedCourse };
            });

        courseCopy.relatedCourses = relatedCourses;

        courseCopy.author = this.authorService.getAuthorById(course.author);

        return courseCopy;
    }

    getByQuery(query) {
        return this.courses.filter(course => this.#parseCourseName(course.name).includes(this.#parseCourseName(query)));
    }

    getRandomCourses(count) {
        return this.courses.sort(() => Math.random() - 0.5).slice(0, count);
    }
}