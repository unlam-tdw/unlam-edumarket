import { UsersService } from "../scripts/users-service.js";
import { SessionService } from "../scripts/session-service.js";
import { CartService } from "../scripts/cart-service.js";
import { StorageService } from "../scripts/storage-service.js";

export class Perfil {
    constructor() {}

    static updateProfile(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;

        if (!nombre) {
            console.error("El nombre es requerido");
            return;
        }

        const sessionService = SessionService.getOrCreateInstance();
        const userId = sessionService.getSession();

        if (!userId) {
            console.error("No hay sesión activa");
            window.location.href = "/sign-in";
            return;
        }

        const usersService = new UsersService();
        const currentUser = usersService.getUserById(userId);

        if (!currentUser) {
            console.error("Usuario no encontrado");
            window.location.href = "/sign-in";
            return;
        }

        const updatedData = {
            nombre
        };

        const success = usersService.updateUser(userId, updatedData);

        if (success) {
            alert("Perfil actualizado correctamente");
            window.location.reload();
        } else {
            console.error("Error al actualizar el perfil");
        }
    }

    static logout() {
        const sessionService = SessionService.getOrCreateInstance();
        sessionService.removeSession();
        window.location.href = "/";
    }

    static deleteAccount() {
        const confirmMessage = "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.";
        
        if (!confirm(confirmMessage)) {
            return;
        }

        const sessionService = SessionService.getOrCreateInstance();
        const userId = sessionService.getSession();

        if (!userId) {
            console.error("No hay sesión activa");
            window.location.href = "/sign-in";
            return;
        }

        const usersService = new UsersService();
        const success = usersService.deleteUser(userId);

        if (!success) {
            console.error("Error al eliminar la cuenta");
            alert("Error al eliminar la cuenta. Por favor, intenta nuevamente.");
            return;
        }

        // Clear user's cart
        const cartService = new CartService();
        const storageService = StorageService.getOrCreateInstance();
        const cartKey = `cart:${userId}`;
        storageService.removeItem(cartKey);

        // Clear session
        sessionService.removeSession();

        alert("Tu cuenta ha sido eliminada correctamente.");
        window.location.href = "/";
    }

    static render() {
        const sessionService = SessionService.getOrCreateInstance();

        if (!sessionService.isAuthenticated()) {
            window.location.href = "/sign-in";
            return;
        }

        const userId = sessionService.getSession();
        const usersService = new UsersService();
        const user = usersService.getUserById(userId);

        if (!user) {
            console.error("Usuario no encontrado");
            window.location.href = "/sign-in";
            return;
        }

        document.getElementById("nombre").value = user.nombre || "";
        document.getElementById("email").value = user.email || "";

        const profileForm = document.getElementById("profile-form");
        profileForm.addEventListener("submit", (event) => Perfil.updateProfile(event));

        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => Perfil.logout());

        const deleteAccountBtn = document.getElementById("delete-account-btn");
        deleteAccountBtn.addEventListener("click", () => Perfil.deleteAccount());
    }
}

Perfil.render();

