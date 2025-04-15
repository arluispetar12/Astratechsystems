// Agregar esta función al inicio del archivo
function abrirWhatsApp(servicio) {
    const numeroWhatsApp = "573011382447"; // Reemplaza con tu número
    const mensaje = `Hola, necesito soporte técnico para: ${servicio}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Modificar el event listener existente para usar WhatsApp
document.querySelectorAll('.btn-soporte').forEach(boton => {
    boton.addEventListener('click', function() {
        const servicio = this.closest('.soporte-card').querySelector('h3').textContent;
        abrirWhatsApp(servicio);
    });
});