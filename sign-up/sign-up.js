import { UsersService } from "../scripts/users-service.js";
import { SessionService } from "../scripts/session-service.js";
import { CartService } from "../scripts/cart-service.js";
import { ModalService } from "../scripts/modal-service.js";

export class SignUp {
    constructor() {}

    static validators = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };

    static errorMessages = {
        email: "Ingrese un email válido",
    };

    static validateField(fieldName, value) {
        const validator = this.validators[fieldName];
        if (!validator) return true;
        return validator.test(value);
    }

    static showFieldError(input, message) {
        input.classList.add('sign-up__form__input--error');
        let errorElement = input.parentElement.querySelector('.sign-up__form__error');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'sign-up__form__error';
            input.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    static hideFieldError(input) {
        input.classList.remove('sign-up__form__input--error');
        const errorElement = input.parentElement.querySelector('.sign-up__form__error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    static setupFieldValidation(form) {
        const emailInput = form.querySelector('[name="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (value === '') {
                    this.hideFieldError(e.target);
                } else if (!this.validateField('email', value)) {
                    this.showFieldError(e.target, this.errorMessages.email);
                } else {
                    this.hideFieldError(e.target);
                }
            });
        }
    }

    static signUp(event) {
        event.preventDefault();

        const form = event.target;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const dni = document.getElementById("dni").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!nombre || !apellido || !dni || !email || !password) {
            return;
        }

        const emailInput = form.querySelector('[name="email"]');
        if (!this.validateField('email', email)) {
            this.showFieldError(emailInput, this.errorMessages.email);
            return;
        } else {
            this.hideFieldError(emailInput);
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
            apellido,
            dni,
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
        this.setupFieldValidation(signUpForm);
        signUpForm.addEventListener("submit", (event) => SignUp.signUp(event));
    }
}

SignUp.render();