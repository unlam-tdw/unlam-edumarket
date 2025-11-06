import { COURSES } from "./constants.js";

export class CoursesService {

    constructor() {
        this.courses = COURSES;
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
        return this.courses.find(course => course.id === id);
    }

    getByQuery(query) {
        return this.courses.filter(course => this.#parseCourseName(course.name).includes(this.#parseCourseName(query)));
    }
}