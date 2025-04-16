// Carrito de canales
let carrito = [];

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
    });
    
    // Activar el botón clickeado
    event.target.classList.add('active');

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

// Agregar botones de "Agregar" a cada canal
document.addEventListener('DOMContentLoaded', function() {
    const canalCards = document.querySelectorAll('.canal-card');
    
    canalCards.forEach(card => {
        // Crear botón de agregar
        const btnAgregar = document.createElement('button');
        btnAgregar.className = 'btn-agregar';
        btnAgregar.innerHTML = '<i class="fas fa-plus"></i>';
        btnAgregar.onclick = function() {
            agregarAlCarrito(card);
        };
        card.style.position = 'relative';
        card.appendChild(btnAgregar);
    });
    
    // Cargar carrito desde localStorage si existe
    const carritoGuardado = localStorage.getItem('carritoCanales');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
});

function agregarAlCarrito(card) {
    const nombre = card.querySelector('h3').textContent;
    const calidad = card.querySelector('.calidad').textContent;
    const logo = card.querySelector('img').src;
    const categoria = card.getAttribute('data-categoria');
    
    // Verificar si el canal ya está en el carrito
    const existe = carrito.some(item => item.nombre === nombre);
    
    if (!existe) {
        carrito.push({
            nombre,
            calidad,
            logo,
            categoria
        });
        
        // Marcar como agregado
        const btn = card.querySelector('.btn-agregar');
        btn.classList.add('agregado');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        
        // Guardar en localStorage
        localStorage.setItem('carritoCanales', JSON.stringify(carrito));
        
        actualizarCarrito();
        
        // Mostrar notificación
        mostrarNotificacion(`"${nombre}" agregado al carrito`);
    } else {
        // Mostrar notificación de que ya está agregado
        mostrarNotificacion(`"${nombre}" ya está en el carrito`, 'info');
    }
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const contador = document.getElementById('contador-carrito');
    
    contador.textContent = carrito.length;
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio">No has seleccionado ningún canal aún</p>';
        return;
    }
    
    listaCarrito.innerHTML = '';
    
    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <div class="nombre">${item.nombre}</div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        listaCarrito.appendChild(itemElement);
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carritoCanales', JSON.stringify(carrito));
    actualizarCarrito();
    
    // Actualizar botones en las tarjetas
    const canalCards = document.querySelectorAll('.canal-card');
    canalCards.forEach(card => {
        const nombre = card.querySelector('h3').textContent;
        const existe = carrito.some(item => item.nombre === nombre);
        const btn = card.querySelector('.btn-agregar');
        
        if (existe) {
            btn.classList.add('agregado');
            btn.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            btn.classList.remove('agregado');
            btn.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
}

function limpiarCarrito() {
    carrito = [];
    localStorage.removeItem('carritoCanales');
    actualizarCarrito();
    
    // Restablecer todos los botones de agregar
    const btnsAgregar = document.querySelectorAll('.btn-agregar');
    btnsAgregar.forEach(btn => {
        btn.classList.remove('agregado');
        btn.innerHTML = '<i class="fas fa-plus"></i>';
    });
    
    mostrarNotificacion('Carrito vaciado');
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        mostrarNotificacion('No hay canales seleccionados', 'error');
        return;
    }
    
    // Crear mensaje
    let mensaje = '¡Hola! Estoy interesado en cotizar los siguientes canales:\n\n';
    
    // Agrupar por categoría
    const categorias = {};
    carrito.forEach(item => {
        if (!categorias[item.categoria]) {
            categorias[item.categoria] = [];
        }
        categorias[item.categoria].push(item);
    });
    
    // Construir mensaje organizado
    for (const categoria in categorias) {
        mensaje += `*${categoria.toUpperCase()}*\n`;
        categorias[categoria].forEach(item => {
            mensaje += `- ${item.nombre} (${item.calidad})\n`;
        });
        mensaje += '\n';
    }
    
    mensaje += `Total: ${carrito.length} canales seleccionados\n\n`;
    mensaje += 'Por favor, envíenme información sobre precios y paquetes disponibles.';
    
    // Codificar para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Número de WhatsApp (reemplaza con tu número)
    const numeroWhatsApp = '+573011382447'; // Ejemplo: Argentina +54 9 11 1234-5678
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 10);
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Estilos para notificaciones (agregar al CSS)
document.head.insertAdjacentHTML('beforeend', `
<style>
.notificacion {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
}

.notificacion.mostrar {
    opacity: 1;
}

.notificacion.success {
    background-color: #2ecc71;
}

.notificacion.error {
    background-color: #e74c3c;
}

.notificacion.info {
    background-color: #3498db;
}
</style>
`);