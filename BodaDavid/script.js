// Configurar la fecha de la boda
const fechaBoda = new Date("Oct 11, 2026 14:30:00").getTime();

const countdown = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    // Cálculos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Mostrar el resultado en el elemento con id="reloj"
    document.getElementById("reloj").innerHTML = `
        <div>${dias}<span>Días</span></div>
        <div>${horas}<span>Hs</span></div>
        <div>${minutos}<span>Min</span></div>
        <div>${segundos}<span>Seg</span></div>
    `;

    // Si la cuenta termina
    if (distancia < 0) {
        clearInterval(countdown);
        document.getElementById("reloj").innerHTML = "¡Hoy es el gran día!";
    }
}, 1000);

// Función para añadir el evento al calendario
function addToCalendar() {
    const evento = {
        titulo: 'Boda de David y Esther',
        descripcion: 'Ceremonia de boda de David y Esther',
        ubicacion: 'Lugar de la ceremonia',
        inicio: '20261011T143000', // 11 de Octubre 2026, 14:30 (2:30 PM)
        fin: '20261011T220000' // 11 de Octubre 2026, 22:00 (10:00 PM)
    };

    // Crear archivo ICS para descargar
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Boda David y Esther//ES
BEGIN:VEVENT
UID:${Date.now()}@bodadavidesther.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${evento.inicio}
DTEND:${evento.fin}
SUMMARY:${evento.titulo}
DESCRIPTION:${evento.descripcion}
LOCATION:${evento.ubicacion}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    // Crear blob y descargar
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'boda-david-esther.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}