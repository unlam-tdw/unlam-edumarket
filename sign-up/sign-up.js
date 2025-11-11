import { UsersService } from "../scripts/users-service.js";
import { SessionService } from "../scripts/session-service.js";
import { CartService } from "../scripts/cart-service.js";
import { ModalService } from "../scripts/modal-service.js";

export class SignUp {
    constructor() {}

    static signUp(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!nombre || !email || !password) {
            return;
        }

        const modalService = new ModalService("modal-parent");

        const usersService = new UsersService();

        const existsUser = usersService.existsUser(email);

        if (existsUser) {
            modalService.buildModal(
                "Error",
                "Este email ya está registrado. Por favor, use otro email o inicie sesión.",
                "error",
                () => {}
            );
            modalService.openModal();
            return;
        }

        const user = {
            id: usersService.getLastUserId(),
            nombre,
            email,
            password,
            courses: [],
        }

        usersService.addUser(user);

        const sessionService = SessionService.getOrCreateInstance();
        sessionService.setSession(user.id);

        const cartService = new CartService();
        cartService.migrateCart(0, user.id);
        
        window.location.href = "/sign-in";
    }

    static render() {
        const sessionService = SessionService.getOrCreateInstance();
        if (sessionService.isAuthenticated()) {
            window.location.href = "/";
            return;
        }

        const signUpForm = document.getElementById("sign-up-form");
        signUpForm.addEventListener("submit", (event) => SignUp.signUp(event));
    }
}

SignUp.render();