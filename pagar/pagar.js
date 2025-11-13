import { ModalService } from "../scripts/modal-service.js";
import { SessionService } from "../scripts/session-service.js";
import { PaymentService } from "../scripts/payment-service.js";
import { UsersService } from "../scripts/users-service.js";
import { GiftCardService } from "../scripts/gift-card-service.js";

export class Pagar {
  constructor() {}

  static validators = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^(\+54\s?)?(\(?\d{2,4}\)?[\s-]?)?\d{4}[\s-]?\d{4}$/,
    documento: /^\d{7,8}$/,
    numero_tarjeta: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
    cvv: /^\d{3,4}$/,
    nombre_tarjeta: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,50}$/,
    vencimiento: /^(0[1-9]|1[0-2])\/\d{2}$/
  };

  static errorMessages = {
    nombre: "El nombre debe contener solo letras y espacios (2-50 caracteres)",
    email: "Ingrese un email válido",
    telefono: "Ingrese un teléfono válido (ej: +54 11 1234-5678)",
    documento: "El DNI debe contener 7 u 8 dígitos",
    numero_tarjeta: "El número de tarjeta debe tener 16 dígitos",
    cvv: "El CVV debe tener 3 o 4 dígitos",
    nombre_tarjeta: "El nombre debe contener solo letras y espacios (2-50 caracteres)",
    vencimiento: "El formato debe ser MM/AA (ej: 12/25)"
  };

  static formatCardNumber(value) {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  }

  static formatExpiryDate(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  }

  static validateField(fieldName, value) {
    const validator = this.validators[fieldName];
    if (!validator) return true;
    
    if (fieldName === 'telefono' && value.trim() === '') {
      return true;
    }
    
    return validator.test(value);
  }

  static showFieldError(input, message) {
    input.classList.add('pagar__form__input--error');
    let errorElement = input.parentElement.querySelector('.pagar__form__error');
    
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'pagar__form__error';
      input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  static hideFieldError(input) {
    input.classList.remove('pagar__form__input--error');
    const errorElement = input.parentElement.querySelector('.pagar__form__error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  static validateForm(form) {
    let isValid = true;
    const requiredFields = ['nombre', 'email', 'documento', 'numero_tarjeta', 'cvv', 'nombre_tarjeta', 'vencimiento'];
    
    requiredFields.forEach(fieldName => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (input) {
        const value = input.value.trim();
        if (!this.validateField(fieldName, value)) {
          this.showFieldError(input, this.errorMessages[fieldName]);
          isValid = false;
        } else {
          this.hideFieldError(input);
        }
      }
    });

    const telefonoInput = form.querySelector('[name="telefono"]');
    if (telefonoInput && telefonoInput.value.trim() !== '') {
      if (!this.validateField('telefono', telefonoInput.value.trim())) {
        this.showFieldError(telefonoInput, this.errorMessages.telefono);
        isValid = false;
      } else {
        this.hideFieldError(telefonoInput);
      }
    }

    return isValid;
  }

  static setupFieldValidation(form) {
    const nombreInput = form.querySelector('[name="nombre"]');
    if (nombreInput) {
      nombreInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('nombre', value)) {
          this.showFieldError(e.target, this.errorMessages.nombre);
        } else {
          this.hideFieldError(e.target);
        }
      });
    }

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

    const telefonoInput = form.querySelector('[name="telefono"]');
    if (telefonoInput) {
      telefonoInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('telefono', value)) {
          this.showFieldError(e.target, this.errorMessages.telefono);
        } else {
          this.hideFieldError(e.target);
        }
      });
    }

    const documentoInput = form.querySelector('[name="documento"]');
    if (documentoInput) {
      documentoInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        const value = e.target.value.trim();
        if (value === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('documento', value)) {
          this.showFieldError(e.target, this.errorMessages.documento);
        } else {
          this.hideFieldError(e.target);
        }
      });
    }

    const numeroTarjetaInput = form.querySelector('[name="numero_tarjeta"]');
    if (numeroTarjetaInput) {
      numeroTarjetaInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.substring(0, 16);
        e.target.value = this.formatCardNumber(value);
        
        const formattedValue = e.target.value.trim();
        if (formattedValue === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('numero_tarjeta', formattedValue)) {
          this.showFieldError(e.target, this.errorMessages.numero_tarjeta);
        } else {
          this.hideFieldError(e.target);
        }
      });
    }

    const cvvInput = form.querySelector('[name="cvv"]');
    if (cvvInput) {
      cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        const value = e.target.value.trim();
        if (value === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('cvv', value)) {
          this.showFieldError(e.target, this.errorMessages.cvv);
        } else {
          this.hideFieldError(e.target);
        }
      });
    }

    const nombreTarjetaInput = form.querySelector('[name="nombre_tarjeta"]');
    if (nombreTarjetaInput) {
      nombreTarjetaInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('nombre_tarjeta', value)) {
          this.showFieldError(e.target, this.errorMessages.nombre_tarjeta);
        } else {
          this.hideFieldError(e.target);
        }
      });
    }

    const vencimientoInput = form.querySelector('[name="vencimiento"]');
    if (vencimientoInput) {
      vencimientoInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.substring(0, 4);
        e.target.value = this.formatExpiryDate(value);
        
        const formattedValue = e.target.value.trim();
        if (formattedValue === '') {
          this.hideFieldError(e.target);
        } else if (!this.validateField('vencimiento', formattedValue)) {
          this.showFieldError(e.target, this.errorMessages.vencimiento);
        } else {
          this.hideFieldError(e.target);
        }
      });
    }
  }

  static render() {
    const sessionService = SessionService.getOrCreateInstance();

    if (!sessionService.isAuthenticated()) {
      window.location.href = "/sign-in";
      return;
    }

    const paymentService = PaymentService.getOrCreateInstance();
    const paymentTotal = paymentService.getPaymentTotal();

    const paymentAmountElement = document.getElementById("payment-amount");
    if (paymentAmountElement) {
      paymentAmountElement.textContent = paymentTotal.toFixed(2);
    }

    // Solo redirigir si realmente no hay nada que pagar (sin cursos ni gift cards)
    if (paymentTotal <= 0) {
      const giftCardService = new GiftCardService();
      const giftCards = giftCardService.getGiftCards();
      const courseIds = paymentService.getPayment();
      
      // Si no hay cursos ni gift cards, redirigir
      if ((!courseIds || courseIds.length === 0) && (!giftCards || giftCards.length === 0)) {
        window.location.href = "/";
        return;
      }
    }

    const modalService = new ModalService("modal-parent");
    const form = document.getElementById("pagar-form");

    if (!form) {
      return;
    }

    this.setupFieldValidation(form);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      
      if (!this.validateForm(form)) {
        modalService.buildModal(
          "Error de validación",
          "Por favor, complete correctamente todos los campos requeridos.",
          "error",
          () => {
            modalService.closeModal();
          }
        );
        modalService.openModal();
        return;
      }

      modalService.buildConfirmationModal(
        "Confirmación de pago",
        "¿Estás seguro de que deseas procesar el pago?",
        () => {
          modalService.buildModal(
            "Pago procesado",
            "El pago ha sido procesado correctamente.",
            "success",
            () => {
              const courseIds = paymentService.getPayment();
              const usersService = new UsersService();
              const userId = sessionService.getSession();
              
              if (courseIds && Array.isArray(courseIds)) {
                courseIds.forEach(courseId => {
                  usersService.addCourseToUser(userId, courseId);
                });
              }
              
              paymentService.clearPayment();
              window.location.href = "/";
            }
          );
          modalService.openModal();
        }
      );
      modalService.openModal();
    });
  }
}

Pagar.render();
