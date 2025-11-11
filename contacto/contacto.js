export class Contacto {
  constructor() {}

  static check() {
    const formulario = document.getElementById("form-contacto");

    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const telefono = document.getElementById("telefono").value;
      const mensaje = document.getElementById("mensaje").value;

      if (mensaje.length >= 1000) {
        console.log("Superó ", mensaje.length);
      }

      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
      const regexTelefono = /^\d{4}-\d{4}$/gm;

      if (regexEmail.test(email)) {
        console.log(regexEmail.test(email));
      }

      if (regexTelefono.test(telefono)) {
        console.log(regexTelefono.test(telefono));
      }
    });
  }
}

Contacto.check();
