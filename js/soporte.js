// Función para abrir WhatsApp con un mensaje predeterminado
function abrirWhatsApp(servicio) {
    const telefono = "573011382447"; // Reemplaza con tu número de WhatsApp
    const mensaje = `Hola, necesito soporte técnico para: ${servicio}. ¿Podrían ayudarme?`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Funcionalidad de búsqueda
function filtrarServicios() {
    const input = document.getElementById('buscador-soporte');
    const filter = input.value.toUpperCase();
    const cards = document.querySelectorAll('.soporte-card');

    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre').toUpperCase();
        if (nombre.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Funcionalidad de filtrado por categoría
function filtrarServiciosPorCategoria(categoria) {
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(categoria)) {
            btn.classList.add('active');
        }
    });

    const cards = document.querySelectorAll('.soporte-card');
    
    if (categoria === 'todos') {
        cards.forEach(card => {
            card.style.display = "";
        });
    } else {
        cards.forEach(card => {
            const cardCat = card.getAttribute('data-categoria');
            if (cardCat === categoria) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log("Página de soporte cargada correctamente");
});