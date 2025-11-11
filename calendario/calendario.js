import { CoursesService } from "../scripts/courses-service.js";
export class Calendario {
  constructor() {}

  static render() {
    console.log("Inicio JS");
    const courses = new CoursesService();
    const cursoUno = courses.getCourseById(3);
    const cursoDos = courses.getCourseById(6);
    const cursoTres = courses.getCourseById(9);
    const cursoCuatro = courses.getCourseById(12);
    const primerCurso = document.getElementById("primer-curso-info");
    const segundoCurso = document.getElementById("segundo-curso-info");
    const tercerCurso = document.getElementById("tercer-curso-info");
    const cuartoCurso = document.getElementById("cuarto-curso-info");
    primerCurso.innerHTML = `<a href="/detalle/?courseId=${cursoUno.id}">${cursoUno.name}</a>`;
    segundoCurso.innerHTML = `<a href="/detalle/?courseId=${cursoDos.id}">${cursoDos.name}</a>`;
    tercerCurso.innerHTML = `<a href="/detalle/?courseId=${cursoTres.id}">${cursoTres.name}</a>`;
    cuartoCurso.innerHTML = `<a href="/detalle/?courseId=${cursoCuatro.id}">${cursoCuatro.name}</a>`;
  }
}
Calendario.render();
