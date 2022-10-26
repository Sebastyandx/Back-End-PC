const {Router} = require('express')
const {getAllProducts} = require('./Controllers/GetAllProductsController')
const router = Router()

router.get('', async (req, res) => {
    try {
        res.status(200).json(await getAllProducts())
    } catch (error) {
        res.send(error)
    }
})

module.exports = router