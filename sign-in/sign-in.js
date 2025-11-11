import { UsersService } from "../scripts/users-service.js";
import { SessionService } from "../scripts/session-service.js";
import { CartService } from "../scripts/cart-service.js";

export class SignIn {
    constructor() {}

    static signIn(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            return;
        }

        const usersService = new UsersService();
        const existsUser = usersService.existsUser(email);

        if (!existsUser) {
            return;
        }

        const user = usersService.getUserByEmail(email);

        if (user.password !== password) {
            return;
        }

        const sessionService = SessionService.getOrCreateInstance();

        sessionService.setSession(user.id);

        const cartService = new CartService();
        cartService.migrateCart(0, user.id);

        window.location.href = "/";
    }

    static render() {
        const sessionService = SessionService.getOrCreateInstance();

        if (sessionService.isAuthenticated()) {
            window.location.href = "/";
            return;
        }

        const signInForm = document.getElementById("sign-in-form");
        signInForm.addEventListener("submit", (event) => SignIn.signIn(event));
    }
}

SignIn.render();