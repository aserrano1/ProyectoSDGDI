export default class Insumo {

    constructor(codigo, categoria, etiqueta, nombre, unidad, stock_minimo, stock_maximo, costo) {
        this.codigo = codigo
        this.categoria = categoria
        this.etiqueta = etiqueta
        this.nombre = nombre
        this.cantidad = 0
        this.unidad = unidad
        this.stock_minimo = stock_minimo
        this.stock_maximo = stock_maximo
        this.costo = costo
    }

    aumentar(cantidad){
        this.cantidad += cantidad
    }

    clonar(insumo) {
        this.codigo = insumo.codigo
        this.categoria = insumo.categoria
        this.etiqueta = insumo.etiqueta
        this.nombre = insumo.nombre
        this.cantidad = insumo.cantidad
        this.unidad = insumo.unidad
        this.stock_minimo = insumo.stock_minimo
        this.stock_maximo = insumo.stock_maximo
        this.costo = insumo.costo
    }

    disminuir(cantidad){
        this.cantidad -= cantidad
    }
}