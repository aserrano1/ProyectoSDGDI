//import Insumo from "./Logica/Inventario/insumo.js";
const {Notification} = require("electron");

class DAOInsumo {

    constructor (conexion) {
        this.conexion = conexion;
    }

    async crear(nuevoInsumo) {
        try {
            await this.conexion.query('INSERT INTO insumo SET ?', nuevoInsumo);
    
            new Notification({
                title: "Inventario",
                body: "Insumo creado"
            }).show();
        } catch (error) {
            //console.log(error);
            if(error.code == 'ER_DUP_ENTRY'){
                return 'Ya existe un insumo con el mismo codigo';
            }
        }

        return 'OK'
    }

    async leer(codigo) {
        try {
            const insumo = await this.conexion.query("SELECT * FROM insumo WHERE codigo = ?", codigo);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }

    async leerTodo() {
        try {
            const insumo = await this.conexion.query("SELECT * FROM insumo");
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }

    async leerSegunCualquierValor(valores) {
        let condicionConsulta = ""
    
        if(valores.codigo != "") condicionConsulta += "codigo = '"+valores.codigo+"' "
        if(valores.categoria != ""){
            if(condicionConsulta == "") condicionConsulta += "categoria = '"+valores.categoria+"' "; else condicionConsulta += "AND categoria = '"+valores.categoria+"' "
        }
        if(valores.etiqueta != ""){
            if(condicionConsulta == "") condicionConsulta += "etiqueta = '"+valores.etiqueta+"' "; else condicionConsulta += "AND etiqueta = '"+valores.etiqueta+"' "
        }
        if(valores.nombre != ""){
            if(condicionConsulta == "") condicionConsulta += "nombre = '"+valores.nombre+"' "; else condicionConsulta += "AND nombre = '"+valores.nombre+"' "
        }
        if(valores.cantidad != undefined){
            if(condicionConsulta == "") condicionConsulta += "cantidad = "+valores.cantidad; else condicionConsulta += "AND cantidad = "+valores.cantidad+" "
        }
        if(valores.unidad != ""){
            if(condicionConsulta == "") condicionConsulta += "unidad = '"+valores.unidad+"' "; else condicionConsulta += "AND unidad = '"+valores.unidad+"' "
        }
        if(valores.stock_minimo != undefined){
            if(condicionConsulta == "") condicionConsulta += "stock_minimo = "+valores.stock_minimo+" "; else condicionConsulta += "AND stock_minimo = "+valores.stock_minimo+" "
        }
        if(valores.stock_maximo != undefined){
            if(condicionConsulta == "") condicionConsulta += "stock_maximo = "+valores.stock_maximo+" "; else condicionConsulta += "AND stock_maximo = "+valores.stock_maximo+" "
        }
        if(valores.costo != undefined){
            if(condicionConsulta == "") condicionConsulta += "costo = '"+valores.costo+"' "; else condicionConsulta += "AND costo = "+valores.costo+" "
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
            const insumos = await this.conexion.query("SELECT * FROM insumo WHERE "+campo+" = ?", valor);
    
            return insumos
        } catch (error) {
            console.log(error);
        }
    }

    async leerProgresivamente(campo, valor) {
        if(campo == "stock minimo") campo = stock_minimo
        if(campo == "stock maximo") campo = stock_maximo

        try {
            const insumos = await this.conexion.query("SELECT DISTINCT "+campo+" FROM insumo WHERE "+campo+" like '"+valor+"%'");
    
            return insumos
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(codigo, valores) {
        let condicionConsulta = ""
    
        if(valores.codigo != "") condicionConsulta += "codigo = '"+valores.codigo+"' "
        if(valores.categoria != ""){
            if(condicionConsulta == "") condicionConsulta += "categoria = '"+valores.categoria+"' "; else condicionConsulta += ", categoria = '"+valores.categoria+"' "
        }
        if(valores.etiqueta != ""){
            if(condicionConsulta == "") condicionConsulta += "etiqueta = '"+valores.etiqueta+"' "; else condicionConsulta += ", etiqueta = '"+valores.etiqueta+"' "
        }
        if(valores.nombre != ""){
            if(condicionConsulta == "") condicionConsulta += "nombre = '"+valores.nombre+"' "; else condicionConsulta += ", nombre = '"+valores.nombre+"' "
        }
        if(valores.unidad != ""){
            if(condicionConsulta == "") condicionConsulta += "unidad = '"+valores.unidad+"' "; else condicionConsulta += ", unidad = '"+valores.unidad+"' "
        }
        if(valores.stock_minimo != ""){
            if(condicionConsulta == "") condicionConsulta += "stock_minimo = "+valores.stock_minimo; else condicionConsulta += ", stock_minimo = "+valores.stock_minimo+" "
        }
        if(valores.stock_maximo != ""){
            if(condicionConsulta == "") condicionConsulta += "stock_maximo = "+valores.stock_maximo; else condicionConsulta += ", stock_maximo = "+valores.stock_maximo+" "
        }
        if(valores.costo != ""){
            if(condicionConsulta == "") condicionConsulta += "costo = "+valores.costo; else condicionConsulta += ", costo = "+valores.costo
        }
    
        try {
            if(condicionConsulta != ""){
                const resp = await this.conexion.query("UPDATE insumo SET "+condicionConsulta+" WHERE codigo = ?", codigo)
                
                new Notification({
                    title: "Inventario",
                    body: "Insumo actualizado"
                }).show();

                return resp
            }
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarSimple(codigo, insumoActualizado) {
        try {
            const resp = await this.conexion.query("UPDATE insumo SET ? WHERE codigo = ?", [insumoActualizado, codigo])
            
            new Notification({
                title: "Inventario",
                body: "Insumo actualizado"
            }).show();

            return resp
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarSumarCantidad(codigo, cantidad) {
        let suma

        try {
            const cantidadActual = await this.conexion.query("SELECT cantidad FROM insumo WHERE codigo = ?", codigo)

            suma = cantidadActual[0].cantidad + cantidad
            
        } catch (error) {
            console.log(error);
        }

        try {
            const resp = await this.conexion.query("UPDATE insumo SET cantidad = ? WHERE codigo = ?", [suma, codigo])

            new Notification({
                title: "Inventario",
                body: "Cantidad de insumo actualizada"
            }).show();

            return resp
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

module.exports = DAOInsumo