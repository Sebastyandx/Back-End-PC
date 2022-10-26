const mothersData = require('../data/mothers[uploadData].json');
const {Producto} = require('../db.js')

function createMotherBoard(){
    Producto.bulkCreate(mothersData)
    .then(() => console.log('data created on db'))
    .catch((error) => console.log(error))
}

module.exports = {
    createMotherBoard
}