//-------------------------------------------------------
//                elementos del dom
//-------------------------------------------------------

const boton = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menu");
const carrusel = document.querySelector(".contenedorcarrusel");
const btnsig = document.querySelector(".siguiente");
const btnant = document.querySelector(".atras");

//----------------------------------------------------
//               menu hamburguesa
//----------------------------------------------------
//cuando se esta en movil, al darle click al boton hamburguesa cambia el icono
boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("activo");
    boton.textContent = abierto ? "✖" : "☰";
});

//------------------------------------------------------
//              Funciones del carrusel
//------------------------------------------------------
//calcula cuanto debe deslazarse el carrusel(distancia) ANCHO CARD + GAP
function desplazamiento() {
    const card = carrusel.children[0];
    const gap = parseFloat(
        getComputedStyle(carrusel).gap
    ) || 0;

    return card.offsetWidth + gap;
};

//Marca visualmente la card centarl como activa
function actualizarcard() {
    const cards = carrusel.children;
//quita la clase activa a todos
    Array.from(cards).forEach(card => {
        card.classList.remove("activa");
    });
//activa la card central en la posicion 2
    if(cards[2]) {
        cards[2].classList.add("activa");
    }
};
//---------------------------------------------------------
//                Boton siguiente
//---------------------------------------------------------
//Mueve el carrusel hacia la izquierda
btnsig.addEventListener("click", () =>{
    const d = desplazamiento();
//Animacion del desplazamiento
    carrusel.style.transition = "transform 0.45s ease";
    carrusel.style.transform = `translateX(-${d}px)`;
//Reorganiza los elementos para el efecto infinito
    setTimeout(() => {
        carrusel.style.transition = "none";

        carrusel.appendChild(carrusel.firstElementChild);

        carrusel.style.transform = "translateX(-8px)";
//Fuerza reflow para reiniciar transicion
        carrusel.offsetHeight;

        carrusel.style.transition = "transform 0.45s ease";

        actualizarcard();
    }, 450);
});
//Mueve el carrusel hacia la derecha
btnant.addEventListener("click", () => {
    const d = desplazamiento();
    //reocoloca la ultima card al inicio sin animacion
    carrusel.style.transition = "none";
    carrusel.insertBefore(
        carrusel.lastElementChild,
        carrusel.firstElementChild
    );
    //coloca el carrusel desplazado
    carrusel.style.transform = `translateX(-${d}px)`;
    //Fuerza reflow
    carrusel.offsetHeight;
    //aplica animacion de regreso
    carrusel.style.transition = "transform 0.45s ease";
    carrusel.style.transform = "translateX(-8px)";

    setTimeout(() => {
        actualizarcard();
    }, 450);
});

//Desde aqui inicia, marca la card central al cargar pagina

actualizarcard();