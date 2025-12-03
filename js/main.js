import productos from './productos.js';

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrinciapl = document.querySelector('.titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const contadorCarrito = document.querySelector('#numerito');

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {

        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt='${producto.titulo}'>
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo} </h3>
                    <p class="producto-precio">${producto.precio} </p>
                    <button class="producto-agregar" id="${producto.id}"> Agregar</button>
                </div>`


        contenedorProductos.append(div);
    })
    actualizarBotonesAAgregar();
};


cargarProductos(productos);

botonesCategorias.forEach(boton => {

    boton.addEventListener('click', (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');


        if (e.currentTarget.id != 'todos') {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrinciapl.innerText = productoCategoria.categoria.nombre;


            const productosElegidos = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosElegidos);
        } else {
            tituloPrinciapl.innerText = 'Todos los productos';
            cargarProductos(productos);
        }

    })

});

// Que los botones se actualicen cuando se cargan los productos
function actualizarBotonesAAgregar(){
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito);
    });
}



let productosEnCarrito;
const productoEnCarritoLS = JSON.parse(localStorage.getItem('productos-en-carrito'));

if(productoEnCarritoLS){
     productosEnCarrito = productoEnCarritoLS;
     actualizarContador();
}else{
  productosEnCarrito = [];
}


// Agrega los productos a un nuevo array
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
   
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    // Si el producto ya existe en el array, que aumente la cantidad.
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
       const index =  productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;

    } else{
        productoAgregado.cantidad = 1;
         productosEnCarrito.push(productoAgregado);
    }
 
    actualizarContador();

    // Se agrega al localStroge para poder recuperar la informacion desde la pagina carrito
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
}

function actualizarContador(){
    let nuevoContador= productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad,0);
    contadorCarrito.textContent = nuevoContador;
 }
