const nav = document.getElementById("nav");
document.getElementById("abrir").onclick = () => nav.classList.add("visible");
document.getElementById("cerrar").onclick = () => nav.classList.remove("visible");

/* =========================
   CARRITO BASE
========================= */

const carrito = [];
const contador = document.querySelector(".contador-carrito");

function renderContador() {
    contador.textContent = carrito.length;
}

/* =========================
   AGREGAR PRODUCTOS
========================= */

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".agregar-carrito");
    if (!btn) return;

    const card = btn.closest(".tarjeta-producto");
    if (!card) return;

    carrito.push({
        nombre: card.querySelector("h3")?.textContent || "Producto",
        imagen: card.querySelector("img")?.src
    });

    renderContador();
});

/* =========================
   SPA CARRITO (UN SOLO SISTEMA)
========================= */

const spa = document.getElementById("spa-carrito");
const spaLista = document.getElementById("spa-lista");

document.getElementById("carrito").onclick = () => {
    spa.classList.add("activo");
    renderSPA();
};

function renderSPA() {
    if (carrito.length === 0) {
        spaLista.innerHTML = "<p>Carrito vacío</p>";
        return;
    }

    spaLista.innerHTML = carrito.map((p, i) => `
        <div class="item">
            <img src="${p.imagen}" width="40">
            <span>${p.nombre}</span>
            <button onclick="eliminarItem(${i})">X</button>
        </div>
    `).join("");
}

/* =========================
   ELIMINAR ITEM
========================= */

window.eliminarItem = function(i) {
    carrito.splice(i, 1);
    renderContador();
    renderSPA();
};

/* =========================
   CERRAR SPA
========================= */

document.getElementById("cerrar-spa").onclick = () => {
    spa.classList.remove("activo");
};

/* =========================
   COTIZACIÓN FIREBASE
========================= */

document.getElementById("btn-solicitar").onclick = async () => {

    const email = document.getElementById("email-cotizacion").value;

    if (!email) {
        alert("Ingresa email");
        return;
    }

    try {
        await db.collection("cotizaciones").add({
            email,
            productos: carrito,
            fecha: new Date().toISOString()
        });

        alert("Cotización enviada");

        carrito.length = 0;
        renderContador();
        spa.classList.remove("activo");

    } catch (e) {
        console.error(e);
        alert("Error al enviar");
    }
};
