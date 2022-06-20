const {remote, ipcRenderer} = require("electron")

const formularioActualizarUsuario = document.getElementById("formularioActualizarUsuario");
const usuarioId = document.getElementById("usuario");
const usuarioNombre = document.getElementById("nombre");
const usuarioDireccion = document.getElementById("direccion");
const usuarioTelefono = document.getElementById("telefono");
const usuarioCargo = document.getElementById("cargo");
const usuarioEmail = document.getElementById("email");

ipcRenderer.send('asynchronous-consultarDatosDeUsuario', null)

ipcRenderer.removeAllListeners('asynchronous-reply-consultarDatosDeUsuario')

ipcRenderer.on('asynchronous-reply-consultarDatosDeUsuario', (event, resultado) => {
    usuarioId.innerHTML = resultado.id
    usuarioNombre.value = resultado.nombre
    usuarioDireccion.value = resultado.direccion
    usuarioTelefono.value = resultado.telefono
    usuarioCargo.value = resultado.cargo
    usuarioEmail.value = resultado.email
})

formularioActualizarUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    desplegarVentanaDeConfirmarcion("usuario")
})

function desplegarVentanaDeConfirmarcion(formulario) {
    if(formulario == "usuario"){
        const ventanaDeConfirmacion = "<form id='ventanaDeConfirmarcionUsuario' class='card card-body animate__animated animate__fadeIn' style = 'position: fixed; top: 50%; left: 50%; z-index: 1'>"+
        "<label>Introduzca su contraseña</label>"+
        "<div class='form-group'>"+
        "<input id='contraseñaUsuario' type='password' placeholder='Contraseña' class='form-control' autofocus>"+
        "</div>"+
        "<button onclick='actualizarUsuario()' class='btn btn-primary mt-3'>Actualizar datos</button>"+
        "<button onclick='cerrarVentana(\"ventanaDeConfirmarcionUsuario\")' class='btn btn-primary mt-3'>Cancelar</button>"+
        "</form>"

        document.body.insertAdjacentHTML('afterbegin', ventanaDeConfirmacion)
    }
}

function actualizarUsuario() {
    const contraseñaUsuario = document.getElementById("contraseñaUsuario");
    
    if(contraseñaUsuario.value != ""){
        const nuevosDatos = {
            nombre: usuarioNombre.value,
            direccion: usuarioDireccion.value,
            telefono: usuarioTelefono.value,
            cargo: usuarioCargo.value
        }

        const valores = [usuarioId.innerHTML, contraseñaUsuario.value, nuevosDatos]

        ipcRenderer.send('asynchronous-actualizarUsuario', valores)

        cerrarVentana("ventanaDeConfirmarcionUsuario")
    } else alert("introdusca su contraseña de usuario")
}

function cerrarVentana(ventanaId){
    const ventana = document.getElementById(ventanaId);

    ventana.remove()
}