/* ================= CONFIGURACIÓN ================= */
// Usamos la API general para asegurar que traiga productos
const API_URL = 'https://fakestoreapi.com/products'; 

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM (Seleccionamos con cuidado)
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-items');
const precioTotalElement = document.getElementById('precio-total');
const cartCount = document.getElementById('cart-count');

/* ================= LÓGICA PRINCIPAL ================= */

// 1. Consumo de API
async function obtenerProductos() {
    // Si no estamos en el index (no existe el contenedor), salimos para no dar error
    if (!contenedorProductos) return;

    try {
        // Mostramos mensaje de carga si es posible
        contenedorProductos.innerHTML = '<p style="text-align:center; width:100%">Cargando productos...</p>';

        const respuesta = await fetch(API_URL);
        const data = await respuesta.json();
        
        // Filtramos solo electrónica para que coincida con tu tienda (Opcional)
        // Si quieres todos los productos, borra la línea de abajo y usa 'data' directo en renderizar
        const productosFiltrados = data.filter(p => p.category === 'electronics' || p.category === 'jewelery');
        
        renderizarProductos(productosFiltrados.length > 0 ? productosFiltrados : data);
        
    } catch (error) {
        console.error(error);
        contenedorProductos.innerHTML = '<p style="text-align:center; color:red;">Error al cargar productos. Intenta recargar la página.</p>';
    }
}

// 2. Renderizado de Productos (Index)
function renderizarProductos(productos) {
    if (!contenedorProductos) return;
    
    contenedorProductos.innerHTML = ''; // Limpiar mensaje de carga
    
    productos.forEach(prod => {
        const div = document.createElement('article'); // Usamos article como en tu diseño
        div.classList.add('producto-card');
        
        // Acortar título para que no rompa el diseño
        const tituloCorto = prod.title.length > 20 ? prod.title.substring(0, 20) + "..." : prod.title;

        div.innerHTML = `
            <img src="${prod.image}" alt="${prod.title}" style="height: 150px; object-fit: contain; margin-bottom: 10px;">
            <h3 class="producto-nombre">${tituloCorto}</h3>
            <p class="producto-precio">$${prod.price}</p>
            <button class="agregar-carrito" onclick="agregarAlCarrito(${prod.id}, '${tituloCorto}', ${prod.price}, '${prod.image}')">
                <i class="fas fa-cart-plus"></i> Añadir
            </button>
        `;
        contenedorProductos.appendChild(div);
    });
}

// 3. Agregar al Carrito
window.agregarAlCarrito = (id, titulo, precio, imagen) => {
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id, titulo, precio, imagen, cantidad: 1 });
    }
    actualizarCarrito();
    alert("¡Producto agregado al carrito!");
};

// 4. Actualizar Storage y UI
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    renderizarTablaCarrito(); // Solo funcionará si estamos en carrito.html
}

// 5. Actualizar el numerito rojo del header
function actualizarContador() {
    if (cartCount) {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        cartCount.innerText = totalItems > 0 ? `(${totalItems})` : '';
    }
}

// 6. Lógica de página Carrito (carrito.html)
function renderizarTablaCarrito() {
    if (!contenedorCarrito) return; // Si no existe la tabla, no hacemos nada

    contenedorCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<tr><td colspan="6" style="padding:20px;">Tu carrito está vacío. <a href="index.html">Ir a comprar</a></td></tr>';
        if(precioTotalElement) precioTotalElement.innerText = "$0.00";
        return;
    }

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.imagen}" width="50"></td>
            <td>${item.titulo}</td>
            <td>$${item.precio}</td>
            <td>
                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span style="margin:0 10px">${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button onclick="eliminarItem(${item.id})" style="color:red; border:none; background:none; cursor:pointer;"><i class="fas fa-trash"></i></button></td>
        `;
        contenedorCarrito.appendChild(tr);
    });

    if(precioTotalElement) precioTotalElement.innerText = `$${total.toFixed(2)}`;
}

// Funciones auxiliares del carrito
window.cambiarCantidad = (id, cambio) => {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarItem(id);
        } else {
            actualizarCarrito();
        }
    }
};

window.eliminarItem = (id) => {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
};

// Botón Vaciar
const btnVaciar = document.getElementById('vaciar-carrito');
if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
        carrito = [];
        actualizarCarrito();
    });
}

// Botón Finalizar
const btnFinalizar = document.getElementById('finalizar-compra');
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        if(carrito.length > 0) {
            alert("¡Gracias por tu compra!");
            carrito = [];
            actualizarCarrito();
            window.location.href = 'index.html';
        } else {
            alert("El carrito está vacío");
        }
    });
}

/* ================= INICIALIZACIÓN ================= */
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
    actualizarContador();
    renderizarTablaCarrito();
});