const nav = document.querySelector(".nav");
const abrir = document.querySelector(".abrir-menu");
const cerrar = document.querySelector(".cerrar-menu");
const overlay = document.querySelector(".overlay");

const carritoBtn = document.querySelector("#carrito");
const panelCarrito = document.querySelector("#panel-carrito");
const listaCarrito = document.querySelector("#lista-carrito");
const contador = document.querySelector(".contador-carrito");

// =========================
// MENU
// =========================

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
    overlay.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
    overlay.classList.remove("visible");
});

overlay.addEventListener("click", () => {
    nav.classList.remove("visible");
    overlay.classList.remove("visible");
});

// =========================
// SUBMENÚ
// =========================

document.querySelectorAll("[data-submenu]").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-submenu");
        const submenu = document.getElementById(id);

        if (submenu) {
            submenu.classList.toggle("visible");
        }
    });
});

// =========================
// CARRITO OPEN/CLOSE
// =========================

carritoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    panelCarrito.classList.toggle("visible");
});

document.addEventListener("click", (e) => {
    if (!panelCarrito.contains(e.target) && !carritoBtn.contains(e.target)) {
        panelCarrito.classList.remove("visible");
    }
});

// =========================
// CARRITO DATA
// =========================

let carrito = [];

window.agregarAlCarrito = function(nombre, precio) {
    carrito.push({ nombre, precio });
    renderCarrito();
};

// =========================
// RENDER CARRITO (FIX REAL)
// =========================

function renderCarrito() {

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<p>Tu carrito está vacío</p>`;
        contador.textContent = "0";
        return;
    }

    let total = 0;

    carrito.forEach(item => {
        total += item.precio;

        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <span>${item.nombre}</span>
                <span>$${item.precio}</span>
            </div>
        `;
    });

    listaCarrito.innerHTML += `
        <hr>
        <div class="total-final">
            Total: $${total}
        </div>
    `;

    contador.textContent = carrito.length;
}
