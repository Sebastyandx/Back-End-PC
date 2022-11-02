const router = require('express').Router();
const { User, Producto } = require('../db');
const userExtractor = require('../middlewares/userExtractor');

router.post("", userExtractor, async (req, res) => {
    const { productosCarrito } = req.body;
    try {
        const { userId } = req;
        const getUserDb = await User.findByPk(userId)

        let carritoIds = productosCarrito.map(e => e.id)

        const added = await getUserDb.addProducto(carritoIds)
        res.json(`items added ${added}`)
        
    } catch (error) {
        res.json({error: 'didnt work'})
    }
})

module.exports = router;