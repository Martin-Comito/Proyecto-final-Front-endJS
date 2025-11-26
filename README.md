# Proyecto Final Front-End: Tecno Comito

Este repositorio contiene el código fuente de mi Proyecto Integrador Final para el curso de **Front-End Developer** del programa **Talento Tech**, impulsado por el Gobierno de la Ciudad de Buenos Aires.

Este proyecto representa la culminación del trayecto formativo, donde se integran todos los conocimientos adquiridos para desarrollar una aplicación web funcional, dinámica y responsiva.

**Link al proyecto desplegado:** [https://github.com/Martin-Comito/Proyecto-final-Front-endJS]

---

## Descripción del Proyecto

"Tecno Comito" es una simulación de un e-commerce dedicado a la venta de productos electrónicos. El objetivo principal fue desarrollar una Single Page Application (SPA) que no dependa de archivos estáticos para su contenido, sino que opere con datos dinámicos y persistencia del lado del cliente.

El sitio pasa de ser una maquetación visual a una aplicación funcional capaz de gestionar un carrito de compras y consumir datos externos, simulando el entorno real de un desarrollo profesional.

## Tecnologías Implementadas

Para la realización de este proyecto utilicé el siguiente stack tecnológico, siguiendo las mejores prácticas aprendidas en el curso:

* **HTML5 Semántico:** Estructura optimizada utilizando etiquetas de sección (`header`, `nav`, `main`, `footer`) para garantizar un código limpio, organizado y accesible.
* **CSS3:**
    * Diseño Responsivo (Mobile First) para asegurar la correcta visualización en dispositivos móviles y de escritorio.
    * Implementación de **Flexbox** y **CSS Grid** para la distribución de elementos y layouts complejos.
* **JavaScript (ES6+):**
    * **Fetch API & Asincronía:** Consumo de datos desde una API externa (FakeStoreAPI) para poblar el catálogo de productos en tiempo real.
    * **DOM Scripting:** Generación dinámica de tarjetas de productos y manipulación de la interfaz de usuario.
    * **LocalStorage:** Implementación de persistencia de datos para mantener el estado del carrito de compras entre sesiones.
* **Control de Versiones:** Uso de Git y GitHub para la gestión del código y despliegue en GitHub Pages.

## Funcionalidades Principales

1.  **Catálogo Dinámico:** Los productos se obtienen mediante una petición asíncrona a una API REST, eliminando la necesidad de hardcodear contenido en el HTML.
2.  **Carrito de Compras Funcional:** Sistema completo para agregar productos, modificar cantidades y eliminar ítems. El total se calcula automáticamente según las interacciones del usuario.
3.  **Persistencia de Sesión:** El carrito utiliza `localStorage` del navegador, permitiendo que el usuario cierre la página y mantenga sus productos seleccionados al regresar.
4.  **Contacto:** Formulario validado con JavaScript e integrado con el servicio Formspree para la gestión de envíos.

---

**Autor:** Martin Ezequiel Comito
Proyecto Final - Curso Front-End
Talento Tech - Gobierno de la Ciudad de Buenos Aires
Año: 2025