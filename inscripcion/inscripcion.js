import { COURSES } from "../scripts/CONSTANTS.js";

const addBtn = document.querySelector(".btnadd");

const container = document.getElementById("personas-container");

const filaOriginal = document.querySelector(".file");

const btnOriginal = filaOriginal.querySelector(".btn-");

function agregarPersona() {

    const div = document.createElement("div");
    div.className = "file persona";

    div.innerHTML = `
        <input type="text" placeholder="Nombre" required>
        <input type="text" placeholder="Apellido" required>
        <input type="number" placeholder="DNI" required>
        <button class="btn-" type="button">−</button>
    `;

    container.appendChild(div);

    const btnEliminar = div.querySelector(".btn-");

     btnEliminar.addEventListener("click", () => {
        div.remove();
    });
}

btnOriginal.addEventListener("click", () => {
    const inputs = filaOriginal.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
});

addBtn.addEventListener("click", agregarPersona);