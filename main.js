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
