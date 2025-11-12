import { ModalService } from "../scripts/modal-service.js";
import { StorageService } from "../scripts/storage-service.js";
//*********** NOMBRE-DESTINATARIO

//selecciona el input
const inputNombre = document.getElementById("nombreDestinatario");
//selecciona el texto destinatario h1 en la giftcard
const textoDestinatario = document.querySelector(".main__section__img h1");

//escucha al evento input (cuando escriben ahi)
inputNombre.addEventListener("input", () => {
  // si escriben texto lo muestra, si no, queda el original
  textoDestinatario.textContent = inputNombre.value || "DESTINATARIO";
});

//cuando se elige un color, se cambia el color del texto al elegido
document.getElementById("color1").onchange = () =>
  (textoDestinatario.style.color = "var(--coral-red)");
document.getElementById("color2").onchange = () =>
  (textoDestinatario.style.color = "var(--aquamarine)");
document.getElementById("color3").onchange = () =>
  (textoDestinatario.style.color = "var(--greenyellow)");
document.getElementById("color4").onchange = () =>
  (textoDestinatario.style.color = "var(--blueviolet)");
document.getElementById("color5").onchange = () =>
  (textoDestinatario.style.color = "var(--yellow)");
document.getElementById("color1").onchange = () =>
  (textoDestinatario.style.color = "var(--coral-red)");

document.getElementById("fuente1").onchange = () =>
  (textoDestinatario.style.fontSize = "20px");
document.getElementById("fuente2").onchange = () =>
  (textoDestinatario.style.fontSize = "28px");
document.getElementById("fuente3").onchange = () =>
  (textoDestinatario.style.fontSize = "32px");
document.getElementById("fuente4").onchange = () =>
  (textoDestinatario.style.fontSize = "48px");
document.getElementById("fuente5").onchange = () =>
  (textoDestinatario.style.fontSize = "60px");

//********ETIQUETA PRECIO****

// selecciona la etiqueta del monto en la giftcard
const textoMonto = document.getElementById("etiquetaPrecio");

// selecciona el input del monto en la giftcard
const inputMontoEscrito = document.getElementById("monto");

function cambiarMonto() {
  textoMonto.textContent = "$" + inputMontoEscrito.value + ".-";
}

inputMontoEscrito.oninput = cambiarMonto;

//********UBICACION****

const etiquetaPrecio = document.getElementById("etiquetaPrecio");

document.getElementById("ubicacion1").onchange = () => {
  etiquetaPrecio.className = "main__section__img__span arriba-izquierda";
};

document.getElementById("ubicacion2").onchange = () => {
  etiquetaPrecio.className = "main__section__img__span"; // arriba derecha (default)
};

document.getElementById("ubicacion3").onchange = () => {
  etiquetaPrecio.className = "main__section__img__span abajo-izquierda";
};

// Selecciona la giftcard
const colorFondo = document.getElementById("giftcardGrande");

// Escucha los cambios en cada radio
document.getElementById("fondo1").onchange = () =>
  (colorFondo.style.backgroundColor = "var(--coral-red)");
document.getElementById("fondo2").onchange = () =>
  (colorFondo.style.backgroundColor = "var(--aquamarine)");
document.getElementById("fondo3").onchange = () =>
  (colorFondo.style.backgroundColor = "var(--greenyellow)");
document.getElementById("fondo4").onchange = () =>
  (colorFondo.style.backgroundColor = "var(--blueviolet)");
document.getElementById("fondo5").onchange = () =>
  (colorFondo.style.backgroundColor = "var(--yellow)");

//********FORMULARIO****

const formGiftCard = document.getElementById("form-gift-card");

formGiftCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const modalService = new ModalService("modal-parent");

  const storageService = StorageService.getOrCreateInstance();
  storageService.setItem("gift-card-total", inputMontoEscrito.value);

  modalService.buildModal(
    "Gift Card generada",
    "La gift card ha sido generada correctamente.",
    "success",
    () => (window.location.href = "/pagar")
  );
  modalService.openModal();
});
