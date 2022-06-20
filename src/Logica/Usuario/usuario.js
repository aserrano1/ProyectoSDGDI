class Usuario {

    constructor(id, contraseña, nombre, email, direccion, telefono, cargo) {
        this.id = id
        this.contraseña = contraseña
        this.nombre = nombre
        this.email = email
        this.direccion = direccion
        this.telefono = telefono
        this.cargo = cargo
        this.permisoCrearInsumo = false
        this.permisoLeerInsumo = false
        this.permisoActualizarInsumo = false
        this.permisoEliminarInsumo = false
        this.permisoCrearExistencia = false
        this.permisoLeerExistencia = false
        this.permisoActualizarExistencia = false
        this.permisoEliminarExistencia = false
    }
}

module.exports = Usuario