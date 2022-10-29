const pcData = require('../data/pcData.json');
const {Producto} = require('../db.js')

function createAllProducts(){
    Producto.bulkCreate(pcData)
    .then(() => console.log('data created on db'))
    .catch((error) => console.log(error))
}

module.exports = createAllProducts