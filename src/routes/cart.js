const router = require('express').Router();
const { User, Producto } = require('../db');
const userExtractor = require('../middlewares/userExtractor');

router.post("", async (req, res) => {
    const { id, productosCarrito } = req.body;
    try {
        const userId = await User.findByPk(id)
        console.log(userId)
        let carritoIds = productosCarrito.map(e => e.id)
        await userId.addProductos(["28e2bee7-4fe9-4c47-a197-66923b1fe71b","915cb30c-b73c-4d08-9493-8b40596ace94"])
        res.json('succesfully added')
        
    } catch (error) {
        res.json({error: 'didnt work'})
    }
})

module.exports = router;