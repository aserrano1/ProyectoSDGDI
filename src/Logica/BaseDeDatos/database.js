const mysql = require('promise-mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sdgdi'
})

function getConnection(){
    return connection;
}

class ConectorBD {
    constructor(anfitrión, usuario, contraseña, baseDeDatos){
        this.anfitrión = anfitrión
        this.usuario = usuario
        this.contraseña = contraseña
        this.baseDeDatos = baseDeDatos
        
    }

    async getConector(){
        const connection = await mysql.createConnection({
            host: this.anfitrión,
            user: this.usuario,
            password: this.contraseña,
            database: this.baseDeDatos
        })

        return connection;
    }
}

module.exports = ConectorBD;