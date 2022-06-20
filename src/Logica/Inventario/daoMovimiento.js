const {Notification} = require("electron");

class DAOMovimiento {

    constructor (conexion) {
        this.conexion = conexion;
    }

    async crear(nuevoMovimiento) {
        try {
            await this.conexion.query('INSERT INTO Movimiento SET ?', nuevoMovimiento);
        } catch (error) {
            console.log(error);
        }

        return 'OK'
    }

    async leer(codigo) {
        try {
            const insumo = await this.conexion.query("SELECT * FROM Movimiento WHERE id = ?", codigo);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }
    
    async leerSegunCualquierValor(valores) {
        let condicionConsulta = ""
    
        if(valores.id != "") condicionConsulta += "id = '"+valores.id+"' "
        if(valores.tipo != ""){
            if(condicionConsulta == "") condicionConsulta += "tipo = '"+valores.tipo+"' "; else condicionConsulta += ", tipo = '"+valores.tipo+"' "
        }
        if(valores.codigo_producto != ""){
            if(condicionConsulta == "") condicionConsulta += "codigo_insumo = '"+valores.codigo_producto+"' "; else condicionConsulta += ", codigo_insumo = '"+valores.codigo_producto+"' "
        }
        if(valores.codigo_Existencia != ""){
            if(condicionConsulta == "") condicionConsulta += "codigo_Existencia = '"+valores.codigo_Existencia+"' "; else condicionConsulta += ", codigo_Existencia = '"+valores.codigo_Existencia+"' "
        }
        if(valores.cantidad_producto != undefined){
            if(condicionConsulta == "") condicionConsulta += "cantidad_insumo = "+valores.cantidad_producto; else condicionConsulta += ", cantidad_insumo = "+valores.cantidad_producto+" "
        }
        if(valores.cantidad_existencia != ""){
            if(condicionConsulta == "") condicionConsulta += "cantidad_existencia = '"+valores.cantidad_existencia+"' "; else condicionConsulta += ", cantidad_existencia = '"+valores.cantidad_existencia+"' "
        }
        if(valores.fecha != undefined){
            if(condicionConsulta == "") condicionConsulta += "fecha = '"+valores.fecha+"' "; else condicionConsulta += ", fecha = '"+valores.fecha+"' "
        }

        try {
            if(condicionConsulta != ""){
                const insumos = await this.conexion.query("SELECT * FROM insumo WHERE "+condicionConsulta)

                return insumos
            }
        } catch (error) {
            console.log(error);
        }
    }

    async leerSegunUnValor(campo, valor) {
        try {
            const insumos = await this.conexion.query("SELECT * FROM movimiento WHERE "+campo+" = ?", valor);
    
            return insumos
        } catch (error) {
            console.log(error);
        }
    }

    async eliminar(codigo) {
        try {
            const resp = await this.conexion.query("DELETE FROM insumo WHERE codigo = ?", codigo);
            
            new Notification({
                title: "Inventario",
                body: "Insumo eliminado"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DAOMovimiento