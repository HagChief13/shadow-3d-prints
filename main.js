// ==========================
// ELEMENTOS
// ==========================

const nav = document.querySelector(".nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const overlay = document.querySelector(".overlay");

const carritoBtn = document.querySelector("#carrito");
const panelCarrito = document.querySelector("#panel-carrito");
const listaCarrito = document.querySelector("#lista-carrito");
const contadorCarrito = document.querySelector(".contador-carrito");

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
overlay.addEventListener("click", () => {
    cerrarMenu();
    cerrarCarrito();
});

// ==========================
// SUBMENÚS (CORREGIDO)
// ==========================

document.querySelectorAll("[data-submenu]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const id = btn.getAttribute("data-submenu");
        const submenu = document.getElementById(id);

        if (!submenu) return;

        submenu.classList.toggle("visible");
    });
});

// ==========================
// CARRITO
// ==========================

let carrito = [];

// abrir/cerrar carrito
function toggleCarrito() {
    panelCarrito.classList.toggle("visible");
    overlay.classList.add("visible");
}

function cerrarCarrito() {
    panelCarrito.classList.remove("visible");
}

// click botón carrito
carritoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCarrito();
});

// click fuera carrito
document.addEventListener("click", (e) => {
    const clickDentro = panelCarrito.contains(e.target);
    const clickBoton = carritoBtn.contains(e.target);

    if (!clickDentro && !clickBoton) {
        cerrarCarrito();
    }
});

// ==========================
// AGREGAR AL CARRITO (FIX REAL)
// ==========================

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    renderCarrito();
}

// ==========================
// RENDER CARRITO (CORREGIDO)
// ==========================

function renderCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
        contadorCarrito.textContent = "0";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const div = document.createElement("div");
        div.classList.add("item-carrito");

        div.innerHTML = `
            <span>${item.nombre}</span>
            <span>$${item.precio}</span>
            <button class="eliminar-item" data-index="${index}">x</button>
        `;

        listaCarrito.appendChild(div);
    });

    contadorCarrito.textContent = carrito.length;

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-final");
    totalDiv.innerHTML = `Total: $${total}`;

    listaCarrito.appendChild(totalDiv);

    // botones eliminar (IMPORTANTE: se vuelven a asignar cada render)
    document.querySelectorAll(".eliminar-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            carrito.splice(index, 1);
            renderCarrito();
        });
    });
}

// ==========================
// CERRAR CON ESC (MÓVIL PRO UX)
// ==========================

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        cerrarMenu();
        cerrarCarrito();
    }
});
