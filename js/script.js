/* ================= CONFIGURACIÓN ================= */
const API_URL = 'https://fakestoreapi.com/products'; 

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-items');
const precioTotalElement = document.getElementById('precio-total');
const cartCount = document.getElementById('cart-count');

/* ================= LÓGICA PRINCIPAL ================= */

// 1. Consumo de API
async function obtenerProductos() {
    if (!contenedorProductos) return;

    try {
        contenedorProductos.innerHTML = '<p style="text-align:center; width:100%">Cargando productos...</p>';

        const respuesta = await fetch(API_URL);
        const data = await respuesta.json();
        
        // CORRECCIÓN: Quitamos 'jewelery'. Ahora solo pasa 'electronics'.
        const productosFiltrados = data.filter(p => p.category === 'electronics');
        
        renderizarProductos(productosFiltrados);
        
    } catch (error) {
        console.error(error);
        contenedorProductos.innerHTML = '<p style="text-align:center; color:red;">Error al cargar productos.</p>';
    }
}
// 2. Renderizado de Productos (Index)
function renderizarProductos(productos) {
    if (!contenedorProductos) return;
    
    contenedorProductos.innerHTML = '';
    
    productos.forEach(prod => {
        const div = document.createElement('article');
        div.classList.add('producto-card');
        
        const tituloCorto = prod.title.length > 20 ? prod.title.substring(0, 20) + "..." : prod.title;

        // NOTA: Aquí pasamos 'prod.price' (API) a la función agregar
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

// 3. Agregar al Carrito (CORREGIDO)
window.agregarAlCarrito = (id, titulo, precio, imagen) => {
    // Aseguramos que el precio sea un número
    const precioNumerico = parseFloat(precio);

    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        // Guardamos siempre como 'precio' (español) y aseguramos que sea número
        carrito.push({ id, titulo, precio: precioNumerico, imagen, cantidad: 1 });
    }
    actualizarCarrito();
    alert("¡Producto agregado al carrito!");
};

// 4. Actualizar Storage y UI
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    renderizarTablaCarrito();
}

// 5. Actualizar contador del header
function actualizarContador() {
    if (cartCount) {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        cartCount.innerText = totalItems > 0 ? `(${totalItems})` : '';
    }
}

// 6. Lógica de página Carrito (CORREGIDO EL CÁLCULO)
function renderizarTablaCarrito() {
    if (!contenedorCarrito) return;

    contenedorCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<tr><td colspan="6" style="padding:20px;">Tu carrito está vacío. <a href="index.html">Ir a comprar</a></td></tr>';
        if(precioTotalElement) precioTotalElement.innerText = "$0.00";
        return;
    }

    carrito.forEach(item => {
        // CORRECCIÓN: Aseguramos que 'item.precio' sea un número antes de multiplicar
        const precioNum = parseFloat(item.precio);
        const subtotal = precioNum * item.cantidad;
        
        total += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.imagen}" width="50"></td>
            <td>${item.titulo}</td>
            <td>$${precioNum.toFixed(2)}</td>
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

    // CORRECCIÓN FINAL: Mostramos el total con 2 decimales siempre
    if(precioTotalElement) precioTotalElement.innerText = `$${total.toFixed(2)}`;
}

// Funciones auxiliares
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

const btnVaciar = document.getElementById('vaciar-carrito');
if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
        carrito = [];
        actualizarCarrito();
    });
}

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
/* =========================================
   7. GESTIÓN DE USUARIOS (LOGIN/REGISTRO)
   ========================================= */

// Función para Registrar Usuario
function registrarUsuario(e) {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if (!nombre || !email || !pass) {
        alert("Completa todos los campos");
        return;
    }
    // Guardamos usuario en memoria
    const usuario = { nombre, email, pass };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
    alert("¡Registro exitoso! Ahora inicia sesión.");
    window.location.href = 'login.html';
}

// Función para Iniciar Sesión
function iniciarSesion(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    
    // Recuperamos el usuario registrado
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.pass === pass) {
        // Guardamos la sesión activa
        localStorage.setItem('sesionActiva', JSON.stringify(usuarioGuardado));
        alert("¡Bienvenido/a " + usuarioGuardado.nombre + "!");
        window.location.href = 'index.html';
    } else {
        alert("Datos incorrectos o no estás registrado.");
    }
}

// Función para Cerrar Sesión
window.cerrarSesion = () => {
    localStorage.removeItem('sesionActiva');
    location.reload(); // Recargamos para actualizar menú
};

// Función para mostrar nombre en el menú
function chequearSesion() {
    const sesion = JSON.parse(localStorage.getItem('sesionActiva'));
    const menu = document.querySelector('.nav-list'); // Buscamos la lista del menú

    if (sesion && menu) {
        // Si hay sesión, cambiamos los botones de Login/Registro por el nombre
        menu.innerHTML = `
            <li><a href="index.html">Inicio</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li style="display: flex; align-items: center;">
                <span style="color: white; font-weight: bold; margin-right: 10px;">Hola, ${sesion.nombre}</span>
                <button onclick="cerrarSesion()" style="background:red; color:white; border:none; padding: 2px 5px; cursor:pointer; font-size: 12px; border-radius:3px;">Salir</button>
            </li>
        `;
    }
}

// Inicialización de eventos
document.addEventListener('DOMContentLoaded', () => {
    // Chequear si ya estamos logueados
    chequearSesion();

    // Evento para formulario de Registro
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) formRegistro.addEventListener('submit', registrarUsuario);

    // Evento para formulario de Login
    const formLogin = document.getElementById('form-login');
    if (formLogin) formLogin.addEventListener('submit', iniciarSesion);
});