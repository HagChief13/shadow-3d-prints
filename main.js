const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

/* ==========================
   MENU LATERAL
========================== */

if (abrir && nav) {
    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    });
}

if (cerrar && nav) {
    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });
}

/* ==========================
   VOLVER ARRIBA
========================== */

const botonVolver = document.getElementById("volverArriba");

window.addEventListener("scroll", () => {
    if (!botonVolver) return;
    botonVolver.classList.toggle("visible", window.scrollY > 300);
});

/* ==========================
   SPA CORE
========================== */

const sections = document.querySelectorAll("main section");

function showSection(id) {
    sections.forEach(sec => sec.style.display = "none");

    const target = document.getElementById(id);
    if (target) target.style.display = "block";

    if (id === "inicio") restaurarInicio();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================
   RESTAURAR INICIO
========================== */

function restaurarInicio() {
    document.getElementById("catalogo")?.style && (document.getElementById("catalogo").style.display = "none");
    document.getElementById("checkout")?.style && (document.getElementById("checkout").style.display = "none");
    document.getElementById("panel-carrito")?.classList.remove("visible");
}

/* ==========================
   NAV SPA
========================== */

document.querySelectorAll("[data-section]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(link.dataset.section);
        nav?.classList.remove("visible");
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

    if (!catalogo) return;

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

    nav?.classList.remove("visible");
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
    contador.classList.toggle("vacio", carrito.length === 0);

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

/* ==========================
   INICIO AUTO
========================== */

window.addEventListener("DOMContentLoaded", () => {
    showSection("inicio");
});
/* ==========================
   AUTH FIREBASE
========================== */

const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const loginBtn = document.getElementById("loginBtn");
const loginMsg = document.getElementById("loginMsg");

const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const registerBtn = document.getElementById("registerBtn");
const authMsg = document.getElementById("authMsg");

/* REGISTER */
registerBtn?.addEventListener("click", async () => {
    try {
        const user = await auth.createUserWithEmailAndPassword(
            regEmail.value,
            regPass.value
        );

        await user.user.updateProfile({
            displayName: regName.value
        });

        authMsg.textContent = "Cuenta creada correctamente";
        authMsg.style.color = "green";

        showSection("login");

    } catch (error) {
        authMsg.textContent = error.message;
        authMsg.style.color = "red";
    }
});

/* LOGIN */
loginBtn?.addEventListener("click", async () => {
    try {
        await auth.signInWithEmailAndPassword(
            loginEmail.value,
            loginPass.value
        );

        loginMsg.textContent = "Login correcto";
        loginMsg.style.color = "green";

        showSection("inicio");

    } catch (error) {
        loginMsg.textContent = error.message;
        loginMsg.style.color = "red";
    }
});

/* LOGOUT AUTOMÁTICO / SESIÓN */
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Usuario logeado:", user.email);
    } else {
        console.log("Sin sesión");
    }
});
