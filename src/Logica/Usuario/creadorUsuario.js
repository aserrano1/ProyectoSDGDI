const Administrador = require("./administrador.js");
const Trabajador = require("./trabajador.js");

class CreadorUsuario {

    constructor(dAOUsuario) {
        this.dAOUsuario = dAOUsuario
    }

    async crearNuevoUsuario(nuevoUsuario, rol) {

        let usuario;

        if(rol == "administrador") usuario = {id: nuevoUsuario.id, contraseña: nuevoUsuario.contraseña, rol: rol, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email,
            direccion: nuevoUsuario.direccion, telefono: nuevoUsuario.telefono, cargo: nuevoUsuario.cargo, permisoCrearInsumo: true, permisoLeerInsumo: true, 
            permisoActualizarInsumo: true, permisoEliminarInsumo: true, permisoCrearExistencia: true, permisoLeerExistencia: true, permisoActualizarExistencia: true, 
            permisoEliminarExistencia: true}

        if(rol == "trabajador") usuario = {id: nuevoUsuario.id, contraseña: nuevoUsuario.contraseña, rol: rol, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email,
        direccion: nuevoUsuario.direccion, telefono: nuevoUsuario.telefono, cargo: nuevoUsuario.cargo, permisoCrearInsumo: false, permisoLeerInsumo: false, 
        permisoActualizarInsumo: false, permisoEliminarInsumo: false, permisoCrearExistencia: false, permisoLeerExistencia: false, permisoActualizarExistencia: false, 
        permisoEliminarExistencia: false}

        let resp;

        if(usuario != undefined) resp = await this.dAOUsuario.crear(usuario);

        return resp
    }

    async ingresar(id, contraseña) {
    
        const resp = await this.dAOUsuario.leer(id, contraseña)
        let usuario
        
        if(resp[0][0].rol == "administrador"){
            usuario = new Administrador(resp[0][0].id, resp[0][0].contraseña, resp[0][0].nombre, resp[0][0].email, resp[0][0].direccion, resp[0][0].telefono, resp[0][0].cargo);
        }

        if(resp[0][0].rol == "trabajador"){
            usuario = new Trabajador(resp[0][0].id, resp[0][0].contraseña, resp[0][0].nombre, resp[0][0].email, resp[0][0].direccion, resp[0][0].telefono, resp[0][0].cargo, resp[1][0].permiso_crear_insumo, 
            resp[1][0].permiso_leer_insumo, resp[1][0].permiso_actualizar_insumo, resp[1][0].permiso_eliminar_insumo, resp[1][0].permiso_crear_existencia, resp[1][0].permiso_leer_existencia, 
            resp[1][0].permiso_actualizar_existencia, resp[1][0].permiso_eliminar_existencia);
        }
        
        return usuario
    }
}

module.exports = CreadorUsuario