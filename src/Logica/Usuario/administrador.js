const Usuario = require("./usuario.js");

class Administrador extends Usuario {

    constructor(id, contraseña, nombre, email, direccion, telefono, cargo) {
        super(id, contraseña, nombre, email, direccion, telefono, cargo)

        this.permisoCrearInsumo = true
        this.permisoLeerInsumo = true
        this.permisoActualizarInsumo = true
        this.permisoEliminarInsumo = true
        this.permisoCrearExistencia = true
        this.permisoLeerExistencia = true
        this.permisoActualizarExistencia = true
        this.permisoEliminarExistencia = true
    }
}

module.exports = Administrador