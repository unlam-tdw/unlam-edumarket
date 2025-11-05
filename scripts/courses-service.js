import { COURSES } from "./constants.js";

export class CoursesService {
    getCourses() {
        return COURSES;
    }

    getCourseById(id) {
        return COURSES.find(course => course.id === id);
    }
}