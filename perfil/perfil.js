import { UsersService } from "../scripts/users-service.js";
import { SessionService } from "../scripts/session-service.js";
import { StorageService } from "../scripts/storage-service.js";
import { ModalService } from "../scripts/modal-service.js";

export class Perfil {
  constructor() {}

  static updateProfile(event) {
    event.preventDefault();

    const modalService = new ModalService("modal-parent");

    const nombre = document.getElementById("nombre").value;

    if (!nombre) {
      return;
    }

    const sessionService = SessionService.getOrCreateInstance();
    const userId = sessionService.getSession();

    if (!userId) {
      window.location.href = "/sign-in";
      return;
    }

    const usersService = new UsersService();
    const currentUser = usersService.getUserById(userId);

    if (!currentUser) {
      window.location.href = "/sign-in";
      return;
    }

    const updatedData = {
      nombre,
    };

    const success = usersService.updateUser(userId, updatedData);

    if (success) {
      modalService.buildModal(
        "Perfil actualizado correctamente",
        "Tu perfil ha sido actualizado correctamente",
        "error",
        () => window.location.reload()
      );
      modalService.openModal();
    } else {
      modalService.buildModal(
        "Error",
        "Error al actualizar el perfil",
        "error",
        () => window.location.reload()
      );
      modalService.openModal();
    }
  }

  static logout() {
    const sessionService = SessionService.getOrCreateInstance();
    sessionService.removeSession();
    window.location.href = "/";
  }

  static deleteAccount() {
    const modalService = new ModalService("modal-parent");
    const confirmMessage =
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.";

    modalService.buildConfirmationModal(
      "Confirmar Eliminación",
      confirmMessage,
      () => {
        const sessionService = SessionService.getOrCreateInstance();
        const userId = sessionService.getSession();

        if (!userId) {
          return;
        }

        const usersService = new UsersService();
        usersService.deleteUser(userId);

        const storageService = StorageService.getOrCreateInstance();
        const cartKey = `cart:${userId}`;
        storageService.removeItem(cartKey);

        sessionService.removeSession();

        modalService.buildModal(
          "Cuenta Eliminada",
          "Tu cuenta ha sido eliminada correctamente.",
          "success",
          () => (window.location.href = "/")
        );
        modalService.openModal();
      },
      null
    );
    modalService.openModal();
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
      window.location.href = "/sign-in";
      return;
    }

    document.getElementById("nombre").value = user.nombre || "";
    document.getElementById("email").value = user.email || "";

    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", (event) =>
      Perfil.updateProfile(event)
    );

    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", () => Perfil.logout());

    const deleteAccountBtn = document.getElementById("delete-account-btn");
    deleteAccountBtn.addEventListener("click", () => Perfil.deleteAccount());
  }
}

Perfil.render();
