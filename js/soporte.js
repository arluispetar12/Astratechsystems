document.addEventListener('DOMContentLoaded', function() {
    // Efecto para los botones de soporte
    const botonesSoporte = document.querySelectorAll('.btn-soporte');
    
    botonesSoporte.forEach(boton => {
        boton.addEventListener('click', function() {
            const servicio = this.closest('.soporte-card').querySelector('h3').textContent;
            alert(`Has solicitado soporte para: ${servicio}\n\nNuestro equipo se pondrá en contacto contigo pronto.`);
            
            // Aquí podrías agregar código para enviar un formulario o abrir un modal
        });
    });
    
    // Filtrado de servicios (si decides implementarlo)
    const filtroServicios = document.querySelectorAll('[data-categoria]');
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    
    if(botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', function() {
                // Remover clase active de todos los botones
                botonesFiltro.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                const categoria = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                
                if(categoria === 'todas') {
                    filtroServicios.forEach(servicio => {
                        servicio.style.display = 'block';
                    });
                } else {
                    filtroServicios.forEach(servicio => {
                        if(servicio.dataset.categoria === categoria) {
                            servicio.style.display = 'block';
                        } else {
                            servicio.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Efecto hover para las tarjetas de información
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
});