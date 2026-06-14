
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

function showSection(name) {

    Object.values(sections).forEach(sec => {
        if (sec) sec.style.display = "none";
    });

    if (sections[name]) {
        sections[name].style.display = "block";
    }

    nav.classList.remove("visible");

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
   AGREGAR CARRITO
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
   COTIZACIÓN - BOTÓN ARREGLADO
========================== */

const btnCheckout = document.getElementById("btn-checkout");

btnCheckout.addEventListener("click", () => {

    showSection("checkout");

});

/* ==========================
   ENVIAR COTIZACIÓN
========================== */

const form = document.querySelector(".form-checkout");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = form.querySelectorAll("input")[0].value;
    const email = form.querySelectorAll("input")[1].value;
    const telefono = form.querySelectorAll("input")[2].value;
    const direccion = form.querySelectorAll("input")[3].value;
    const comuna = form.querySelectorAll("input")[4].value;
    const mensaje = form.querySelector("textarea")?.value || "";

    const productos = carrito.map(p => p.nombre);

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

    alert("Cotización enviada");

    carrito = [];
    actualizarCarrito();

    showSection("inicio");
});

/* ==========================
   NAV LINKS SPA
========================== */

document.getElementById("btn-inicio").onclick = (e) => {
    e.preventDefault();
    showSection("inicio");
};

document.querySelectorAll("[data-categoria]").forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();

        const cat = e.target.dataset.categoria;

        sections.catalogo.style.display = "block";
        sections.inicio.style.display = "none";

        nav.classList.remove("visible");

        window.scrollTo({ top: 0, behavior: "smooth" });
    };
});

/* ==========================
   AUTH / CONTACTO / QUIENES
========================== */

document.getElementById("btn-auth").onclick = (e) => {
    e.preventDefault();
    showSection("auth");
};

/* SI tienes botones, puedes agregar: */

document.getElementById("btn-contacto")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("contacto");
});
