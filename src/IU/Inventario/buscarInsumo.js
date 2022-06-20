const {remote, ipcRenderer} = require("electron")

const formulario = document.getElementById("buscarInsumo");
const buscarInsumoBusquedaSimple = document.getElementById("busquedaSimple");
const buscarInsumoBusquedaAvanzada = document.getElementById("busquedaAvanzada");
const buscarInsumoOpcionBusquedaSimple = document.getElementById("opcionBusquedaSimple");
const buscarInsumoOpcionBusquedaAvanzada = document.getElementById("opcionBusquedaAvanzada");
const buscarInsumoBusquedaSimpleValor = document.getElementById("valorBusquedaSimple");
const buscarInsumoBusquedaSimpleCriterio = document.getElementById("criterioBusquedaSimple");
let buscarInsumoListaCoincidencias = document.getElementById("coincidencias");
const insumoCodigo = document.getElementById("codigo");
const insumoCategoria = document.getElementById("categoria");
const insumoEtiqueta = document.getElementById("etiqueta");
const insumoNombre = document.getElementById("nombre");
const insumoUnidad = document.getElementById("unidad");
const insumoCantidad = document.getElementById("cantidad");
const insumoStockMinimo = document.getElementById("stock_minimo");
const insumoStockMaximo = document.getElementById("stock_maximo");
const insumoCosto = document.getElementById("costo");
let buscarInsumoResultado = document.getElementById("resultado");
let insumoActualizar = document.getElementById("actualizar");

/*let resProductoNombre = document.getElementById("res_nombre");
let resProductoID = document.getElementById("res_id");
let resProductoEtiqueta = document.getElementById("res_etiqueta");
let resProductoUnidad = document.getElementById("res_unidad");
let resProductoCantidad = document.getElementById("res_cantidad");*/
let listaExistencias = document.getElementById("listaExistencias");

buscarInsumoOpcionBusquedaSimple.addEventListener('click', (e) => {
    buscarInsumoBusquedaSimple.hidden = false
    buscarInsumoBusquedaAvanzada.hidden = true
})

buscarInsumoOpcionBusquedaAvanzada.addEventListener('click', (e) => {
    buscarInsumoBusquedaAvanzada.hidden = false
    buscarInsumoBusquedaSimple.hidden = true
})

buscarInsumoBusquedaSimpleValor.addEventListener('keyup', (e) => {
    const criterios = [
        buscarInsumoBusquedaSimpleCriterio.value,
        buscarInsumoBusquedaSimpleValor.value
    ]

    if(criterios[0] == "stock minimo") criterios[0] = "stock_minimo"
    if(criterios[0] == "stock maximo") criterios[0] = "stock_maximo"

    ipcRenderer.send('asynchronous-buscarInsumoProgresivamente', criterios)
    
    ipcRenderer.on('asynchronous-reply-buscarInsumoProgresivamente', (event, resultado) => {
        listarCoincidencias(resultado)
    })
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if(buscarInsumoOpcionBusquedaSimple.checked){
        if(buscarInsumoBusquedaSimpleValor.value != ""){
            const criterios = [
                buscarInsumoBusquedaSimpleCriterio.value,
                buscarInsumoBusquedaSimpleValor.value
            ]
    
            if(criterios[0] == "stock minimo") criterios[0] = "stock_minimo"
            if(criterios[0] == "stock maximo") criterios[0] = "stock_maximo"
    
            ipcRenderer.send('asynchronous-buscarInsumoSimple', criterios)
            
            ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoSimple')

            ipcRenderer.on('asynchronous-reply-buscarInsumoSimple', (event, resultado) => {
                listarInsumos(resultado)
            })
        }else{
            ipcRenderer.send('asynchronous-buscarTodosLosInsumos', undefined)
            
            ipcRenderer.removeAllListeners('asynchronous-reply-buscarTodosLosInsumos')

            ipcRenderer.on('asynchronous-reply-buscarTodosLosInsumos', (event, resultado) => {
                console.log(resultado)
                listarInsumos(resultado)
            })
        }
    }

    if(buscarInsumoOpcionBusquedaAvanzada.checked){
        if(insumoCodigo.value != "" || insumoCategoria.value != "" || insumoEtiqueta.value != "" || 
        insumoNombre.value != "" || insumoUnidad.value != "" || insumoCantidad.value != "" || 
        insumoStockMinimo.value != "" || insumoStockMaximo.value != "" || insumoCosto.value != ""){
            let cantidad, stock_minimo, stock_maximo, costo

            if(insumoCantidad.value != "") cantidad = parseFloat(insumoCantidad.value)
            if(insumoStockMinimo.value != "") stock_minimo = parseFloat(insumoStockMinimo.value)
            if(insumoStockMaximo.value != "") stock_maximo = parseFloat(insumoStockMaximo.value)
            if(insumoCosto.value != "") costo = parseFloat(insumoCosto.value)

            const insumo = {
                codigo: insumoCodigo.value,
                categoria: insumoCategoria.value,
                etiqueta: insumoEtiqueta.value,
                nombre: insumoNombre.value,
                cantidad: cantidad,
                unidad: insumoUnidad.value,
                stock_minimo: stock_minimo,
                stock_maximo: stock_maximo,
                costo: costo
            }

            ipcRenderer.send('asynchronous-buscarInsumoAvanzado', insumo)

            ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoAvanzado')

            ipcRenderer.on('asynchronous-reply-buscarInsumoAvanzado', (event, resultado) => {
                listarInsumos(resultado)
            })
        }else alert("Ingrese algún valor")
    }
})

function listarCoincidencias(coincidencias) {
    let lista = ""

    coincidencias.forEach(function(coincidencia) {
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
    });

    buscarInsumoListaCoincidencias.innerHTML = lista
}

function actualizarInsumo(codigoInsumo){
    const formularioActualizar = document.getElementById("formularioActualizar");
    const codigoActualizado = document.getElementById("codigoActualizar");
    const categoriaActualizado = document.getElementById("categoriaActualizar");
    const etiquetaActualizado = document.getElementById("etiquetaActualizar");
    const nombreActualizado = document.getElementById("nombreActualizar");
    const unidadActualizado = document.getElementById("unidadActualizar");
    const stockMinimoActualizado = document.getElementById("stock_minimoActualizar");
    const stockMaximoActualizado = document.getElementById("stock_maximoActualizar");
    const costoActualizado = document.getElementById("costoActualizar");
    
    const insumo = {
        codigo: codigoActualizado.value,
        categoria: categoriaActualizado.value,
        etiqueta:  etiquetaActualizado.value,
        nombre: nombreActualizado.value,
        unidad: unidadActualizado.value,
        stock_minimo: stockMinimoActualizado.value,
        stock_maximo: stockMaximoActualizado.value,
        costo: parseFloat(costoActualizado.value)
    }

    ipcRenderer.send('asynchronous-actualizarInsumo', [codigoInsumo, insumo])

    formularioActualizar.remove()
}

function eliminarInsumo(codigoInsumo){
    const confirmacionEliminar = document.getElementById("confirmacionEliminar")

    buscarInsumoResultado.removeChild(document.getElementById(codigoInsumo))

    ipcRenderer.send('asynchronous-eliminarInsumo', codigoInsumo)

    confirmacionEliminar.remove()
}

function cerrarVentana(ventanaId){
    const ventana = document.getElementById(ventanaId);

    ventana.remove()
}

function desplegarVentanaActualizar(insumo){
    const ventanaActualizar = '<form id="formularioActualizar" class="card card-body animate__animated animate__fadeIn" style="position: fixed; z-index: 1; margin-left: 40%">'+
                                '<div class="form-group mb-1">'+
                                '<label>Codigo*</label>'+
                                '<input id="codigoActualizar" type="text" value="'+insumo.codigo+'" class="form-control mb-2">'+
                                '</div>'+
                                '<label>Categoria*</label>'+
                                '<div class="form-group mb-1">'+
                                '<input id="categoriaActualizar" type="text" value="'+insumo.categoria+'" class="form-control mb-2">'+
                                '</div>'+
                                '<label>Etiqueta*</label>'+
                                '<div class="form-group mb-1">'+
                                '<input id="etiquetaActualizar" type="text" value="'+insumo.etiqueta+'" class="form-control mb-2">'+
                                '</div>'+
                                '<label>Nombre*</label>'+
                                '<div class="form-group mb-1">'+
                                '<input id="nombreActualizar" type="text" value="'+insumo.nombre+'" class="form-control mb-2">'+
                                '</div>'+
                                '<label>Unidad*</label>'+
                                '<div class="form-group mb-1">'+
                                '<input id="unidadActualizar" type="text" value="'+insumo.unidad+'" class="form-control mb-2">'+
                                '</div>'+
                                '<label>Stock mínimo*</label>'+
                                '<div class="form-group mb-1">'+
                                '<input id="stock_minimoActualizar" type="number" value="'+insumo.stock_minimo+'" class="form-control mb-2">'+
                                '</div>'+
                                '<label>Stock máximo*</label>'+
                                '<div class="form-group mb-1">'+
                                '<input id="stock_maximoActualizar" type="number" value="'+insumo.stock_maximo+'" class="form-control mb-2">'+
                                '</div>'+
                                '<label>Costo*</label>'+
                                '<div class="form-group mb-1">'+
                                '<input id="costoActualizar" type="number" value="'+insumo.costo+'" class="form-control mb-2">'+
                                '</div>'+
                                '<button onclick="actualizarInsumo(\''+insumo.codigo+'\')" type="button" class="btn btn-primary mt-2">Actualizar</button>'+
                                '<button onclick="cerrarVentana(\'formularioActualizar\')" type="button" class="btn btn-primary mt-2">Cancelar</button>'+
                                '</form>'

    document.body.insertAdjacentHTML('afterbegin', ventanaActualizar)
}

function desplegarVentanaEliminar(codigoInsumo, nombreInsumo){
    const ventanaEliminar = '<div id="confirmacionEliminar" class="card card-body animate__animated animate__flipInX" style="position: fixed; z-index: 1; margin-top: 20%; margin-left: 30%">'+
                                '<p>¿Está seguro que desea eliminar el producto '+nombreInsumo+' ('+codigoInsumo+')?</p>'+
                                '<p>Advertencia: junto con este producto se elimnarán todas sus existencias</p>'+
                                '<button onclick="eliminarInsumo(\''+codigoInsumo+'\')" type="button" class="btn btn-primary mt-3">Eliminar</button>'+
                                '<button onclick="cerrarVentana(\'confirmacionEliminar\')" type="button" class="btn btn-primary mt-3">Cancelar</button>'+
                                '</div>'
    
    document.body.insertAdjacentHTML('afterbegin', ventanaEliminar)
}

function listarInsumos(insumos) {
    let filas = ""
    
    insumos.forEach(function(insumo) {
        filas += '<tr id="'+insumo.codigo+'" class="animate__animated animate__backInLeft">'+
                    '    <td>'+insumo.codigo+'</td>'+
                    '    <td>'+insumo.categoria+'</td>'+
                    '    <td>'+insumo.etiqueta+'</td>'+
                    '    <td>'+insumo.nombre+'</td>'+
                    '    <td>'+insumo.cantidad+'</td>'+
                    '    <td>'+insumo.unidad+'</td>'+
                    '    <td>'+insumo.stock_minimo+'</td>'+
                    '    <td>'+insumo.stock_maximo+'</td>'+
                    '    <td>'+insumo.costo+'</td>'+
                    '    <td><button onclick="desplegarVentanaActualizar({codigo:\''+insumo.codigo+'\',categoria:\''+insumo.categoria+
                    '\',etiqueta:\''+insumo.etiqueta+'\',nombre:\''+insumo.nombre+'\',cantidad:'+insumo.cantidad+',unidad:\''+insumo.unidad+'\',stock_minimo:'+insumo.stock_minimo+
                    ',stock_maximo:'+insumo.stock_minimo+',costo:'+insumo.costo+'})" type="button" class="btn btn-primary mt-3">Actualizar</button></td>'+
                    '    <td><button onclick="desplegarVentanaEliminar(\''+insumo.codigo+'\', \''+insumo.nombre+'\')" type="button" class="btn btn-primary mt-3">Eliminar</button></td>'+
                    '</tr>'
    });
    
    buscarInsumoResultado.innerHTML = filas
}

buscarInsumoBusquedaSimpleCriterio.onchange = function(){
    buscarInsumoBusquedaSimpleValor.value = ""
    buscarInsumoListaCoincidencias.innerHTML = ""

    if(buscarInsumoBusquedaSimpleCriterio.value == "cantidad" || buscarInsumoBusquedaSimpleCriterio.value == "stock máximo" || 
    buscarInsumoBusquedaSimpleCriterio.value == "stock mínimo" || buscarInsumoBusquedaSimpleCriterio.value == "costo"){
        buscarInsumoBusquedaSimpleValor.type = "number"
    }else{
        buscarInsumoBusquedaSimpleValor.type = "text"
    }
}
/*function listarExistencias(existencias) {
    let tarjetas = ""

    existencias.forEach(function(existencia) {
        tarjetas += '<div id="'+existencia.codigo+'" class="card text-white bg-secondary mb-3 mt-4 animate__animated animate__backInRight" style="max-width: 20rem;">'+
                        '<div class="card-header">'+existencia.codigo+' - '+existencia.codigo_insumo+'</div>'+
                        '<div class="card-body">'+
                        '    <h1 class="card-title">'+"Hola"+'</h1>'+
                        '    <p class="card-text">Fecha de ingreso: '+existencia.fecha_ingreso+'</br>Fecha de vencimiento: '+existencia.fecha_vencimiento+'</p>'+
                        '</div>'+
                        '</div>'
    });

    listaExistencias.innerHTML = tarjetas
}*/