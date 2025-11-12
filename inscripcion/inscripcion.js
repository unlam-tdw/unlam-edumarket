import { CoursesService } from "../scripts/courses-service.js";
import { StorageService } from "../scripts/storage-service.js";
import { ModalService } from "../scripts/modal-service.js";

export class Inscripcion {
    constructor() { }

    static render() {
        const courseService = new CoursesService();
        const courseId = new URLSearchParams(window.location.search).get("courseId");
        const course = courseService.getCourseById(Number(courseId));

        let contadorDeInscripciones = 1;

        const inscriptionTotalInitial = (contadorDeInscripciones * course.price).toFixed(2);

        const addBtn = document.querySelector(".btnadd");

        const container = document.getElementById("personas-container");

        const filaOriginal = document.querySelector(".file");

        const btnOriginal = filaOriginal.querySelector(".btn-");

        const inscriptionTotalElement = document.getElementById("inscription-total");

        inscriptionTotalElement.textContent = `$ ${inscriptionTotalInitial}`;


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

        btnOriginal.addEventListener("click", () => {
            const inputs = filaOriginal.querySelectorAll("input");
            inputs.forEach(input => input.value = "");
        });

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