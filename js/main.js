const productos = [
    // CAMPERAS -- 5.
    {
        id: 'pantalon-01',
        titulo: 'Campera Manchester',
        imagen: '../imagenes/camperas/01.webp',
        categoria: {
            nombre: 'Camperas',
            id: 'camperas'
        },
        precio: 67425
    },
    {
        id: 'pantalon-02',
        titulo: 'Campera Baltimore',
        imagen: '../imagenes/camperas/02.webp',
        categoria: {
            nombre: 'camperas',
            id: 'camperas'
        },
        precio: 74925
    },
    {
        id: 'pantalon-03',
        titulo: 'Blazer Tokio',
        imagen: './imagenes/camperas/03.webp',
        categoria: {
            nombre: 'camperas',
            id: 'camperas'
        },
        precio: 119250
    },
    {
        id: 'pantalon-04',
        titulo: 'Campera coimbra',
        imagen: '../imagenes/camperas/04.webp',
        categoria: {
            nombre: 'camperas',
            id: 'camperas'
        },
        precio: 1222
    },
    {
        id: 'campera-05',
        titulo: 'Camisaco tavira',
        imagen: '../imagenes/camperas/05.webp',
        categoria: {
            nombre: 'camperas',
            id: 'camperas'
        },
        precio: 71145
    },

    // PANTALONES (6)

    {
        id: 'pantalon-01',
        titulo: 'PANTALON',
        imagen: './imagenes/pantalones/01.webp',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalon'
        },
        precio: 67425
    },
    {
        id: 'pantalon-02',
        titulo: 'PANTALON',
        imagen: '../imagenes/pantalones/02.webp',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalon'
        },
        precio: 74925
    },
    {
        id: 'pantalon-03',
        titulo: 'PANTALON',
        imagen: '../imagenes/pantalones/03.webp',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalon'
        },
        precio: 119250
    },
    {
        id: 'pantalon-04',
        titulo: 'PANTALON',
        imagen: '../imagenes/pantalones/04.webp',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalon'
        },
        precio: 74925
    },
    {
        id: 'pantalon-05',
        titulo: 'PANTALON',
        imagen: '../imagenes/pantalones/05.webp',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalon'
        },

        precio: 7

    },
    {
        id: 'pantalon-06',
        titulo: 'PANTALONasdasd',
        imagen: './imagenes/pantalones/06.webp',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalon'
        },

        precio: 7234324

    },

    // REMERAS 

];

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrinciapl = document.querySelector('.titulo-principal');

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
                    <button class="producto-agregar" id=${producto.id}> Agregar</button>
                </div>`


        contenedorProductos.append(div);
    })
}


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

})