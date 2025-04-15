// Funcionalidad de búsqueda y filtrado para soporte
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

function filtrarServiciosPorCategoria(categoria) {
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(categoria) {
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

// Función para abrir WhatsApp con mensaje predefinido
function abrirWhatsApp(servicio) {
    const telefono = "573011382447"; // Reemplaza con tu número
    const mensaje = `Hola, estoy interesado en el servicio de ${servicio}. ¿Podrían brindarme más información?`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Puedes agregar aquí cualquier inicialización necesaria
});