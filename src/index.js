const {crearVentanaPrincipal} = require('./main')
const {app} = require('electron')

//require('./database.js')
require('electron-reload')(__dirname)

app.allowRendererProcessReuse = false;
app.whenReady().then(crearVentanaPrincipal);