export class Footer {
    constructor() {}

    static render() {
        const footer = document.getElementById("footer");
        if (!footer) {
            console.warn("No se encontró el elemento con id 'footer'.");
            return;
        }
        footer.classList.add("footer");
        footer.innerHTML = `
        <div class="footer__container">
            <div class="footer__section">
                <ul>
                    <li>
                        <h3 class="footer__title"><a href="https://github.com/miliroggero" target="_blank">Milagros
                                Roggero</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="https://github.com/valenvirzi" target="_blank">Valentin
                                Virzi</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="https://github.com/fedemarsantillan" target="_blank">Federico
                                Santillan</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="https://github.com/Mattee37" target="_blank">Mateo
                                Maccarone</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="https://github.com/SantiagoMuse" target="_blank">Santiago
                                Muse</a></h3>
                    </li>
                </ul>
            </div>
            <div class="footer__section">
                <ul>
                    <li>
                        <h3 class="footer__title"><a href="../index.html">Inicio</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="../gift-card/index.html">Gift Card</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="../contacto/index.html">Contacto</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="../terminos-y-condiciones/index.html">Terminos y condiciones</a></h3>
                    </li>
                    <li>
                        <h3 class="footer__title"><a href="../preguntas-frecuentes/index.html">Preguntas frecuentes</a></h3>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer__copyright">
            <p class="footer__copyright__text">© 2025 UNLaM. Todos los derechos reservados.</p>
        </div>
        `;
    }
}