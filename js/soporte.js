// Función para abrir WhatsApp con un mensaje predeterminado
function abrirWhatsApp(servicio) {
    const telefono = "573011382447"; // Reemplaza con tu número de WhatsApp
    const mensaje = `Hola, estoy interesado en el servicio de ${servicio}. ¿Podrían brindarme más información?`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Filtrado de categorías (si implementas filtros más adelante)
document.addEventListener('DOMContentLoaded', function() {
    // Puedes añadir aquí funcionalidad de filtrado si lo necesitas
    console.log("Página de soporte cargada correctamente");
    
    // Ejemplo de cómo podrías implementar filtros:
    /*
    const filtros = document.querySelectorAll('.filtro-categoria');
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            const categoria = this.dataset.categoria;
            filtrarServicios(categoria);
        });
    });
    */
});

// Función de ejemplo para filtrar servicios
function filtrarServicios(categoria) {
    const cards = document.querySelectorAll('.soporte-card');
    cards.forEach(card => {
        if (categoria === 'todos' || card.dataset.categoria === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}