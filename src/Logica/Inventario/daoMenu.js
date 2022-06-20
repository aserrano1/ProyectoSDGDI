class DAOMenu {
  constructor(conexion) {
    this.conexion = conexion;
  }

  async leerVentasPorDia() {
    try {
      const resp = await this.conexion.query(
        'select count(p.id) as "total_pedidos", DATE_FORMAT(p.fecha, "%M %d %Y") as "fecha", c.nombre, c.precio, c.id as "id_consumible" from pedido_cliente p join consumible c on p.consumible = c.id where p.fecha = curdate() group by c.id;'
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
  async leerVentasPorSemana() {
    try {
      const resp = await this.conexion.query(
        'select count(p.id) as "total_pedidos", DATE_FORMAT(p.fecha, "%M %d %Y") as "fecha", c.nombre, c.precio, c.id as "id_consumible" from pedido_cliente p join consumible c on p.consumible = c.id where p.fecha BETWEEN CURDATE() - INTERVAL 7 DAY and curdate() group by c.id, fecha order by fecha desc;'
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async leerVentasPorMes() {
    try {
      const resp = await this.conexion.query(
        'select count(p.id) as "total_pedidos", DATE_FORMAT(p.fecha, "%M %d %Y") as "fecha", c.nombre, c.precio, c.id as "id_consumible" from pedido_cliente p join consumible c on p.consumible = c.id where p.fecha BETWEEN CURDATE() - INTERVAL 30 DAY and curdate() group by c.id, fecha order by fecha desc;'
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async leerVentasPorAnual() {
    try {
      const resp = await this.conexion.query(
        'select count(p.id) as "total_pedidos", DATE_FORMAT(p.fecha, "%M %d %Y") as "fecha", c.nombre, c.precio, c.id as "id_consumible" from pedido_cliente p join consumible c on p.consumible = c.id where p.fecha BETWEEN CURDATE() - INTERVAL 365 DAY and curdate() group by c.id, fecha order by fecha desc;'
      );
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DAOMenu;
