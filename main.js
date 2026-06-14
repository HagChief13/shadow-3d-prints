const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

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
   CARRITO
========================== */

let carrito = [];

const contador = document.querySelector(".contador-carrito");
const listaCarrito = document.getElementById("lista-carrito");

function actualizarCarrito() {

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

                <button onclick="eliminarItem(${index})">
                    X
                </button>

            </div>
        `;
    });
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

actualizarCarrito();

/* ==========================
   AGREGAR AL CARRITO
========================== */

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("agregar-carrito")) {

        const tarjeta = e.target.closest(".tarjeta-producto");

        const nombre = tarjeta.querySelector("h3").textContent;
        const imagen = tarjeta.querySelector("img").src;

        carrito.push({ nombre, imagen });

        actualizarCarrito();
    }
});

/* ==========================
   SUBCATEGORIAS
========================== */

const btnCategorias = document.getElementById("btn-categorias");
const subcategorias = document.getElementById("subcategorias");

btnCategorias.addEventListener("click", (e) => {
    e.preventDefault();
    subcategorias.classList.toggle("visible");
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

    inicio.style.display = "none";
    catalogo.style.display = "flex";
    catalogo.innerHTML = "";

    productos[categoria].forEach(producto => {

        catalogo.innerHTML += `
            <div class="tarjeta-producto">

                <img src="${producto.imagen}" alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <button class="agregar-carrito">
                    Añadir al carrito
                </button>

            </div>
        `;
    });

    nav.classList.remove("visible");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-categoria]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarCategoria(e.target.dataset.categoria);
    });
});

/* ==========================
   VOLVER A INICIO
========================== */

document.getElementById("btn-inicio").addEventListener("click", (e) => {

    e.preventDefault();

    catalogo.style.display = "none";
    inicio.style.display = "block";

    nav.classList.remove("visible");

    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================
   CARRITO PANEL
========================== */

const botonCarrito = document.getElementById("carrito");
const panelCarrito = document.getElementById("panel-carrito");

botonCarrito.addEventListener("click", () => {
    panelCarrito.classList.toggle("visible");
});

/* ==========================
   COTIZACIÓN (FIREBASE - PRO)
========================== */

const btnCheckout = document.getElementById("btn-checkout");
const checkout = document.getElementById("checkout");
const form = document.querySelector(".form-checkout");

btnCheckout.addEventListener("click", () => {

    checkout.style.display = "block";
    inicio.style.display = "none";
    catalogo.style.display = "none";
    panelCarrito.classList.remove("visible");

    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================
   ENVIAR A FIREBASE (PRO)
========================== */

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = form.querySelector("input[type='text']").value;
    const email = form.querySelector("input[type='email']").value;
    const telefono = form.querySelector("input[type='tel']").value;
    const direccion = form.querySelectorAll("input")[2].value;
    const comuna = form.querySelectorAll("input")[3].value;
    const mensaje = form.querySelector("textarea")?.value || "";

    const productos = carrito.map(p => p.nombre);

    try {
        await db.collection("cotizaciones").add({
            nombre,
            email,
            telefono,
            direccion,
            comuna,
            mensaje,
            productos,
            estado: "pendiente",
            fecha: new Date().toISOString()
        });

        alert("Cotización enviada correctamente");

        carrito = [];
        actualizarCarrito();
        checkout.style.display = "none";

    } catch (error) {
        console.error(error);
        alert("Error al enviar cotización");
    }
});

const sections = document.querySelectorAll("main section");

// ==========================
// MOSTRAR SECCIÓN SPA
// ==========================
function showSection(id) {
    sections.forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) target.style.display = "block";
}

// ==========================
// NAV SPA PRINCIPAL
// ==========================
document.querySelectorAll("[data-section]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const section = link.dataset.section;
        if (section) showSection(section);

        // cerrar menú móvil si existe
        document.getElementById("nav")?.classList.remove("visible");
    });
});

// ==========================
// BOTÓN INICIO (si lo usas aparte)
// ==========================
const btnInicio = document.getElementById("btn-inicio");
if (btnInicio) {
    btnInicio.addEventListener("click", (e) => {
        e.preventDefault();
        showSection("inicio");
    });
}

// ==========================
// BOTÓN CATEGORÍAS (ARREGLADO)
// ==========================
const btnCategorias = document.getElementById("btn-categorias");

if (btnCategorias) {
    btnCategorias.addEventListener("click", (e) => {
        e.preventDefault();

        // solo abre submenú, NO cambia sección
        document.querySelector(".subcategorias")?.classList.toggle("visible");
    });
}

// ==========================
// CATEGORÍAS (FILTRADO SPA)
// ==========================
document.querySelectorAll("[data-categoria]").forEach(cat => {
    cat.addEventListener("click", (e) => {
        e.preventDefault();

        const categoria = cat.dataset.categoria;

        // si quieres puedes mostrar catálogo
        showSection("catalogo");

        // aquí puedes luego filtrar productos
        console.log("Categoría:", categoria);

        document.querySelector(".subcategorias")?.classList.remove("visible");
        document.getElementById("nav")?.classList.remove("visible");
    });
});

// ==========================
// DEFAULT SPA
// ==========================
showSection("inicio");
