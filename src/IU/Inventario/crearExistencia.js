const {remote, ipcRenderer} = require("electron")

let resultado = document.getElementById("resultado");
let listaCoincidencias = document.getElementById("coincidencias");
let listaUbicacion = document.getElementById("listaUbicacion");

const formularioBusqueda = document.getElementById("formularioBuscarInsumo");
const busquedaCriterio = document.getElementById("criterio");
const busquedaValorBusqueda = document.getElementById("valorBusqueda");

const formularioExistencia = document.getElementById("formularioCrearExistencia");
const existenciaCodigo = document.getElementById("codigo");
const existenciaCodigoInsumo = document.getElementById("codigo_insumo");
const existenciaCantidad = document.getElementById("cantidad");
const existenciaUbicacion = document.getElementById("ubicacion");
const existenciaFechaIngreso = document.getElementById("fecha_ingreso");
const existenciaFechaVencimiento = document.getElementById("fecha_vencimiento");

busquedaValorBusqueda.addEventListener('keyup', (e) => {

    const criterios = [
        busquedaCriterio.value,
        busquedaValorBusqueda.value
    ]

    //if(criterios[0] == "stock minimo") criterios[0] = "stock_minimo"
    //if(criterios[0] == "stock maximo") criterios[0] = "stock_maximo"

    ipcRenderer.send('asynchronous-buscarInsumoProgresivamente', criterios)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoProgresivamente')
    
    ipcRenderer.on('asynchronous-reply-buscarInsumoProgresivamente', (event, resultado) => {
        listarCoincidencias(resultado)
    })
})

formularioBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();

    const criterios = [
        busquedaCriterio.value,
        busquedaValorBusqueda.value
    ]

    if(criterios[0] == "stock mínimo") criterios[0] = "stock_minimo"
    if(criterios[0] == "stock máximo") criterios[0] = "stock_maximo"
    
    ipcRenderer.send('asynchronous-buscarInsumoSimple', criterios)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoSimple')
    
    ipcRenderer.on('asynchronous-reply-buscarInsumoSimple', (event, resultado) => {
        listarInsumos(resultado)
    })
})

formularioExistencia.addEventListener("submit", (e) => {
    e.preventDefault();

    if(existenciaCantidad.value != "") cantidad = parseFloat(existenciaCantidad.value)

    if(existenciaCodigo.value == ""){
        alert("Ingrese un codigo")
    }else if(existenciaCodigoInsumo.value == ""){
        alert("Ingrese un codigo de insumo")
    }else if(existenciaCantidad.value == ""){
        alert("Ingrese una cantidad")
    }else if(existenciaUbicacion.value == ""){
        alert("Ingrese un ubicación")
    }else if(existenciaFechaIngreso.value == ""){
        alert("Ingrese una fecha de ingreso")
    }else if(existenciaFechaVencimiento.value == ""){
        alert("Ingrese una fecha de vencimiento")
    }else{
        const nuevaExistencia = {
            codigo: existenciaCodigo.value,
            codigo_insumo: existenciaCodigoInsumo.value,
            cantidad: cantidad,
            cantidad_actual: cantidad,
            ubicacion: existenciaUbicacion.value,
            fecha_ingreso: existenciaFechaIngreso.value,
            fecha_vencimiento: existenciaFechaVencimiento.value
        }
    
        ipcRenderer.send('asynchronous-crearExistencia', nuevaExistencia)
    
        ipcRenderer.removeAllListeners('asynchronous-reply-crearExistencia')
        
        ipcRenderer.on('asynchronous-reply-crearExistencia', (event, resp) => {
            resp.forEach(function(res){
                alert(res)
            })

            if(resp.length == 0){
                let cantidadInsumo, cantidadExistencia

                ipcRenderer.send('asynchronous-buscarInsumo', nuevaExistencia.codigo_insumo);
                
                ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumo')

                ipcRenderer.on('asynchronous-reply-buscarInsumo', (event, resultado) => {
                    cantidadInsumo = resultado[0].cantidad

                    ipcRenderer.send('asynchronous-buscarExistencia', nuevaExistencia.codigo);
                
                    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistencia')

                    ipcRenderer.on('asynchronous-reply-buscarExistencia', (event, resultado) => {
                        cantidadExistencia = resultado[0].cantidad

                        const movimiento = {
                            id: Date.now().toString(16),
                            tipo: "ingreso",
                            codigo_insumo: nuevaExistencia.codigo_insumo,
                            codigo_Existencia: nuevaExistencia.codigo,
                            cantidad_insumo: cantidadInsumo,
                            cantidad_existencia: cantidadExistencia,
                            fecha: existenciaFechaIngreso.value
                        }
                
                        ipcRenderer.send('asynchronous-registrarMovimiento', [movimiento])
                    })
                })
            }
        })
    }
})

listarUbicaciones()

function listarUbicaciones(){
    ipcRenderer.send('asynchronous-buscarUbicaciones', undefined)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarUbicaciones')

    ipcRenderer.on('asynchronous-reply-buscarUbicaciones', (event, ubicaciones) => {
        let lista = ""

        ubicaciones.forEach(function(ubicacion) {
            lista += "<option value='"+ubicacion.nombre+"'>"
        });
        
        listaUbicacion.innerHTML = lista
    })
}

function desplegarExistencias(idElemento){

    existenciaCodigoInsumo.value = idElemento
    existenciaCodigo.value = Date.now().toString(16);
    //existenciaFechaIngreso.value = new Date().toJSON().slice(0,19);

    const tabla = document.getElementById("resultado");

    tabla.childNodes.forEach(function(filas) {
        filas.style.backgroundColor = '#fff';
        filas.style.color = '#000';
    })

    const insumoSelecto = document.getElementById(idElemento);

    insumoSelecto.style.backgroundColor = '#2780e3';
    insumoSelecto.style.color = '#fff';

    /*const existencia = {
        codigo: "",
        codigo_insumo: idElemento,
        cantidad: "",
        fecha_ingreso: "",
        fecha_vencimiento: ""
    }

    ipcRenderer.send('asynchronous-buscarExistencia', existencia)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistencia')

    ipcRenderer.on('asynchronous-reply-buscarExistencia', (event, resultado) => {
        listarExistencias(resultado)
    })*/
}

function listarInsumos(insumos) {
    let filas = ""
    
    insumos.forEach(function(insumo) {
        filas += '<tr id="'+insumo.codigo+'" onclick="desplegarExistencias(this.id)" class="animate__animated animate__backInLeft">'+
                    '    <td>'+insumo.codigo+'</td>'+
                    '    <td>'+insumo.categoria+'</td>'+
                    '    <td>'+insumo.etiqueta+'</td>'+
                    '    <td>'+insumo.nombre+'</td>'+
                    '    <td>'+insumo.cantidad+'</td>'+
                    '    <td>'+insumo.unidad+'</td>'+
                    '    <td>'+insumo.stock_minimo+'</td>'+
                    '    <td>'+insumo.stock_maximo+'</td>'+
                    '    <td>'+insumo.costo+'</td>'+
                    '</tr>'
    });

    resultado.innerHTML = filas
}

/*function listarExistencias(existencias) {
    let filas = ""
    
    existencias.forEach(function(existencia) {
        filas += '<tr id="'+insumo.codigo+'" onclick="desplegarExistencias(this.id)" class="animate__animated animate__backInLeft">'+
                    '    <td>'+existencias.codigo+'</td>'+
                    '    <td>'+existencias.categoria+'</td>'+
                    '    <td>'+existencias.etiqueta+'</td>'+
                    '    <td>'+existencias.nombre+'</td>'+
                    '    <td>'+existencias.cantidad+'</td>'+
                    '    <td>'+existencias.unidad+'</td>'+
                    '    <td>'+existencias.stock_minimo+'</td>'+
                    '    <td>'+existencias.stock_minimo+'</td>'+
                    '    <td>'+existencias.costo+'</td>'+
                    '</tr>'
    });

    resultado.innerHTML = filas
}*/

function listarCoincidencias(coincidencias) {
    let lista = ""

    coincidencias.forEach(function(coincidencia) {
        switch (busquedaCriterio.value) {
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

    listaCoincidencias.innerHTML = lista
}

busquedaCriterio.onchange = function(){
    busquedaValorBusqueda.value = ""
    listaCoincidencias.innerHTML = ""

    if(busquedaCriterio.value == "cantidad" || busquedaCriterio.value == "stock máximo" || 
    busquedaCriterio.value == "stock mínimo" || busquedaCriterio.value == "costo"){
        busquedaValorBusqueda.type = "number"
    }else{
        busquedaValorBusqueda.type = "text"
    }
}