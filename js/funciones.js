//-------------------------------------------------------
//                elementos del dom
//-------------------------------------------------------

const boton = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menu");
const btnsig = document.querySelector(".siguiente");
const btnant = document.querySelector(".atras");
const carrusel = document.querySelector(".contenedorcarrusel");

const cards = document.querySelectorAll(".cardH");
//----------------------------------------------------
//               menu hamburguesa
//----------------------------------------------------
//cuando se esta en movil, al darle click al boton hamburguesa cambia el icono
boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("activo");
    boton.textContent = abierto ? "✖" : "☰";
});
//--------------------------------------------------//

function moverSiguiente() {
    const card = carrusel.firstElementChild;
    const ancho = card.offsetWidth + 24;

    // 1. Deslizamos el scroll suavemente
    carrusel.scrollTo({
        left: ancho,
        behavior: "smooth"
    });

    // 2. Esperamos a que termine (500ms) y movemos el HTML sin que se note
    setTimeout(() => {
        carrusel.appendChild(card); // Mandamos la primera al final
        carrusel.scrollTo({ left: 0, behavior: "auto" }); // Reseteamos el scroll de golpe
    }, 500);
}

function moverAnterior() {
    const card = carrusel.lastElementChild;
    const ancho = card.offsetWidth + 24;

    // 1. Movemos la carta atrás del todo (invisible)
    carrusel.insertBefore(card, carrusel.firstElementChild);
    
    // 2. Saltamos el scroll al ancho de la carta (invisible)
    carrusel.scrollTo({ left: ancho, behavior: "auto" });

    // 3. Animamos suavemente hacia el 0
    setTimeout(() => {
        carrusel.scrollTo({
            left: 0,
            behavior: "smooth"
        });
    }, 20);
}

btnsig.addEventListener("click", moverSiguiente);
btnant.addEventListener("click", moverAnterior);