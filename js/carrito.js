
const productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'));

const carritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const carritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
const botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const botonVaciar = document.querySelector('#carrito-acciones-vaciar');
const botonComprar = document.querySelector('#carrito-acciones-comprar');
const elementoTotal = document.querySelector('#total');
const contadorCarrito = document.querySelector('#numerito');


function cargarProductosCarrito(){

    
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        carritoVacio.classList.add('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        carritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);
        })} else {
        carritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        carritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    }

    actualizarBotonesEliminar();
    actualizarContadorLocal();
    actualizarTotalLocal();

}

function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
    botonesEliminar.forEach(boton => {
        boton.removeEventListener('click', eliminarDelCarrito);
        boton.addEventListener('click', eliminarDelCarrito);
    });
}


function eliminarDelCarrito(evento) {
    const idBoton = evento.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    if (index !== -1) {
       
        if (Number(productosEnCarrito[index].cantidad) > 1) {
            productosEnCarrito[index].cantidad = Number(productosEnCarrito[index].cantidad) - 1;
        } else {
            productosEnCarrito.splice(index, 1);
        }

        localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    }
}

// NO FUNCIONA 
if (botonVaciar) {
    botonVaciar.addEventListener('click', () => {
        productosEnCarrito = [];
        localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    });
}

// AGREGAR BOTON DE COMPRAR

function actualizarContadorLocal() {
    if (!contadorCarrito) return;
    const nuevoContador = productosEnCarrito.reduce((acc, prod) => acc + (Number(prod.cantidad) || 0), 0);
    contadorCarrito.textContent = nuevoContador;
}

// Monto total
function actualizarTotalLocal() {
    if (!elementoTotal) return;
    const total = productosEnCarrito.reduce((acc, prod) => acc + (Number(prod.precio) || 0) * (Number(prod.cantidad) || 0), 0);
    elementoTotal.textContent = `$${total}`;
}


cargarProductosCarrito();