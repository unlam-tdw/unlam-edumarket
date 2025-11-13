import { UsersService } from "../scripts/users-service.js";
import { SessionService } from "../scripts/session-service.js";
import { StorageService } from "../scripts/storage-service.js";
import { ModalService } from "../scripts/modal-service.js";
import { CoursesService } from "../scripts/courses-service.js";

export class Perfil {
  constructor() {}

  static validators = {
    dni: /^\d{7,8}$/,
  };

  static errorMessages = {
    dni: "El DNI debe contener 7 u 8 dígitos",
  };

  static validateField(fieldName, value) {
    const validator = this.validators[fieldName];
    if (!validator) return true;
    return validator.test(value);
  }

  static showFieldError(input, message) {
    input.classList.add('perfil__form__input--error');
    let errorElement = input.parentElement.querySelector('.perfil__form__error');
    
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'perfil__form__error';
      input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  static hideFieldError(input) {
    input.classList.remove('perfil__form__input--error');
    const errorElement = input.parentElement.querySelector('.perfil__form__error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  static setupFieldValidation(form) {
    const dniInput = form.querySelector('[name="dni"]');
    if (dniInput) {
      dniInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        const value = e.target.value.trim();
        if (value === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('dni', value)) {
          this.showFieldError(e.target, this.errorMessages.dni);
        } else {
          this.hideFieldError(e.target);
        }
      });

      dniInput.addEventListener('blur', (e) => {
        const value = e.target.value.trim();
        if (value !== '' && !this.validateField('dni', value)) {
          this.showFieldError(e.target, this.errorMessages.dni);
        }
      });
    }
  }

  static updateProfile(event) {
    event.preventDefault();

    const form = event.target;
    const modalService = new ModalService("modal-parent");

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value.trim();

    if (!nombre || !apellido || !dni) {
      return;
    }

    const dniInput = form.querySelector('[name="dni"]');
    if (!this.validateField('dni', dni)) {
      this.showFieldError(dniInput, this.errorMessages.dni);
      return;
    } else {
      this.hideFieldError(dniInput);
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
      apellido,
      dni,
    };

    const success = usersService.updateUser(userId, updatedData);

    if (success) {
      modalService.buildModal(
        "Perfil actualizado correctamente",
        "Tu perfil ha sido actualizado correctamente",
        "success",
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
    document.getElementById("apellido").value = user.apellido || "";
    document.getElementById("dni").value = user.dni || "";
    document.getElementById("email").value = user.email || "";

    const profileForm = document.getElementById("profile-form");
    this.setupFieldValidation(profileForm);
    profileForm.addEventListener("submit", (event) =>
      Perfil.updateProfile(event)
    );

    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", () => Perfil.logout());

    const deleteAccountBtn = document.getElementById("delete-account-btn");
    deleteAccountBtn.addEventListener("click", () => Perfil.deleteAccount());

    Perfil.renderPurchasedCourses(user);
  }

  static renderPurchasedCourses(user) {
    const coursesList = document.getElementById("purchased-courses-list");
    if (!coursesList) {
      return;
    }

    const coursesService = new CoursesService();
    const purchasedCourseIds = user.courses || [];

    if (purchasedCourseIds.length === 0) {
      coursesList.innerHTML = `
        <div class="main__profile__courses__empty">
          <p>No has comprado ningún curso aún.</p>
          <a href="/" class="main__profile__courses__empty__link">Explorar cursos</a>
        </div>
      `;
      return;
    }

    const purchasedCourses = purchasedCourseIds
      .map(courseId => coursesService.getCourseById(courseId))
      .filter(course => course !== null);

    coursesList.innerHTML = purchasedCourses.map(course => `
      <div class="main__profile__courses__item">
        <div class="main__profile__courses__item__image">
          <img class="main__profile__courses__item__img" 
               src="${course.image}" 
               alt="${course.name}">
        </div>
        <div class="main__profile__courses__item__details">
          <h3 class="main__profile__courses__item__title">${course.name}</h3>
          <p class="main__profile__courses__item__duration">${course.duration} horas de contenido</p>
        </div>
        <div class="main__profile__courses__item__actions">
          <a class="main__profile__courses__item__btn" href="/detalle/?courseId=${course.id}">Acceder al curso</a>
        </div>
      </div>
    `).join('');
  }
}

Perfil.render();
