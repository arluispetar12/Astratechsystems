// Funcionalidad de búsqueda y filtrado
function filtrarCanales() {
    const input = document.getElementById('buscador-canales');
    const filter = input.value.toUpperCase();
    const cards = document.querySelectorAll('.canal-card');

    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre').toUpperCase();
        if (nombre.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

function filtrarPorCategoria(categoria) {
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-categoria') === categoria) {
            btn.classList.add('active');
        }
    });

    const cards = document.querySelectorAll('.canal-card');
    
    if (categoria === 'todas') {
        cards.forEach(card => {
            card.style.display = "";
        });
        document.querySelectorAll('.categoria').forEach(cat => {
            cat.style.display = "";
        });
    } else {
        // Ocultar todas las categorías primero
        document.querySelectorAll('.categoria').forEach(cat => {
            cat.style.display = "none";
        });
        
        // Mostrar solo la categoría seleccionada
        document.getElementById(categoria).style.display = "";
        
        // Filtrar canales
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