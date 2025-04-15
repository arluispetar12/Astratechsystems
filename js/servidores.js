// Filtrado por categoría
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filtro-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            filtrarServidores(categoria);
        });
    });
});

function filtrarServidores(categoria) {
    const categoriasServidores = document.querySelectorAll('.categoria-servidor');
    const cardsServidores = document.querySelectorAll('.servidor-card');
    
    if (categoria === 'todos') {
        // Mostrar todas las categorías
        categoriasServidores.forEach(cat => {
            cat.style.display = 'block';
        });
        
        // Mostrar todas las cards
        cardsServidores.forEach(card => {
            card.style.display = 'flex';
        });
    } else {
        // Ocultar todas las categorías primero
        categoriasServidores.forEach(cat => {
            cat.style.display = 'none';
        });
        
        // Mostrar la categoría seleccionada
        document.getElementById(categoria).style.display = 'block';
        
        // Filtrar las cards
        cardsServidores.forEach(card => {
            const cardCategoria = card.getAttribute('data-categoria');
            if (cardCategoria === categoria) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}