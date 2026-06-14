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
   SPA SYSTEM
========================== */

const sections = document.querySelectorAll("main section");

function showSection(id) {
    sections.forEach(sec => sec.style.display = "none");
    const target = document.getElementById(id);
    if (target) target.style.display = "block";
}

/* ==========================
   NAVEGACIÓN MENU (SPA)
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
   BOTONES MANUALES (fallback)
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
   SUBCATEGORÍAS TOGGLE
========================== */

const btnCategorias = document.getElementById("btn-categorias");

btnCategorias?.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(".subcategorias")?.classList.toggle("visible");
});

/* ==========================
   PRODUCTOS
========================== */

const catalogo = document.getElementById("catalogo");
const inicio = document.getElementById("inicio");

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

function mostrarCategoria(categoria) {

    showSection("catalogo");

    catalogo.style.display = "flex";
    catalogo.innerHTML = "";

    productos[categoria]?.forEach(producto => {
        catalogo.innerHTML += `
            <div class="tarjeta-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <button class="agregar-carrito">Añadir al carrito</button>
            </div>
        `;
    });

    nav.classList.remove("visible");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* categorías */
document.querySelectorAll("[data-categoria]").forEach(cat => {
    cat.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarCategoria(cat.dataset.categoria);
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

/* eliminar carrito */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        actualizarCarrito();
    }
});

/* agregar carrito */
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("agregar-carrito")) return;

    const tarjeta = e.target.closest(".tarjeta-producto");
    if (!tarjeta) return;

    const nombre = tarjeta.querySelector("h3")?.textContent;
    const imagen = tarjeta.querySelector("img")?.src;

    if (!nombre || !imagen) return;

    carrito.push({ nombre, imagen });
    actualizarCarrito();
});

actualizarCarrito();

/* ==========================
   CHECKOUT
========================== */

const btnCheckout = document.getElementById("btn-checkout");
const checkout = document.getElementById("checkout");

btnCheckout?.addEventListener("click", () => {
    showSection("checkout");
    panelCarrito?.classList.remove("visible");
});

/* ==========================
   INICIO DEFAULT
========================== */

showSection("inicio");
