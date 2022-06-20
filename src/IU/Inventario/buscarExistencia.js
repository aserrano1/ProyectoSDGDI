const {ipcRenderer} = require("electron")

const formulario = document.getElementById("buscarExistencia");
const buscarExistenciaBusquedaSimple = document.getElementById("busquedaSimple");
const buscarExistenciaBusquedaAvanzada = document.getElementById("busquedaAvanzada");
const buscarExistenciaOpcionBusquedaSimple = document.getElementById("opcionBusquedaSimple");
const buscarExistenciaOpcionBusquedaAvanzada = document.getElementById("opcionBusquedaAvanzada");
const buscarExistenciaBusquedaSimpleValor = document.getElementById("valorBusquedaSimple");
const buscarExistenciaBusquedaSimpleCriterio = document.getElementById("criterioBusquedaSimple");
let buscarExistenciaListaCoincidencias = document.getElementById("coincidencias");
const existenciaCodigo = document.getElementById("codigo");
const existenciaCodigoInsumo = document.getElementById("codigo_insumo");
const existenciaCantidad = document.getElementById("cantidad");
const existenciaCantidadActual = document.getElementById("cantidad_actual");
const existenciaUbicacion = document.getElementById("ubicacion");
const existenciaFechaIngreso = document.getElementById("fecha_ingreso");
const existenciaFechaVencimiento = document.getElementById("fecha_vencimiento");
let buscarExistenciaResultado = document.getElementById("resultado");

/*let resProductoNombre = document.getElementById("res_nombre");
let resProductoID = document.getElementById("res_id");
let resProductoEtiqueta = document.getElementById("res_etiqueta");
let resProductoUnidad = document.getElementById("res_unidad");
let resProductoCantidad = document.getElementById("res_cantidad");*/
let listaExistencias = document.getElementById("listaExistencias");

buscarExistenciaOpcionBusquedaSimple.addEventListener('click', (e) => {
    buscarExistenciaBusquedaSimple.hidden = false
    buscarExistenciaBusquedaAvanzada.hidden = true
})

buscarExistenciaOpcionBusquedaAvanzada.addEventListener('click', (e) => {
    buscarExistenciaBusquedaAvanzada.hidden = false
    buscarExistenciaBusquedaSimple.hidden = true
})

buscarExistenciaBusquedaSimpleValor.addEventListener('keyup', (e) => {
    const criterios = [
        buscarExistenciaBusquedaSimpleCriterio.value,
        buscarExistenciaBusquedaSimpleValor.value
    ]

    if(criterios[0] == "codigo de insumo") criterios[0] = "codigo_insumo"
    if(criterios[0] == "cantidad inicial") criterios[0] = "cantidad"
    if(criterios[0] == "cantidad actual") criterios[0] = "cantidad_actual"
    if(criterios[0] == "fecha de ingreso") criterios[0] = "fecha_ingreso"
    if(criterios[0] == "fecha de vencimiento") criterios[0] = "fecha_vencimiento"

    ipcRenderer.send('asynchronous-buscarExistenciaProgresivamente', criterios)
    
    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistenciaProgresivamente')

    ipcRenderer.on('asynchronous-reply-buscarExistenciaProgresivamente', (event, resultado) => {
        listarCoincidencias(resultado)
    })
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if(buscarExistenciaOpcionBusquedaSimple.checked){
        if(buscarExistenciaBusquedaSimpleValor.value != ""){
            const criterios = [
                buscarExistenciaBusquedaSimpleCriterio.value,
                buscarExistenciaBusquedaSimpleValor.value
            ]
    
            if(criterios[0] == "codigo de insumo") criterios[0] = "codigo_insumo"
            if(criterios[0] == "cantidad inicial") criterios[0] = "cantidad"
            if(criterios[0] == "cantidad actual") criterios[0] = "cantidad_actual"
            if(criterios[0] == "fecha de ingreso") criterios[0] = "fecha_ingreso"
            if(criterios[0] == "fecha de vencimiento") criterios[0] = "fecha_vencimiento"
    
            ipcRenderer.send('asynchronous-buscarExistenciaSimple', criterios)
    
            ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistenciaSimple')
        
            ipcRenderer.on('asynchronous-reply-buscarExistenciaSimple', (event, resultado) => {
                if(resultado.length != 0){
                    listarExistencias(resultado)
                }else{
                    alert("No se hallaron existencias que coincidan con la busqueda")
                }
            })
        }else{
            ipcRenderer.send('asynchronous-buscarTodasLasExistencias', undefined)
    
            ipcRenderer.removeAllListeners('asynchronous-reply-buscarTodasLasExistencias')
        
            ipcRenderer.on('asynchronous-reply-buscarTodasLasExistencias', (event, resultado) => {
                if(resultado.length != 0){
                    listarExistencias(resultado)
                }else{
                    alert("No se hallaron existencias que coincidan con la busqueda")
                }
            })
        }
    }

    if(buscarExistenciaOpcionBusquedaAvanzada.checked){
        if(existenciaCodigo.value != "" || existenciaCodigoInsumo.value != "" || existenciaCantidad.value != "" || existenciaCantidadActual.value != "" || 
        existenciaUbicacion.value != "" || existenciaFechaIngreso.value != "" || existenciaFechaVencimiento.value != ""){
            let cantidad, cantidadActual

            if(existenciaCantidad.value != "") cantidad = parseFloat(existenciaCantidad.value)
            if(existenciaCantidadActual.value != "") cantidadActual = parseFloat(existenciaCantidadActual.value)

            const existencia = {
                codigo: existenciaCodigo.value,
                codigo_insumo: existenciaCodigoInsumo.value,
                cantidad: cantidad,
                cantidad_actual: cantidadActual,
                ubicacion: existenciaUbicacion.value,
                fecha_ingreso: existenciaFechaIngreso.value,
                fecha_vencimiento: existenciaFechaVencimiento.value,
            }

            ipcRenderer.send('asynchronous-buscarExistenciaAvanzado', existencia)

            ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistenciaAvanzado')

            ipcRenderer.on('asynchronous-reply-buscarExistenciaAvanzado', (event, resultado) => {
                if(resultado.length != 0){
                    listarExistencias(resultado)
                }else{
                    alert("No se hallaron existencias que coincidan con la busqueda")
                }
            })
        }else{
            alert("Ingrese algún valor")
        }
    }
})

function listarCoincidencias(coincidencias) {
    let lista = ""

    coincidencias.forEach(function(coincidencia) {
        switch (buscarExistenciaBusquedaSimpleCriterio.value) {
            case 'codigo':
                lista += '<option>'+coincidencia.codigo+'</option>'
                break;
            case 'codigo de insumo':
                lista += '<option>'+coincidencia.codigo_insumo+'</option>'
                break;
            case 'cantidad inicial':
                lista += '<option>'+coincidencia.cantidad+'</option>'
                break;
            case 'cantidad actual':
                lista += '<option>'+coincidencia.cantidad_actual+'</option>'
                break;
            case 'ubicacion':
                lista += '<option>'+coincidencia.ubicacion+'</option>'
                break;
            case 'fecha de ingreso':
                lista += '<option>'+coincidencia.fecha_ingreso+'</option>'
                break;
            case 'fecha de vencimiento':
                lista += '<option>'+coincidencia.fecha_vencimiento+'</option>'
        }       
    });

    buscarExistenciaListaCoincidencias.innerHTML = lista
}

function actualizarExistencia(codigoExistencia){
    const formularioActualizar = document.getElementById("formularioActualizar");
    const codigoActualizado = document.getElementById("codigoActualizar");
    const codigoInsumoActualizado = document.getElementById("codigoInsumoActualizar");
    const ubicacionActualizado = document.getElementById("ubicacionActualizar");
    const fechaIngresoActualizado = document.getElementById("fechaIngresoActualizar");
    const fechaVencimientoActualizado = document.getElementById("fechaVencimientoActualizar");
    
    const existencia = {
        codigo: codigoActualizado.value,
        codigo_insumo: codigoInsumoActualizado.value,
        ubicacion: ubicacionActualizado.value,
        fecha_ingreso: fechaIngresoActualizado.value,
        fecha_vencimiento: fechaVencimientoActualizado.value
    }

    ipcRenderer.send('asynchronous-actualizarExistencia', [codigoExistencia, existencia])

    formularioActualizar.remove()
}

function eliminarExistencia(codigoInsumo){
    const confirmacionEliminar = document.getElementById("confirmacionEliminar");

    ipcRenderer.send('asynchronous-eliminarExistencia', codigoInsumo)

    confirmacionEliminar.remove()
}

function cerrarVentana(ventanaId){
    const ventana = document.getElementById(ventanaId);

    ventana.remove()
}

function desplegarVentanaActualizar(existencia){
    const ventanaActualizar = '<form id="formularioActualizar" class="card card-body animate__animated animate__fadeIn" style="position: fixed; z-index: 1; margin-top: 5%; margin-left: 40%">'+
                                '<div class="form-group my-1">'+
                                '<input id="codigoActualizar" type="text" value="'+existencia.codigo+'" class="form-control">'+
                                '</div>'+
                                '<div class="form-group my-1">'+
                                '<input id="codigoInsumoActualizar" type="text" value="'+existencia.codigo_insumo+'" class="form-control">'+
                                '</div>'+
                                '<div class="form-group my-1">'+
                                '<input id="ubicacionActualizar" type="text" value="'+existencia.ubicacion+'" class="form-control">'+
                                '</div>'+
                                '<div class="form-group my-1">'+
                                '<input id="fechaIngresoActualizar" type="text" value="'+existencia.fecha_ingreso+'" class="form-control">'+
                                '</div>'+
                                '<div class="form-group my-1">'+
                                '<input id="fechaVencimientoActualizar" type="number" value="'+existencia.fecha_vencimiento+'" class="form-control">'+
                                '</div>'+
                                '<button onclick="actualizarExistencia(\''+existencia.codigo+'\')" type="button" class="btn btn-primary mt-3">Actualizar</button>'+
                                '<button onclick="cerrarVentana(\'formularioActualizar\')" type="button" class="btn btn-primary mt-3">Cancelar</button>'+
                                '</form>'

    document.body.insertAdjacentHTML('afterbegin', ventanaActualizar)
}

function desplegarVentanaEliminar(codigo, fechaIngreso, fechaVencimiento){
    const ventanaEliminar = '<div id="confirmacionEliminar" class="card card-body animate__animated animate__flipInX" style="position: fixed; z-index: 1; margin-top: 20%; margin-left: 30%">'+
                                '<p>¿Está seguro que desea eliminar la existencia '+codigo+' ('+fechaIngreso+'/'+fechaVencimiento+')?</p>'+
                                '<button onclick="eliminarExistencia(\''+codigo+'\')" type="button" class="btn btn-primary mt-3">Eliminar</button>'+
                                '<button onclick="cerrarVentana(\'confirmacionEliminar\')" type="button" class="btn btn-primary mt-3">Cancelar</button>'+
                                '</div>'
    
    document.body.insertAdjacentHTML('afterbegin', ventanaEliminar)
}

function listarExistencias(existencias) {
    let filas = ""
    
    const opcionesTime = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric' , minute: 'numeric' , second: 'numeric'};
    const opciones = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};

    existencias.forEach(function(existencia) {
        const fechaIngreso = new Date(existencia.fecha_ingreso).toLocaleString('es-ES', opcionesTime);
        const fechaVencimiento = new Date(existencia.fecha_vencimiento).toLocaleDateString('es-ES', opciones);
        filas += '<tr class="animate__animated animate__backInLeft">'+
                    '    <td>'+existencia.codigo+'</td>'+
                    '    <td>'+existencia.codigo_insumo+'</td>'+
                    '    <td>'+existencia.cantidad+'</td>'+
                    '    <td>'+existencia.cantidad_actual+'</td>'+
                    '    <td>'+existencia.ubicacion+'</td>'+
                    '    <td>'+fechaIngreso+'</td>'+
                    '    <td>'+fechaVencimiento+'</td>'+
                    '    <td><button onclick="desplegarVentanaActualizar({codigo:\''+existencia.codigo+'\',codigo_insumo:\''+existencia.codigo_insumo+
                    '\',ubicacion:\''+existencia.ubicacion+'\',fecha_ingreso:'+existencia.fecha_ingreso+',fecha_vencimiento:\''+existencia.fecha_vencimiento+
                    '})" type="button" class="btn btn-primary mt-3">Actualizar</button></td>'+
                    '    <td><button onclick="desplegarVentanaEliminar(\''+existencia.codigo+'\', \''+existencia.fecha_ingreso+'\', \''+existencia.fecha_vencimiento+'\')" type="button" class="btn btn-primary mt-3">Eliminar</button></td>'+
                    '</tr>'
    });

    buscarExistenciaResultado.innerHTML = filas
}

buscarExistenciaBusquedaSimpleCriterio.onchange = function(){
    buscarExistenciaBusquedaSimpleValor.value = ""
    buscarExistenciaListaCoincidencias.innerHTML = ""

    if(buscarExistenciaBusquedaSimpleCriterio.value == "cantidad inicial" || buscarExistenciaBusquedaSimpleCriterio.value == "cantidad actual"){
        buscarExistenciaBusquedaSimpleValor.type = "number"
    }else if(buscarExistenciaBusquedaSimpleCriterio.value == "fecha de ingreso" || buscarExistenciaBusquedaSimpleCriterio.value == "fecha de vencimiento"){
        buscarExistenciaBusquedaSimpleValor.type = "date"
    }else{
        buscarExistenciaBusquedaSimpleValor.type = "text"
    }
}