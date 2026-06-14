const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

const carritoBtn = document.getElementById("carrito");
const panelCarrito = document.getElementById("panel-carrito");
const catalogo = document.getElementById("catalogo");

/* ==========================
   SECCIONES SPA
========================== */

const sections = {
    inicio: document.getElementById("inicio"),
    catalogo: catalogo,
    checkout: document.getElementById("checkout"),
    auth: document.getElementById("auth"),
    contacto: document.getElementById("contacto"),
    quienes: document.getElementById("quienes")
};

function showSection(name) {

    Object.values(sections).forEach(sec => {
        if (sec) sec.style.display = "none";
    });

    if (sections[name]) {
        sections[name].style.display = "block";
    }

    nav.classList.remove("visible");
    panelCarrito?.classList.remove("visible");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================
   MENU
========================== */

abrir?.addEventListener("click", () => nav.classList.add("visible"));
cerrar?.addEventListener("click", () => nav.classList.remove("visible"));

/* ==========================
   VOLVER ARRIBA
========================== */

const botonVolver = document.getElementById("volverArriba");

window.addEventListener("scroll", () => {
    botonVolver?.classList.toggle("visible", window.scrollY > 300);
});

/* ==========================
   CARRITO
========================== */

let carrito = [];

const contador = document.querySelector(".contador-carrito");
const listaCarrito = document.getElementById("lista-carrito");

function actualizarCarrito() {

    if (contador) contador.textContent = carrito.length;

    if (!listaCarrito) return;

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

window.eliminarItem = function(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
};

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
   CHECKOUT
========================== */

document.getElementById("btn-checkout")?.addEventListener("click", () => {
    showSection("checkout");
});

/* ==========================
   ENVIO FIREBASE
========================== */

const form = document.querySelector(".form-checkout");

form?.addEventListener("submit", async (e) => {

    e.preventDefault();

    const inputs = form.querySelectorAll("input");

    const nombre = inputs[0]?.value || "";
    const email = inputs[1]?.value || "";
    const direccion = inputs[2]?.value || "";
    const comuna = inputs[3]?.value || "";
    const telefono = inputs[4]?.value || "";
    const mensaje = form.querySelector("textarea")?.value || "";

    try {

        await db.collection("cotizaciones").add({
            nombre,
            email,
            telefono,
            direccion,
            comuna,
            mensaje,
            productos: carrito.map(p => p.nombre),
            fecha: new Date().toISOString()
        });

        alert("Cotización enviada");

        carrito = [];
        actualizarCarrito();

        showSection("inicio");

    } catch (err) {
        alert("Error al enviar cotización");
        console.error(err);
    }
});

/* ==========================
   NAV LINKS
========================== */

document.getElementById("btn-inicio")?.addEventListener("click", e => {
    e.preventDefault();
    showSection("inicio");
});

document.getElementById("btn-auth")?.addEventListener("click", e => {
    e.preventDefault();
    showSection("auth");
});

document.getElementById("btn-contacto")?.addEventListener("click", e => {
    e.preventDefault();
    showSection("contacto");
});

document.getElementById("btn-quienes")?.addEventListener("click", e => {
    e.preventDefault();
    showSection("quienes");
});

/* ==========================
   AUTH FIX PRO
========================== */

const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const authMsg = document.getElementById("authMsg");

document.getElementById("loginBtn")?.addEventListener("click", async () => {

    try {
        await auth.signInWithEmailAndPassword(loginEmail.value, loginPass.value);
        alert("Login correcto");
        showSection("inicio");

    } catch (err) {
        alert("Error login");
    }
});

document.getElementById("registerBtn")?.addEventListener("click", async () => {

    try {

        const res = await auth.createUserWithEmailAndPassword(
            regEmail.value,
            regPass.value
        );

        await db.collection("users").doc(res.user.uid).set({
            email: regEmail.value,
            role: "client"
        });

        authMsg.innerHTML =
            `Cuenta creada. <span style="color:blue;cursor:pointer" onclick="showSection('auth')">Iniciar sesión</span>`;

    } catch (err) {

        if (err.code === "auth/email-already-in-use") {
            authMsg.innerHTML =
                `Cuenta ya existe. <span style="color:blue;cursor:pointer" onclick="showSection('auth')">Iniciar sesión</span>`;
        } else {
            authMsg.textContent = err.message;
        }
    }
});
