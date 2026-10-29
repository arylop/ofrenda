// --- Array de imágenes y descripciones ---
const fotos = [
    { src: "img/mama coco.jpg", descripcion: "Un recuerdo que vive en el corazón, nace en el corazón" },
    { src: "img/camacho.jpg", descripcion: "Momentos que nunca olvidaremos" },
    { src: "img/jenny.jpg", descripcion: "Su cariño nos acompaña" },
    { src: "img/adanluna.jpgimg/adanluna.jpg", descripcion: "Siempre presente en nuestra memoria" }
];

// --- Variables y elementos del DOM ---
let indice = 0;
const imagen = document.getElementById("imagenOfrenda");
const descripcion = document.getElementById("descripcion");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const puntos = document.getElementById("puntos");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

// --- Crear indicadores (puntos) ---
function crearIndicadores() {
    puntos.innerHTML = "";
    fotos.forEach((_, i) => {
        const punto = document.createElement("span");
        punto.classList.add("punto");
        punto.addEventListener("click", () => mostrarFoto(i));
        puntos.appendChild(punto);
    });
}

// --- Mostrar foto según el índice ---
function mostrarFoto(nuevoIndice) {
    indice = (nuevoIndice + fotos.length) % fotos.length;
    imagen.src = fotos[indice].src;
    descripcion.textContent = fotos[indice].descripcion;
    actualizarIndicadores();
}

// --- Actualizar indicadores ---
function actualizarIndicadores() {
    const puntoEl = document.querySelectorAll(".punto");
    puntoEl.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}

// --- Eventos de navegación ---
anterior.addEventListener("click", () => {
    mostrarFoto(indice - 1);
});

siguiente.addEventListener("click", () => {
    mostrarFoto(indice + 1);
});

// --- Reproducir o pausar música ---
btnMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        btnMusica.innerHTML = "⏸️ Pausar música";
        btnMusica.classList.add("activo");
    } else {
        audio.pause();
        audio.currentTime = 0;
        btnMusica.innerHTML = "▶ Reproducir música";
        btnMusica.classList.remove("activo");
    }
});

// --- Cambio automático de imágenes (opcional) ---
let intervalo = setInterval(() => {
    mostrarFoto(indice + 1);
}, 6000); // Cambia cada 6 segundos

// --- Pausar cambio automático al interactuar ---
anterior.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        mostrarFoto(indice + 1);
    }, 6000);
});

siguiente.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        mostrarFoto(indice + 1);
    }, 6000);
});

// --- Inicializar al cargar la página ---
document.addEventListener("DOMContentLoaded", () => {
    crearIndicadores();
    mostrarFoto(0); // Mostrar la primera imagen
});