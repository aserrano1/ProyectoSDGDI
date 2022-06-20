const {ipcRenderer} = require("electron")

const formulario = document.getElementById("formularioCrearUsuario");
const usuarioUsuario = document.getElementById("usuario");
const usuarioContraseña = document.getElementById("contraseña");
const usuarioNombre = document.getElementById("nombre");
const usuarioEmail = document.getElementById("email");
const usuarioDireccion = document.getElementById("direccion");
const usuarioTelefono = document.getElementById("telefono");
const usuarioCargo = document.getElementById("cargo");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoUsuario = {
        id: usuarioUsuario.value,
        contraseña: usuarioContraseña.value,
        nombre: usuarioNombre.value,
        email: usuarioEmail.value,
        direccion: usuarioDireccion.value,
        telefono: usuarioTelefono.value,
        cargo: usuarioCargo.value
    }

    ipcRenderer.send('asynchronous-crearUsuario', nuevoUsuario)
})