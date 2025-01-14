document.addEventListener('DOMContentLoaded', function() {
    // Inicializar variables
    let carrito = [];
    let productos = [
        { id: 1, nombre: 'Pack X11', precio: 4400, imagen: "imagenes/ST1.jpg", descripcion: 'Pack X11' },
        { id: 2, nombre: 'Pack X12', precio: 4600, imagen: "imagenes/ST2.jpg", descripcion: 'Pack X12' },
        { id: 3, nombre: 'Pack X17', precio: 6400, imagen: "imagenes/ST3.jpg", descripcion: 'Pack X17' },
        { id: 4, nombre: 'Pack X12', precio: 4600, imagen: "imagenes/ST4.jpg", descripcion: 'Pack X12' },
        { id: 5, nombre: 'Pack X14', precio: 4900, imagen: "imagenes/ST5.jpg", descripcion: 'Pack X14' },
        { id: 6, nombre: 'Pack X11', precio: 4300, imagen: "imagenes/ST6.jpg", descripcion: 'Pack X11' },
        { id: 7, nombre: 'Pack X20', precio: 7900, imagen: "imagenes/ST7.jpg", descripcion: 'Pack X20' },
        { id: 8, nombre: 'Pack X30', precio: 8600, imagen: "imagenes/ST8.jpg", descripcion: 'Pack X30' },
        { id: 9, nombre: 'Pack X11', precio: 4300, imagen: "imagenes/ST9.jpg", descripcion: 'Pack X11' },
        { id: 10, nombre: 'Pack X10', precio: 4000, imagen: "imagenes/S10.jpg", descripcion: 'Pack X10' },
        { id: 11, nombre: 'Pack X18', precio: 6800, imagen: "imagenes/ST11.jpeg", descripcion: 'Pack X18' },
        { id: 12, nombre: 'Pack X16', precio: 6000, imagen: "imagenes/ST12.jpeg", descripcion: 'Pack X16' },
        { id: 13, nombre: 'Pack X11', precio: 4400, imagen: "imagenes/ST14.jpeg", descripcion: 'Pack X11' },
        { id: 14, nombre: 'Pack X10', precio: 4000, imagen: "imagenes/ST15.jpeg", descripcion: 'Pack X10' },
        { id: 15, nombre: 'Pack X16', precio: 6000, imagen: "imagenes/ST16.jpeg", descripcion: 'Pack X16' }
    ];

    // Cargar productos en la página
    const productosGaleria = document.querySelector('.productos-galeria');
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        productosGaleria.appendChild(productoElement);
    });

    // Funciones del carrito
    window.toggleCarrito = function() {
        const carritoModal = document.getElementById('carritoModal');
        carritoModal.style.display = carritoModal.style.display === 'block' ? 'none' : 'block';
    };

    window.agregarAlCarrito = function(productoId) {
        const producto = productos.find(p => p.id === productoId);
        carrito.push(producto);
        actualizarCarrito();
    };

    function actualizarCarrito() {
        const carritoItems = document.getElementById('carritoItems');
        const carritoTotal = document.getElementById('carritoTotal');
        const carritoCount = document.getElementById('carritoCount');

        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio;
            const item = document.createElement('div');
            item.classList.add('item-carrito');
            item.innerHTML = `
                <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            `;
            carritoItems.appendChild(item);
        });

        carritoTotal.textContent = total.toFixed(2);
        carritoCount.textContent = carrito.length;
    }

    // Función para proceder al pago (ejemplo básico)
    window.procederPago = function() {
        alert('Gracias por tu compra');
        carrito = [];
        actualizarCarrito();
        toggleCarrito();
    };

    // Funcionalidad para manejar reseñas
    const formReseña = document.getElementById('form-reseña');
    const listaReseñas = document.getElementById('lista-reseñas');

    // Cargar reseñas desde el almacenamiento local
    const reseñasGuardadas = JSON.parse(localStorage.getItem('reseñas')) || [];
    reseñasGuardadas.forEach(reseña => {
        agregarReseñaALista(reseña);
    });

    formReseña.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const comentario = document.getElementById('comentario').value;
        const nuevaReseña = { nombre, comentario };

        // Agregar la nueva reseña a la lista y al almacenamiento local
        reseñasGuardadas.push(nuevaReseña);
        localStorage.setItem('reseñas', JSON.stringify(reseñasGuardadas));

        agregarReseñaALista(nuevaReseña);

        // Limpiar el formulario
        formReseña.reset();
    });

    function agregarReseñaALista(reseña) {
        const reseñaElement = document.createElement('div');
        reseñaElement.classList.add('reseña');
        reseñaElement.innerHTML = `
            <p><strong>${reseña.nombre}</strong></p>
            <p>${reseña.comentario}</p>
        `;
        listaReseñas.appendChild(reseñaElement);
    }
});