const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => nav.classList.add("visible"));
cerrar.addEventListener("click", () => nav.classList.remove("visible"));

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
            <button onclick="eliminarItem(${index})">X</button>
        </div>`;
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

    const btn = e.target.closest(".agregar-carrito");
    if (!btn) return;

    const tarjeta = btn.closest(".tarjeta-producto");

    const nombre = tarjeta.querySelector("h3").textContent;
    const imagen = tarjeta.querySelector("img").src;

    carrito.push({ nombre, imagen });
    actualizarCarrito();
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
   CARRITO PANEL
========================== */

const botonCarrito = document.getElementById("carrito");
const panelCarrito = document.getElementById("panel-carrito");

botonCarrito.addEventListener("click", () => {
    panelCarrito.classList.toggle("visible");
});

/* ==========================
   PRODUCTOS
========================== */

const catalogo = document.getElementById("catalogo");
const inicio = document.getElementById("inicio");

const productos = {
    hogar: [
        { nombre: "Organizador", imagen: "hogar1.png" },
        { nombre: "Porta Lápices", imagen: "hogar2.png" }
    ],
    decoracion: [
        { nombre: "Dragón", imagen: "decoracion1.png" }
    ],
    utilidad: [
        { nombre: "Soporte Celular", imagen: "utilidad1.png" }
    ],
    llaveros: [
        { nombre: "Creeper", imagen: "llavero1.png" }
    ],
    figuras: [
        { nombre: "Minecraft", imagen: "figura1.png" }
    ]
};

function mostrarCategoria(cat) {

    inicio.style.display = "none";
    catalogo.style.display = "flex";
    catalogo.innerHTML = "";

    productos[cat].forEach(p => {
        catalogo.innerHTML += `
        <div class="tarjeta-producto">
            <img src="${p.imagen}">
            <h3>${p.nombre}</h3>
            <button class="agregar-carrito">Añadir</button>
        </div>`;
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
   INICIO
========================== */

document.getElementById("btn-inicio").addEventListener("click", (e) => {
    e.preventDefault();

    catalogo.style.display = "none";
    inicio.style.display = "block";
});

/* ==========================
   CHECKOUT + FIREBASE FIX
========================== */

const btnCheckout = document.getElementById("btn-checkout");
const checkout = document.getElementById("checkout");
const form = document.querySelector(".form-checkout");

btnCheckout.addEventListener("click", () => {
    checkout.style.display = "block";
    inicio.style.display = "none";
    catalogo.style.display = "none";
    panelCarrito.classList.remove("visible");
});

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll("input, textarea");

        const data = {
            nombre: inputs[0].value,
            email: inputs[1].value,
            telefono: inputs[2].value,
            direccion: inputs[3].value,
            comuna: inputs[4].value,
            mensaje: inputs[5]?.value || "",
            productos: carrito.map(p => p.nombre),
            fecha: new Date().toISOString()
        };

        try {
            await db.collection("cotizaciones").add(data);

            alert("Cotización enviada");

            carrito = [];
            actualizarCarrito();
            checkout.style.display = "none";

        } catch (err) {
            console.error(err);
            alert("Error al enviar");
        }
    });
}
