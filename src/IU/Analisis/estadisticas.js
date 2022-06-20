const {ipcRenderer} = require("electron")

var ctx = document.getElementById("myChart").getContext("2d");
const formulario = document.getElementById("formularioConsulta")
const valorBusqueda = document.getElementById("valorBusqueda")
const buscarListaCoincidencias = document.getElementById("coincidencias")
const criterioBusqueda = document.getElementById("criterioBusqueda")
const fechaInicial = document.getElementById("fechaInicial")
const fechaFinal = document.getElementById("fechaFinal")

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if(valorBusqueda.value != ""){
        if(criterioBusqueda.value == "insumo"){
            const criterios = [
                "codigo_insumo",
                valorBusqueda.value
            ]
            
            ipcRenderer.send('asynchronous-buscarMovimientoSimple', criterios)

            ipcRenderer.removeAllListeners('asynchronous-reply-buscarMovimientoSimple')
        
            ipcRenderer.on('asynchronous-reply-buscarMovimientoSimple', (event, movimientos) => {
                if(movimientos.length != 0){
                    let datos = []

                    movimientos.forEach(function(movimiento){
                        let dato

                        if(fechaInicial.value == "" && fechaFinal.value == ""){
                            dato = {
                                fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                cantidad: movimiento.cantidad_insumo
                            }
                        }else if(fechaInicial.value != "" && fechaFinal.value == ""){
                            if(new Date(movimiento.fecha).getTime() >= new Date(fechaInicial.value).getTime()){
                                dato = {
                                    fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                    cantidad: movimiento.cantidad_insumo
                                }
                            }
                        }else if(fechaInicial.value == "" && fechaFinal.value != ""){
                            if(new Date(movimiento.fecha).getTime() <= new Date(fechaFinal.value).getTime()){
                                dato = {
                                    fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                    cantidad: movimiento.cantidad_insumo
                                }
                            }
                        }else if(fechaInicial.value != "" && fechaFinal.value != ""){
                            if(new Date(movimiento.fecha).getTime() >= new Date(fechaInicial.value).getTime() && new Date(movimiento.fecha).getTime() <= new Date(fechaFinal.value).getTime()){
                                dato = {
                                    fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                    cantidad: movimiento.cantidad_insumo
                                }
                            }
                        }

                        if(dato != undefined){
                            datos.push(dato)
                        }
                    })

                    graficar(datos, "Insumo: "+movimientos[0].codigo_insumo)
                }else{
                    alert("Aún no se ha hecho ningun movimiento sobre este insumo")
                }
            })
        }
        if(criterioBusqueda.value == "existencia"){
            const criterios = [
                "codigo_existencia",
                valorBusqueda.value
            ]
            
            ipcRenderer.send('asynchronous-buscarMovimientoSimple', criterios)

            ipcRenderer.removeAllListeners('asynchronous-reply-buscarMovimientoSimple')
        
            ipcRenderer.on('asynchronous-reply-buscarMovimientoSimple', (event, movimientos) => {
                if(movimientos.length != 0){
                    let datos = []

                    movimientos.forEach(function(movimiento){
                        let dato

                        if(fechaInicial.value == "" && fechaFinal.value == ""){
                            

                            dato = {
                                fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                cantidad: movimiento.cantidad_existencia
                            }
                        }else if(fechaInicial.value != "" && fechaFinal.value == ""){
                            if(new Date(movimiento.fecha).getTime() >= new Date(fechaInicial.value).getTime()){
                                dato = {
                                    fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                    cantidad: movimiento.cantidad_existencia
                                }
                            }
                        }else if(fechaInicial.value == "" && fechaFinal.value != ""){
                            if(new Date(movimiento.fecha).getTime() <= new Date(fechaFinal.value).getTime()){
                                dato = {
                                    fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                    cantidad: movimiento.cantidad_existencia
                                }
                            }
                        }else if(fechaInicial.value != "" && fechaFinal.value != ""){
                            if(new Date(movimiento.fecha).getTime() >= new Date(fechaInicial.value).getTime() && new Date(movimiento.fecha).getTime() <= new Date(fechaFinal.value).getTime()){
                                dato = {
                                    fecha: new Date(movimiento.fecha).toLocaleString('es-ES'),
                                    cantidad: movimiento.cantidad_existencia
                                }
                            }
                        }

                        if(dato != undefined){
                            datos.push(dato)
                        }
                    })

                    graficar(datos, "Existencia: "+movimientos[0].codigo_existencia)
                }else{
                    alert("Aún no se ha hecho ningun movimiento sobre esta existencia")
                }
            })
        }
    }else alert("Ingrese algún valor")
})

valorBusqueda.addEventListener('keyup', (e) => {
    if(criterioBusqueda.value == "existencia"){
        const criterios = [
            "codigo",
            valorBusqueda.value
        ]

        ipcRenderer.send('asynchronous-buscarExistenciaProgresivamente', criterios)
        
        ipcRenderer.removeAllListeners('asynchronous-reply-buscarExistenciaProgresivamente')

        ipcRenderer.on('asynchronous-reply-buscarExistenciaProgresivamente', (event, resultado) => {
            listarCoincidencias(resultado)
        })
    }
    if(criterioBusqueda.value == "insumo"){
        const criterios = [
            "codigo",
            valorBusqueda.value
        ]

        ipcRenderer.send('asynchronous-buscarInsumoProgresivamente', criterios)
        
        ipcRenderer.removeAllListeners('asynchronous-reply-buscarInsumoProgresivamente')

        ipcRenderer.on('asynchronous-reply-buscarInsumoProgresivamente', (event, resultado) => {
            listarCoincidencias(resultado)
        })
    }
})

function listarCoincidencias(coincidencias) {
    let lista = ""

    coincidencias.forEach(function(coincidencia) {
        lista += '<option>'+coincidencia.codigo+'</option>'     
    });

  buscarListaCoincidencias.innerHTML = lista
}

function graficar(datosGrafica, titulo){
    let fechas = [], datos = []

    datosGrafica.forEach(function(datoGrafica){
        fechas.push(datoGrafica.fecha)
        datos.push(datoGrafica.cantidad)
    })

    const data = {
        labels: fechas,
        datasets: [{
            label: titulo,
            data: datos,
            borderColor: 'red',
            backgroundColor: 'transparent'
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Chart.js Line Chart'
            }
        }
    },
    };

    var myChart = new Chart(ctx, config)
}

criterioBusqueda.onchange = function(){
    if(criterioBusqueda.value == "insumo") valorBusqueda.placeholder = "Codigo del insumo"
    if(criterioBusqueda.value == "existencia") valorBusqueda.placeholder = "Codigo de la existencia"
}
/*var myChart = new Chart(ctx,{
    type:"line",
    data:{
        labels:['col1','col2','col3'], datasets:[{
            label:'Num datos',
            data:[10,9,15],
            backgroundColor:[
                'rgb(66, 134, 244,0.5)',
                'rgb(74, 135, 72,0.5)',
                'rgb(229, 89, 50,0.5)']
        }]
    },
    options:{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
    }
});*/



/*function handler(chart) {
    chart.data.datasets.forEach(dataset => {
        dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
    });
    chart.update();
}

handler(myChart)*/