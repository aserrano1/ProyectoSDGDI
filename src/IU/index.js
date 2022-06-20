const {remote, ipcRenderer} = require("electron")

const formulario = document.getElementById("formularioDeIngreso");
const IngresoUsuario = document.getElementById("usuario");
const IngresoContraseña = document.getElementById("contraseña");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(IngresoUsuario.value != "" && IngresoContraseña.value != ""){
        let datosDeIngreso = {
            usuario: IngresoUsuario.value,
            contraseña: IngresoContraseña.value
        }
        
        ipcRenderer.send('asynchronous-ingresar', datosDeIngreso)

        ipcRenderer.on('asynchronous-reply-ingresar', (event, respuesta) => {
            if(respuesta != "no usuario") window.location.href = "./inicio.html"
        })
    }

    //ipcRenderer.send('asynchronous-crearTablas', undefined);
})