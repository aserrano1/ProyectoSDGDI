class CreadorDeTablas {

    constructor(conexion) {
        this.conexion = conexion
    }
    
    async crearTablaConsumible () {

        try {
            await this.conexion.query('CREATE TABLE sdgdi.consumible ('+
            'id VARCHAR (100) PRIMARY KEY, '+
            'nombre VARCHAR (100) NOT NULL, '+
            'presentacion VARCHAR (100) NOT NULL, '+
            'descripcion VARCHAR (500) NOT NULL, '+
            'tipo VARCHAR (100) NOT NULL, '+
            'precio DECIMAL (7,3) NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaExistencia () {

        try {
            await this.conexion.query('CREATE TABLE sdgdi.existencia ('+
            'codigo VARCHAR (100) PRIMARY KEY, '+
            'codigo_insumo VARCHAR (100) NOT NULL, '+
            'cantidad DECIMAL (7,3) NOT NULL, '+
            'cantidad_actual DECIMAL (7,3) NOT NULL, '+
            'ubicacion VARCHAR (100) NOT NULL, '+
            'fecha_ingreso DATETIME NOT NULL, '+
            'fecha_vencimiento DATE NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaIngrediente () {
        try {
            await this.conexion.query('CREATE TABLE sdgdi.ingrediente ('+
            'codigo_insumo VARCHAR (100) NOT NULL, '+
            'id_consumible VARCHAR (100) NOT NULL, '+
            'cantidad DECIMAL (7,3) NOT NULL, '+
            'PRIMARY KEY(codigo_insumo, id_consumible))');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaInsumo () {

        try {
            await this.conexion.query('CREATE TABLE sdgdi.insumo ('+
            'codigo VARCHAR (100) PRIMARY KEY, '+
            'categoria VARCHAR (100) NOT NULL, '+
            'etiqueta VARCHAR (100) NOT NULL, '+
            'nombre VARCHAR (100) NOT NULL, '+
            'cantidad DECIMAL (7,3) NOT NULL, '+
            'unidad VARCHAR (100) NOT NULL, '+
            'stock_minimo DECIMAL (7,3) NOT NULL, '+
            'stock_maximo DECIMAL (7,3) NOT NULL, '+
            'costo DECIMAL (10,2) NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaIntemPedido () {

        try {
            await this.conexion.query('CREATE TABLE sdgdi.intem_pedido ('+
            'serial VARCHAR (100) NOT NULL, '+
            'codigo_pedido VARCHAR (100) NOT NULL, '+
            'codigo_insumo VARCHAR (100) NOT NULL, '+
            'cantidad DECIMAL (7,3) NOT NULL, '+
            'valor_unidad DECIMAL (10,3) NOT NULL, '+
            'valor_total DECIMAL (10,3) NOT NULL, '+
            'PRIMARY KEY(serial, codigo_pedido))');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaPedidoDeProveedor () {

        try {
            await this.conexion.query('CREATE TABLE sdgdi.pedido_de_proveedor ('+
            'pedido VARCHAR (100) PRIMARY KEY, '+
            'id_proveedor VARCHAR (100) NOT NULL, '+
            'fecha_solicitud DATE NOT NULL, '+
            'fecha_entrega DATE NOT NULL, '+
            'observacion VARCHAR (500) NOT NULL, '+
            'soporte VARCHAR (260) NOT NULL, '+
            'recibido_por VARCHAR (100) NOT NULL, '+
            'total DECIMAL (10,3) NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaPermisos () {
        
        try {
            await this.conexion.query('CREATE TABLE sdgdi.permisos ('+
            'id_usuario VARCHAR (100) PRIMARY KEY, '+
            'permiso_crear_insumo BIT NOT NULL, '+
            'permiso_leer_insumo BIT NOT NULL, '+
            'permiso_actualizar_insumo BIT NOT NULL, '+
            'permiso_eliminar_insumo BIT NOT NULL, '+
            'permiso_crear_existencia BIT NOT NULL, '+
            'permiso_leer_existencia BIT NOT NULL, '+
            'permiso_actualizar_existencia BIT NOT NULL, '+
            'permiso_eliminar_existencia BIT NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaProveedor () {

        try {
            await this.conexion.query('CREATE TABLE sdgdi.proveedor ('+
            'id VARCHAR (100) PRIMARY KEY, '+
            'nombre VARCHAR (100) NOT NULL, '+
            'direccion VARCHAR (100) NOT NULL, '+
            'telefono VARCHAR (500) NOT NULL, '+
            'email VARCHAR (100) NOT NULL, '+
            'contacto VARCHAR (100) NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaUsuario () {
        
        try {
            await this.conexion.query('CREATE TABLE sdgdi.usuario ('+
            'id VARCHAR (100) PRIMARY KEY, '+
            'contraseña VARBINARY (500) NOT NULL, '+
            'rol VARCHAR (100) NOT NULL, '+
            'nombre VARCHAR (100) NOT NULL, '+
            'email VARCHAR (100) NOT NULL, '+
            'direccion VARCHAR (100) NOT NULL, '+
            'telefono VARCHAR (100) NOT NULL, '+
            'cargo VARCHAR (100) NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    //--

    async crearTablaMovimiento () {

        try {
            await this.conexion.query('CREATE TABLE sdgdi.movimiento ('+
            'id VARCHAR (100) PRIMARY KEY, '+
            'tipo VARCHAR (100) NOT NULL, '+
            'codigo_insumo VARCHAR (100) NOT NULL, '+
            'codigo_Existencia VARCHAR (100) NOT NULL, '+
            'cantidad_insumo DECIMAL (7,3) NOT NULL, '+
            'cantidad_existencia DECIMAL (7,3) NOT NULL, '+
            'fecha DATETIME NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    //---

    async crearTablaCategoria () {
        
        try {
            await this.conexion.query('CREATE TABLE sdgdi.categoria ('+
            'nombre VARCHAR (100) PRIMARY KEY)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaEtiqueta () {
        
        try {
            await this.conexion.query('CREATE TABLE sdgdi.etiqueta ('+
            'nombre VARCHAR (100) PRIMARY KEY, '+
            'categoria VARCHAR (100) NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaUnidad () {
        
        try {
            await this.conexion.query('CREATE TABLE sdgdi.unidad ('+
            'nombre VARCHAR (100) NOT NULL PRIMARY KEY, '+
            'simbolo VARCHAR (100) NOT NULL UNIQUE)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaUbicacion () {
        
        try {
            await this.conexion.query('CREATE TABLE sdgdi.ubicacion ('+
            'nombre VARCHAR (100) NOT NULL PRIMARY KEY)');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CreadorDeTablas;