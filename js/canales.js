// Carrito de canales
let carrito = [];
let cartOpen = false;

// Funciones de filtrado (igual que antes)
// ...

// Funciones del carrito
function toggleCart() {
    const floatingCart = document.getElementById('floatingCart');
    cartOpen = !cartOpen;
    
    if (cartOpen) {
        floatingCart.classList.add('active');
    } else {
        floatingCart.classList.remove('active');
    }
}

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
        mostrarNotificacion(`"${nombre}" agregado al carrito`);
        
        // Abrir el carrito automáticamente
        if (!cartOpen) {
            toggleCart();
        }
    } else {
        mostrarNotificacion(`"${nombre}" ya está en el carrito`, 'info');
    }
}

function actualizarCarrito() {
    const cartItems = document.getElementById('cartItems');
    const counter = document.getElementById('floatingCartCounter');
    
    counter.textContent = carrito.length;
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">No has seleccionado ningún canal aún</p>';
        return;
    }
    
    cartItems.innerHTML = '';
    
    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-name">${item.nombre}</div>
            <button class="remove-item" onclick="eliminarDelCarrito(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
    });
}

function eliminarDelCarrito(index) {
    const nombreEliminado = carrito[index].nombre;
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
    
    mostrarNotificacion(`"${nombreEliminado}" eliminado del carrito`);
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
    const numeroWhatsApp = '5491112345678'; // Ejemplo: Argentina +54 9 11 1234-5678
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
}

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const carritoGuardado = localStorage.getItem('carritoCanales');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
        
        // Marcar canales ya agregados
        const canalCards = document.querySelectorAll('.canal-card');
        canalCards.forEach(card => {
            const nombre = card.querySelector('h3').textContent;
            const existe = carrito.some(item => item.nombre === nombre);
            const btn = card.querySelector('.btn-agregar');
            
            if (existe) {
                btn.classList.add('agregado');
                btn.innerHTML = '<i class="fas fa-check"></i>';
            }
        });
    }
    
    // Configurar botones de agregar
    const btnsAgregar = document.querySelectorAll('.btn-agregar');
    btnsAgregar.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.canal-card');
            agregarAlCarrito(card);
        });
    });
});