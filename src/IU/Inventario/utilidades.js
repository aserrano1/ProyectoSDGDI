const {remote, ipcRenderer} = require("electron")

//Categoria: constantes
const agregarCategoriaNombre = document.getElementById("agregarCategoriaNombre");
const agregarCategoria = document.getElementById("agregarCategoria");
const categoriaActual = document.getElementById("categoriaActual");
const listaCategoriaActual = document.getElementById("listaCategoriaActual");
const modificarCategoriaNombre = document.getElementById("modificarCategoriaNombre");
const modificarCategoria = document.getElementById("modificarCategoria");
const eliminarCategoriaNombre = document.getElementById("eliminarCategoriaNombre");
const listaEliminarCategoriaNombre = document.getElementById("listaEliminarCategoriaNombre");
const eliminarCategoria = document.getElementById("eliminarCategoria");
//Etiqueta: constantes
const agregarEtiquetaNombre = document.getElementById("agregarEtiquetaNombre");
const agregarEtiquetaCategoria = document.getElementById("agregarEtiquetaCategoria");
const listaAgregarEtiquetaCategoria = document.getElementById("listaAgregarEtiquetaCategoria");
const agregarEtiqueta = document.getElementById("agregarEtiqueta");
const etiquetaActual = document.getElementById("etiquetaActual");
const listaEtiquetaActual = document.getElementById("listaEtiquetaActual");
const modificarEtiquetaNombre = document.getElementById("modificarEtiquetaNombre");
const modificarEtiquetaCategoria = document.getElementById("modificarEtiquetaCategoria");
const listaModificarEtiquetaCategoria = document.getElementById("listaModificarEtiquetaCategoria");
const modificarEtiqueta = document.getElementById("modificarEtiqueta");
const eliminarEtiquetaNombre = document.getElementById("eliminarEtiquetaNombre");
const listaEliminarEtiquetaNombre = document.getElementById("listaEliminarEtiquetaNombre");
const eliminarEtiqueta = document.getElementById("eliminarEtiqueta");
//Unidad: constantes
const agregarUnidadNombre = document.getElementById("agregarUnidadNombre");
const agregarUnidadSimbolo = document.getElementById("agregarUnidadSimbolo");
const agregarUnidad = document.getElementById("agregarUnidad");
const unidadActual = document.getElementById("unidadActual");
const listaUnidadActual = document.getElementById("listaUnidadActual");
const modificarUnidadNombre = document.getElementById("modificarUnidadNombre");
const modificarUnidadSimbolo = document.getElementById("modificarUnidadSimbolo");
const modificarUnidad = document.getElementById("modificarUnidad");
const eliminarUnidadNombre = document.getElementById("eliminarUnidadNombre");
const listaEliminarUnidadNombre = document.getElementById("listaEliminarUnidadNombre");
const eliminarUnidad = document.getElementById("eliminarUnidad");
//Ubicacion: constantes
const agregarUbicacionNombre = document.getElementById("agregarUbicacionNombre");
const agregarUbicacion = document.getElementById("agregarUbicacion");
const ubicacionActual = document.getElementById("ubicacionActual");
const listaUbicacionActual = document.getElementById("listaUbicacionActual");
const modificarUbicacionNombre = document.getElementById("modificarUbicacionNombre");
const modificarUbicacion = document.getElementById("modificarUbicacion");
const eliminarUbicacionNombre = document.getElementById("eliminarUbicacionNombre");
const listaEliminarUbicacionNombre = document.getElementById("listaEliminarUbicacionNombre");
const eliminarUbicacion = document.getElementById("eliminarUbicacion");

//Llenar listas
listarCategorias()
listarEtiqetas()
listarUnidades()
listarUbicaciones()

//Categoria: operaciones
agregarCategoria.addEventListener('click', (e) => {
    console.log("hola 1")
    if(agregarCategoriaNombre.value != ""){
        const categoria = {
            nombre: agregarCategoriaNombre.value
        } 

        ipcRenderer.send('asynchronous-crearCategoria', categoria)
        console.log("hola")
    }
})

modificarCategoria.addEventListener('click', (e) => {
    if(categoriaActual.value != "" && modificarCategoriaNombre.value != ""){
        ipcRenderer.send('asynchronous-actualizarCategoria', [categoriaActual.value, modificarCategoriaNombre.value])
    }
})

eliminarCategoria.addEventListener('click', (e) => {
    if(eliminarCategoriaNombre.value != ""){
        ipcRenderer.send('asynchronous-eliminarCategoria', eliminarCategoriaNombre.value)
    }
})

/*coincidencias.forEach(function(coincidencia) {
    switch (buscarInsumoBusquedaSimpleCriterio.value) {
        case 'codigo':
            lista += '<option>'+coincidencia.codigo+'</option>'
            break;
        case 'categoria':
            lista += '<option>'+coincidencia.categoria+'</option>'
            break;
        case 'etiqueta':
            lista += '<option>'+coincidencia.etiqueta+'</option>'
            break;
        case 'nombre':
            lista += '<option>'+coincidencia.nombre+'</option>'
            break;
        case 'cantidad':
            lista += '<option>'+coincidencia.cantidad+'</option>'
            break;
        case 'unidad':
            lista += '<option>'+coincidencia.unidad+'</option>'
            break;
        case 'stock minimo':
            lista += '<option>'+coincidencia.stock_minimo+'</option>'
            break;
        case 'stock maximo':
            lista += '<option>'+coincidencia.stock_maximo+'</option>'
    }       
});*/

//Etiqueta: operaciones
agregarEtiqueta.addEventListener('click', (e) => {
    if(agregarEtiquetaNombre.value != "" && agregarEtiquetaCategoria.value != ""){
        const etiqueta = {
            nombre: agregarEtiquetaNombre.value,
            categoria: agregarEtiquetaCategoria.value
        }

        ipcRenderer.send('asynchronous-crearEtiqueta', etiqueta)
    }
})

modificarEtiqueta.addEventListener('click', (e) => {
    if(etiquetaActual.value != "", modificarEtiquetaCategoria.value != "" && modificarEtiquetaNombre.value != ""){
        etiqueta = {
            nombre: modificarEtiquetaNombre.value,
            categoria: modificarEtiquetaCategoria.value
        }

        ipcRenderer.send('asynchronous-actualizarEtiqueta', [etiquetaActual.value, etiqueta])
    }
})

eliminarEtiqueta.addEventListener('click', (e) => {
    if(eliminarEtiquetaNombre.value != ""){
        ipcRenderer.send('asynchronous-eliminarEtiqueta', eliminarEtiquetaNombre.value)
    }
})

//Unidad: operaciones
agregarUnidad.addEventListener('click', (e) => {
    if(agregarUnidadNombre.value != "" && agregarUnidadSimbolo.value != ""){
        unidad = {
            nombre: agregarUnidadNombre.value,
            simbolo: agregarUnidadSimbolo.value
        }

        ipcRenderer.send('asynchronous-crearUnidad', unidad)
    }
})

modificarUnidad.addEventListener('click', (e) => {
    if(unidadActual.value != "", modificarUnidadNombre.value != "" && modificarUnidadSimbolo.value != ""){
        unidad = {
            nombre: modificarUnidadNombre.value,
            simbolo: modificarUnidadSimbolo.value
        }

        ipcRenderer.send('asynchronous-actualizarUnidad', [unidadActual.value, unidad])
    }
})

eliminarUnidad.addEventListener('click', (e) => {
    if(eliminarUnidadNombre.value != ""){
        ipcRenderer.send('asynchronous-eliminarUnidad', eliminarUnidadNombre.value)
    }
})

//Ubicacion: operaciones
agregarUbicacion.addEventListener('click', (e) => {
    if(agregarUbicacionNombre.value != ""){
        ubicacion = {
            nombre: agregarUbicacionNombre.value
        }
        console.log(ubicacion)
        ipcRenderer.send('asynchronous-crearUbicacion', ubicacion)
    }
})

modificarUbicacion.addEventListener('click', (e) => {
    if(ubicacionActual.value != "", modificarUbicacionNombre.value != ""){
        ubicacion = {
            nombre: modificarUbicacionNombre.value
        }

        ipcRenderer.send('asynchronous-actualizarUbicacion', [ubicacionActual.value, ubicacion])
    }
})

eliminarUbicacion.addEventListener('click', (e) => {
    if(eliminarUbicacionNombre.value != ""){
        ipcRenderer.send('asynchronous-eliminarUbicacion', eliminarUbicacionNombre.value)
    }
})

//Comunes: listas
function listarCategorias(){
    ipcRenderer.send('asynchronous-buscarCategorias', undefined)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarCategorias')

    ipcRenderer.on('asynchronous-reply-buscarCategorias', (event, categorias) => {
        let lista = ""

        categorias.forEach(function(categoria) {
            lista += "<option value='"+categoria.nombre+"'>"
        });
        
        listaCategoriaActual.innerHTML = lista
        listaEliminarCategoriaNombre.innerHTML = lista
        listaAgregarEtiquetaCategoria.innerHTML = lista
        listaModificarEtiquetaCategoria.innerHTML = lista
    })
}

function listarEtiqetas(){
    ipcRenderer.send('asynchronous-buscarEtiquetas', undefined)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarEtiquetas')

    ipcRenderer.on('asynchronous-reply-buscarEtiquetas', (event, etiquetas) => {
        let lista = ""

        etiquetas.forEach(function(etiqueta) {
            lista += "<option value='"+etiqueta.nombre+"'>"+etiqueta.categoria+"</option>"
        });
        
        listaEtiquetaActual.innerHTML = lista
        listaEliminarEtiquetaNombre.innerHTML = lista
    })
}

function listarUnidades(){
    ipcRenderer.send('asynchronous-buscarUnidades', undefined)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarUnidades')

    ipcRenderer.on('asynchronous-reply-buscarUnidades', (event, unidades) => {
        let lista = ""

        unidades.forEach(function(unidad) {
            lista += "<option value='"+unidad.nombre+"'>"+unidad.simbolo+"</option>"
        });
        
        listaUnidadActual.innerHTML = lista
        listaEliminarUnidadNombre.innerHTML = lista
    })
}

function listarUbicaciones(){
    ipcRenderer.send('asynchronous-buscarUbicaciones', undefined)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarUbicaciones')

    ipcRenderer.on('asynchronous-reply-buscarUbicaciones', (event, ubicaciones) => {
        let lista = ""

        ubicaciones.forEach(function(ubicacion) {
            lista += "<option value='"+ubicacion.nombre+"'>"+ubicacion.simbolo+"</option>"
        });
        
        listaUbicacionActual.innerHTML = lista
        listaEliminarUbicacionNombre.innerHTML = lista
    })
}