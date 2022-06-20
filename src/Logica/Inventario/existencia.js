export default class Existencia {

    constructor(codigo, codigo_insumo, cantidad, ubicacion, fecha_ingreso, fecha_vencimiento) {
        this.codigo = codigo
        this.codigo_insumo = codigo_insumo
        this.cantidad = cantidad
        this.ubicacion = ubicacion
        this.fecha_ingreso = fecha_ingreso
        this.fecha_vencimiento = fecha_vencimiento
    }

    aumentar(cantidad){
        this.cantidad += cantidad
    }

    clonar(existencia) {
        this.codigo = existencia.codigo
        this.codigo_insumo = existencia.codigo_insumo
        this.cantidad = existencia.cantidad
        this.ubicacion = existencia.ubicacion
        this.fecha_ingreso = existencia.fecha_ingreso
        this.fecha_vencimiento = existencia.fecha_vencimiento
    }

    disminuir(cantidad){
        this.cantidad -= cantidad
    }

    reubicar(ubicacion) {
        this.ubicacion = ubicacion
    }
}