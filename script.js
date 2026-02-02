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
let intervaloCarrusel;

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
    
    // Reiniciar el temporizador automático
    clearInterval(intervaloCarrusel);
    intervaloCarrusel = setInterval(() => {
        cambiarFoto(1);
    }, 5000);
}

// Avance automático cada 5 segundos
intervaloCarrusel = setInterval(() => {
    cambiarFoto(1);
}, 5000);

// ========================================
// MODALES
// ========================================

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('activo');
    }
}

function cerrarModal(event, modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('activo');
    }
}

// ========================================
// FORMULARIO DE CONFIRMACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = form.querySelector('input[type="text"]').value;
            const asistencia = form.querySelector('select').value;
            const asistenciaTexto = asistencia === 'si' ? 'SÍ confirmo mi asistencia' : 'NO puedo asistir';
            
            // Configurar el correo
            const emailDestino = 'nachotapia02@gmail.com'; // Cambia esto por tu correo
            const asunto = 'Confirmación de asistencia - Boda David y Esther';
            const cuerpo = `Nombre: ${nombre}\n\nAsistencia: ${asistenciaTexto}\n\n---\nEnviado desde la invitación de boda`;
            
            // Crear el enlace mailto
            const mailtoLink = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
            
            // Abrir el cliente de correo
            window.location.href = mailtoLink;
            
            // Cerrar el modal después de un breve delay
            setTimeout(() => {
                cerrarModal(null, 'modal-confirmacion');
                form.reset();
            }, 500);
        });
    }
});
