import { ModalService } from "../scripts/modal-service.js";

export class Contacto {

constructor(){}


static check(){
    const modalService = new ModalService("modal-parent");
    const formulario = document.getElementById("form-contacto");


    formulario.addEventListener('submit', (event) =>{
        event.preventDefault()
        const email = document.getElementById("email").value;
        const telefono = document.getElementById("telefono").value;
        const mensaje = document.getElementById("mensaje").value;

        let errores = [];

        if(mensaje.length >=1000)
        {
            errores.push("El mensaje debe tener menos de 1000 caracteres.");
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
        const regexTelefono =/^\d{4}-\d{4}$/gm;
        
        if(!regexEmail.test(email)){
            errores.push("El email no es válido.");
        }

        if(!regexTelefono.test(telefono)){
            errores.push("El teléfono no es válido.");
        }

        if(errores.length > 0){
            modalService.buildModal(
                "Error",
                `Por favor, corrija los siguientes errores: ${errores.join("\n")}`,
                "error",
                () => {}
            );
            modalService.openModal();
            errores = [];
            return;
        }

        modalService.buildModal(
            "Mensaje enviado",
            "El mensaje ha sido enviado correctamente.",
            "success",
            () => {
                formulario.reset();
            }
        );
        modalService.openModal();

    });






}


}

Contacto.check();