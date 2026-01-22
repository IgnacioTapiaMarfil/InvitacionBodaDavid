// ========================================
// CUENTA REGRESIVA
// ========================================

const fechaBoda = new Date("Oct 11, 2026 14:30:00").getTime();

const countdown = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    // Cálculos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Actualizar el reloj
    const reloj = document.getElementById("reloj");
    if (distancia < 0) {
        clearInterval(countdown);
        reloj.innerHTML = "¡Hoy es el gran día!";
    } else {
        reloj.innerHTML = `
            <div>${dias}<span>Días</span></div>
            <div>${horas}<span>Hs</span></div>
            <div>${minutos}<span>Min</span></div>
            <div>${segundos}<span>Seg</span></div>
        `;
    }
}, 1000);

// ========================================
// CARRUSEL DE FOTOS
// ========================================

let indiceActual = 0;
const fotos = document.querySelectorAll('.polaroid');

function mostrarFoto(indice) {
    fotos.forEach((foto, i) => {
        foto.classList.toggle('active', i === indice);
    });
}

function cambiarFoto(direccion) {
    indiceActual += direccion;
    
    // Loop circular
    if (indiceActual >= fotos.length) {
        indiceActual = 0;
    } else if (indiceActual < 0) {
        indiceActual = fotos.length - 1;
    }
    
    mostrarFoto(indiceActual);
}

// Avance automático cada 5 segundos
setInterval(() => {
    cambiarFoto(1);
}, 5000);
