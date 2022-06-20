const {ipcRenderer} = require("electron")

const formularioBuscarInsumo = document.getElementById("formularioBuscarInsumo");
const criterioBusquedaInsumo = document.getElementById("criterioBusquedaInsumo");
const valorBusquedaInsumo = document.getElementById("valorBusquedaInsumo");
const coincidenciasInsumo = document.getElementById("coincidenciasInsumo");
const formularioBuscarExistencia = document.getElementById("formularioBuscarExistencia");
const criterioBusquedaExistencia = document.getElementById("criterioBusquedaExistencia");
const valorBusquedaExistencia = document.getElementById("valorBusquedaExistencia");
const coincidenciasExistencia = document.getElementById("coincidenciasExistencia");
const codigoExistencia = document.getElementById("codigo");
const codigoInsumoExistencia = document.getElementById("codigoInsumo");
const cantidadExistencia = document.getElementById("cantidad");
const cantidadExistenciaActual = document.getElementById("cantidadActual");
const cantidadER = document.getElementById("cantidadER");
//const ubicacion = document.getElementById("ubicacion");
//const fechaIngreso = document.getElementById("fechaIngreso");
//const fechaVencimiento = document.getElementById("fechaVencimiento");
const extraer = document.getElementById("extraer");
const reingresar = document.getElementById("reingresar");

formularioBuscarInsumo.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(valorBusquedaInsumo.value != ""){
        const criterios = [
            criterioBusquedaInsumo.value,
            valorBusquedaInsumo.value
        ]

        if(criterios[0] == "stock mínimo") criterios[0] = "stock_minimo"
        if(criterios[0] == "stock máximo") criterios[0] = "stock_maximo"

        ipcRenderer.send('asynchronous-buscarInsumoSimple', criterios)
        
        ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoSimple')
        
        ipcRenderer.on('asynchronous-reply-buscarInsumoSimple', (event, resultado) => {
            listarInsumos(resultado)
        })
    }else{
        if(criterioBusquedaInsumo.value == "codigo" || criterioBusquedaInsumo.value == "nombre" || criterioBusquedaInsumo.value == "stock minimo" || criterioBusquedaInsumo.value == "stock maximo" || criterioBusquedaInsumo.value == "costo"){
            window.alert("Ingrese un "+criterioBusquedaInsumo.value+" de insumo")
        }
    
        if(criterioBusquedaInsumo.value == "categoria"|| criterioBusquedaInsumo.value == "etiqueta" || criterioBusquedaInsumo.value == "unidad"){
            window.alert("Ingrese una "+criterioBusquedaInsumo.value+" de insumo")
        }
    }
})

valorBusquedaInsumo.addEventListener('keyup', (e) => {
    const criterios = [
        criterioBusquedaInsumo.value,
        valorBusquedaInsumo.value
    ]

    if(criterios[0] == "stock mínimo") criterios[0] = "stock_minimo"
    if(criterios[0] == "stock máximo") criterios[0] = "stock_maximo"

    ipcRenderer.send('asynchronous-buscarInsumoProgresivamente', criterios)
    
    ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoProgresivamente')

    ipcRenderer.on('asynchronous-reply-buscarInsumoProgresivamente', (event, resultado) => {
        listarCoincidenciasInsumo(resultado)
    })
})

function listarCoincidenciasInsumo(coincidencias) {
    let lista = ""

    coincidencias.forEach(function(coincidencia) {
        switch (criterioBusquedaInsumo.value) {
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
            case 'stock mínimo':
                lista += '<option>'+coincidencia.stock_minimo+'</option>'
                break;
            case 'stock máximo':
                lista += '<option>'+coincidencia.stock_maximo+'</option>'
        }       
    });

    coincidenciasInsumo.innerHTML = lista
}

formularioBuscarExistencia.addEventListener("submit", (e) => {
    e.preventDefault();

    if(valorBusquedaExistencia.value != ""){
        const criterios = [
            criterioBusquedaExistencia.value,
            valorBusquedaExistencia.value
        ]

        if(criterios[0] == "codigo de insumo") criterios[0] = "codigo_insumo"
        if(criterios[0] == "cantidad inicial") criterios[0] = "cantidad"
        if(criterios[0] == "cantidad actual") criterios[0] = "cantidad_actual"
        if(criterios[0] == "ubicación") criterios[0] = "ubicacion"
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
        if(criterioBusquedaExistencia.value == "codigo" || criterioBusquedaExistencia.value == "codigo de insumo"){
            window.alert("Ingrese un "+criterioBusquedaExistencia.value+" de existencia")
        }
    
        if(criterioBusquedaExistencia.value == "cantidad inicial"|| criterioBusquedaExistencia.value == "cantidad actual"|| criterioBusquedaExistencia.value == "ubicación" || criterioBusquedaExistencia.value == "fecha de ingreso" || criterioBusquedaExistencia.value == "fecha de vencimiento"){
            window.alert("Ingrese una "+criterioBusquedaExistencia.value+" de existencia")
        }
    }
})

valorBusquedaExistencia.addEventListener('keyup', (e) => {
    const criterios = [
        criterioBusquedaExistencia.value,
        valorBusquedaExistencia.value
    ]

    if(criterios[0] == "codigo de insumo") criterios[0] = "codigo_insumo"
    if(criterios[0] == "cantidad inicial") criterios[0] = "cantidad"
    if(criterios[0] == "cantidad actual") criterios[0] = "cantidad_actual"
    if(criterios[0] == "ubicación") criterios[0] = "ubicacion"
    if(criterios[0] == "fecha de ingreso") criterios[0] = "fecha_ingreso"
    if(criterios[0] == "fecha de vencimiento") criterios[0] = "fecha_vencimiento"

    ipcRenderer.send('asynchronous-buscarExistenciaProgresivamente', criterios)

    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistenciaProgresivamente')
    
    ipcRenderer.on('asynchronous-reply-buscarExistenciaProgresivamente', (event, resultado) => {
        listarCoincidenciasExistencia(resultado)
    })
})

function listarCoincidenciasExistencia(coincidencias) {
    let lista = ""

    coincidencias.forEach(function(coincidencia) {
        switch (criterioBusquedaExistencia.value) {
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
            case 'ubicación':
                lista += '<option>'+coincidencia.ubicacion+'</option>'
                break;
            case 'fecha de ingreso':
                lista += '<option>'+coincidencia.fecha_ingreso+'</option>'
                break;
            case 'fecha de vencimiento':
                lista += '<option>'+coincidencia.fecha_vencimiento+'</option>'
        }       
    });

    coincidenciasExistencia.innerHTML = lista
}

function listarInsumos(insumos) {
    let filas = '<thead>'+
    '   <th scope="col">Codigo</th>'+
    '   <th scope="col">Categoria</th>'+
    '   <th scope="col">Etiqueta</th>'+
    '   <th scope="col">Nombre</th>'+
    '   <th scope="col">Cantidad</th>'+
    '   <th scope="col">Unidad</th>'+
    '   <th scope="col">Stock mínimo</th>'+
    '   <th scope="col">Stock máximo</th>'+
    '   <th scope="col">Costo</th>'+
    '</thead>'+
    '<tbody>'

    insumos.forEach(function(insumo) {
        filas += '   <tr id="'+insumo.codigo+'" onclick="desplegarExistencias(this.id)" class="animate__animated animate__backInLeft">'+
                    '       <td>'+insumo.codigo+'</td>'+
                    '       <td>'+insumo.categoria+'</td>'+
                    '       <td>'+insumo.etiqueta+'</td>'+
                    '       <td>'+insumo.nombre+'</td>'+
                    '       <td>'+insumo.cantidad+'</td>'+
                    '       <td>'+insumo.unidad+'</td>'+
                    '       <td>'+insumo.stock_minimo+'</td>'+
                    '       <td>'+insumo.stock_maximo+'</td>'+
                    '       <td>'+insumo.costo+'</td>'+
                    '   </tr>'
    });

    filas += '</tbody>'

    tablaResultado.innerHTML = filas
}

function listarExistencias(existencias) {
    let filas = '<thead>'+
    '   <th scope="col">Codigo</th>'+
    '   <th scope="col">Codigo insumo</th>'+
    '   <th scope="col">Cantidad inicial</th>'+
    '   <th scope="col">Cantidad actual</th>'+
    '   <th scope="col">Ubicación</th>'+
    '   <th scope="col">Fecha de ingreso</th>'+
    '   <th scope="col">Fecha de vencimiento</th>'+
    '</thead>'+
    '<tbody>'
    const opcionesTime = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric' , minute: 'numeric' , second: 'numeric'};
    const opciones = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'};

    existencias.forEach(function(existencia) {
        const fechaIngreso = new Date(existencia.fecha_ingreso).toLocaleString('es-ES', opcionesTime);
        const fechaVencimiento = new Date(existencia.fecha_vencimiento).toLocaleDateString('es-ES', opciones);

        filas += '   <tr id="'+existencia.codigo+'" onclick="mostrarExistencias(this.id)" class="animate__animated animate__backInLeft">'+
                    '       <td>'+existencia.codigo+'</td>'+
                    '       <td>'+existencia.codigo_insumo+'</td>'+
                    '       <td>'+existencia.cantidad+'</td>'+
                    '       <td>'+existencia.cantidad_actual+'</td>'+
                    '       <td>'+existencia.ubicacion+'</td>'+
                    '       <td>'+fechaIngreso+'</td>'+
                    '       <td>'+fechaVencimiento+'</td>'+
                    '   </tr>'
    });

    filas += '</tbody>'

    tablaResultado.innerHTML = filas
}

function desplegarExistencias(codigoInsumo){
    ipcRenderer.send('asynchronous-buscarExistenciaSimple', ["codigo_insumo", codigoInsumo])
    
    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistenciaSimple')

    ipcRenderer.on('asynchronous-reply-buscarExistenciaSimple', (event, resultado) => {
        if(resultado.length != 0){
            listarExistencias(resultado)
        }else{
            alert("Este insumo no tieene existencias en inventario")
        }
    })
}

function mostrarExistencias(codigo){
    ipcRenderer.send('asynchronous-buscarExistencia', codigo)
    
    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistencia')

    ipcRenderer.on('asynchronous-reply-buscarExistencia', (event, existencia) => {
        codigoExistencia.value = existencia[0].codigo
        codigoInsumoExistencia.value = existencia[0].codigo_insumo

        let unidadDeInsumo

        ipcRenderer.send('asynchronous-buscarInsumoSimple', ["codigo", existencia[0].codigo_insumo])
        
        ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoSimple')

        ipcRenderer.on('asynchronous-reply-buscarInsumoSimple', (event, insumos) => {
            unidadDeInsumo = insumos[0].unidad
        })

        ipcRenderer.send('asynchronous-buscarUnidades', undefined)

        ipcRenderer.removeAllListeners('asynchronous-reply-buscarUnidades')

        ipcRenderer.on('asynchronous-reply-buscarUnidades', (event, unidades) => {
            unidades.forEach(function(unidad) {
                if(unidad.nombre == unidadDeInsumo){
                    cantidadExistencia.value = existencia[0].cantidad+unidad.simbolo
                    cantidadExistenciaActual.value = existencia[0].cantidad_actual+unidad.simbolo
                }
            })
        })
    })
}

extraer.addEventListener('click', (e) => {
    e.preventDefault();

    const cantidad = parseFloat(cantidadER.value) * -1

    if(cantidadER.value != ""){

        ipcRenderer.send('asynchronous-actualizarExistenciaCantidad', [codigoExistencia.value, cantidad, codigoInsumoExistencia.value])
        
        ipcRenderer.removeAllListeners('asynchronous-reply-actualizarExistenciaCantidad')

        ipcRenderer.on('asynchronous-reply-actualizarExistenciaCantidad', (event, resultado) => {
            if(resultado == "OK"){
                let cantidadInsumo, cantidadExistencia

                ipcRenderer.send('asynchronous-buscarInsumo', codigoInsumoExistencia.value);
                
                ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumo')
        
                ipcRenderer.on('asynchronous-reply-buscarInsumo', (event, insumo) => {
                    cantidadInsumo = insumo[0].cantidad
        
                    ipcRenderer.send('asynchronous-buscarExistencia', codigoExistencia.value);
                
                    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistencia')
        
                    ipcRenderer.on('asynchronous-reply-buscarExistencia', (event, existencia) => {
                        cantidadExistencia = existencia[0].cantidad_actual
        
                        const movimiento = {
                            id: Date.now().toString(16),
                            tipo: "extraccion",
                            codigo_insumo: codigoInsumoExistencia.value,
                            codigo_Existencia: codigoExistencia.value,
                            cantidad_insumo: cantidadInsumo,
                            cantidad_existencia: cantidadExistencia,
                            fecha: new Date().toISOString().slice(0, 19)
                        }
        
                        ipcRenderer.send('asynchronous-registrarMovimiento', movimiento)
                    })
                })
            }else alert(resultado)
        })
    }else{
        alert("Ingrese una cantidad a extraer")
    }
})

reingresar.addEventListener('click', (e) => {
    e.preventDefault();

    if(cantidadER.value != ""){
        const cantidad = parseFloat(cantidadER.value)

        ipcRenderer.send('asynchronous-actualizarExistenciaCantidad', [codigoExistencia.value, cantidad, codigoInsumoExistencia.value])

        ipcRenderer.removeAllListeners('asynchronous-reply-actualizarExistenciaCantidad')

        ipcRenderer.on('asynchronous-reply-actualizarExistenciaCantidad', (event, resultado) => {
            if(resultado == "OK"){
                let cantidadInsumo, cantidadExistencia

                ipcRenderer.send('asynchronous-buscarInsumo', codigoInsumoExistencia.value);
                
                ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumo')

                ipcRenderer.on('asynchronous-reply-buscarInsumo', (event, insumo) => {
                    cantidadInsumo = insumo[0].cantidad

                    ipcRenderer.send('asynchronous-buscarExistencia', codigoExistencia.value);
                
                    ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistencia')

                    ipcRenderer.on('asynchronous-reply-buscarExistencia', (event, existencia) => {
                        cantidadExistencia = existencia[0].cantidad_actual

                        const movimiento = {
                            id: Date.now().toString(16),
                            tipo: "reingreso",
                            codigo_insumo: codigoInsumoExistencia.value,
                            codigo_Existencia: codigoExistencia.value,
                            cantidad_insumo: cantidadInsumo,
                            cantidad_existencia: cantidadExistencia,
                            fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        }
                
                        ipcRenderer.send('asynchronous-registrarMovimiento', [movimiento])
                    })
                })
            }else alert(resultado)
        })
    }else{
        alert("Ingrese una cantidad a reingresar")
    }
})

criterioBusquedaInsumo.onchange = function(){
    valorBusquedaInsumo.value = ""
    coincidenciasInsumo.innerHTML = ""

    if(criterioBusquedaInsumo.value == "cantidad" || criterioBusquedaInsumo.value == "stock máximo" || 
    criterioBusquedaInsumo.value == "stock mínimo" || criterioBusquedaInsumo.value == "costo"){
        valorBusquedaInsumo.type = "number"
    }else{
        valorBusquedaInsumo.type = "text"
    }
}

criterioBusquedaExistencia.onchange = function(){
    valorBusquedaExistencia.value = ""
    coincidenciasExistencia.innerHTML = ""

    if(criterioBusquedaExistencia.value == "cantidad inicial" || criterioBusquedaExistencia.value == "cantidad actual"){
        valorBusquedaExistencia.type = "number"
    }else if(criterioBusquedaExistencia.value == "fecha de ingreso" || criterioBusquedaExistencia.value == "fecha de vencimiento"){
        valorBusquedaExistencia.type = "date"
    }else{
        valorBusquedaExistencia.type = "text"
    }
}