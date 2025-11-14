import { CartService } from "../scripts/cart-service.js";
import { CoursesService } from "../scripts/courses-service.js";
import { SubscriptionService } from "../scripts/subscription-service.js";
import { StorageService } from "../scripts/storage-service.js";
import { ModalService } from "../scripts/modal-service.js";
import { SessionService } from "../scripts/session-service.js";
import { UsersService } from "../scripts/users-service.js";
import { PaymentService } from "../scripts/payment-service.js";

export class Suscripciones {
  static courseCounters = {};
  static courseData = {};

  static render() {
    const cartService = new CartService();
    const coursesService = new CoursesService();
    const subscriptionService = new SubscriptionService();
    const sessionService = SessionService.getOrCreateInstance();
    const usersService = new UsersService();
    const userId = sessionService.getSession();
    const currentUser = userId ? usersService.getUserById(userId) : null;

    const cart = cartService.getCart();
    const subscriptions = subscriptionService.getSubscriptions();

    const presentialCoursesInCart = cart
      .map((id) => coursesService.getCourseById(id))
      .filter((course) => course && course.kind === 'in-person' && subscriptions.includes(course.id));

    const element = document.getElementById("subscriptions-list");

    if (!element) {
      return;
    }

    if (presentialCoursesInCart.length === 0) {
      element.innerHTML = `
        <div class="subscriptions__empty">
          <p>No hay cursos presenciales en el carrito.</p>
          <a href="/carrito/" class="subscriptions__btn subscriptions__btn--secondary">Volver al Carrito</a>
        </div>
      `;
      return;
    }

    presentialCoursesInCart.forEach(course => {
      if (!this.courseCounters[course.id]) {
        this.courseCounters[course.id] = 1;
      }
      if (!this.courseData[course.id]) {
        this.courseData[course.id] = course;
      }
    });

    element.innerHTML = `
      ${presentialCoursesInCart
        .map(
          (course) => {
            return `
              <div class="subscriptions__course-card" data-course-id="${course.id}">
                <div class="subscriptions__course-header">
                  <div class="subscriptions__course-info">
                    <div class="subscriptions__course-image">
                      <img class="subscriptions__course-img" 
                           src="${course.image}" 
                           alt="${course.name}">
                      <div class="subscriptions__course-kind-tag">
                        <span class="subscriptions__course-kind">PRESENCIAL</span>
                      </div>
                    </div>
                    <div class="subscriptions__course-details">
                      <h3 class="subscriptions__course-title">${course.name}</h3>
                      <p class="subscriptions__course-duration">${course.duration} horas de contenido</p>
                      <p class="subscriptions__course-description">${course.description || ''}</p>
                      <a class="subscriptions__course-link" href="/detalle/?courseId=${course.id}">Ver detalle</a>
                    </div>
                    <div class="subscriptions__course-price">
                      <span class="subscriptions__course-amount">$${course.price}.-</span>
                    </div>
                  </div>
                </div>
                
                <form class="subscriptions__form" data-course-form="${course.id}">
                  <h4 class="subscriptions__form-title">INSCRIPCIÓN</h4>
                  
                  <div class="subscriptions__form-person file">
                    <input id="nombre-${course.id}-0" type="text" placeholder="Nombre" required ${currentUser ? 'readonly' : ''} />
                    <input id="apellido-${course.id}-0" type="text" placeholder="Apellido" required ${currentUser ? 'readonly' : ''} />
                    <input id="dni-${course.id}-0" type="number" placeholder="DNI" min="1000000" max="99999999" required ${currentUser ? 'readonly' : ''} />
                  </div>
                  
                  <div id="personas-container-${course.id}" class="subscriptions__form-persons"></div>
                  
                  <div class="subscriptions__form-add">
                    <button type="button" class="subscriptions__btn-add btnadd" data-course-add="${course.id}">+</button>
                    <h6>Agregar Persona</h6>
                  </div>
                  
                  <div class="subscriptions__form-cost cost">
                    <h6 id="inscription-total-${course.id}" class="subscriptions__form-total">$ ${(this.courseCounters[course.id] * course.price).toFixed(2)}</h6>
                  </div>
                </form>
              </div>
            `;
          }
        )
        .join("")}
    `;

    if (currentUser) {
      presentialCoursesInCart.forEach(course => {
        const nombreInput = document.getElementById(`nombre-${course.id}-0`);
        const apellidoInput = document.getElementById(`apellido-${course.id}-0`);
        const dniInput = document.getElementById(`dni-${course.id}-0`);
        
        if (nombreInput) nombreInput.value = currentUser.nombre || "";
        if (apellidoInput) apellidoInput.value = currentUser.apellido || "";
        if (dniInput) dniInput.value = currentUser.dni || "";
      });
    }

    presentialCoursesInCart.forEach(course => {
      const addBtn = document.querySelector(`[data-course-add="${course.id}"]`);
      if (addBtn) {
        addBtn.addEventListener("click", () => this.agregarPersona(course.id));
      }
    });

    presentialCoursesInCart.forEach(course => {
      const count = this.courseCounters[course.id] || 1;
      for (let i = 0; i < count; i++) {
        const nombreInput = document.getElementById(`nombre-${course.id}-${i}`);
        const apellidoInput = document.getElementById(`apellido-${course.id}-${i}`);
        const dniInput = document.getElementById(`dni-${course.id}-${i}`);

        if (nombreInput) {
          nombreInput.addEventListener('input', () => {
            if (nombreInput.value.trim()) {
              nombreInput.classList.remove('subscriptions__input--error');
            }
          });
        }

        if (apellidoInput) {
          apellidoInput.addEventListener('input', () => {
            if (apellidoInput.value.trim()) {
              apellidoInput.classList.remove('subscriptions__input--error');
            }
          });
        }

        if (dniInput) {
          dniInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value.length > 8) {
              e.target.value = e.target.value.substring(0, 8);
            }
            
            const value = e.target.value.trim();
            const dniRegex = /^\d{7,8}$/;
            
            if (value && dniRegex.test(value)) {
              dniInput.classList.remove('subscriptions__input--error');
            } else if (value) {
              dniInput.classList.add('subscriptions__input--error');
            } else {
              dniInput.classList.remove('subscriptions__input--error');
            }
          });
        }
      }
    });

    this.updateTotal(presentialCoursesInCart);

    const proceedBtn = document.getElementById("proceed-to-payment-btn");
    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => {
        this.handleSubmit(presentialCoursesInCart);
      });
    }
  }

  static agregarPersona(courseId) {
    const course = this.courseData[courseId];
    if (!course) return;

    if (!this.courseCounters[courseId]) {
      this.courseCounters[courseId] = 1;
    }

    const container = document.getElementById(`personas-container-${courseId}`);
    if (!container) return;

    const div = document.createElement("div");
    div.className = "file persona";
    div.innerHTML = `
      <input id="nombre-${courseId}-${this.courseCounters[courseId]}" type="text" placeholder="Nombre" required />
      <input id="apellido-${courseId}-${this.courseCounters[courseId]}" type="text" placeholder="Apellido" required />
      <input id="dni-${courseId}-${this.courseCounters[courseId]}" type="number" placeholder="DNI" min="1000000" max="99999999" required />
      <button class="btn-" type="button" data-course-remove="${courseId}" data-person-index="${this.courseCounters[courseId]}">−</button>
    `;

    container.appendChild(div);
    this.courseCounters[courseId]++;

    const inscriptionTotal = (this.courseCounters[courseId] * course.price).toFixed(2);
    const totalElement = document.getElementById(`inscription-total-${courseId}`);
    if (totalElement) {
      totalElement.textContent = `$ ${inscriptionTotal}`;
    }

    const btnEliminar = div.querySelector(`[data-course-remove="${courseId}"]`);
    if (btnEliminar) {
      btnEliminar.addEventListener("click", () => {
        div.remove();
        this.courseCounters[courseId]--;
        const inscriptionTotal = (this.courseCounters[courseId] * course.price).toFixed(2);
        const totalElement = document.getElementById(`inscription-total-${courseId}`);
        if (totalElement) {
          totalElement.textContent = `$ ${inscriptionTotal}`;
        }
        this.updateTotal(Object.values(this.courseData));
      });
    }

    const nombreInput = div.querySelector(`#nombre-${courseId}-${this.courseCounters[courseId] - 1}`);
    const apellidoInput = div.querySelector(`#apellido-${courseId}-${this.courseCounters[courseId] - 1}`);
    const dniInput = div.querySelector(`#dni-${courseId}-${this.courseCounters[courseId] - 1}`);

    if (nombreInput) {
      nombreInput.addEventListener('input', () => {
        if (nombreInput.value.trim()) {
          nombreInput.classList.remove('subscriptions__input--error');
        }
      });
    }

    if (apellidoInput) {
      apellidoInput.addEventListener('input', () => {
        if (apellidoInput.value.trim()) {
          apellidoInput.classList.remove('subscriptions__input--error');
        }
      });
    }

    if (dniInput) {
      dniInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        if (e.target.value.length > 8) {
          e.target.value = e.target.value.substring(0, 8);
        }
        
        const value = e.target.value.trim();
        const dniRegex = /^\d{7,8}$/;
        
        if (value && dniRegex.test(value)) {
          dniInput.classList.remove('subscriptions__input--error');
        } else if (value) {
          dniInput.classList.add('subscriptions__input--error');
        } else {
          dniInput.classList.remove('subscriptions__input--error');
        }
      });
    }

    this.updateTotal(Object.values(this.courseData));
  }

  static updateTotal(courses) {
    let total = 0;
    courses.forEach(course => {
      const count = this.courseCounters[course.id] || 1;
      total += count * course.price;
    });

    const totalElement = document.getElementById("subscriptions-total");
    if (totalElement) {
      totalElement.innerHTML = `
        <div class="subscriptions__total-content">
          <h2 class="subscriptions__total-title">Total General</h2>
          <div class="subscriptions__total-amount">
            <span class="subscriptions__total-label">Total a pagar:</span>
            <span class="subscriptions__total-value">$ ${total.toFixed(2)}</span>
          </div>
        </div>
      `;
    }
  }

  static handleSubmit(courses) {
    const storageService = StorageService.getOrCreateInstance();
    const modalService = new ModalService("modal-parent");

    let allPersons = [];
    let totalInscription = 0;
    let detalle = "";
    let errors = [];
    let hasErrors = false;

    courses.forEach(course => {
      const count = this.courseCounters[course.id] || 1;
      
      for (let i = 0; i < count; i++) {
        const nombreInput = document.getElementById(`nombre-${course.id}-${i}`);
        const apellidoInput = document.getElementById(`apellido-${course.id}-${i}`);
        const dniInput = document.getElementById(`dni-${course.id}-${i}`);

        if (nombreInput && apellidoInput && dniInput) {
          const nombre = nombreInput.value.trim();
          const apellido = apellidoInput.value.trim();
          const dni = dniInput.value.trim();

          const dniRegex = /^\d{7,8}$/;
          const dniValid = dni && dniRegex.test(dni);
          
          if (!nombre || !apellido || !dni || !dniValid) {
            hasErrors = true;
            
            if (!nombre) {
              nombreInput.classList.add('subscriptions__input--error');
              errors.push(`Curso "${course.name}" - Persona ${i + 1}: falta el nombre`);
            } else {
              nombreInput.classList.remove('subscriptions__input--error');
            }
            
            if (!apellido) {
              apellidoInput.classList.add('subscriptions__input--error');
              errors.push(`Curso "${course.name}" - Persona ${i + 1}: falta el apellido`);
            } else {
              apellidoInput.classList.remove('subscriptions__input--error');
            }
            
            if (!dni) {
              dniInput.classList.add('subscriptions__input--error');
              errors.push(`Curso "${course.name}" - Persona ${i + 1}: falta el DNI`);
            } else if (!dniValid) {
              dniInput.classList.add('subscriptions__input--error');
              errors.push(`Curso "${course.name}" - Persona ${i + 1}: el DNI debe contener 7 u 8 dígitos`);
            } else {
              dniInput.classList.remove('subscriptions__input--error');
            }
          } else {
            nombreInput.classList.remove('subscriptions__input--error');
            apellidoInput.classList.remove('subscriptions__input--error');
            dniInput.classList.remove('subscriptions__input--error');
          }
        }
      }
    });

    if (hasErrors) {
      let errorMessage = "Por favor, complete todos los campos requeridos:<br><br>";
      errors.forEach((error, index) => {
        if (index < 5) {
          errorMessage += `• ${error}<br>`;
        }
      });
      if (errors.length > 5) {
        errorMessage += `<br>... y ${errors.length - 5} error(es) más`;
      }

      modalService.buildModal(
        "Error de validación",
        errorMessage,
        "error",
        () => {
          modalService.closeModal();
        }
      );
      modalService.openModal();
      return;
    }

    courses.forEach(course => {
      const count = this.courseCounters[course.id] || 1;
      const courseTotal = count * course.price;
      totalInscription += courseTotal;

      const coursePersons = [];
      for (let i = 0; i < count; i++) {
        const nombreInput = document.getElementById(`nombre-${course.id}-${i}`);
        const apellidoInput = document.getElementById(`apellido-${course.id}-${i}`);
        const dniInput = document.getElementById(`dni-${course.id}-${i}`);

        if (nombreInput && apellidoInput && dniInput) {
          const nombre = nombreInput.value.trim();
          const apellido = apellidoInput.value.trim();
          const dni = dniInput.value.trim();

          const dniRegex = /^\d{7,8}$/;
          if (nombre && apellido && dni && dniRegex.test(dni)) {
            coursePersons.push({ nombre, apellido, dni, courseId: course.id, courseName: course.name });
            allPersons.push({ nombre, apellido, dni, courseId: course.id, courseName: course.name });
          }
        }
      }

      if (coursePersons.length > 0) {
        detalle += `<h4>${course.name}:</h4>`;
        coursePersons.forEach(persona => {
          detalle += `<p>${persona.nombre} ${persona.apellido} - DNI: ${persona.dni}</p>`;
        });
        detalle += `<br>`;
      }
    });

    if (allPersons.length === 0) {
      modalService.buildModal(
        "Error",
        "Por favor, complete al menos un formulario de inscripción.",
        "error",
        () => {
          modalService.closeModal();
        }
      );
      modalService.openModal();
      return;
    }

    storageService.setItem("inscription-total", totalInscription.toFixed(2));

    modalService.buildModal(
      "Felicitaciones!",
      `Has inscrito correctamente a todas las personas. Ahora puedes proceder al pago. <br><br> ${detalle}`,
      "success",
      () => {
        const paymentService = PaymentService.getOrCreateInstance();
        const cartService = new CartService();
        const cart = cartService.getCart();
        
        if (cart.length > 0) {
          paymentService.setPayment(cart, true);
        } else {
          paymentService.setPayment([], true);
        }
        
        window.location.href = "/pagar";
      }
    );
    modalService.openModal();
  }
}

Suscripciones.render();
