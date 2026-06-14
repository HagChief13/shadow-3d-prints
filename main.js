const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

const carritoBtn = document.getElementById("carrito");
const panelCarrito = document.getElementById("panel-carrito");
const catalogo = document.getElementById("catalogo");

/* ==========================
   SECCIONES SPA (NO BORRAR)
========================== */

const sections = {
    inicio: document.getElementById("inicio"),
    catalogo: catalogo,
    checkout: document.getElementById("checkout"),
    auth: document.getElementById("auth"),
    contacto: document.getElementById("contacto"),
    quienes: document.getElementById("quienes")
};

/* ==========================
   SPA ENGINE (CORREGIDO)
========================== */

function showSection(name) {

    Object.values(sections).forEach(sec => {
        if (sec) sec.style.display = "none";
    });

    if (sections[name]) {
        sections[name].style.display = "block";
    }

    nav.classList.remove("visible");

    if (panelCarrito) {
        panelCarrito.classList.remove("visible");
    }

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
    if (!botonVolver) return;
    botonVolver.classList.toggle("visible", window.scrollY > 300);
});

/* ==========================
   CARRITO (SIN ROMPER TU LOGICA)
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

        if (!tarjeta) return;

        const nombre = tarjeta.querySelector("h3")?.textContent || "";
        const imagen = tarjeta.querySelector("img")?.src || "";

        carrito.push({ nombre, imagen });

        actualizarCarrito();
    }
});

/* ==========================
   PANEL CARRITO
========================== */

carritoBtn?.addEventListener("click", () => {
    panelCarrito?.classList.toggle("visible");
});

/* ==========================
   CATEGORÍAS (FIX REAL SPA)
========================== */

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

document.querySelectorAll("[data-categoria]").forEach(link => {

    link.addEventListener("click", (e) => {
        e.preventDefault();

        const cat = e.target.dataset.categoria;

        showSection("catalogo");

        catalogo.innerHTML = "";

        productos[cat]?.forEach(p => {

            catalogo.innerHTML += `
                <div class="tarjeta-producto">

                    <img src="${p.imagen}" alt="${p.nombre}">

                    <h3>${p.nombre}</h3>

                    <button class="agregar-carrito">
                        Añadir al carrito
                    </button>

                </div>
            `;
        });
    });
});

/* ==========================
   BOTÓN CHECKOUT (FIX)
========================== */

document.getElementById("btn-checkout")?.addEventListener("click", () => {
    showSection("checkout");
});

/* ==========================
   ENVÍO FIREBASE (CORREGIDO)
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

    const productosCarrito = carrito.map(p => p.nombre);

    try {

        await db.collection("cotizaciones").add({
            nombre,
            email,
            telefono,
            direccion,
            comuna,
            mensaje,
            productos: productosCarrito,
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
   NAV LINKS SPA
========================== */

document.getElementById("btn-inicio")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("inicio");
});

document.getElementById("btn-auth")?.addEventListener("click", (e) => {
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
   AUTH SPA CONTROL
========================== */

const authSection = document.getElementById("auth");

const loginSpa = document.getElementById("login-spa");
const registerSpa = document.getElementById("register-spa");

document.getElementById("btn-auth").addEventListener("click", (e) => {
    e.preventDefault();

    showSection("auth");

    loginSpa.style.display = "block";
    registerSpa.style.display = "none";
});

/* ==========================
   SWITCH SPA LOGIN / REGISTER
========================== */

document.getElementById("go-login").onclick = () => {
    loginSpa.style.display = "block";
    registerSpa.style.display = "none";
};

document.getElementById("go-register").onclick = () => {
    loginSpa.style.display = "block";
    registerSpa.style.display = "block";
};

document.getElementById("registerBtn").onclick = async () => {

    const email = regEmail.value;
    const pass = regPass.value;

    try {

        const res = await auth.createUserWithEmailAndPassword(email, pass);

        await db.collection("users").doc(res.user.uid).set({
            email,
            role: "client"
        });

        authMsg.innerHTML = "Cuenta creada. <span style='color:blue;cursor:pointer' onclick='showSection(\"auth\")'>Inicia sesión</span>";

    } catch (err) {

        if (err.code === "auth/email-already-in-use") {
            authMsg.innerHTML = "Ya existe la cuenta. <span style='color:blue;cursor:pointer' onclick='showSection(\"auth\")'>Inicia sesión</span>";
        } else {
            authMsg.innerText = err.message;
        }
    }
};

/* ==========================
   LOGIN
========================== */

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {

        await auth.signInWithEmailAndPassword(email, password);

        alert("Login exitoso");

        showSection("inicio");

    } catch (error) {
        alert("Error: " + error.message);
    }
});
