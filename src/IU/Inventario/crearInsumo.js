const {remote, ipcRenderer} = require("electron")

const formulario = document.getElementById("formularioCrearInsumo");
const insumoCodigo = document.getElementById("codigo");
const insumoCategoria = document.getElementById("categoria");
const insumoEtiqueta = document.getElementById("etiqueta");
const insumoNombre = document.getElementById("nombre");
const insumoUnidad = document.getElementById("unidad");
const insumoStockMinimo = document.getElementById("stock_minimo");
const insumoStockMaximo = document.getElementById("stock_maximo");
const insumoCosto = document.getElementById("costo");
let listaCategoria = document.getElementById("listaCategoria");
let listaEtiqueta = document.getElementById("listaEtiqueta");
let listaUnidad = document.getElementById("listaUnidad");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(insumoStockMinimo.value != "") stockMinimo = parseFloat(insumoStockMinimo.value)
    if(insumoStockMaximo.value != "") stockMaximo = parseFloat(insumoStockMaximo.value)

    if(insumoCodigo.value == ""){
        alert("Ingrese un codigo")
    }else if(insumoCategoria.value == ""){
        alert("Ingrese una categoria")
    }else if(insumoEtiqueta.value == ""){
        alert("Ingrese una etiqueta")
    }else if(insumoNombre.value == ""){
        alert("Ingrese un nombre")
    }else if(insumoUnidad.value == ""){
        alert("Ingrese una unidad")
    }else if(insumoStockMinimo.value == ""){
        alert("Ingrese un stock mínimo")
    }else if(insumoStockMaximo.value == ""){
        alert("Ingrese un stock máximo")
    }else if(insumoCosto.value == ""){
        alert("Ingrese un costo")
    }else{
        const nuevoInsumo = {
            codigo: insumoCodigo.value,
            categoria: insumoCategoria.value,
            etiqueta: insumoEtiqueta.value,
            nombre: insumoNombre.value,
            cantidad: 0,
            unidad: insumoUnidad.value,
            stock_minimo: stockMinimo,
            stock_maximo: stockMaximo,
            costo: insumoCosto.value
        }
    
        ipcRenderer.send('asynchronous-crearInsumo', nuevoInsumo)
    
        ipcRenderer.removeAllListeners('asynchronous-reply-crearInsumo')
        
        ipcRenderer.on('asynchronous-reply-crearInsumo', (event, resp) => {
            resp.forEach(function(res){
                alert(res)
            })
        })
    }
})

listarCategorias()
listarUnidades()

function listarCategorias(){
    ipcRenderer.send('asynchronous-buscarCategorias', undefined)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarCategorias')

    ipcRenderer.on('asynchronous-reply-buscarCategorias', (event, categorias) => {
        let lista = ""

        categorias.forEach(function(categoria) {
            lista += "<option value='"+categoria.nombre+"'>"
        });
        
        listaCategoria.innerHTML = lista
    })
}

function listarEtiquetas(categoria){
    ipcRenderer.send('asynchronous-buscarEtiquetas', undefined)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarEtiquetas')

    ipcRenderer.on('asynchronous-reply-buscarEtiquetas', (event, etiquetas) => {
        let lista = ""

        etiquetas.forEach(function(etiqueta) {
            if(etiqueta.categoria == categoria) lista += "<option value='"+etiqueta.nombre+"'>"+etiqueta.categoria+"</option>"
        });
        
        listaEtiqueta.innerHTML = lista
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
        
        listaUnidad.innerHTML = lista
    })
}

insumoCategoria.onchange = function(){
    listarEtiquetas(insumoCategoria.value)
}


