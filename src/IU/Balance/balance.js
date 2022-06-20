const { ipcRenderer } = require('electron');

const tablaVentasDia = document.getElementById('tabla-ventas-dias-body');
const tablaVentasSemanal = document.getElementById('tabla-ventas-semanal-body');
const tablaVentasMensual = document.getElementById('tabla-ventas-mensual-body');
const tablaVentasAnual = document.getElementById('tabla-ventas-anual-body');

document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  //Diaria
  ipcRenderer.send('asynchronous-obtener-ventas', '');
  ipcRenderer.on('asynchronous-obtener-ventas-reply', (event, ventas_dias) => {
    let contadorFilas = 1,
      items = '';
    ventas_dias.forEach(function (venta) {
      items += `<tr>
            <th scope="row">${contadorFilas}</th>
            <td>${venta.nombre}</td>
            <td>${venta.total_pedidos}</td>
            <td>$${venta.precio}</td>
            <td>$${venta.total_pedidos * venta.precio}</td>
            <td>${venta.fecha}</td>
          </tr>`;
      contadorFilas++;
    });

    tablaVentasDia.innerHTML = items;
  });

  //Semanal
  ipcRenderer.send('asynchronous-obtener-ventas-semana', '');
  ipcRenderer.on(
    'asynchronous-obtener-ventas-semana-reply',
    (event, ventas_semana) => {
      let contadorFilas = 1,
        items = '';
      ventas_semana.forEach(function (venta) {
        items += `<tr>
            <th scope="row">${contadorFilas}</th>
            <td>${venta.nombre}</td>
            <td>${venta.total_pedidos}</td>
            <td>$${venta.precio}</td>
            <td>$${venta.total_pedidos * venta.precio}</td>
            <td>${venta.fecha}</td>
          </tr>`;
        contadorFilas++;
      });
      tablaVentasSemanal.innerHTML = items;
    }
  );

  //Mensual
  ipcRenderer.send('asynchronous-obtener-ventas-mes', '');
  ipcRenderer.on(
    'asynchronous-obtener-ventas-mes-reply',
    (event, ventas_mes) => {
      let contadorFilas = 1,
        items = '';
      ventas_mes.forEach(function (venta) {
        items += `<tr>
            <th scope="row">${contadorFilas}</th>
            <td>${venta.nombre}</td>
            <td>${venta.total_pedidos}</td>
            <td>$${venta.precio}</td>
            <td>$${venta.total_pedidos * venta.precio}</td>
            <td>${venta.fecha}</td>
          </tr>`;
        contadorFilas++;
      });
      tablaVentasMensual.innerHTML = items;
    }
  );

  // //Año
  ipcRenderer.send('asynchronous-obtener-ventas-anual', '');
  ipcRenderer.on(
    'asynchronous-obtener-ventas-anual-reply',
    (event, ventas_anual) => {
      let contadorFilas = 1,
        items = '';
      ventas_anual.forEach(function (venta) {
        items += `<tr>
            <th scope="row">${contadorFilas}</th>
            <td>${venta.nombre}</td>
            <td>${venta.total_pedidos}</td>
            <td>$${venta.precio}</td>
            <td>$${venta.total_pedidos * venta.precio}</td>
            <td>${venta.fecha}</td>
          </tr>`;
        contadorFilas++;
      });
      tablaVentasAnual.innerHTML = items;
    }
  );
});
