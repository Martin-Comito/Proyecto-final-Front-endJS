# Proyecto Final Front-End-Js: Tecno Comito 🛒

¡Hola! Soy **[Martin Ezequiel Comito]** y este repositorio es la entrega final de mi recorrido por el curso de **Front-End ** en **Talento Tech** (Gobierno de la Ciudad de Buenos Aires).

Mi objetivo con "Tecno Comito" fue desafiarme a mí mismo: no quería entregar una simple página estática ("maquetada"), sino construir una **aplicación web real** que funcione, responda y recuerde los datos del usuario.

**[https://martin-comito.github.io/Proyecto-final-Front-endJS/index.html](https://martin-comito.github.io/Proyecto-final-Front-endJS/)**

---

## ¿De qué trata mi proyecto?

Desarrollé un simulador de e-commerce de tecnología. La idea principal fue resolver los problemas típicos de una tienda online desde el lado del cliente (Front-End), sin depender de un servidor externo para la lógica básica.

En lugar de escribir los productos uno por uno en el código (lo cual sería imposible de mantener), conecté mi página a una API externa para que el catálogo se genere solo.

## ¿Cómo lo construí?

Para este desarrollo, integré todas las herramientas que vimos en el curso:

* **HTML5:** Me enfoqué en que el código fuera semántico y ordenado (`header`, `main`, `footer`), pensando en que sea fácil de leer por los navegadores.
* **CSS3:** Diseñé el sitio pensando primero en el celular (**Mobile First**) y luego en escritorio. Usé **Flexbox** para alinear los menús y **Grid** para que las reseñas se vean bien organizadas.
* **JavaScript (El cerebro del sitio):** Aquí es donde puse más énfasis.
    * Usé `async/await` y `fetch` para traer los datos de **FakeStoreAPI**.
    * Manipulé el **DOM** para crear las tarjetas de productos y la tabla del carrito automáticamente.
    * Implementé lógica matemática para que el carrito calcule subtotales y totales sin errores.

## Funcionalidades que desarrollé

Lo que hace especial a este proyecto son las funcionalidades dinámicas que logré implementar:

### 1. Sistema de Usuarios (Login y Registro)
Como no tenemos Backend, se me ocurrió usar el `localStorage` del navegador para simular una base de datos.
* **Registro:** Puedes crear un usuario y contraseña, y el sitio los "recuerda".
* **Sesión:** Si te logueas y cierras la página, al volver seguirás logueado y el menú te saludará por tu nombre.

### 2. Carrito de Compras Persistente
Me aseguré de que si un usuario agrega productos, no los pierda al recargar la página. Todo se guarda en la memoria local del navegador, permitiendo agregar, eliminar y modificar cantidades en tiempo real.

### 3. Catálogo Dinámico
Los productos no están "hardcodeados". Si la API actualiza una imagen o un precio, mi sitio se actualiza automáticamente.

### 4. Contacto Real
Conecté el formulario con **Formspree**, así que si alguien escribe un mensaje, me llega un correo de verdad.

---

### Nota sobre el aprendizaje
*Soy consciente de que en un entorno profesional real, las contraseñas y usuarios deben manejarse en un servidor seguro y no en el navegador. Sin embargo, implementé esta solución para demostrar mi capacidad de manipular datos y lógica compleja con JavaScript puro.*

---

**Autor:** [Martin Ezequiel Comito]
**Curso:** Talento Tech 2025