const {Router} = require('express')
const {Producto} = require('../db')
const router = Router();

router.get("", (req, res) => {
    console.log(req.body)
    Producto.findAll()
    .then(response => res.json(response))
    .catch(error => res.send(error))
}); 

router.post("", async(req, res) => {

    const {name, brand, img, details, cost} = req.body;
    try {
        const productCreate = await Producto.create({
            brand: brand,
            name: name,
            cost: cost,
            img: img,
            details: details
          });
        res.json(productCreate);
    } catch (error) {
        res.send(error)
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const whatProduct = await Producto.findByPk(id)
        await Producto.destroy({where: id})
        res.json(`Producto ${whatProduct} eliminado`)
    } catch (error) {
        res.send(error)
    }

})
module.exports = router;


