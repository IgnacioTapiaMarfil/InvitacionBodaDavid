// ========================================
// CONTROL DE MÚSICA
// ========================================

const btnMusica = document.getElementById('btn-musica');
const audioMusica = document.getElementById('musica-fondo');
let musicaReproduciendo = false;
let audioConSonido = false;

function actualizarEstadoBoton() {
    btnMusica.classList.toggle('reproduciendo', musicaReproduciendo);
}

async function reproducirMusica(conSonido = true) {
    try {
        audioMusica.volume = 0.5;
        audioMusica.muted = !conSonido;
        await audioMusica.play();
        musicaReproduciendo = true;
        audioConSonido = conSonido;
        actualizarEstadoBoton();
    } catch (error) {
        musicaReproduciendo = false;
        audioConSonido = false;
        actualizarEstadoBoton();
    }
}

function pausarMusica() {
    audioMusica.pause();
    musicaReproduciendo = false;
    audioConSonido = false;
    actualizarEstadoBoton();
}

btnMusica.addEventListener('click', () => {
    if (musicaReproduciendo) {
        pausarMusica();
    } else {
        reproducirMusica(true);
    }
});

// El autoplay con sonido suele estar bloqueado; iniciamos en silencio para evitar errores.
window.addEventListener('load', () => {
    reproducirMusica(false);
});

document.addEventListener('pointerdown', () => {
    if (musicaReproduciendo && !audioConSonido) {
        audioMusica.muted = false;
        audioConSonido = true;
        return;
    }

    if (!musicaReproduciendo) {
        reproducirMusica(true);
    }
}, { once: true });

audioMusica.addEventListener('play', () => {
    musicaReproduciendo = true;
    actualizarEstadoBoton();
});

audioMusica.addEventListener('pause', () => {
    musicaReproduciendo = false;
    actualizarEstadoBoton();
});

// ========================================
// CUENTA REGRESIVA
// ========================================

const fechaBoda = new Date("Nov 7, 2026 14:30:00").getTime();

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

function mostrarAviso(mensaje, tipo = 'ok') {
    const aviso = document.createElement('div');
    aviso.textContent = mensaje;
    aviso.style.position = 'fixed';
    aviso.style.left = '50%';
    aviso.style.top = '24px';
    aviso.style.transform = 'translateX(-50%)';
    aviso.style.padding = '12px 18px';
    aviso.style.borderRadius = '12px';
    aviso.style.color = '#ffffff';
    aviso.style.fontSize = '0.95rem';
    aviso.style.fontWeight = '600';
    aviso.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.2)';
    aviso.style.zIndex = '3000';
    aviso.style.maxWidth = 'min(92vw, 560px)';
    aviso.style.textAlign = 'center';
    aviso.style.opacity = '0';
    aviso.style.transition = 'opacity 0.25s ease';
    aviso.style.backgroundColor = tipo === 'ok' ? 'rgba(84, 106, 104, 0.95)' : 'rgba(163, 76, 76, 0.95)';

    document.body.appendChild(aviso);

    requestAnimationFrame(() => {
        aviso.style.opacity = '1';
    });

    setTimeout(() => {
        aviso.style.opacity = '0';
        setTimeout(() => aviso.remove(), 250);
    }, 3500);
}

// ========================================
// FORMULARIO DE CONFIRMACIÓN
// ========================================

const EMAILJS_PUBLIC_KEY  = 'Ph9dS-ZMypyfJtSjp';
const EMAILJS_SERVICE_ID  = 'service_cy9u41g';
const EMAILJS_TEMPLATE_ID = 'template_60r3sng';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');

    const emailJsConfigCompleta = Boolean(
        EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID
    );

    if (window.emailjs && emailJsConfigCompleta) {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
    }
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = form.querySelector('input[name="nombre"]').value;
            const email = form.querySelector('input[name="email"]').value.trim();
            const asistencia = form.querySelector('input[name="asistencia"]:checked').value;
            const nota = form.querySelector('textarea[name="nota"]').value.trim();
            const bebida = document.querySelector('#modal-bebida textarea[name="bebida"]')?.value.trim() || 'Sin preferencia';
            const asistenciaTexto = asistencia === 'si' ? 'SÍ confirmo mi asistencia' : 'NO puedo asistir';
            const confirmacion = asistencia === 'si' ? 'Afirmativa' : 'Negativa';
            const notaTexto = nota || 'Sin observaciones';

            const templateParams = {
                nombre: nombre,
                email: email,
                confirmacion: confirmacion,
                afirmacion: asistencia,
                bebida: bebida,
                notas: notaTexto
            };

            const submitBtn = form.querySelector('button[type="submit"]');
            const textoOriginal = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                if (!window.emailjs || !emailJsConfigCompleta) {
                    throw new Error('Configuracion EmailJS pendiente');
                }

                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                mostrarAviso('Confirmacion enviada correctamente. Gracias.', 'ok');

                // Cerrar el modal despues del envio
                cerrarModal(null, 'modal-confirmacion');
                form.reset();
            } catch (error) {
                console.error('Error al enviar con EmailJS:', error);
                mostrarAviso('No se pudo enviar la confirmacion. Revisa la configuracion de EmailJS e intentalo de nuevo.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = textoOriginal;
            }
            
        });
    }
});
