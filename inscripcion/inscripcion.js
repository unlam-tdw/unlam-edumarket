import { CoursesService } from "../scripts/courses-service.js";
import { StorageService } from "../scripts/storage-service.js";
import { ModalService } from "../scripts/modal-service.js";
import { SessionService } from "../scripts/session-service.js";
import { UsersService } from "../scripts/users-service.js";

export class Inscripcion {
    constructor() { }

    static render() {
        const courseService = new CoursesService();
        const courseId = new URLSearchParams(window.location.search).get("courseId");
        const course = courseService.getCourseById(Number(courseId));

        const courseTitleElement = document.getElementById("course-title");
        courseTitleElement.textContent = course.name;

        // Obtener información del usuario actual
        const sessionService = SessionService.getOrCreateInstance();
        const userId = sessionService.getSession();
        const usersService = new UsersService();
        const currentUser = userId ? usersService.getUserById(userId) : null;

        let contadorDeInscripciones = 1;

        const inscriptionTotalInitial = (contadorDeInscripciones * course.price).toFixed(2);

        const addBtn = document.querySelector(".btnadd");

        const container = document.getElementById("personas-container");

        const inscriptionTotalElement = document.getElementById("inscription-total");

        inscriptionTotalElement.textContent = `$ ${inscriptionTotalInitial}`;

        // Poblar la primera fila con la información del usuario
        if (currentUser) {
            const nombreInput = document.getElementById("nombre-0");
            const apellidoInput = document.getElementById("apellido-0");
            const dniInput = document.getElementById("dni-0");

            if (nombreInput) nombreInput.value = currentUser.nombre || "";
            if (apellidoInput) apellidoInput.value = currentUser.apellido || "";
            if (dniInput) dniInput.value = currentUser.dni || "";
        }


        function agregarPersona() {

            const div = document.createElement("div");
            div.className = "file persona";

            div.innerHTML = `
        <input id="nombre-${contadorDeInscripciones}" type="text" placeholder="Nombre" required />
        <input id="apellido-${contadorDeInscripciones}" type="text" placeholder="Apellido" required />
        <input id="dni-${contadorDeInscripciones}" type="number" placeholder="DNI" required />
        <button class="btn-" type="button" id="btn-eliminar-persona">−</button>
    `;

            container.appendChild(div);

            contadorDeInscripciones++;

            const inscriptionTotal = (contadorDeInscripciones * course.price).toFixed(2);

            inscriptionTotalElement.textContent = `$ ${inscriptionTotal}`;

            const btnEliminar = div.querySelector("#btn-eliminar-persona");

            btnEliminar.addEventListener("click", () => {
                div.remove();
                contadorDeInscripciones--;
                const inscriptionTotal = (contadorDeInscripciones * course.price).toFixed(2);
                inscriptionTotalElement.textContent = `$ ${inscriptionTotal}`;
            });
        }


        addBtn.addEventListener("click", agregarPersona);

        const subscribeForm = document.getElementById("subscribe-form");
        subscribeForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const storageService = StorageService.getOrCreateInstance();

            const inscriptionTotal = (contadorDeInscripciones * course.price).toFixed(2);
            storageService.setItem("inscription-total", inscriptionTotal);

            const modalService = new ModalService("modal-parent");

            const personas = []

            for (let i = 0; i < contadorDeInscripciones; i++) {
                const nombre = document.getElementById(`nombre-${i}`).value;
                const apellido = document.getElementById(`apellido-${i}`).value;
                const dni = document.getElementById(`dni-${i}`).value;
                
                if (nombre && apellido && dni) {
                    personas.push({ nombre, apellido, dni });
                }
            }

            let detalle = "";
            personas.forEach(persona => {
                detalle += `
                    <p>${persona.nombre} ${persona.apellido} - DNI: ${persona.dni}</p>
                    <br>
                `;
            });

            modalService.buildModal(
                "Felicitaciones!",
                `Has sido inscrito en el curso correctamente. Ahora puedes proceder al pago. <br> ${detalle}`,
                "success",
                () => {
                    window.location.href = "/pagar";
                }
            )
            modalService.openModal();
        });
    }
}
Inscripcion.render();