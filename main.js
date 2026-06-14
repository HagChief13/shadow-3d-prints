const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

const sections = {
    inicio: document.getElementById("inicio"),
    catalogo: document.getElementById("catalogo"),
    checkout: document.getElementById("checkout"),
    auth: document.getElementById("auth"),
    contacto: document.getElementById("contacto"),
    quienes: document.getElementById("quienes"),
    categoria: document.getElementById("categoria")
};

/* ==========================
   SPA ENGINE (FIX REAL)
========================== */

function showSection(name) {

    Object.values(sections).forEach(sec => {
        if (sec) sec.style.display = "none";
    });

    if (sections[name]) {
        sections[name].style.display = "block";
    }

    // cerrar UI flotantes
    nav.classList.remove("visible");
    panelCarrito.classList.remove("visible");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================
   MENU
========================== */

abrir.addEventListener("click", () => nav.classList.add("visible"));
cerrar.addEventListener("click", () => nav.classList.remove("visible"));

/* ==========================
   VOLVER ARRIBA
========================== */

const botonVolver = document.getElementById("volverArriba");

window.addEventListener("scroll", () => {
    botonVolver.classList.toggle("visible", window.scrollY > 300);
});

/* ==========================
   CARRITO
========================== */

let carrito = [];

const contador = document.querySelector(".contador-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const panelCarrito = document.getElementById("panel-carrito");

function actualizarCarrito() {

    contador.textContent = carrito.length;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío</p>`;
        return;
    }

    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {

        listaCarrito.innerHTML += `
            <div class="item-carrito">

                <img src="${item.imagen}" width="40">

                <span>${item.nombre}</span>

                <button onclick="eliminarItem(${index})">X</button>

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

        const card = e.target.closest(".tarjeta-producto");

        carrito.push({
            nombre: card.querySelector("h3").textContent,
            imagen: card.querySelector("img").src
        });

        actualizarCarrito();
    }
});

/* ==========================
   PANEL CARRITO
========================== */

document.getElementById("carrito").addEventListener("click", () => {
    panelCarrito.classList.toggle("visible");
});

/* ==========================
   BOTÓN COTIZACIÓN (FIX)
========================== */

document.getElementById("btn-checkout").addEventListener("click", () => {
    showSection("checkout");
});

/* ==========================
   ENVIAR COTIZACIÓN (FIREBASE FIX)
========================== */

const form = document.querySelector(".form-checkout");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const inputs = form.querySelectorAll("input");

    const nombre = inputs[0].value;
    const email = inputs[1].value;
    const direccion = inputs[2].value;
    const comuna = inputs[3].value;
    const telefono = inputs[4].value;

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

        showSection("inicio");

    } catch (err) {
        console.error(err);
        alert("Error al enviar cotización");
    }
});

/* ==========================
   NAV SPA LINKS
========================== */

document.getElementById("btn-inicio").addEventListener("click", (e) => {
    e.preventDefault();
    showSection("inicio");
});

document.getElementById("btn-auth").addEventListener("click", (e) => {
    e.preventDefault();
    showSection("auth");
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
   CATEGORÍAS (FIX SPA LIMPIO)
========================== */

document.querySelectorAll("[data-categoria]").forEach(btn => {

    btn.addEventListener("click", (e) => {
        e.preventDefault();

        const cat = e.target.dataset.categoria;

        showSection("catalogo");

        catalogo.innerHTML = `<h2 style="padding:20px;">Categoría: ${cat}</h2>`;
    });
});
