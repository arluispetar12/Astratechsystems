document.addEventListener('DOMContentLoaded', function() {
    // Efecto para las tarjetas de información
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Efecto hover para las tarjetas de servicio
    const soporteCards = document.querySelectorAll('.soporte-card');
    
    soporteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

// Función global para abrir WhatsApp
function abrirWhatsApp(servicio) {
    const numero = "573011382447"; // Número de WhatsApp
    const mensaje = `Hola, necesito soporte técnico para: ${servicio}\n\nPor favor proporcióneme más detalles sobre el problema:`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}