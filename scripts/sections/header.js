export class Header {
    constructor() {}

    static render() {
        const header = document.getElementById("header");

        if (!header) {
            console.warn("No se encontró el elemento con id 'header'.");
            return;
        }

        header.classList.add("header");
        header.innerHTML = `
        <div class="header__container">
            <div class="header__logo">
                <img class="header__logo-img" src="./assets/logo.png" alt="Unlam EduMarket">
            </div>
            <form action="/busqueda" method="GET" class="header__search">
                <input required id="search" name="query" type="text" class="header__search-input"
                    placeholder="Buscar...">
                <button type="submit" class="header__search-btn">🔍</button>
            </form>
            <div class="header__cart">
                <a class="header__cart-btn" href="./carrito/index.html">
                    🛒
                    <span class="header__cart-count">3</span>
                </a>
            </div>
            <div class="header__user">
                <a class="header__user-btn" href="./login/index.html">👤</a>
            </div>
        </div>
        <nav class="header__nav">
            <div class="header__nav-container">
                <a href="./index.html" class="header__nav-link">INICIO</a>
                <a href="./calendario/index.html" class="header__nav-link">CALENDARIO</a>
                <a href="./contacto/index.html" class="header__nav-link">CONTACTO</a>
                <a href="./gift-card/index.html" class="header__nav-link">GIFT-CARD</a>
            </div>
        </nav>
        `;
    }
}