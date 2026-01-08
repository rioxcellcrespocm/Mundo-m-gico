const boton = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menu");
const carrusel = document.querySelector(".contenedorcarrusel");
const btnsig = document.querySelector(".siguiente");
const btnant = document.querySelector(".atras");


boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("activa");
    boton.textContent = abierto ? "✖" : "☰";
});

function desplazamiento() {
    const card = carrusel.children[0];
    const gap = parseFloat(
        getComputedStyle(carrusel).gap
    ) || 0;

    return card.offsetWidth + gap;
};

function actualizarcard() {
    const cards = carrusel.children;

    Array.from(cards).forEach(card => {
        card.classList.remove("activa");
    });
    if(cards[2]) {
        cards[2].classList.add("activa");
    }
};

btnsig.addEventListener("click", () =>{
    const d = desplazamiento();

    carrusel.style.transition = "transform 0.45s ease";
    carrusel.style.transform = `translateX(-${d}px)`;

    setTimeout(() => {
        carrusel.style.transition = "none";

        carrusel.appendChild(carrusel.firstElementChild);

        carrusel.style.transform = "translateX(0)";

        carrusel.offsetHeight;

        carrusel.style.transition = "transform 0.45s ease";

        actualizarcard();
    }, 450);
});

btnant.addEventListener("click", () => {
    const d = desplazamiento();

    carrusel.style.transition = "none";

    carrusel.insertBefore(
        carrusel.lastElementChild,
        carrusel.firstElementChild
    );

    carrusel.style.transform = `translateX(-${d}px)`;

    carrusel.offsetHeight;

    carrusel.style.transition = "transform 0.45s ease";
    carrusel.style.transform = "translateX(0)";

    setTimeout(() => {
        actualizarcard();
    }, 450);
});

actualizarcard();