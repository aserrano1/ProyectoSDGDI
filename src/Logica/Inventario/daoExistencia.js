//import Insumo from "./Logica/Inventario/existencia.js";
const {Notification} = require("electron");

class DAOExistencia {

    constructor (conexion) {
        this.conexion = conexion;
    }

    async crear (nuevaExistencia) {
        try {
            await this.conexion.query('INSERT INTO existencia SET ?', nuevaExistencia);
            
            new Notification({
                title: "Inventario",
                body: "Existencia creada"
            }).show();

            return "OK"
        } catch (error) {
            if(error.code == "ER_DUP_ENTRY"){
                return "Ya existe otra existenciaa con el mismo codigo"
            }else console.log(error);
        }
    }

    async leer (codigo) {
        try {
            const existencias = await this.conexion.query("SELECT * FROM existencia WHERE codigo = ?", codigo);
    
            return existencias
        } catch (error) {
            console.log(error);
        }
    }

    async leerTodo () {
        try {
            const existencias = await this.conexion.query("SELECT * FROM existencia");
    
            return existencias
        } catch (error) {
            console.log(error);
        }
    }

    async leerSegunCualquierValor(valores) {
        let condicionConsulta = ""
    
        if(valores.codigo != "") condicionConsulta += "codigo = '"+valores.codigo+"' "
        if(valores.codigo_insumo != ""){
            if(condicionConsulta == "") condicionConsulta += "codigo_insumo = '"+valores.codigo_insumo+"' "; else condicionConsulta += "AND codigo_insumo = '"+valores.codigo_insumo+"' "
        }
        if(valores.cantidad != undefined){
            if(condicionConsulta == "") condicionConsulta += "cantidad = "+valores.cantidad+" "; else condicionConsulta += "AND cantidad = "+valores.cantidad+" "
        }
        if(valores.cantidad_actual != undefined){
            if(condicionConsulta == "") condicionConsulta += "cantidad_actual = "+valores.cantidad_actual+" "; else condicionConsulta += "AND cantidad_actual = "+valores.cantidad_actual+" "
        }
        if(valores.ubicacion != ""){
            if(condicionConsulta == "") condicionConsulta += "ubicacion = '"+valores.ubicacion+"' "; else condicionConsulta += "AND ubicacion = '"+valores.ubicacion+"' "
        }
        if(valores.fecha_ingreso != undefined){
            if(condicionConsulta == "") condicionConsulta += "fecha_ingreso = "+valores.fecha_ingreso; else condicionConsulta += "AND fecha_ingreso = '"+valores.fecha_ingreso+"' "
        }
        if(valores.fecha_vencimiento != undefined){
            if(condicionConsulta == "") condicionConsulta += "fecha_vencimiento = '"+valores.fecha_vencimiento+"' "; else condicionConsulta += "AND fecha_vencimiento = '"+valores.fecha_vencimiento+"' "
        }
    
        try {
            if(condicionConsulta != ""){
                const existencias = await this.conexion.query("SELECT * FROM existencia WHERE "+condicionConsulta)

                return existencias
            }
        } catch (error) {
            console.log(error);
        }
    }

    async leerSegunUnValor(campo, valor) {
        try {
            const existencias = await this.conexion.query("SELECT * FROM existencia WHERE "+campo+" = ?", valor);
    
            return existencias
        } catch (error) {
            console.log(error);
        }
    }

    async leerProgresivamente(campo, valor) {
        try {
            const existencias = await this.conexion.query("SELECT DISTINCT "+campo+" FROM existencia WHERE "+campo+" like '"+valor+"%'");
    
            return existencias
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(codigo, valores) {
        let condicionConsulta = ""
    
        if(valores.codigo != "") condicionConsulta += "codigo = '"+valores.codigo+"' "
        if(valores.codigo_insumo != ""){
            if(condicionConsulta == "") condicionConsulta += "codigo_insumo = '"+valores.codigo_insumo+"' "; else condicionConsulta += ", codigo_insumo = '"+valores.codigo_insumo+"' "
        }
        if(valores.ubicacion != ""){
            if(condicionConsulta == "") condicionConsulta += "ubicacion = '"+valores.ubicacion+"' "; else condicionConsulta += ", ubicacion = '"+valores.ubicacion+"' "
        }
        if(valores.fecha_ingreso != undefined){
            if(condicionConsulta == "") condicionConsulta += "fecha_ingreso = "+valores.fecha_ingreso; else condicionConsulta += ", fecha_ingreso = '"+valores.fecha_ingreso+"' "
        }
        if(valores.fecha_vencimiento != ""){
            if(condicionConsulta == "") condicionConsulta += "fecha_vencimiento = '"+valores.fecha_vencimiento+"' "; else condicionConsulta += ", fecha_vencimiento = '"+valores.fecha_vencimiento+"' "
        }
    
        try {
            if(condicionConsulta != ""){
                const resp = await this.conexion.query("UPDATE existencia SET "+condicionConsulta+" WHERE codigo = ?", codigo)

                new Notification({
                    title: "Inventario",
                    body: "Existencia actualizada"
                }).show();

                return resp
            }
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarSimple(codigo, existenciaActualizado) {
        try {
            const resp = await this.conexion.query("UPDATE existencia SET ? WHERE codigo = ?", [existenciaActualizado, codigo])

            new Notification({
                title: "Inventario",
                body: "Existencia actualizada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarSumarCantidad(codigo, cantidad) {
        let suma, cantidadOriginal

        try {
            const cantidadActual = await this.conexion.query("SELECT cantidad_actual FROM existencia WHERE codigo = ?", codigo)
            cantidadOriginal = await this.conexion.query("SELECT cantidad FROM existencia WHERE codigo = ?", codigo)
            
            suma = cantidadActual[0].cantidad_actual + cantidad
        } catch (error) {
            console.log(error);
        }

        if(suma >= 0){
            if(suma <= cantidadOriginal[0].cantidad){
                try {
                    const resp = await this.conexion.query("UPDATE existencia SET cantidad_actual = ? WHERE codigo = ?", [suma, codigo])
    
                    new Notification({
                        title: "Inventario",
                        body: "Cantidad de existencia actualizada"
                    }).show();
    
                    return "OK"
                } catch (error) {
                    console.log(error);
                }
            }else return "La cantidad actual de la existencia más la cantidad a reingresar no puede superar la cantidad original de la existencia"
        }else return "La cantidad a extraer no puede ser mayor a la cantidad actual de la existencia"
    }

    async eliminar(codigo) {
        try {
            const resp = await this.conexion.query("DELETE FROM existencia WHERE codigo = ?", codigo);
    
            new Notification({
                title: "Inventario",
                body: "Existencia eliminada"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarPorInsumo(codigoInsumo) {
        try {
            const resp = await this.conexion.query("DELETE FROM existencia WHERE codigo_insumo = ?", codigoInsumo);

            new Notification({
                title: "Inventario",
                body: "Existencias eliminadas"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DAOExistencia