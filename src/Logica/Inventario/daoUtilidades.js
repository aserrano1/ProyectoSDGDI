const {Notification} = require("electron");

class DAOUtilidades {

    constructor (conexion) {
        this.conexion = conexion;
    }

    async crearCategoria(categoria) {
        try {
            const resp = await this.conexion.query('INSERT INTO categoria SET ?', categoria);
    
            new Notification({
                title: "Inventario",
                body: "Categoria agregada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async leerCategorias() {
        try {
            const resp = await this.conexion.query('SELECT * FROM categoria');
            return resp

        } catch (error) {
            console.log(error);
        }
    }

    async actualizarCategoria(nombre, nuevaCategoria) {
        try {
            const resp1 = await this.conexion.query('UPDATE categoria SET nombre = ? WHERE nombre = ?', [nuevaCategoria, nombre]);
            const resp2 = await this.conexion.query('UPDATE etiqueta SET categoria = ? WHERE categoria = ?', [nuevaCategoria, nombre]);
            
            new Notification({
                title: "Inventario",
                body: "Categoria modificada"
            }).show();

            const resp = [resp1, resp2]
            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarCategoria(nombre) {
        try {
            const resp1 = await this.conexion.query('DELETE FROM categoria WHERE nombre = ?', nombre);
            const resp2 = await this.conexion.query('DELETE FROM etiqueta WHERE categoria = ?', nombre);

            new Notification({
                title: "Inventario",
                body: "Categoria eliminada"
            }).show();

            const resp = [resp1, resp2]
            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async crearEtiqueta(etiqueta) {
        try {
            const resp = await this.conexion.query('INSERT INTO etiqueta SET ?', etiqueta);
    
            new Notification({
                title: "Inventario",
                body: "Etiqueta agregada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async leerEtiquetas() {
        try {
            const resp = await this.conexion.query('SELECT * FROM etiqueta');
            return resp

        } catch (error) {
            console.log(error);
        }
    }

    async actualizarEtiqueta(nombre, nuevaEtiqueta) {
        try {
            const resp = await this.conexion.query('UPDATE etiqueta SET ? WHERE nombre = ?', [nuevaEtiqueta, nombre]);

            new Notification({
                title: "Inventario",
                body: "Etiqueta modificada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarEtiqueta(nombre) {
        try {
            const resp = await this.conexion.query('DELETE FROM etiqueta WHERE nombre = ?', nombre);
            
            new Notification({
                title: "Inventario",
                body: "Etiqueta eliminada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async crearUnidad(unidad) {
        try {
            const resp = await this.conexion.query('INSERT INTO unidad SET ?', unidad);
    
            new Notification({
                title: "Inventario",
                body: "Unidad agregada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async leerUnidades() {
        try {
            const resp = await this.conexion.query('SELECT * FROM unidad');
            return resp

        } catch (error) {
            console.log(error);
        }
    }

    async actualizarUnidad(nombre, nuevaUnidad) {
        try {
            const resp = await this.conexion.query('UPDATE unidad SET ? WHERE nombre = ?', [nuevaUnidad, nombre]);
            
            new Notification({
                title: "Inventario",
                body: "Unidad modificada"
            }).show();
            
            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarUnidad(nombre) {
        try {
            const resp = await this.conexion.query('DELETE FROM unidad WHERE nombre = ?', nombre);

            new Notification({
                title: "Inventario",
                body: "Unidad eliminada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async crearUbicacion(ubicacion) {
        try {
            const resp = await this.conexion.query('INSERT INTO ubicacion SET ?', ubicacion);
    
            new Notification({
                title: "Inventario",
                body: "Ubicacion agregada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async leerUbicaciones() {
        try {
            const resp = await this.conexion.query('SELECT * FROM ubicacion');
            return resp

        } catch (error) {
            console.log(error);
        }
    }

    async actualizarUbicacion(nombre, nuevaUbicacion) {
        try {
            const resp1 = await this.conexion.query('UPDATE ubicacion SET nombre = ? WHERE nombre = ?', [nuevaUbicacion, nombre]);
            const resp2 = await this.conexion.query('UPDATE etiqueta SET ubicacion = ? WHERE ubicacion = ?', [nuevaUbicaciona, nombre]);
            
            new Notification({
                title: "Inventario",
                body: "Ubicacion modificada"
            }).show();

            const resp = [resp1, resp2]
            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarUbicacion(nombre) {
        try {
            const resp1 = await this.conexion.query('DELETE FROM ubicacion WHERE nombre = ?', nombre);
            const resp2 = await this.conexion.query('DELETE FROM etiqueta WHERE ubicacion = ?', nombre);

            new Notification({
                title: "Inventario",
                body: "Ubicacion eliminada"
            }).show();

            const resp = [resp1, resp2]
            return resp
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DAOUtilidades