/* ================= CONFIGURACIÓN ================= */
const API_URL = 'https://fakestoreapi.com/products/category/electronics';
// Recuperamos carrito del LocalStorage o iniciamos vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
const contenedorProductos = document.getElementById('contenedor-productos');
const loader = document.getElementById('loader');
const cartCount = document.getElementById('cart-count');
const contenedorCarrito = document.getElementById('carrito-items');
const precioTotalElement = document.getElementById('precio-total');

/* ================= LÓGICA PRINCIPAL ================= */

// 1. Consumo de API con Async/Await
async function obtenerProductos() {
    if (!contenedorProductos) return; // Solo ejecuta en index

    try {
        const respuesta = await fetch(API_URL);
        const data = await respuesta.json();
        loader.style.display = 'none'; // Ocultar loader
        renderizarProductos(data);
    } catch (error) {
        loader.innerText = "Error al cargar productos. Intente más tarde.";
        console.error(error);
    }
}

// 2. Manipulación del DOM (Renderizado)
function renderizarProductos(productos) {
    contenedorProductos.innerHTML = '';
    
    productos.forEach(prod => {
        const div = document.createElement('div');
        div.classList.add('producto-card');
        div.innerHTML = `
            <img src="${prod.image}" alt="${prod.title}">
            <h3>${prod.title.substring(0, 20)}...</h3>
            <p class="precio">$${prod.price}</p>
            <button onclick="agregarAlCarrito(${prod.id}, '${prod.title}', ${prod.price}, '${prod.image}')">
                Agregar
            </button>
        `;
        contenedorProductos.appendChild(div);
    });
}

// 3. Interactividad: Agregar al Carrito
window.agregarAlCarrito = (id, titulo, precio, imagen) => {
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id, titulo, precio, imagen, cantidad: 1 });
    }
    actualizarCarrito();
    alert("Producto agregado ✅");
};

// 4. Persistencia: LocalStorage y UI
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    if (contenedorCarrito) renderizarTablaCarrito(); // Solo si estamos en carrito.html
}

function actualizarContador() {
    if (cartCount) {
        cartCount.innerText = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }
}

// 5. Lógica de página Carrito (carrito.html)
function renderizarTablaCarrito() {
    contenedorCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.price * item.cantidad; // Nota: en API viene como 'price'
        total += subtotal; // Pero guardamos como 'precio' al agregar. Ajustar según variable.
        // Corrección rápida: usaremos 'precio' que guardamos en la función agregar
        const costo = item.precio * item.cantidad;
        total += costo;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.imagen}" width="50"></td>
            <td>${item.titulo}</td>
            <td>$${item.precio}</td>
            <td>${item.cantidad}</td>
            <td>$${costo.toFixed(2)}</td>
            <td><button onclick="eliminarItem(${item.id})" style="color:red">X</button></td>
        `;
        contenedorCarrito.appendChild(tr);
    });

    if(precioTotalElement) precioTotalElement.innerText = `$${total.toFixed(2)}`;
}

window.eliminarItem = (id) => {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
};

/* ================= INICIALIZACIÓN ================= */
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    obtenerProductos();     // Intenta cargar API
    if (contenedorCarrito) renderizarTablaCarrito(); // Intenta cargar tabla
});