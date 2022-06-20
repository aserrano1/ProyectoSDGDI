class DAOUsuario {

    constructor (conexion) {
        this.conexion = conexion;
    }

    async crear (nuevoUsuario) {

        try {
            await this.conexion.query("INSERT INTO usuario VALUES (?,AES_ENCRYPT(?,'porygon'),?,?,?,?,?,?)", 
            [nuevoUsuario.id, nuevoUsuario.contraseña, nuevoUsuario.rol, nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.direccion, nuevoUsuario.telefono, nuevoUsuario.cargo]);
            
            await this.conexion.query("INSERT INTO permisos VALUES (?,?,?,?,?,?,?,?,?)", 
            [nuevoUsuario.id, nuevoUsuario.permisoCrearInsumo, nuevoUsuario.permisoLeerInsumo, nuevoUsuario.permisoActualizarInsumo, 
            nuevoUsuario.permisoEliminarInsumo, nuevoUsuario.permisoCrearExistencia, nuevoUsuario.permisoLeerExistencia, 
            nuevoUsuario.permisoActualizarExistencia, nuevoUsuario.permisoEliminarExistencia]);
        } catch (error) {
            console.log(error);
        }
    }

    async leer (id, contraseña) {

        try {
            const usuario = await this.conexion.query("SELECT * FROM usuario WHERE id = ? AND AES_DECRYPT(contraseña,'porygon') = ?", [id, contraseña])
            
            const permisos = await this.conexion.query("SELECT * FROM permisos WHERE id_usuario = ?", id)

            return [usuario, permisos]
        } catch (error) {
            console.log(error);
        }
    }

    async leerContraseña (id) {

        try {
            const contraseña = await this.conexion.query("SELECT AES_DECRYPT(contraseña,'porygon') FROM usuario WHERE id = ?", id)
            
            return contraseña
        } catch (error) {
            console.log(error);
        }
    }
    
    async leerPermisos (id) {

        try {
            const permisos = await this.conexion.query("SELECT * FROM permisos WHERE id_usuario = ?", id)
            
            return permisos
        } catch (error) {
            console.log(error);
        }
    }
    
    async actualizar(id, contraseña, nuevosDatos) {
        await this.conexion.query("UPDATE usuario SET  nombre = ?,direccion = ?,telefono = ?,cargo = ? WHERE id = ? AND AES_DECRYPT(contraseña,'porygon') = ?", [nuevosDatos.nombre, 
        nuevosDatos.direccion, nuevosDatos.telefono, nuevosDatos.cargo, id, contraseña])
    }

    async actualizarContraseña(id, actualContraseña, nuevaContraseña) {

        await this.conexion.query("UPDATE usuario SET contraseña = AES_ENCRYPT(?,'porygon') WHERE id = ? AND AES_DECRYPT(contraseña,'porygon') = ?", [nuevaContraseña, id, actualContraseña])
    }

    async eliminar(id, contraseña) {
        try {
            const insumo = await this.conexion.query("DELETE FROM producto WHERE id = ? AND PWDCOMPARE(?, contraseña)", [id, contraseña]);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DAOUsuario