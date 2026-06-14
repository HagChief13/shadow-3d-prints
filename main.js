const nav=document.getElementById("nav");
document.getElementById("abrir").onclick=()=>nav.classList.add("visible");
document.getElementById("cerrar").onclick=()=>nav.classList.remove("visible");

const carrito=[];
const contador=document.querySelector(".contador-carrito");

function renderContador(){
contador.textContent=carrito.length;
}

/* AGREGAR */
document.addEventListener("click",(e)=>{
const btn=e.target.closest(".agregar-carrito");
if(!btn)return;

const card=btn.closest(".tarjeta-producto");
if(!card)return;

carrito.push({
nombre:card.querySelector("h3")?.textContent||"Producto",
imagen:card.querySelector("img")?.src
});

renderContador();
});

/* SPA */
const spa=document.getElementById("spa-carrito");
const lista=document.getElementById("spa-lista");

document.getElementById("carrito").onclick=()=>{

spa.classList.add("activo");

lista.innerHTML=carrito.length?carrito.map((p,i)=>`
<div class="item">
<img src="${p.imagen}" width="40">
<span>${p.nombre}</span>
<button onclick="eliminar(${i})">X</button>
</div>`).join(""):"Carrito vacío";

};

function eliminar(i){
carrito.splice(i,1);
renderContador();
document.getElementById("carrito").click();
}

document.getElementById("cerrar-spa").onclick=()=>{
spa.classList.remove("activo");
};

/* COTIZACIÓN */
document.getElementById("btn-solicitar").onclick=async()=>{

const email=document.getElementById("email-cotizacion").value;
if(!email)return alert("Ingresa email");

await db.collection("cotizaciones").add({
email,
productos:carrito,
fecha:new Date().toISOString()
});

alert("Cotización enviada");

carrito.length=0;
renderContador();
spa.classList.remove("activo");
};
const spa = document.getElementById("spa-carrito");
const spaLista = document.getElementById("spa-lista");

document.getElementById("ver-carrito").addEventListener("click", () => {

    spa.classList.add("visible");

    spaLista.innerHTML = "";

    if (carrito.length === 0) {
        spaLista.innerHTML = "<p>Tu carrito está vacío</p>";
        return;
    }

    carrito.forEach((item, i) => {
        spaLista.innerHTML += `
        <div class="item">
            <img src="${item.imagen}" width="40">
            <span>${item.nombre}</span>
            <button onclick="eliminarItem(${i})">X</button>
        </div>`;
    });
});

document.getElementById("cerrar-spa").addEventListener("click", () => {
    spa.classList.remove("visible");
});

document.getElementById("btn-solicitar").addEventListener("click", async () => {

    const email = document.getElementById("email-cotizacion").value;

    if (!email) {
        alert("Ingresa un correo");
        return;
    }

    try {
        await db.collection("cotizaciones").add({
            email,
            productos: carrito,
            fecha: new Date().toISOString()
        });

        alert("Cotización enviada");

        carrito = [];
        actualizarCarrito();
        spa.classList.remove("visible");

    } catch (e) {
        console.error(e);
        alert("Error al enviar");
    }
});
