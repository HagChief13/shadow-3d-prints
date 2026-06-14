// ==========================
// ELEMENTOS PRINCIPALES
// ==========================

const nav = document.querySelector(".nav");
const abrir = document.querySelector(".abrir-menu");
const cerrar = document.querySelector(".cerrar-menu");
const overlay = document.querySelector(".overlay");

const carritoBtn = document.querySelector(".carrito");
const panelCarrito = document.querySelector(".panel-carrito");

// ==========================
// MENÚ LATERAL
// ==========================

function abrirMenu() {
    nav.classList.add("visible");
    overlay.classList.add("visible");
}

function cerrarMenu() {
    nav.classList.remove("visible");
    overlay.classList.remove("visible");
}

abrir.addEventListener("click", abrirMenu);
cerrar.addEventListener("click", cerrarMenu);
overlay.addEventListener("click", cerrarMenu);

// ==========================
// SUBCATEGORÍAS
// ==========================

// usa data-submenu en HTML
const submenuButtons = document.querySelectorAll("[data-submenu]");

submenuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-submenu");
        const submenu = document.querySelector(`#${targetId}`);

        if (!submenu) return;

        submenu.classList.toggle("visible");
    });
});

// ==========================
// CARRITO PANEL
// ==========================

function toggleCarrito() {
    panelCarrito.classList.toggle("visible");
}

carritoBtn.addEventListener("click", toggleCarrito);

// cerrar carrito al hacer click fuera
document.addEventListener("click", (e) => {
    const clickDentroCarrito = panelCarrito.contains(e.target);
    const clickEnBoton = carritoBtn.contains(e.target);

    if (!clickDentroCarrito && !clickEnBoton) {
        panelCarrito.classList.remove("visible");
    }
});

// ==========================
// CARRITO LÓGICA BÁSICA
// ==========================

let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    renderCarrito();
}

function renderCarrito() {
    const contenedor = document.querySelector(".panel-carrito");

    contenedor.innerHTML = "<h3>Carrito</h3>";

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        contenedor.innerHTML += `
            <div class="item-carrito">
                <span>${item.nombre}</span>
                <span>$${item.precio}</span>
            </div>
        `;
    });

    contenedor.innerHTML += `
        <div class="total-final">
            Total: $${total}
        </div>

        <button class="btn-checkout">Pagar</button>
    `;
}
const sections = document.querySelectorAll("main section");

function showSection(id) {
    sections.forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) target.style.display = "block";
}

// LINKS SPA
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section) showSection(section);
    });
});

// INICIO POR DEFECTO
showSection("inicio");
