const {Procesador,Producto} = require('../../db.js');

module.exports = {
    getAllProducts: async () => {
        try {
            const procesadores = await Procesador.findAll()
            const motherBoard = await Producto.findAll()
            return [...procesadores, ...motherBoard]
        } catch (error) {
            console.log(error)
        }
        
    }
}