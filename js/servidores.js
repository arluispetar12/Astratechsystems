// Funcionalidad de filtrado
function filtrarServidores(categoria) {
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(categoria) || 
           (categoria === 'todos' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });

    const cards = document.querySelectorAll('.servidor-card');
    const categorias = document.querySelectorAll('.categoria-servidor');
    
    if (categoria === 'todos') {
        cards.forEach(card => {
            card.style.display = "";
        });
        categorias.forEach(cat => {
            cat.style.display = "";
        });
    } else {
        // Ocultar todas las categorías primero
        categorias.forEach(cat => {
            cat.style.display = "none";
        });
        
        // Mostrar solo la categoría seleccionada
        document.getElementById(categoria).style.display = "";
        
        // Mostrar todos los servidores de esa categoría
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