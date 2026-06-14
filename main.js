const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

/* ==========================
   MENU LATERAL
========================== */

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

/* ==========================
   VOLVER ARRIBA
========================== */

const botonVolver = document.getElementById("volverArriba");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        botonVolver.classList.add("visible");
    } else {
        botonVolver.classList.remove("visible");
    }
});

/* ==========================
   SPA SYSTEM (CORE)
========================== */

const sections = document.querySelectorAll("main section");

function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id)?.classList.add("active");
}

/* ==========================
   NAV SPA
========================== */

document.querySelectorAll("[data-section]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const section = link.dataset.section;
        if (section) showSection(section);

        nav.classList.remove("visible");
    });
});

/* ==========================
   BOTONES MANUALES
========================== */

document.getElementById("btn-inicio")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("inicio");
});

document.getElementById("btn-contacto")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("contacto");
});

document.getElementById("btn-quienes")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("quienes");
});

/* ==========================
   SUBCATEGORÍAS
========================== */

document.getElementById("btn-categorias")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".subcategorias")?.classList.toggle("visible");
});

/* ==========================
   PRODUCTOS
========================== */

const catalogo = document.getElementById("catalogo");

const productos = {
    hogar: [
        { nombre: "Organizador de Escritorio", imagen: "hogar1.png" },
        { nombre: "Porta Lápices", imagen: "hogar2.png" }
    ],
    decoracion: [
        { nombre: "Dragón Decorativo", imagen: "decoracion1.png" },
        { nombre: "Figura Geométrica", imagen: "decoracion2.png" }
    ],
    utilidad: [
        { nombre: "Soporte Celular", imagen: "utilidad1.png" },
        { nombre: "Gancho Multiuso", imagen: "utilidad2.png" }
    ],
    llaveros: [
        { nombre: "Llavero Creeper", imagen: "llavero1.png" },
        { nombre: "Llavero Pokéball", imagen: "llavero2.png" }
    ],
    figuras: [
        { nombre: "Figura Minecraft", imagen: "figura1.png" },
        { nombre: "Figura Pokémon", imagen: "figura2.png" }
    ]
};

function mostrarCategoria(cat) {

    showSection("catalogo");

    catalogo.innerHTML = "";

    productos[cat]?.forEach(p => {
        catalogo.innerHTML += `
            <div class="tarjeta-producto">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <button class="agregar-carrito">Añadir al carrito</button>
            </div>
        `;
    });

    nav.classList.remove("visible");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* categorías */
document.querySelectorAll("[data-categoria]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarCategoria(btn.dataset.categoria);
        document.querySelector(".subcategorias")?.classList.remove("visible");
    });
});

/* ==========================
   CARRITO
========================== */

let carrito = [];

const contador = document.querySelector(".contador-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const botonCarrito = document.getElementById("carrito");
const panelCarrito = document.getElementById("panel-carrito");

function actualizarCarrito() {

    if (!contador || !listaCarrito) return;

    contador.textContent = carrito.length;

    if (carrito.length === 0) {
        contador.classList.add("vacio");
        listaCarrito.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
        return;
    }

    contador.classList.remove("vacio");

    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <img src="${item.imagen}" width="40">
                <span>${item.nombre}</span>
                <button class="eliminar" data-index="${index}">X</button>
            </div>
        `;
    });
}

/* abrir carrito */
botonCarrito?.addEventListener("click", () => {
    panelCarrito?.classList.toggle("visible");
});

/* eliminar */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        carrito.splice(e.target.dataset.index, 1);
        actualizarCarrito();
    }
});

/* agregar */
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("agregar-carrito")) return;

    const card = e.target.closest(".tarjeta-producto");
    if (!card) return;

    carrito.push({
        nombre: card.querySelector("h3")?.textContent,
        imagen: card.querySelector("img")?.src
    });

    actualizarCarrito();
});

actualizarCarrito();

/* ==========================
   CHECKOUT
========================== */

document.getElementById("btn-checkout")?.addEventListener("click", () => {
    showSection("checkout");
    panelCarrito?.classList.remove("visible");
});

const sections = document.querySelectorAll("main section");

function showSection(id) {

    sections.forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(id);

    if (target) {
        target.style.display = "block";
    }

    // 👇 SI VUELVE A INICIO, RESTAURA TODO EL ESTADO INICIAL
    if (id === "inicio") {
        restaurarInicio();
    }
}

/* ==========================
   ESTADO INICIAL
========================== */

function restaurarInicio() {

    // cerrar catálogo
    const catalogo = document.getElementById("catalogo");
    if (catalogo) catalogo.style.display = "none";

    // cerrar checkout
    const checkout = document.getElementById("checkout");
    if (checkout) checkout.style.display = "none";

    // cerrar panel carrito
    document.getElementById("panel-carrito")?.classList.remove("visible");

    // opcional: volver scroll arriba
    window.scrollTo({ top: 0, behavior: "smooth" });
}
