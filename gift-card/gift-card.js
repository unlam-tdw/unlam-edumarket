import { ModalService } from "../scripts/modal-service.js";
import { StorageService } from "../scripts/storage-service.js";
import { GiftCardService } from "../scripts/gift-card-service.js";

const inputNombre = document.getElementById("nombreDestinatario");
const textoDestinatario = document.querySelector(".main__section__img h1");

inputNombre.addEventListener("input", () => {
  textoDestinatario.textContent = inputNombre.value || "DESTINATARIO";
});

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

const textoMonto = document.getElementById("etiquetaPrecio");

const inputMontoEscrito = document.getElementById("monto");

function cambiarMonto() {
  textoMonto.textContent = "$" + inputMontoEscrito.value + ".-";
}

inputMontoEscrito.oninput = cambiarMonto;

const etiquetaPrecio = document.getElementById("etiquetaPrecio");

document.getElementById("ubicacion1").onchange = () => {
  etiquetaPrecio.className = "main__section__img__span arriba-izquierda";
};

document.getElementById("ubicacion2").onchange = () => {
  etiquetaPrecio.className = "main__section__img__span";
};

document.getElementById("ubicacion3").onchange = () => {
  etiquetaPrecio.className = "main__section__img__span abajo-izquierda";
};

const colorFondo = document.getElementById("giftcardGrande");

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

const formGiftCard = document.getElementById("form-gift-card");

formGiftCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const modalService = new ModalService("modal-parent");
  const giftCardService = new GiftCardService();  

  giftCardService.addGiftCard({
    recipientName: inputNombre.value,
    price: parseFloat(inputMontoEscrito.value) || 0, 
    fontSize: textoDestinatario.style.fontSize,
    fontColor: textoDestinatario.style.color,
    priceLocation: etiquetaPrecio.className,
    backgroundColor: colorFondo.style.backgroundColor,
  });

  modalService.buildModal(
    "Gift Card generada",
    "La gift card ha sido generada correctamente.",
    "success",
    () => (window.location.href = "/carrito")
  );
  modalService.openModal();
});
