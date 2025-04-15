// Navegación suave entre secciones
document.querySelectorAll('.categorias-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remover clase active de todos los enlaces
        document.querySelectorAll('.categorias-nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Agregar clase active al enlace clickeado
        this.classList.add('active');
        
        // Desplazamiento suave
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Activar la primera categoría por defecto
document.querySelector('.categorias-nav a').classList.add('active');