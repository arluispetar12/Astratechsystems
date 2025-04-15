// Funcionalidad de búsqueda y filtrado para soporte
function filtrarServicios() {
    const input = document.getElementById('buscador-soporte');
    const filter = input.value.toUpperCase();
    const cards = document.querySelectorAll('.soporte-card');

    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre').toUpperCase();
        const categoria = card.getAttribute('data-categoria');
        const categoriaActiva = document.querySelector('.filtro-btn.active').getAttribute('data-categoria') || 'todos';
        
        // Verificar si coincide con búsqueda Y con categoría activa
        if (nombre.includes(filter) && 
            (categoriaActiva === 'todos' || categoria === categoriaActiva)) {
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

    // También actualizar el atributo data-categoria en los botones
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.setAttribute('data-categoria', btn.textContent.toLowerCase().trim());
    });

    // Aplicar filtro
    const cards = document.querySelectorAll('.soporte-card');
    const busqueda = document.getElementById('buscador-soporte').value.toUpperCase();
    
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-categoria');
        const nombre = card.getAttribute('data-nombre').toUpperCase();
        
        // Verificar categoría y búsqueda simultáneamente
        if ((categoria === 'todos' || cardCat === categoria) && 
            nombre.includes(busqueda)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
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
    // Configurar eventos para los botones de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.textContent.toLowerCase().trim();
            filtrarServiciosPorCategoria(categoria);
        });
    });

    // Configurar evento para el buscador
    document.getElementById('buscador-soporte').addEventListener('keyup', filtrarServicios);
    
    // Establecer el botón "Todos" como activo por defecto
    document.querySelector('.filtro-btn.active').setAttribute('data-categoria', 'todos');
});