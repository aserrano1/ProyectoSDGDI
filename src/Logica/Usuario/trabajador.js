const Usuario = require("./usuario.js");

class Trabajador extends Usuario {

    constructor(id, contraseña, nombre, email, direccion, telefono, cargo, permisoCrearInsumo, permisoLeerInsumo, 
        permisoActualizarInsumo, permisoEliminarInsumo, permisoCrearExistencia, permisoLeerExistencia, 
        permisoActualizarExistencia, permisoEliminarExistencia) {
        super(id, contraseña, nombre, email, direccion, telefono, cargo)

        this.permisoCrearInsumo = permisoCrearInsumo
        this.permisoLeerInsumo = permisoLeerInsumo
        this.permisoActualizarInsumo = permisoActualizarInsumo
        this.permisoEliminarInsumo = permisoEliminarInsumo
        this.permisoCrearExistencia = permisoCrearExistencia
        this.permisoLeerExistencia = permisoLeerExistencia
        this.permisoActualizarExistencia = permisoActualizarExistencia
        this.permisoEliminarExistencia = permisoEliminarExistencia
    }
}

module.exports = Trabajador